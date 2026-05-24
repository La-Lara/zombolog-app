# Character Creation Spec

## Fluxo

Criação em wizard com header `Novo Personagem` e indicador de etapa.

## Etapa 1: Informações Básicas

Campos:

- nome do personagem;
- modo da run;
- dias de sobrevivência;
- zumbis abatidos.

Validações:

- nome obrigatório;
- bloquear próximo até dados válidos.

## Etapa 2: Profissão

Lista profissões com ícone, nome formatado e seleção única. Nenhuma profissão inicia selecionada em criação.

## Etapa 3: Aparência

Campos:

- avatar/portrait com navegação anterior/próximo;
- gênero;

UX:

- preview deve atualizar imediatamente.
- seletores devem ser consistentes com `SelectField`.

## Etapa 4: Localização

Campos:

- cidade inicial;
- cidade atual.

Regra:

- cidade atual inicia igual à cidade inicial.

## Etapa 5: Traços

Permite adicionar/remover traços positivos e negativos. O mockup mostra exemplos: `Fast Reader`, `Fit`, `Organized`, `Lucky`, `High Thirst`, `Slow Reader`.

Regras:

- não permitir duplicidade;
- separar positivos e negativos;
- futura regra de pontos deve ser adicionada quando o domínio for fechado.

## Etapa 6: Habilidades

Lista habilidades em seções recolhíveis com nome, controle de nível e valor numérico. No mockup todos começam em `0` durante criação.

## Etapa 7: Resumo

Mostra avatar, nome, profissão, localização, dias de sobrevivência, zumbis abatidos e traços selecionados. Botão final `Criar Personagem`.

## Persistência de Rascunho

Persistir draft localmente durante o wizard para evitar perda ao navegar para trás, fechar app ou sofrer erro de rede.

## Edge Cases

- voltar do primeiro passo deve pedir confirmação se houver dados preenchidos;
- falha ao criar deve manter draft;
- edição futura deve reutilizar o wizard com modo `create`/`edit`.
