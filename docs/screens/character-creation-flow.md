# Character Creation Flow

## Objetivo

Criar ou futuramente editar um personagem via wizard linear de seis passos.

## Comportamento Geral

Todas as etapas usam background dark, header com back, título `Novo Personagem`, indicador de etapa, conteúdo e footer com ações. `Próximo` valida e avança. `Voltar` mantém o draft.

## Etapas

1. Informações básicas: nome e profissão.
2. Aparência: portrait, gênero, tom de pele, cabelo e cor.
3. Localização: cidade de spawn e cidade atual.
4. Traços: positivos e negativos.
5. Habilidades: lista de skills.
6. Resumo: confirmação e criação.

## Estados

- draft vazio;
- etapa inválida;
- etapa válida;
- salvando draft;
- criando personagem;
- erro no submit.

## Loading

Durante criação final, bloquear navegação e exibir loading no botão. Catálogos de profissão, cidades, traços e skills podem carregar antes ou em cache.

## Validações

Validação por etapa com Zod. Submit final valida payload completo. Erros devem ser específicos e visíveis no campo ou seção.

## Componentes

`CreationLayout`, `StepIndicator`, `WizardFooter`, `SelectField`, `ColorPickerField`, `PortraitSelector`, `TraitPicker`, `SkillMeter`, `SummaryCard`.

## Edge Cases

Fechar app no meio deve preservar draft. Voltar no primeiro passo com dados deve confirmar descarte. Erro de rede não pode apagar dados preenchidos.

## Futuras Expansões

Modo edição, templates de personagem, cálculo de pontos, importação de build e preview compartilhável.
