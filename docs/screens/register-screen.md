# Register Screen

## Objetivo

Criar uma conta com nome de exibição, usuário e senha.

## Comportamento

Header `Cadastro` com back. Campos verticais e CTA `Cadastrar`. Link `Entrar` retorna para login.

## Estados

- vazio;
- validação local;
- username indisponível;
- enviando;
- erro;
- sucesso.

## Loading

Desabilitar campos e evitar submit duplo. Se cadastro logar automaticamente, navegar para home.

## Validações

Display name obrigatório. Username obrigatório e normalizado. Senha com política mínima. Mensagens devem ficar próximas ao campo.

## Interações

Back volta ao login. Toggle de senha. Teclado deve avançar entre campos.

## Componentes

`ScreenHeader`, `TextField`, `PasswordField`, `PrimaryButton`, `InlineLink`, `AuthScreenLayout`.

## Futuras Expansões

Confirmação de senha, aceite de termos, verificação de e-mail e captcha adaptativo.
