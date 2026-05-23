# Character Feature

## Objetivo

Gerenciar consulta, detalhe e expansão da ficha de sobrevivente.

## Telas

- Detalhe do personagem.
- Habilidades.
- Traços.
- Futuras: informações gerais, equipamento, preferências, descrição.

## Componentes

`CharacterSummaryCard`, `CharacterPortrait`, `MetricRow`, `SectionMenuItem`, `SkillMeter`, `TraitDescriptionCard`, `DeleteCharacterAction`, `EditCharacterButton`.

## Regras

Excluir personagem deve exigir confirmação. Editar personagem deve reutilizar o fluxo de criação com dados preenchidos. Dias de sobrevivência e zumbis abatidos devem aceitar apenas números não negativos.

## Estados

- loading;
- erro;
- personagem inexistente;
- conteúdo;
- ação destrutiva em andamento.

## Riscos

As seções do detalhe podem crescer muito. Manter cada seção em subfeature/tela própria evita uma tela monolítica.
