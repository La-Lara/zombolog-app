# Auth Feature

## Objetivo

Permitir acesso seguro ao app com login e cadastro, mantendo sessão entre aberturas.

## Telas

- Login.
- Cadastro.

## Componentes

`AuthBackground`, `ProjectLogo`, `AuthFormContainer`, `TextField`, `PasswordField`, `PrimaryButton`, `InlineLink`.

## Dados

`username`, `password`, `displayName`, tokens e estado da sessão.

## Hooks

- `useLoginMutation`.
- `useRegisterMutation`.
- `useSession`.
- `useLogout`.

## Regras

Autenticação pertence a `features/auth`. Nenhuma outra feature deve manipular token diretamente.

## Testes

Cobrir validação, submit, erro de credenciais, erro de rede e redirecionamento pós-login.
