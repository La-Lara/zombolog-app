# Character Creation Flow

## Objetivo

Criar ou editar um personagem via wizard linear.

## Comportamento Geral

Todas as etapas usam background dark, header com back, título `Novo Personagem`, indicador de etapa, conteúdo e footer com ações. `Próximo` valida e avança. `Voltar` mantém o draft.

## Etapas

1. Informações básicas: nome, modo da run e métricas.
2. Profissão: lista com ícones.
3. Aparência: portrait e gênero.
4. Localização: cidade inicial e cidade atual.
5. Traços: positivos e negativos.
6. Habilidades: lista de habilidades agrupadas em seções recolhíveis.
7. Resumo: confirmação e criação.

## Estados

- draft vazio;
- etapa inválida;
- etapa válida;
- salvando draft;
- criando personagem;
- erro no submit.

## Loading

Durante criação final, bloquear navegação e exibir loading no botão. Catálogos de profissão, cidades, traços e habilidades podem carregar antes ou em cache.

## Validações

Validação por etapa com Zod. Submit final valida payload completo. Erros devem ser específicos e visíveis no campo ou seção.

## Componentes

`CreationLayout`, `StepIndicator`, `WizardFooter`, `SelectField`, `ColorPickerField`, `PortraitSelector`, `TraitPicker`, `SkillMeter`, `SummaryCard`.

## Edge Cases

Fechar app no meio deve preservar draft. Voltar no primeiro passo com dados deve confirmar descarte. Erro de rede não pode apagar dados preenchidos.

## Futuras Expansões

Modo edição, templates de personagem, cálculo de pontos, importação de build e preview compartilhável.
