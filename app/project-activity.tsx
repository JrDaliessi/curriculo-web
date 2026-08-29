"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, ArrowUpRight, Clock3, LockKeyhole, ShieldCheck } from "lucide-react";
import type { ProjectActivityResult } from "./github-activity";

type ProjectActivitySectionProps = {
  activity: ProjectActivityResult;
  projectLinks: Record<string, string>;
};

export function ProjectActivitySection({ activity, projectLinks }: ProjectActivitySectionProps) {
  const [selectedProject, setSelectedProject] = useState("all");
  const activityListRef = useRef<HTMLDivElement>(null);
  const revealedProjects = useRef(new Set<string>());
  const totalMovements = activity.items.reduce((total, item) => total + item.movementCount30d, 0);
  const filteredItems = selectedProject === "all"
    ? activity.items
    : activity.items.filter((item) => item.id === selectedProject);

  useEffect(() => {
    const list = activityListRef.current;
    if (!list) return;

    const items = Array.from(list.querySelectorAll<HTMLElement>(".activity-item"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      list.style.setProperty("--activity-progress", "1");
      list.style.setProperty("--activity-progress-y", `${Math.max(list.clientHeight - 28, 28)}px`);
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    list.classList.add("is-motion-ready");
    items.forEach((item, index) => {
      item.style.setProperty("--activity-delay", `${Math.min(index * 75, 375)}ms`);
      const projectId = item.dataset.activityId;
      if (projectId && revealedProjects.current.has(projectId)) item.classList.add("is-visible");
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const item = entry.target as HTMLElement;
        item.classList.add("is-visible");
        if (item.dataset.activityId) revealedProjects.current.add(item.dataset.activityId);
        observer.unobserve(item);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -10% 0px" });

    items.forEach((item) => {
      if (!item.classList.contains("is-visible")) observer.observe(item);
    });

    let animationFrame = 0;
    const updateProgress = () => {
      const bounds = list.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const startLine = viewportHeight * 0.82;
      const distance = Math.max(bounds.height + viewportHeight * 0.54, 1);
      const progress = Math.min(Math.max((startLine - bounds.top) / distance, 0), 1);
      const progressY = 28 + Math.max(list.clientHeight - 56, 0) * progress;

      list.style.setProperty("--activity-progress", progress.toFixed(4));
      list.style.setProperty("--activity-progress-y", `${progressY.toFixed(1)}px`);
      animationFrame = 0;
    };

    const requestProgressUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      observer.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      list.classList.remove("is-motion-ready");
    };
  }, [selectedProject, activity.items.length]);

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

      <div className="activity-list" aria-live="polite" ref={activityListRef}>
        <span className="activity-progress-line" aria-hidden="true" />
        <span className="activity-progress-dot" aria-hidden="true" />
        {filteredItems.map((item) => (
          <article className="activity-item" data-activity-id={item.id} id={`atividade-${item.id}`} key={item.id}>
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
