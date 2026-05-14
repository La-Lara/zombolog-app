# Profile Sharing Feature

## Objetivo

Permitir que o usuário compartilhe uma ficha visual do personagem.

## Status

Feature planejada. Não há tela explícita no mockup; deve ser introduzida como ação no detalhe e no resumo de criação.

## Componentes

`ShareButton`, `SharePreview`, `ShareProfileCard`, `ShareErrorFallback`.

## Fluxo

1. Usuário toca em compartilhar.
2. App gera preview com dados públicos do personagem.
3. Usuário confirma.
4. Share sheet nativo é aberto.

## Regras

Não compartilhar dados da conta. Gerar arte com tema consistente. Oferecer fallback textual se imagem falhar.

## Dependências

Precisa de definição visual do cartão e escolha técnica para capturar/renderizar imagem.
