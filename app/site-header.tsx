"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function SiteHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const updateHeader = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const scrollDifference = currentScrollY - lastScrollY.current;

      if (currentScrollY < 72) {
        setIsVisible(true);
      } else if (scrollDifference > 10) {
        // O usuário deslizou para cima: libera mais espaço para o conteúdo.
        setIsVisible(false);
      } else if (scrollDifference < -10) {
        // O usuário deslizou para baixo: devolve a navegação rapidamente.
        setIsVisible(true);
      }

      if (Math.abs(scrollDifference) > 10) {
        lastScrollY.current = currentScrollY;
      }

      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateHeader);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header${isVisible ? " is-visible" : " is-hidden"}`}>
      <a className="brand" href="#inicio" aria-label="Ir para o início">
        <span>AD</span><strong>Amauri Daliessi</strong>
      </a>
      <nav aria-label="Navegação principal">
        <a href="#sobre">Sobre</a>
        <a href="#competencias">Competências</a>
        <a href="#portfolio">Portfólio</a>
        <a href="#atividade">Atividade</a>
        <a href="#trajetoria">Trajetória</a>
        <a className="nav-contact" href="mailto:juniordaliessi@gmail.com">
          Contato <ArrowUpRight size={14} />
        </a>
      </nav>
    </header>
  );
}
