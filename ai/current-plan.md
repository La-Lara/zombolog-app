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

Implementar login, cadastro, sessão, SecureStore, refresh token futuro, validações e proteção de rotas.

### Fase 3: Home

Implementar lista de personagens com dados mockados/API, empty/error/loading states, cards e CTA de criação.

### Fase 4: Personagem

Implementar detalhe, seções de habilidades e traços, exclusão com confirmação e estrutura para editar.

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
