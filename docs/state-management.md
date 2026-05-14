# Gerenciamento de Estado

## Regra Principal

Use TanStack Query para estado remoto e Zustand para estado local global. Não duplique dados de servidor em stores locais.

## TanStack Query

Use para chamadas HTTP, cache, paginação, retries, invalidação e sincronização ao voltar para o app.

```ts
export function useProfileQuery(userId: string) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => profileApi.getProfile(userId),
    staleTime: 60_000,
  });
}
```

Padrões:

- Query keys devem ser arrays estáveis e específicas.
- Mutations devem invalidar ou atualizar cache explicitamente.
- `staleTime` deve refletir a volatilidade do dado.
- Prefira `select` para derivar dados sem re-render desnecessário.

## Zustand

Use para sessão autenticada, preferências, tema selecionado, onboarding visto e estado de UI global.

```ts
type SessionState = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};
```

Persistência deve usar storage seguro quando envolver tokens ou dados sensíveis.

## Estado Local

Use `useState`, `useReducer` ou estado do formulário quando o dado pertence a uma tela ou componente. Subir estado para stores globais exige justificativa.

## Offline

Se o produto exigir uso offline, adicione persistência do TanStack Query e fila de mutations por domínio. Comece apenas com leitura cacheada; sincronização bidirecional deve ser decisão explícita.
