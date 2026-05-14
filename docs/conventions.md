# Convenções

## TypeScript

Use `strict: true`. Evite `any`; quando inevitável, isole na borda externa, como parsing de resposta HTTP. Tipos compartilhados de domínio devem ficar próximos da feature.

## Naming

- Componentes: `PascalCase`, exemplo `ProfileHeader.tsx`.
- Hooks: `useCamelCase`, exemplo `useProfileQuery.ts`.
- Schemas: `camelCaseSchema`, exemplo `loginSchema`.
- Types/interfaces: `PascalCase`, exemplo `UserSession`.
- Arquivos não-componentes: `kebab-case.ts`, exemplo `refresh-token.ts`.
- Testes: `*.test.ts` ou `*.test.tsx`.

## Imports

Use alias `@/` apontando para `src`. Evite imports relativos com mais de dois níveis.

```ts
import { Button } from '@/shared/ui/button';
import { useSessionStore } from '@/features/auth';
```

## Componentes

Componentes devem receber props explícitas, evitar dependência direta de stores globais e não chamar APIs. Telas podem compor hooks e passar dados para componentes puros.

## Hooks

Hooks de query devem terminar com `Query`, mutations com `Mutation` e hooks locais com nome semântico.

```ts
useProfileQuery(userId);
useUpdateProfileMutation();
useKeyboardInsets();
```

## Responsabilidades

- Tela: composição, loading, empty/error states e navegação.
- Hook: orquestra dados e efeitos.
- API module: comunicação HTTP.
- Schema: validação.
- UI component: renderização e interação local.
