import { unstable_cache } from "next/cache";

export type ActivityCategory =
  | "Evolução de funcionalidades"
  | "Correção e estabilidade"
  | "Testes e qualidade"
  | "Documentação"
  | "Infraestrutura e manutenção";

export type ProjectActivity = {
  id: string;
  title: string;
  movementCount30d: number;
  lastActivityAt: string;
  lastActivityLabel: string;
  category: ActivityCategory;
  status: "Em desenvolvimento" | "Em evolução" | "Projeto consolidado";
  source: "live" | "snapshot";
};

export type ProjectActivityResult = {
  items: ProjectActivity[];
  isLive: boolean;
  updatedAt: string;
  updatedLabel: string;
};

type GitHubCommit = {
  commit?: {
    message?: string;
    author?: { date?: string | null } | null;
    committer?: { date?: string | null } | null;
  };
};

type ActivitySeed = Omit<ProjectActivity, "lastActivityLabel" | "status" | "source">;

const DAY_IN_MS = 86_400_000;

const initialSnapshot: ActivitySeed[] = [
  { id: "fincontrol", title: "FinControl", movementCount30d: 27, lastActivityAt: "2026-08-27T18:42:44Z", category: "Evolução de funcionalidades" },
  { id: "clube", title: "Gestão de Clube Social", movementCount30d: 0, lastActivityAt: "2026-02-08T19:51:48Z", category: "Infraestrutura e manutenção" },
  { id: "eventos", title: "Gestão de Eventos", movementCount30d: 0, lastActivityAt: "2026-03-06T04:28:28Z", category: "Correção e estabilidade" },
  { id: "barbearia", title: "BarberShop SaaS", movementCount30d: 0, lastActivityAt: "2025-12-10T04:22:50Z", category: "Correção e estabilidade" },
  { id: "iluminacao", title: "Iluminação Condominial", movementCount30d: 0, lastActivityAt: "2026-03-14T19:35:15Z", category: "Evolução de funcionalidades" },
  { id: "bingo", title: "Bingo Studio", movementCount30d: 0, lastActivityAt: "2026-05-05T15:36:59Z", category: "Evolução de funcionalidades" },
];

function relativeDateLabel(dateIso: string, now = new Date()) {
  const date = new Date(dateIso);
  const days = Math.max(0, Math.floor((now.getTime() - date.getTime()) / DAY_IN_MS));

  if (days === 0) return "hoje";
  if (days === 1) return "há 1 dia";
  if (days < 30) return `há ${days} dias`;

  const months = Math.floor(days / 30);
  if (months === 1) return "há 1 mês";
  if (months < 12) return `há ${months} meses`;

  const years = Math.floor(months / 12);
  return years === 1 ? "há 1 ano" : `há ${years} anos`;
}

function projectStatus(dateIso: string, now = new Date()): ProjectActivity["status"] {
  const ageInDays = Math.max(0, Math.floor((now.getTime() - new Date(dateIso).getTime()) / DAY_IN_MS));
  if (ageInDays <= 14) return "Em desenvolvimento";
  if (ageInDays <= 60) return "Em evolução";
  return "Projeto consolidado";
}

function classifyActivity(message = ""): ActivityCategory {
  const normalized = message.toLocaleLowerCase("pt-BR");
  if (/test|spec|tdd|quality|qualidade|a11y|acessibilidade/.test(normalized)) return "Testes e qualidade";
  if (/docs?|readme|documenta/.test(normalized)) return "Documentação";
  if (/fix|bug|corre|hotfix|estabil/.test(normalized)) return "Correção e estabilidade";
  if (/refactor|chore|ci|build|deploy|infra|depend/.test(normalized)) return "Infraestrutura e manutenção";
  return "Evolução de funcionalidades";
}

function decorateActivity(seed: ActivitySeed, source: ProjectActivity["source"], now = new Date()): ProjectActivity {
  return {
    ...seed,
    lastActivityLabel: relativeDateLabel(seed.lastActivityAt, now),
    status: projectStatus(seed.lastActivityAt, now),
    source,
  };
}

function readRepositoryMap() {
  const raw = process.env.GITHUB_ACTIVITY_REPOSITORIES_JSON;
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const entries = Object.entries(parsed).filter((entry): entry is [string, string] => typeof entry[1] === "string");
    return Object.fromEntries(entries);
  } catch {
    return null;
  }
}

async function fetchPrivateActivity() {
  const token = process.env.GITHUB_ACTIVITY_TOKEN;
  const repositoryMap = readRepositoryMap();
  if (!token || !repositoryMap) throw new Error("GitHub activity integration is not configured.");

  const now = new Date();
  const cutoff = now.getTime() - 30 * DAY_IN_MS;

  const items = await Promise.all(initialSnapshot.map(async (project) => {
    const repository = repositoryMap[project.id];
    if (!repository) return decorateActivity(project, "snapshot", now);

    try {
      const safeRepositoryPath = repository.split("/").map(encodeURIComponent).join("/");
      const response = await fetch(`https://api.github.com/repos/${safeRepositoryPath}/commits?per_page=100`, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 3600 },
      });

      if (!response.ok) throw new Error(`GitHub activity request failed with status ${response.status}.`);

      const commits = await response.json() as GitHubCommit[];
      const latest = commits[0];
      const lastActivityAt = latest?.commit?.committer?.date ?? latest?.commit?.author?.date;
      if (!lastActivityAt) return decorateActivity(project, "snapshot", now);

      const movementCount30d = commits.filter((commit) => {
        const date = commit.commit?.committer?.date ?? commit.commit?.author?.date;
        return date ? new Date(date).getTime() >= cutoff : false;
      }).length;

      return decorateActivity({
        ...project,
        movementCount30d,
        lastActivityAt,
        category: classifyActivity(latest?.commit?.message),
      }, "live", now);
    } catch {
      return decorateActivity(project, "snapshot", now);
    }
  }));

  return {
    items,
    isLive: items.every((item) => item.source === "live"),
    updatedAt: now.toISOString(),
    updatedLabel: relativeDateLabel(now.toISOString(), now),
  } satisfies ProjectActivityResult;
}

const getCachedPrivateActivity = unstable_cache(fetchPrivateActivity, ["github-private-project-activity-v1"], { revalidate: 3600 });

export async function getProjectActivity(): Promise<ProjectActivityResult> {
  const hasConfiguration = Boolean(process.env.GITHUB_ACTIVITY_TOKEN && process.env.GITHUB_ACTIVITY_REPOSITORIES_JSON);
  if (hasConfiguration) {
    try {
      return await getCachedPrivateActivity();
    } catch {
      // Mantém a seção disponível sem revelar detalhes do erro ou dos repositórios.
    }
  }

  const now = new Date();
  return {
    items: initialSnapshot.map((project) => decorateActivity(project, "snapshot", now)),
    isLive: false,
    updatedAt: "2026-08-29T00:00:00Z",
    updatedLabel: relativeDateLabel("2026-08-29T00:00:00Z", now),
  };
}
