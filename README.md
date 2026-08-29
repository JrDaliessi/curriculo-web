# Currículo Web — Amauri Daliessi Junior

Currículo e portfólio profissional responsivo, criado para apresentar experiência, competências e projetos a recrutadores.

## Página publicada

- [Abrir currículo online](https://curriculo-web-ten.vercel.app)
- Hospedagem de produção na Vercel.

## Tecnologias

- Next.js e React
- TypeScript
- CSS responsivo
- Lucide Icons
- Deploy pela Vercel

## Executar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Gerar a versão de produção

```bash
npm run build
```

## Indicadores de movimentação

Os cards do portfólio consultam exclusivamente os repositórios privados autorizados e enviam ao navegador somente dados sanitizados: quantidade de movimentações ou data relativa da última atualização.

Configure na Vercel as variáveis server-only documentadas em `.env.example`. Use um token fine-grained com permissão de leitura de conteúdo e acesso limitado aos seis repositórios selecionados. Nunca use o prefixo `NEXT_PUBLIC_` para essas variáveis.
