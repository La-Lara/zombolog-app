# Character Details Screen

## Objetivo

Exibir ficha principal do personagem e dar acesso às seções detalhadas.

## Comportamento

Header com voltar, nome e ação de excluir. Card principal mostra avatar, nome, profissão, status, dias vivos, zumbis mortos e cidade atual. Abaixo há menu de seções e botão `Editar Personagem`.

## Estados

- carregando;
- erro;
- personagem não encontrado;
- conteúdo;
- excluindo;
- navegando para edição.

## Loading

Skeleton do card e das linhas de seção. Ação de excluir deve mostrar estado bloqueado.

## Interações

Back retorna à home. Delete abre confirmação. Cada seção navega para tela específica. Editar abre wizard em modo edição.

## Componentes

`ScreenHeader`, `CharacterSummaryCard`, `MetricRow`, `SectionMenuItem`, `PrimaryButton`, `ConfirmDialog`.

## Regras

Excluir limpa cache e volta para home. Métricas devem exibir `0` quando ausentes. Dados de rota devem ser apenas `id`.

## Futuras Expansões

Compartilhar ficha, histórico, marcação de morte, edição rápida de métricas e sync multiplayer.
