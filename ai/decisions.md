# Decisões Arquiteturais

## ADR-001: Usar Expo como Base

Decisão: iniciar com Expo.

Motivo: reduz custo operacional de build, distribuição, configuração nativa e atualizações, mantendo caminho para native modules quando necessário.

## ADR-002: Usar Expo Router

Decisão: usar Expo Router em vez de configurar React Navigation manualmente desde o zero.

Motivo: é integrado ao ecossistema Expo, usa React Navigation internamente, simplifica deep links e oferece convenção clara para rotas.

## ADR-003: Separar Estado Remoto e Local

Decisão: TanStack Query para dados de API; Zustand para estado local global.

Motivo: evita stores globais inchadas, melhora cache/invalidação e preserva simplicidade.

## ADR-004: Arquitetura por Feature

Decisão: organizar domínio em `src/features` e compartilhados em `src/shared`.

Motivo: escala melhor que pastas globais por tipo, reduz acoplamento e facilita ownership por domínio.

## ADR-005: Formulários com React Hook Form e Zod

Decisão: usar React Hook Form para estado e Zod para validação.

Motivo: boa performance em React Native, contratos tipados e validação reutilizável entre UI e lógica.

## ADR-006: Wizard de Personagem em Seis Etapas

Decisão: implementar criação como wizard linear: básico, aparência, localização, traços, habilidades e resumo.

Motivo: o mockup já organiza a complexidade assim e reduz carga cognitiva em telas móveis.

Tradeoff: aumenta necessidade de persistir draft e validar por etapa.

## ADR-007: Draft Local para Criação

Decisão: persistir rascunho localmente durante a criação.

Motivo: fluxo longo não pode perder dados ao voltar, fechar app ou falhar submit.

Tradeoff: exige política de descarte e limpeza após criação.

## ADR-008: Dados Completos por Query, Rotas por ID

Decisão: rotas devem receber apenas IDs; detalhes vêm de TanStack Query.

Motivo: evita parâmetros grandes, melhora deep linking e mantém cache como fonte de dados remotos.

## ADR-009: Compartilhamento como Feature Planejada

Decisão: preparar feature de compartilhamento no detalhe/resumo, mas não bloquear MVP.

Motivo: requisito existe, porém não há mockup visual. Implementar depois evita inventar UI sem validação.

## ADR-010: Sessao Minima na P0

Decisao: criar `SessionProvider` em memoria apenas para protecao inicial de rotas.

Motivo: a P0 precisa compor providers e boundaries de navegacao sem antecipar regras de login, refresh token e SecureStore que pertencem a P1 Auth.

Tradeoff: sessao ainda nao persiste entre aberturas; isso sera implementado junto com a feature de autenticacao.

## ADR-011: Auth Local Quando Nao Houver Backend

Decisao: o modulo `authApi` usa endpoints HTTP quando `EXPO_PUBLIC_API_BASE_URL` existir e um fallback local simples quando a base URL estiver vazia.

Motivo: o projeto ainda nao possui backend definido, mas a P1 precisa entregar login, cadastro, sessao, refresh token seguro e protecao de rotas funcionando no app.

Tradeoff: o fallback local nao valida credenciais reais nem unicidade de username; essas regras ficam para a integracao com backend.

## ADR-012: Personagens Locais Enquanto Nao Houver Backend

Decisao: a Home usa `charactersApi.listCharacters` com endpoint HTTP quando `EXPO_PUBLIC_API_BASE_URL` existir e uma lista local deterministica quando a base URL estiver vazia.

Motivo: a P1 Home precisa entregar listagem, navegacao e estados visuais completos antes da definicao do backend, mantendo o mesmo criterio usado em Auth.

Tradeoff: personagens criados no wizard ainda nao aparecem na Home ate a feature de criacao definir persistencia e mutation.

## ADR-013: Fallback Local Compartilhado para Personagens

Decisao: centralizar os dados locais de personagens em `src/shared/lib/local-character-store.ts` enquanto nao houver backend.

Motivo: Home e Character precisam ler e excluir os mesmos personagens durante o desenvolvimento local; manter dois fallbacks separados faria a exclusao do detalhe reaparecer na listagem.

Tradeoff: e uma solucao temporaria de mock local. Quando houver backend ou persistencia real da feature de criacao, esse store deve ser removido ou substituido por API/persistencia de dominio.

## ADR-014: Draft de Criacao com SecureStore

Decisao: persistir o rascunho do wizard de personagem com `expo-secure-store`, usando chave por usuario.

Motivo: o projeto ainda nao possui AsyncStorage ou outro storage local nao sensivel instalado; SecureStore ja faz parte da stack atual por causa da sessao. Isso evita adicionar uma dependencia apenas para a primeira versao do draft.

Tradeoff: SecureStore nao e a melhor opcao para dados grandes ou listas extensas. Se o wizard crescer com presets, imagens ou builds complexas, migrar o draft para um storage local mais adequado.

## ADR-015: Priorizar Logoff antes de Sharing

Decisao: mover sharing e refinamentos para backlog e priorizar uma P3 focada em logoff.

Motivo: logout ja e um gap funcional documentado na spec e completa o ciclo basico de autenticacao antes de investir em compartilhamento, observabilidade e E2E.

Tradeoff: recursos de compartilhamento seguem planejados, mas deixam de ser o proximo desenvolvimento ativo.

## ADR-016: Logoff Reutiliza Fluxo de Sessao Existente

Decisao: implementar o botao de logoff usando `useLogout`, sem criar nova store, novo provider ou dependencia.

Motivo: `useLogout` ja limpa cache do TanStack Query e chama `clearSession`, que remove refresh token e tenta notificar o backend quando houver API configurada. A navegacao deve continuar sendo responsabilidade da protecao de rotas.

Tradeoff: a UI depende do redirecionamento global ao limpar a sessao, em vez de navegar manualmente para login.

## ADR-017: SQLite como Banco Local

Decisao: usar `expo-sqlite` para persistencia local de dados de dominio e manter SecureStore apenas para tokens e dados pequenos/sensiveis.

Motivo: personagens precisam sobreviver ao fechamento do app, crescer para consultas/listas e carregar metadados de sincronizacao. SQLite e suportado no Expo, evita acoplamento com UI e permite evoluir para fila de sync sem trocar os hooks e telas.

Tradeoff: adiciona uma dependencia nativa e exige migracoes de schema. Para dados simples de chave/valor, SecureStore ou storage equivalente continuam preferiveis.

## ADR-018: Repositorio Local Desacoplado

Decisao: centralizar acesso ao banco em `src/shared/storage`, expondo repositorio local de personagens para os modulos de API usarem quando nao houver backend configurado.

Motivo: Home, detalhe e criacao precisam compartilhar a mesma fonte local sem importar UI, hooks ou stores. Manter a troca dentro dos APIs preserva TanStack Query como borda de consumo das telas.

Tradeoff: o repositorio local ainda convive com chamadas HTTP condicionadas por `env.apiBaseUrl`; a sincronizacao bidirecional futura deve transformar essa condicional em uma estrategia explicita de remote + local repository.

## ADR-019: Reutilizar Wizard para Edicao de Personagem

Decisao: usar o mesmo wizard de `character-creation` para criacao e edicao, alternando o comportamento por `editId`.

Motivo: o fluxo de campos, validacao por etapa e resumo ja existem e a documentacao previa indicava reutilizacao futura do wizard em modo `create`/`edit`.

Tradeoff: campos de aparencia que ainda nao existem no modelo persistido local usam defaults do catalogo ao editar personagens antigos. A edicao preserva metricas, status, data de criacao e skills fora do catalogo visivel.

## ADR-020: Modo de Run Obrigatorio com Fallback Local

Decisao: adicionar `runMode` como campo obrigatorio nos payloads de criacao/edicao e como coluna `run_mode` no SQLite, usando `Apocalipse` como fallback de migration para personagens antigos.

Motivo: o modo faz parte das informacoes basicas da ficha e precisa ser salvo, carregado e exibido junto do personagem sem quebrar registros existentes.

Tradeoff: personagens antigos recebem `Apocalipse` automaticamente ate serem editados pelo usuario.

## Duvidas Abertas

- Haverá backend no MVP ou dados locais primeiro?
- O catálogo de profissões/traits/skills seguirá Project Zomboid oficialmente?
- Haverá cálculo de pontos de traços?
- Usuário poderá marcar personagem como morto?
- Compartilhamento precisa gerar imagem ou apenas texto/deep link inicialmente?
