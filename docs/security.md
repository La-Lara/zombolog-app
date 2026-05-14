# Segurança

## Configuração

Não versione segredos. Variáveis públicas do Expo podem ser lidas no app final; use apenas para valores não sensíveis, como base URL pública.

Use arquivos por ambiente:

```txt
.env.example
.env.development
.env.production
```

`env.ts` deve validar presença e formato das variáveis no startup.

## Tokens

Refresh tokens e credenciais sensíveis devem ficar em storage seguro, como SecureStore. Access tokens podem ficar em memória e ser renovados quando necessário.

Nunca logue tokens, senhas, documentos, e-mails completos ou payloads sensíveis.

## API

Use HTTPS em produção. Normalize erros sem expor detalhes internos ao usuário. Timeouts devem existir para evitar requests presos.

## Autenticação

Centralize login, logout, refresh e expiração em `features/auth`. Ao fazer logout, limpe cache do TanStack Query, storage seguro e estado de sessão.

## Permissões Nativas

Solicite permissões no momento de uso, com explicação contextual na UI. Não peça permissões no primeiro launch sem necessidade.

## Logs

Logs locais devem ser úteis para debug, mas seguros. Em produção, envie erros sanitizados para observabilidade.

## Revisão

Toda mudança que toca autenticação, storage, deep links, pagamentos ou dados pessoais deve passar por revisão específica de segurança.
