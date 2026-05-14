# App Navigation Flow

## Mapa de Rotas

```txt
app/
  _layout.tsx
  (auth)/
    login.tsx
    register.tsx
  (app)/
    home.tsx
    characters/
      [id].tsx
      new/
        index.tsx
      [id]/skills.tsx
      [id]/traits.tsx
```

## Fluxo Principal

1. App inicia e verifica sessão.
2. Sem sessão: redireciona para `(auth)/login`.
3. Com sessão: redireciona para `(app)/home`.
4. Home lista personagens.
5. Card abre detalhe do personagem.
6. `Criar Novo Personagem` abre wizard.
7. Wizard finalizado cria personagem e navega para detalhe.

## Fluxos Secundários

- Login navega para cadastro via `Cadastre-se`.
- Cadastro volta para login via `Entrar`.
- Detalhe abre seções: habilidades, traços, informações gerais, equipamento, preferências e descrição.
- Detalhe aciona edição usando o wizard em modo futuro `edit`.

## Regras

Rotas protegidas ficam sob `(app)`. Rotas de autenticação ficam sob `(auth)`. Telas não devem fazer proteção própria; layouts decidem acesso.

## Parâmetros

Use apenas IDs em rotas:

```ts
router.push({ pathname: '/characters/[id]', params: { id } });
```

Dados completos devem vir de TanStack Query.
