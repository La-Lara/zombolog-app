# Character Creation Spec

## Fluxo

Criação em wizard de seis etapas com header `Novo Personagem` e indicador `n / 6`.

## Etapa 1: Informações Básicas

Campos:

- nome do personagem;
- profissão.

Validações:

- nome obrigatório;
- profissão obrigatória;
- bloquear próximo até dados válidos.

## Etapa 2: Aparência

Campos:

- avatar/portrait com navegação anterior/próximo;
- gênero;

UX:

- preview deve atualizar imediatamente.
- seletores devem ser consistentes com `SelectField`.

## Etapa 3: Localização

Campos:

- cidade de spawn;
- cidade atual.

Regra:

- cidade atual inicia igual à cidade de spawn.

## Etapa 4: Traços

Permite adicionar/remover traços positivos e negativos. O mockup mostra exemplos: `Fast Reader`, `Fit`, `Organized`, `Lucky`, `High Thirst`, `Slow Reader`.

Regras:

- não permitir duplicidade;
- separar positivos e negativos;
- futura regra de pontos deve ser adicionada quando o domínio for fechado.

## Etapa 5: Habilidades

Lista skills com ícone, nome, medidor e valor numérico. No mockup todos começam em `0` durante criação.

## Etapa 6: Resumo

Mostra avatar, nome, profissão, localização, dias de sobrevivência, zumbis abatidos e traços selecionados. Botão final `Criar Personagem`.

## Persistência de Rascunho

Persistir draft localmente durante o wizard para evitar perda ao navegar para trás, fechar app ou sofrer erro de rede.

## Edge Cases

- voltar do primeiro passo deve pedir confirmação se houver dados preenchidos;
- falha ao criar deve manter draft;
- edição futura deve reutilizar o wizard com modo `create`/`edit`.
