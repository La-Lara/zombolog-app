# Home Feature

## Objetivo

Exibir personagens do usuário e permitir criação ou acesso rápido ao detalhe.

## Comportamento

Header saúda `Olá, Sobrevivente` e mostra ação de configurações. A lista usa cards com avatar, nome, profissão, dias de sobrevivência, zumbis abatidos, cidade atual e badge de status.

## Componentes

`HomeHeader`, `SettingsButton`, `CharacterCard`, `StatusBadge`, `CharacterMetric`, `CreateCharacterButton`, `EmptyCharactersState`.

## Estados

- carregando lista;
- lista vazia com CTA de criação;
- erro com retry;
- lista carregada;
- pull to refresh.

## Edge Cases

Lista grande deve usar `FlatList`. Personagem sem avatar usa placeholder. Dados parciais devem renderizar fallback claro sem quebrar layout.

## Navegação

Card navega para detalhe. CTA navega para criação.
