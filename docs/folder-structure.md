# Organização de Pastas

## Estrutura Recomendada

```txt
app/
  _layout.tsx
  (auth)/
  (app)/
  +not-found.tsx
src/
  features/
    auth/
      api/
      components/
      hooks/
      screens/
      schemas/
      types.ts
      index.ts
    home/
      components/
      hooks/
      screens/
      index.ts
    character/
      api/
      components/
      hooks/
      screens/
      types.ts
      index.ts
    character-creation/
      components/
      hooks/
      screens/
      schemas/
      types.ts
      index.ts
    profile-sharing/
      components/
      hooks/
      index.ts
  shared/
    api/
      http-client.ts
      query-client.ts
      errors.ts
    config/
      env.ts
      constants.ts
    hooks/
    lib/
    logging/
    storage/
    theme/
    ui/
  test/
    factories/
    mocks/
assets/
docs/
  specs/
  features/
  screens/
  navigation/
ai/
```

## Regras

`app/` deve conter o mínimo possível: layouts, proteção de rotas e composição de providers. Telas reais devem viver em `src/features/*/screens` e ser importadas pelas rotas.

Cada feature possui seu próprio limite. Componentes usados por apenas uma feature ficam dentro dela. Só mova para `src/shared` quando houver reutilização real em pelo menos duas features.

As specs de produto ficam em `docs/specs`, fluxos por feature em `docs/features`, documentação de tela em `docs/screens` e rotas em `docs/navigation`.

Use `index.ts` apenas como API pública da feature. Não exporte detalhes internos sem necessidade.

## Exemplo de Rota

```tsx
// app/(app)/home.tsx
export { HomeScreen as default } from '@/features/home';

// app/(app)/characters/[id].tsx
export { CharacterDetailsScreen as default } from '@/features/character';
```

## Anti-padrões

- `src/components` genérico com componentes de domínio.
- Stores globais para dados de API.
- Arquivos `utils.ts` grandes e sem domínio.
- Import relativo profundo entre features, como `../../auth/hooks/useSession`.
