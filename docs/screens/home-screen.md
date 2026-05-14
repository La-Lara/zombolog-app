# Home Screen

## Objetivo

Mostrar todos os personagens do usuário e iniciar criação de novo personagem.

## Comportamento

Header com saudação, botão de configurações e lista vertical de cards. Cada card apresenta avatar, nome, profissão, métricas e status `Vivo`.

## Estados

- carregando;
- vazio;
- erro;
- lista carregada;
- atualizando.

## Loading

Usar skeletons de cards ou indicador discreto. Pull to refresh para recarregar.

## Interações

Tap no card abre detalhe. CTA `Criar Novo Personagem` abre wizard. Engrenagem abre configurações futura.

## Componentes

`HomeHeader`, `CharacterCard`, `CharacterPortrait`, `StatusBadge`, `CharacterMetric`, `CreateCharacterButton`.

## Edge Cases

Nomes longos devem truncar. Personagens mortos devem mudar badge e ordenação futura. Lista vazia precisa CTA claro.

## Futuras Expansões

Busca, filtros por status/profissão, ordenação, sync status e configurações.
