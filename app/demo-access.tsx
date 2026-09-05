"use client";

import { Check, Copy, KeyRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type DemoAccessProps = {
  email: string;
  password: string;
};

type Credential = "email" | "password";

export function DemoAccess({ email, password }: DemoAccessProps) {
  const [copied, setCopied] = useState<Credential | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  async function copyCredential(credential: Credential, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(credential);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  const credentials = [
    { id: "email" as const, label: "E-mail", value: email },
    { id: "password" as const, label: "Senha", value: password },
  ];

  return (
    <section className="demo-access" aria-labelledby="fincontrol-demo-title">
      <div className="demo-access-heading">
        <span className="demo-access-icon"><KeyRound size={16} /></span>
        <div>
          <strong id="fincontrol-demo-title">Acesso de demonstração</strong>
          <span>Conta preparada para recrutadores</span>
        </div>
      </div>

      <div className="demo-credentials">
        {credentials.map(({ id, label, value }) => (
          <div className="demo-credential" key={id}>
            <div>
              <span>{label}</span>
              <code>{value}</code>
            </div>
            <button type="button" onClick={() => copyCredential(id, value)} aria-label={`Copiar ${label.toLocaleLowerCase("pt-BR")}`}>
              {copied === id ? <Check size={15} /> : <Copy size={15} />}
              <span>{copied === id ? "Copiado" : "Copiar"}</span>
            </button>
          </div>
        ))}
      </div>

      <p className="demo-access-note">Ambiente com dados fictícios. Não utilize informações pessoais.</p>
      <span className="sr-only" aria-live="polite">{copied ? `${copied === "email" ? "E-mail" : "Senha"} copiado.` : ""}</span>
    </section>
  );
}
