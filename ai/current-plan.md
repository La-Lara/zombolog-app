# Plano Atual

## Contexto

O mockup `telas.png` define um app companion para Project Zomboid com autenticação, home de personagens, detalhe de ficha, criação guiada em seis etapas, telas de habilidades e traços. A arquitetura base já existe; o próximo trabalho deve iniciar desenvolvimento real sem redesenhar a estrutura.

## Stack Confirmada

Expo, TypeScript strict, Expo Router, TanStack Query, Zustand, React Hook Form, Zod, tokens próprios de tema, Jest, React Native Testing Library, MSW, Maestro e Sentry/logger.

## Fases de Implementação

### Fase 1: Setup/Base

Status: concluida na branch `implement-p0-tasks`.

Base Expo criada com TypeScript strict, alias `@/`, Expo Router, grupos `(auth)` e `(app)`, providers globais, tema dark com tokens, componentes compartilhados minimos e harness de testes com Jest, React Native Testing Library e MSW.

Inicializar app Expo, configurar TypeScript, aliases, lint, formatter, Expo Router, providers, tema, assets base e harness de testes.

### Fase 2: Autenticação

Status: concluida na branch `implement-p1-auth`.

Auth implementado com schemas Zod, React Hook Form, API module, sessao em Zustand, refresh token em SecureStore, telas de login/cadastro, loading/error states e testes de validacao, submit e protecao de rotas.

Implementar login, cadastro, sessão, SecureStore, refresh token futuro, validações e proteção de rotas.

### Fase 3: Home

Status: concluida na branch `implement-p1-home`.

Home implementada com query de personagens, fallback local enquanto nao houver backend, cards, CTA de criacao, estados de loading/empty/error e pull to refresh.

### Fase 4: Personagem

Status: concluida na branch `implement-p2-character`.

Character implementado com detalhe por ID via TanStack Query, telas de habilidades e tracos, `SkillMeter`, cards de tracos, exclusao com confirmacao e fallback local consistente com a Home enquanto nao houver backend.

### Fase 5: Criação de Personagem

Implementar wizard de seis etapas com draft persistido, validação por etapa e submit final.

### Fase 6: Compartilhamento e Refinamentos

Adicionar share sheet, geração de cartão, acessibilidade, polish visual, performance de listas, observabilidade e E2E.

## Fontes de Verdade

- Produto: `/docs/specs/app-spec.md`.
- Navegação: `/docs/navigation/app-navigation-flow.md`.
- Features: `/docs/features/*`.
- Telas: `/docs/screens/*`.
- Arquitetura base: `/docs/architecture.md`.

## Restrições

Não gerar novas abstrações antes da primeira vertical completa. Reutilizar componentes do design system e manter lógica de domínio dentro de cada feature.
