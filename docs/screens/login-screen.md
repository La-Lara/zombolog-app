# Login Screen

## Objetivo

Permitir entrada do usuário e direcionar novos usuários para cadastro.

## Comportamento

Exibe logo Project Zomboid, campos de usuário e senha, botão `Entrar` e link `Cadastre-se`.

## Estados

- vazio;
- preenchimento inválido;
- enviando;
- credenciais inválidas;
- erro de rede;
- sucesso.

## Loading

Durante submit, desabilitar campos e botão. Manter feedback visual no botão.

## Validações

Usuário e senha obrigatórios. Remover espaços externos. Não validar existência localmente.

## Interações

Toggle de visibilidade de senha. Link para cadastro. Submit por botão e teclado.

## Componentes

`ProjectLogo`, `TextField`, `PasswordField`, `PrimaryButton`, `InlineLink`, `AuthScreenLayout`.

## Reutilização

Layout, campos e botão são compartilhados com cadastro.

## Futuras Expansões

Recuperação de senha, login social e biometria após primeira autenticação.
