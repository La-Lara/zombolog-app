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

- [ ] Criar `features/auth`.
  - [ ] Schemas Zod de login e cadastro.
  - [ ] API module de login/register/logout.
  - [ ] Store/hook de sessão.
  - [ ] Persistência segura de refresh token.
- [ ] Implementar Login Screen.
  - [ ] Campos usuário/senha.
  - [ ] Toggle de senha.
  - [ ] Loading e erro.
  - [ ] Navegação para cadastro.
- [ ] Implementar Register Screen.
  - [ ] Campos displayName/username/password.
  - [ ] Validações.
  - [ ] Navegação para login.
- [ ] Testar auth.
  - [ ] Validação local.
  - [ ] Submit com sucesso.
  - [ ] Erro de credenciais/rede.
  - [ ] Proteção de rotas.

## P1: Home

- [ ] Criar `features/home`.
  - [ ] Query de personagens.
  - [ ] `HomeHeader`.
  - [ ] `CharacterCard`.
  - [ ] `CreateCharacterButton`.
- [ ] Implementar estados.
  - [ ] Loading.
  - [ ] Empty.
  - [ ] Error retry.
  - [ ] Pull to refresh.
- [ ] Navegar card para detalhe.
- [ ] Navegar CTA para criação.

## P2: Character

- [ ] Criar `features/character`.
  - [ ] Types `Character`, `Trait`, `Skill`.
  - [ ] API module.
  - [ ] Query de detalhe.
- [ ] Implementar Character Details Screen.
  - [ ] Header com back/delete.
  - [ ] Summary card.
  - [ ] Métricas.
  - [ ] Menu de seções.
  - [ ] Botão editar.
- [ ] Implementar Skills Screen.
  - [ ] Lista de skills.
  - [ ] `SkillMeter`.
- [ ] Implementar Traits Screen.
  - [ ] Traços positivos.
  - [ ] Traços negativos.
  - [ ] Descrições.
- [ ] Implementar exclusão com confirmação.

## P2: Character Creation

- [ ] Criar `features/character-creation`.
  - [ ] Estado de draft.
  - [ ] Schemas por etapa.
  - [ ] Mapper para payload final.
- [ ] Implementar wizard.
  - [ ] Layout compartilhado.
  - [ ] Step indicator.
  - [ ] Footer Voltar/Próximo.
- [ ] Implementar etapa 1: informações básicas.
- [ ] Implementar etapa 2: aparência.
- [ ] Implementar etapa 3: localização.
- [ ] Implementar etapa 4: traços.
- [ ] Implementar etapa 5: habilidades.
- [ ] Implementar etapa 6: resumo.
- [ ] Persistir draft local.
- [ ] Submit final e navegação para detalhe.

## P3: Sharing e Refinamentos

- [ ] Definir visual do cartão compartilhável.
- [ ] Implementar `ShareButton`.
- [ ] Gerar imagem ou fallback textual.
- [ ] Abrir share sheet nativo.
- [ ] Adicionar acessibilidade aos controles.
- [ ] Otimizar listas e imagens.
- [ ] Configurar Sentry/logger.
- [ ] Criar fluxos Maestro para login, criação e detalhe.

## Dependências

Auth depende de setup. Home depende de sessão e query client. Character depende de home ou rota por ID. Creation depende dos catálogos de profissão, cidades, traços e skills. Sharing depende de Character.
