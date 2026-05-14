# Padrões de API

## Cliente HTTP

Centralize chamadas em `src/shared/api/http-client.ts`. O cliente deve aplicar base URL, timeout, headers comuns, refresh token quando existir e normalização de erros.

```ts
const response = await httpClient.get<UserDto>('/users/me');
```

Nenhuma tela deve chamar `fetch` ou `axios` diretamente.

## Contratos

Separe DTOs externos dos modelos usados pela UI quando houver diferença relevante.

```ts
type UserDto = { id: string; display_name: string };
type User = { id: string; displayName: string };
```

Use mapper explícito:

```ts
const toUser = (dto: UserDto): User => ({
  id: dto.id,
  displayName: dto.display_name,
});
```

## Erros

Normalize erros em uma estrutura comum:

```ts
type AppError = {
  code: string;
  message: string;
  status?: number;
  retryable: boolean;
};
```

Mensagens técnicas ficam em logs; mensagens amigáveis ficam na UI.

## Cache

O cache da API deve ser controlado pelo TanStack Query. Não implemente cache manual no cliente HTTP sem necessidade específica.

## Autenticação

Access token em memória/store, refresh token em storage seguro. O refresh deve ser serializado para evitar múltiplas renovações simultâneas.
