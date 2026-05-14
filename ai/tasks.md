# Tasks

## P0: Setup/Base

- [ ] Inicializar projeto Expo com TypeScript.
  - [ ] Configurar `tsconfig` strict.
  - [ ] Configurar alias `@/` para `src`.
  - [ ] Configurar ESLint, Prettier e scripts.
- [ ] Criar estrutura `app/`, `src/features`, `src/shared`, `assets`.
- [ ] Configurar Expo Router.
  - [ ] Criar grupos `(auth)` e `(app)`.
  - [ ] Criar layouts com proteção de rota.
- [ ] Criar providers globais.
  - [ ] `QueryClientProvider`.
  - [ ] `ThemeProvider`.
  - [ ] `SessionProvider` ou store equivalente.
- [ ] Criar tema base.
  - [ ] Tokens de cor, spacing, radius, typography.
  - [ ] Background dark reutilizável.
- [ ] Configurar testes.
  - [ ] Jest.
  - [ ] React Native Testing Library.
  - [ ] MSW/mocks.

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
