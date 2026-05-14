# Navegação

## Padrão

Use Expo Router como camada de rotas. Ele usa React Navigation por baixo e simplifica deep links, layouts e separação por grupos.

O fluxo de rotas do produto derivado do mockup está documentado em `/docs/navigation/app-navigation-flow.md`.

## Estrutura

```txt
app/
  _layout.tsx
  (auth)/
    login.tsx
  (app)/
    _layout.tsx
    home.tsx
    characters/[id].tsx
  modal/
    settings.tsx
```

Grupos como `(auth)` e `(app)` organizam fluxo sem afetar a URL. Use `_layout.tsx` para providers, stacks e proteção de rota.

## Proteção de Rotas

A decisão de autenticação deve ficar no layout raiz ou no layout do grupo protegido. A tela não deve decidir se o usuário pode acessá-la.

```tsx
if (!session) {
  return <Redirect href="/login" />;
}
```

## Parâmetros

Use parâmetros pequenos, serializáveis e tipados. Passe IDs pela rota e busque dados via query.

```tsx
router.push({ pathname: '/profile/[id]', params: { id: userId } });
```

## Nesting

Evite aninhamento excessivo de navegadores. Use nesting para UI real, como tabs dentro de stack, não para organizar código. Organização de código pertence a `src/features`.

## Deep Links

Defina padrões de URL desde o início para telas públicas, auth callbacks e compartilhamento. Não exponha tokens em query params.
