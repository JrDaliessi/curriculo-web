import {
  ArrowDown, ArrowUpRight, BriefcaseBusiness, CheckCircle2, Code2, Database, Download,
  Activity, BadgeCheck, GitBranch, Github, GraduationCap, Mail, MapPin, MessageCircle, PanelsTopLeft, Send,
  ShieldCheck, Sparkles, Workflow, Wrench,
} from "lucide-react";
import { SiteHeader } from "./site-header";
import { getProjectActivity } from "./github-activity";

export const revalidate = 3600;

const skills = [
  { icon: Workflow, title: "Análise & processos", text: "Requisitos, regras de negócio, formulários, workflows, documentação, dashboards e melhoria contínua." },
  { icon: Code2, title: "Desenvolvimento", text: "JavaScript, TypeScript, HTML5, CSS3, Next.js, React, Node.js, Tailwind CSS e PWA." },
  { icon: Database, title: "Dados & integrações", text: "SQL, PostgreSQL, Supabase, autenticação, Row Level Security, APIs REST e webhooks." },
  { icon: ShieldCheck, title: "Qualidade & suporte", text: "Jest, Testing Library, TDD, testes funcionais, validação de requisitos, troubleshooting e suporte ao usuário." },
  { icon: Wrench, title: "Ferramentas", text: "Git/GitHub, Windows, Linux, Microsoft 365, métodos ágeis, fundamentos de ITIL e IA aplicada ao desenvolvimento com Codex (OpenAI) e Claude (Anthropic). Disponibilidade para capacitação em Fluig, Protheus e SOAP." },
];

const projects = [
  { id: "fincontrol", index: "01", title: "FinControl", description: "PWA com cadastros financeiros, dashboard, autenticação, RLS, relatórios e arquitetura Feature-Based desenvolvida com TDD.", stack: ["TypeScript", "Supabase", "Jest", "TDD"], appHref: "https://fin-control-two.vercel.app", githubHref: "https://github.com/JrDaliessi/fincontrol-showcase" },
  { id: "clube", index: "02", title: "Gestão de Clube Social", description: "Plataforma de processos com associados, bar, portaria, eventos, reservas, pagamentos, QR Code, perfis de acesso, indicadores e auditoria.", stack: ["Next.js", "Supabase", "Mercado Pago", "PWA"], appHref: "https://social-club-three.vercel.app", githubHref: "https://github.com/JrDaliessi/clube-social-showcase" },
  { id: "eventos", index: "03", title: "Gestão de Eventos", description: "Sistema com calendário, Kanban, fornecedores, documentos, cronogramas, contratos, regras de negócio e acompanhamento por status.", stack: ["Next.js", "Supabase", "Serwist", "dnd-kit"], appHref: "https://agenda-eventos-jrdaliessis-projects.vercel.app", githubHref: "https://github.com/JrDaliessi/gestao-eventos-showcase" },
  { id: "barbearia", index: "04", title: "BarberShop SaaS", description: "SaaS responsivo para agenda, clientes, profissionais, serviços, comissões, pagamentos e dashboards operacionais.", stack: ["Next.js", "Supabase", "Stripe", "Recharts"], appHref: "https://barber-shop-five-blush.vercel.app", githubHref: "https://github.com/JrDaliessi/barbearia-saas-showcase" },
  { id: "iluminacao", index: "05", title: "Iluminação Condominial", description: "Workflow de ativos e ocorrências com Kanban, prioridades, SLA, relatórios, auditoria, reincidência e validação em campo.", stack: ["Next.js", "Supabase", "Zod", "PWA"], appHref: "https://manuten-o-condominio.vercel.app", githubHref: "https://github.com/JrDaliessi/iluminacao-condominio-showcase" },
  { id: "bingo", index: "06", title: "Bingo Studio", description: "Editor visual e gerador de cartelas 1–75 com deduplicação, projetos na nuvem e layouts A4 preparados para impressão.", stack: ["Next.js", "Supabase", "React Hook Form", "Jest"], appHref: "https://bingo-jrdaliessis-projects.vercel.app", githubHref: "https://github.com/JrDaliessi/bingo-studio-showcase" },
];

export default async function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const activity = await getProjectActivity();
  const activityByProject = Object.fromEntries(activity.items.map((item) => [item.id, item]));
  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <SiteHeader />

      <section className="hero shell" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow entrance entrance-1"><span className="status-dot" /> Disponível para oportunidades em TI</div>
          <h1 className="entrance entrance-2">Sistemas claros.<br />Processos <span>inteligentes.</span></h1>
          <p className="hero-lead entrance entrance-3">Sou <strong>Amauri Daliessi Junior</strong>, Analista de Desenvolvimento TI. Transformo necessidades de negócio em experiências digitais confiáveis, bem testadas e fáceis de usar.</p>
          <div className="hero-actions entrance entrance-4">
            <a className="button button-primary" href="#portfolio">Explorar projetos <ArrowDown size={17} /></a>
            <a className="button button-secondary" href={`${basePath}/curriculo-amauri-daliessi.pdf`} download><Download size={17} /> Baixar currículo</a>
          </div>
          <div className="hero-meta entrance entrance-4">
            <span><MapPin size={15} /> Artur Nogueira — SP</span>
            <a href="mailto:juniordaliessi@gmail.com"><Mail size={15} /> juniordaliessi@gmail.com</a>
          </div>
        </div>
        <div className="portrait-wrap entrance entrance-3">
          <div className="portrait-glow" aria-hidden="true" />
          <div className="portrait-frame">
            <img src={`${basePath}/amauri-daliessi.webp`} alt="Retrato profissional de Amauri Daliessi Junior" />
            <div className="portrait-caption"><span><Sparkles size={14} /> Sistemas · Processos · Qualidade</span><strong>Analista de Desenvolvimento TI</strong></div>
          </div>
          <div className="orbit-badge" aria-hidden="true"><Code2 size={23} /></div>
        </div>
        <a className="scroll-hint" href="#sobre" aria-label="Continuar para a seção sobre"><span>Role para conhecer</span><ArrowDown size={16} /></a>
      </section>

      <section className="section shell reveal" id="sobre">
        <div className="section-kicker"><span>01</span> Perfil profissional</div>
        <div className="about-grid">
          <h2>Visão de produto, código e qualidade no mesmo fluxo.</h2>
          <div className="about-copy">
            <p>Formado em Análise e Desenvolvimento de Sistemas e pós-graduando em Qualidade e Teste de Software. Desenvolvo sistemas web e PWAs aplicando levantamento de requisitos, modelagem de dados, workflows, dashboards, integrações REST, testes e documentação.</p>
            <div className="value-list"><span><CheckCircle2 size={17} /> Foco em processos corporativos</span><span><CheckCircle2 size={17} /> Desenvolvimento orientado a testes</span><span><CheckCircle2 size={17} /> Interfaces responsivas e intuitivas</span></div>
          </div>
        </div>
      </section>

      <section className="section shell reveal" id="competencias">
        <div className="section-kicker"><span>02</span> Competências</div>
        <div className="section-heading"><h2>Do requisito à entrega.</h2><p>Uma base técnica ampla para construir, validar e evoluir soluções.</p></div>
        <div className="skills-grid">
          {skills.map(({ icon: Icon, title, text }) => <article className="skill-card" key={title}><div className="icon-box"><Icon size={22} /></div><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="section portfolio-section reveal" id="portfolio">
        <div className="shell">
          <div className="section-kicker"><span>03</span> Projetos de desenvolvimento e soluções web</div>
          <div className="section-heading portfolio-heading"><h2>Soluções desenvolvidas para desafios reais.</h2><p>Projetos autorais que reúnem arquitetura, processos, regras de negócio e experiência do usuário em produtos web funcionais.</p></div>
          <div className="projects-grid">
            {projects.map((project) => <article className="project-card" key={project.title}>
              <a className="project-main" href={project.appHref} target="_blank" rel="noreferrer" aria-label={`Abrir aplicativo ${project.title}`}>
                <div className="project-top"><span className="project-index">{project.index}</span><span className="project-online">Aplicação online <ArrowUpRight size={15} /></span></div>
                <PanelsTopLeft className="project-mark" size={38} strokeWidth={1.2} /><h3>{project.title}</h3><p>{project.description}</p>
                <div className="tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              </a>
              <div className="project-activity-indicator">
                <Activity size={14} />
                <span>{activityByProject[project.id].movementCount30d > 0 ? `${activityByProject[project.id].movementCount30d} movimentações em 30 dias` : `Atualizado ${activityByProject[project.id].lastActivityLabel}`}</span>
              </div>
              <div className="project-actions">
                <a className="project-app-link" href={project.appHref} target="_blank" rel="noreferrer">Abrir aplicativo <ArrowUpRight size={16} /></a>
                <a className="project-github-link" href={project.githubHref} target="_blank" rel="noreferrer" aria-label={`Ver código do ${project.title} no GitHub`}><Github size={18} /><span>GitHub</span></a>
              </div>
            </article>)}
          </div>
          <div className="portfolio-link"><a href="https://github.com/JrDaliessi" target="_blank" rel="noreferrer"><GitBranch size={19} /> Ver perfil completo no GitHub <ArrowUpRight size={17} /></a></div>
        </div>
      </section>

      <section className="section shell reveal" id="trajetoria">
        <div className="section-kicker"><span>04</span> Trajetória</div>
        <div className="section-heading">
          <h2>Experiência que fortalece a tecnologia.</h2>
          <p>Responsabilidade, rastreabilidade, comunicação e atenção a processos aplicadas à transição para TI.</p>
        </div>
        <div className="career-layout">
          <div className="timeline">
            <article className="timeline-item">
              <div className="timeline-dot"><BriefcaseBusiness size={17} /></div>
              <div className="timeline-head"><div><h3>Vigia noturno</h3><p>Palm Park · Holambra, SP</p></div><time>2015 — atual</time></div>
              <ul><li>Monitoramento, identificação de irregularidades e registro de ocorrências.</li><li>Controle de acesso, integridade de cadastros e apoio aos usuários do software interno.</li><li>Cumprimento de procedimentos e comunicação precisa entre turnos.</li></ul>
            </article>
            <article className="timeline-item">
              <div className="timeline-dot"><BriefcaseBusiness size={17} /></div>
              <div className="timeline-head"><div><h3>Auxiliar de Almoxarifado</h3><p>Empresa Brasileira de Engenharia · Paulínia, SP</p></div><time>2012 — 2015</time></div>
              <ul><li>Conferência de materiais, notas fiscais, pedidos e especificações.</li><li>Organização de estoque, registros e inventários com rastreabilidade.</li></ul>
            </article>
            <article className="timeline-item">
              <div className="timeline-dot"><BriefcaseBusiness size={17} /></div>
              <div className="timeline-head"><div><h3>Designer gráfico / Arte-finalista</h3><p>OSW Brindes · Artur Nogueira, SP</p></div><time>2008 — 2010</time></div>
              <ul><li>Criação visual e tratamento de imagens interpretando requisitos e prazos.</li></ul>
            </article>
          </div>

          <aside className="education-card">
            <div className="education-icon"><GraduationCap size={25} /></div>
            <p className="card-label">Formação acadêmica</p>
            <div className="degree"><span>Em andamento</span><h3>Pós-graduação em Qualidade e Teste de Software</h3><p>UniCesumar · 2026 — atual</p></div>
            <div className="degree"><span>Concluído</span><h3>Tecnologia em Análise e Desenvolvimento de Sistemas</h3><p>UniCesumar</p></div>
            <div className="learning-note"><Sparkles size={16} /><p>Disponibilidade para capacitação em Fluig, Protheus e integrações SOAP.</p></div>
          </aside>
        </div>
      </section>

      <section className="contact-section reveal" id="contato">
        <div className="shell contact-inner">
          <div><div className="section-kicker"><span>05</span> Vamos conversar</div><h2>Procurando alguém que una processos, código e qualidade?</h2></div>
          <div className="contact-actions">
            <a className="contact-main" href="mailto:juniordaliessi@gmail.com"><Send size={20} /> Enviar mensagem <ArrowUpRight size={18} /></a>
            <a href="https://wa.me/5519997538817?text=Ol%C3%A1%20Amauri%2C%20vi%20seu%20curr%C3%ADculo%20online%20e%20gostaria%20de%20conversar." target="_blank" rel="noreferrer" aria-label="Conversar com Amauri pelo WhatsApp"><MessageCircle size={17} /> WhatsApp · (19) 99753-8817</a>
            <a href="https://www.linkedin.com/in/juniordaliessi/" target="_blank" rel="noreferrer"><BadgeCheck size={17} /> LinkedIn</a>
          </div>
        </div>
      </section>

      <footer className="site-footer shell">
        <a className="brand" href="#inicio"><span>AD</span><strong>Amauri Daliessi Junior</strong></a>
        <p>Analista de Desenvolvimento TI · Artur Nogueira, SP</p>
        <p>© 2026 · Construído com Next.js e TypeScript</p>
      </footer>

      <aside className="social-rail" aria-label="Redes profissionais">
        <a href="https://www.linkedin.com/in/juniordaliessi/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><BadgeCheck size={17} /></a>
        <a href="https://github.com/JrDaliessi" target="_blank" rel="noreferrer" aria-label="GitHub"><GitBranch size={17} /></a><span />
      </aside>
    </main>
  );
}
