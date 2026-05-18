# Tasks

## P0: Setup/Base

- [x] Inicializar projeto Expo com TypeScript.
  - [x] Configurar `tsconfig` strict.
  - [x] Configurar alias `@/` para `src`.
  - [x] Configurar ESLint, Prettier e scripts.
- [x] Criar estrutura `app/`, `src/features`, `src/shared`, `assets`.
- [x] Configurar Expo Router.
  - [x] Criar grupos `(auth)` e `(app)`.
  - [x] Criar layouts com protecao de rota.
- [x] Criar providers globais.
  - [x] `QueryClientProvider`.
  - [x] `ThemeProvider`.
  - [x] `SessionProvider` ou store equivalente.
- [x] Criar tema base.
  - [x] Tokens de cor, spacing, radius, typography.
  - [x] Background dark reutilizavel.
- [x] Configurar testes.
  - [x] Jest.
  - [x] React Native Testing Library.
  - [x] MSW/mocks.

## P1: Auth

- [x] Criar `features/auth`.
  - [x] Schemas Zod de login e cadastro.
  - [x] API module de login/register/logout.
  - [x] Store/hook de sessao.
  - [x] Persistencia segura de refresh token.
- [x] Implementar Login Screen.
  - [x] Campos usuario/senha.
  - [x] Toggle de senha.
  - [x] Loading e erro.
  - [x] Navegacao para cadastro.
- [x] Implementar Register Screen.
  - [x] Campos displayName/username/password.
  - [x] Validacoes.
  - [x] Navegacao para login.
- [x] Testar auth.
  - [x] Validacao local.
  - [x] Submit com sucesso.
  - [x] Erro de credenciais/rede.
  - [x] Protecao de rotas.

## P1: Home

- [x] Criar `features/home`.
  - [x] Query de personagens.
  - [x] `HomeHeader`.
  - [x] `CharacterCard`.
  - [x] `CreateCharacterButton`.
- [x] Implementar estados.
  - [x] Loading.
  - [x] Empty.
  - [x] Error retry.
  - [x] Pull to refresh.
- [x] Navegar card para detalhe.
- [x] Navegar CTA para criacao.

## P2: Character

- [x] Criar `features/character`.
  - [x] Types `Character`, `Trait`, `Skill`.
  - [x] API module.
  - [x] Query de detalhe.
- [x] Implementar Character Details Screen.
  - [x] Header com back/delete.
  - [x] Summary card.
  - [x] Metricas.
  - [x] Menu de secoes.
  - [x] Botao editar.
- [x] Implementar Skills Screen.
  - [x] Lista de skills.
  - [x] `SkillMeter`.
- [x] Implementar Traits Screen.
  - [x] Tracos positivos.
  - [x] Tracos negativos.
  - [x] Descricoes.
- [x] Implementar exclusao com confirmacao.

## P2: Character Creation

- [x] Criar `features/character-creation`.
  - [x] Estado de draft.
  - [x] Schemas por etapa.
  - [x] Mapper para payload final.
- [x] Implementar wizard.
  - [x] Layout compartilhado.
  - [x] Step indicator.
  - [x] Footer Voltar/Proximo.
- [x] Implementar etapa 1: informacoes basicas.
- [x] Implementar etapa 2: aparencia.
- [x] Implementar etapa 3: localizacao.
- [x] Implementar etapa 4: tracos.
- [x] Implementar etapa 5: habilidades.
- [x] Implementar etapa 6: resumo.
- [x] Persistir draft local.
- [x] Submit final e navegacao para detalhe.

## P3: Sharing e Refinamentos

- [ ] Definir visual do cartao compartilhavel.
- [ ] Implementar `ShareButton`.
- [ ] Gerar imagem ou fallback textual.
- [ ] Abrir share sheet nativo.
- [ ] Adicionar acessibilidade aos controles.
- [ ] Otimizar listas e imagens.
- [ ] Configurar Sentry/logger.
- [ ] Criar fluxos Maestro para login, criacao e detalhe.

## Dependencias

Auth depende de setup. Home depende de sessao e query client. Character depende de home ou rota por ID. Creation depende dos catalogos de profissao, cidades, tracos e skills. Sharing depende de Character.
