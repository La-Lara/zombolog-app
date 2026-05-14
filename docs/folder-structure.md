# Organização de Pastas

## Estrutura Recomendada

```txt
app/
  _layout.tsx
  (auth)/
  (tabs)/
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
    profile/
      api/
      components/
      hooks/
      screens/
      types.ts
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
ai/
```

## Regras

`app/` deve conter o mínimo possível: layouts, proteção de rotas e composição de providers. Telas reais devem viver em `src/features/*/screens` e ser importadas pelas rotas.

Cada feature possui seu próprio limite. Componentes usados por apenas uma feature ficam dentro dela. Só mova para `src/shared` quando houver reutilização real em pelo menos duas features.

Use `index.ts` apenas como API pública da feature. Não exporte detalhes internos sem necessidade.

## Exemplo de Rota

```tsx
// app/(tabs)/profile.tsx
export { ProfileScreen as default } from '@/features/profile';
```

## Anti-padrões

- `src/components` genérico com componentes de domínio.
- Stores globais para dados de API.
- Arquivos `utils.ts` grandes e sem domínio.
- Import relativo profundo entre features, como `../../auth/hooks/useSession`.
