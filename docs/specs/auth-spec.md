# Auth Spec

## Escopo

Autenticação inicial com login e cadastro. As telas mostram username/senha no login e displayName/username/senha no cadastro.

## Login

Campos:

- `username`: obrigatório.
- `password`: obrigatório, oculto por padrão, com toggle de visibilidade.

Comportamento:

- Botão `Entrar` desabilitado enquanto inválido ou carregando.
- Link `Cadastre-se` navega para cadastro.
- Sucesso redireciona para home.
- Erro mostra mensagem amigável sem expor detalhes da API.

## Cadastro

Campos:

- `displayName`: obrigatório, 2 a 40 caracteres.
- `username`: obrigatório, único, 3 a 30 caracteres, alfanumérico com `_` permitido.
- `password`: obrigatório, mínimo definido por política de segurança.

Comportamento:

- Botão `Cadastrar` cria conta e inicia sessão ou direciona para login, conforme backend.
- Link `Entrar` volta para login.

## Estados

- inicial;
- validação local;
- submitting;
- erro de credenciais;
- erro de rede;
- sucesso.

## Edge Cases

- Usuário já autenticado abrindo rota de auth deve ser redirecionado para home.
- Token expirado deve tentar refresh silencioso.
- Falha no refresh deve limpar sessão e voltar para login.

## Segurança

Refresh token em SecureStore. Access token em memória/store. Nunca persistir senha. Logs devem mascarar username em produção quando associado a falhas.
