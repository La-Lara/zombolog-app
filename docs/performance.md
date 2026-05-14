# Performance

## Princípios

Meça antes de otimizar. Otimizações devem reduzir re-render, trabalho na thread JS, uso de memória ou tempo de carregamento percebido.

## Renderização

- Evite estado global para dados usados por uma única tela.
- Use seletores em Zustand para reduzir re-renders.
- Use `select` no TanStack Query para entregar à tela apenas o necessário.
- Extraia itens de lista para componentes pequenos.
- Use `keyExtractor` estável.

## Listas

Use `FlatList` para listas comuns e `FlashList` quando houver volume alto, células complexas ou necessidade comprovada de performance melhor.

## Imagens

Use formatos adequados, dimensões reais e cache quando aplicável. Não carregue imagens grandes para exibição pequena.

## Inicialização

Carregue fontes, sessão e configurações essenciais no layout raiz. Evite bloquear a primeira renderização por dados não críticos.

## Network

Configure `staleTime`, paginação e prefetch em telas previsíveis. Evite refetch agressivo para dados estáveis.

## Animações

Use APIs nativas ou bibliotecas apropriadas para animações complexas. Evite loops e cálculos pesados na thread JS.

## Monitoramento

Inclua tracking de crashes, erros de API e métricas simples de experiência, como tempo até primeira tela útil.
