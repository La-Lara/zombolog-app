# Plano Atual

## Objetivo

Estabelecer uma base arquitetural documentada para um app React Native moderno, escalável e sustentável.

## Direção Técnica

Usar Expo, TypeScript strict, Expo Router, TanStack Query, Zustand, React Hook Form, Zod, tema centralizado e observabilidade desde o início.

## Próximos Passos

1. Criar o projeto Expo com TypeScript.
2. Configurar aliases, lint, formatter e scripts.
3. Implementar providers globais: query client, theme, auth e logging.
4. Criar a primeira feature vertical completa para validar a arquitetura.
5. Adicionar testes mínimos para UI, hooks e API mocks.

## Restrições

Evitar arquitetura genérica demais. Cada nova abstração deve resolver repetição real, risco claro ou contrato compartilhado.
