# Arquitetura

## Stack Final Recomendada

- React Native com Expo: acelera desenvolvimento, builds, OTA updates e acesso a APIs nativas sem abandonar custom native code quando necessário.
- TypeScript strict: reduz bugs em navegação, API, formulários e estados compartilhados.
- Expo Router: roteamento file-based sobre React Navigation, com deep linking e typed routes.
- TanStack Query: estado remoto, cache, invalidação, retries e sincronização.
- Zustand: estado local global pequeno, como sessão, preferências e flags de UI.
- React Hook Form + Zod: formulários performáticos com validação compartilhável.
- Theme tokens próprios com componentes base: mantém consistência visual sem adicionar dependência de styling antes de haver necessidade real.
- Sentry + logger interno: crash/error tracking e logs estruturados por ambiente.

## Princípios

Arquitetura por feature, não por tipo técnico. Cada feature deve conter telas, componentes locais, hooks e integração de dados relacionados. Código compartilhado fica em `src/shared`.

Separe estado remoto de estado local. Dados vindos da API pertencem ao TanStack Query; não replique em Zustand salvo motivo claro.

Use módulos pequenos e explícitos. Uma tela orquestra UI e hooks, mas não deve conter regra de negócio extensa, validação complexa ou chamadas HTTP diretas.

## Camadas

- `app/`: rotas, layouts e boundaries de navegação.
- `src/features/`: casos de uso por domínio.
- `src/shared/ui/`: componentes reutilizáveis sem regra de negócio.
- `src/shared/api/`: cliente HTTP, interceptors, contratos e erros.
- `src/shared/config/`: env, feature flags e constantes.
- `src/shared/lib/`: utilitários sem dependência de UI.

## Referências Oficiais

- Expo Router: https://docs.expo.dev/router/introduction
- TypeScript no Expo: https://docs.expo.dev/guides/typescript
- React Navigation: https://reactnavigation.org/docs/getting-started
- TanStack Query: https://tanstack.com/query/latest/docs/framework/react/overview
