# Decisões Arquiteturais

## ADR-001: Usar Expo como Base

Decisão: iniciar com Expo.

Motivo: reduz custo operacional de build, distribuição, configuração nativa e atualizações, mantendo caminho para native modules quando necessário.

## ADR-002: Usar Expo Router

Decisão: usar Expo Router em vez de configurar React Navigation manualmente desde o zero.

Motivo: Expo Router é integrado ao ecossistema Expo, usa React Navigation internamente, simplifica deep links e oferece convenção clara para rotas.

## ADR-003: Separar Estado Remoto e Local

Decisão: TanStack Query para dados de API; Zustand para estado local global.

Motivo: evita stores globais inchadas, melhora cache/invalidação e preserva simplicidade.

## ADR-004: Arquitetura por Feature

Decisão: organizar domínio em `src/features` e compartilhados em `src/shared`.

Motivo: escala melhor que pastas globais por tipo, reduz acoplamento e facilita ownership por domínio.

## ADR-005: Formulários com React Hook Form e Zod

Decisão: usar React Hook Form para estado e Zod para validação.

Motivo: boa performance em React Native, contratos tipados e validação reutilizável entre UI e lógica.
