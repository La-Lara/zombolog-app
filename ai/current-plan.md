# Plano Atual

## Contexto

O mockup `telas.png` define um app companion para Project Zomboid com autenticacao, home de personagens, detalhe de ficha, criacao guiada em seis etapas, telas de habilidades e tracos. A arquitetura base ja existe; o proximo trabalho deve iniciar desenvolvimento real sem redesenhar a estrutura.

## Stack Confirmada

Expo, TypeScript strict, Expo Router, TanStack Query, Zustand, React Hook Form, Zod, tokens proprios de tema, Jest, React Native Testing Library, MSW, Maestro e Sentry/logger.

## Fases de Implementacao

### Fase 1: Setup/Base

Status: concluida na branch `implement-p0-tasks`.

Base Expo criada com TypeScript strict, alias `@/`, Expo Router, grupos `(auth)` e `(app)`, providers globais, tema dark com tokens, componentes compartilhados minimos e harness de testes com Jest, React Native Testing Library e MSW.

Inicializar app Expo, configurar TypeScript, aliases, lint, formatter, Expo Router, providers, tema, assets base e harness de testes.

### Fase 2: Autenticacao

Status: concluida na branch `implement-p1-auth`.

Auth implementado com schemas Zod, React Hook Form, API module, sessao em Zustand, refresh token em SecureStore, telas de login/cadastro, loading/error states e testes de validacao, submit e protecao de rotas.

Implementar login, cadastro, sessao, SecureStore, refresh token futuro, validacoes e protecao de rotas.

### Fase 3: Home

Status: concluida na branch `implement-p1-home`.

Home implementada com query de personagens, fallback local enquanto nao houver backend, cards, CTA de criacao, estados de loading/empty/error e pull to refresh.

### Fase 4: Personagem

Status: concluida na branch `implement-p2-character`.

Character implementado com detalhe por ID via TanStack Query, telas de habilidades e tracos, `SkillMeter`, cards de tracos, exclusao com confirmacao e fallback local consistente com a Home enquanto nao houver backend.

### Fase 5: Criacao de Personagem

Status: concluida na branch `implement-p2-character-creation`.

Wizard de seis etapas implementado com draft persistido, validacao por etapa, catalogos locais, selecao de aparencia/localizacao/tracos/habilidades, resumo final e submit com fallback local enquanto nao houver backend.

### Fase 6: Logoff

Status: concluida na branch `implement-p3-logoff`.

Botao de sair adicionado na Home, com confirmacao antes de encerrar a sessao. O fluxo reutiliza `useLogout`, mantem limpeza de cache e refresh token no fluxo existente e depende da protecao de rotas para redirecionar o usuario para login.

### Fase 7: Banco Local

Status: concluida na branch `implement-p1-local-database`.

Adicionar persistencia local com SQLite via Expo, substituindo o mock em memoria de personagens por uma camada de storage/repository desacoplada e preparada para sincronizacao futura com backend.

### Fase 8: Edicao de Personagem

Status: concluida na branch `implement-p1-character-edit`.

Implementar modo edicao no wizard de personagem, carregando os dados atuais por `editId` e salvando no mesmo registro para evitar duplicacao.

### Backlog: Compartilhamento e Refinamentos

Adicionar share sheet, geracao de cartao, acessibilidade, polish visual, performance de listas, observabilidade e E2E.

### Task Atual: Modo de Run do Personagem

Status: concluida na branch `implement-p1-run-mode`.

Adicionar o modo em que o jogador comecou a run ao cadastro, edicao, resumo, detalhe e persistencia local, mantendo fallback seguro para personagens antigos.

## Fontes de Verdade

- Produto: `/docs/specs/app-spec.md`.
- Navegacao: `/docs/navigation/app-navigation-flow.md`.
- Features: `/docs/features/*`.
- Telas: `/docs/screens/*`.
- Arquitetura base: `/docs/architecture.md`.

## Restricoes

Nao gerar novas abstracoes antes da primeira vertical completa. Reutilizar componentes do design system e manter logica de dominio dentro de cada feature.
