"use client";

import { useState } from "react";
import { Activity, ArrowUpRight, Clock3, LockKeyhole, ShieldCheck } from "lucide-react";
import type { ProjectActivityResult } from "./github-activity";

type ProjectActivitySectionProps = {
  activity: ProjectActivityResult;
  projectLinks: Record<string, string>;
};

export function ProjectActivitySection({ activity, projectLinks }: ProjectActivitySectionProps) {
  const [selectedProject, setSelectedProject] = useState("all");
  const totalMovements = activity.items.reduce((total, item) => total + item.movementCount30d, 0);
  const filteredItems = selectedProject === "all"
    ? activity.items
    : activity.items.filter((item) => item.id === selectedProject);

  return (
    <section className="section shell activity-section reveal" id="atividade">
      <div className="section-kicker"><span>04</span> Desenvolvimento em andamento</div>
      <div className="section-heading activity-heading">
        <h2>Evolução contínua, com privacidade preservada.</h2>
        <p>Indicadores resumidos dos projetos privados, sem expor código, branches, arquivos ou mensagens internas.</p>
      </div>

      <div className="activity-overview" aria-label="Resumo da atividade dos projetos">
        <article><Activity size={20} /><strong>{totalMovements}</strong><span>movimentações nos últimos 30 dias</span></article>
        <article><ShieldCheck size={20} /><strong>{activity.items.length}</strong><span>projetos acompanhados com segurança</span></article>
        <article><Clock3 size={20} /><strong>{activity.isLive ? "1 h" : activity.updatedLabel}</strong><span>{activity.isLive ? "intervalo de atualização" : "última leitura protegida"}</span></article>
      </div>

      <div className="activity-toolbar" aria-label="Filtrar atividade por projeto">
        <button type="button" className={selectedProject === "all" ? "is-active" : ""} onClick={() => setSelectedProject("all")}>Todos</button>
        {activity.items.map((item) => (
          <button type="button" className={selectedProject === item.id ? "is-active" : ""} onClick={() => setSelectedProject(item.id)} key={item.id}>{item.title}</button>
        ))}
      </div>

      <div className="activity-list" aria-live="polite">
        {filteredItems.map((item) => (
          <article className="activity-item" id={`atividade-${item.id}`} key={item.id}>
            <div className="activity-node" aria-hidden="true"><Activity size={17} /></div>
            <div className="activity-item-main">
              <div className="activity-item-head">
                <div><span className="activity-status"><i />{item.status}</span><h3>{item.title}</h3></div>
                <time dateTime={item.lastActivityAt}>{item.lastActivityLabel}</time>
              </div>
              <div className="activity-item-meta">
                <span>{item.category}</span>
                <strong>{item.movementCount30d > 0 ? `${item.movementCount30d} movimentações nos últimos 30 dias` : "Ciclo anterior consolidado"}</strong>
              </div>
            </div>
            <a href={projectLinks[item.id]} target="_blank" rel="noreferrer">Ver projeto <ArrowUpRight size={15} /></a>
          </article>
        ))}
      </div>

      <div className="activity-privacy"><LockKeyhole size={16} /><p>Somente métricas sanitizadas chegam ao navegador. Os repositórios originais continuam privados.</p></div>
    </section>
  );
}
