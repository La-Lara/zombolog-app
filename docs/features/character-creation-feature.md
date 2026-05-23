# Character Creation Feature

## Objetivo

Guiar o usuário na criação de um personagem completo com validação por etapa e resumo final.

## Estrutura

Wizard controlado por estado local persistido como draft. Cada etapa deve ter schema próprio e uma composição final validada antes do submit.

A etapa de habilidades usa o catálogo compartilhado e agrupa a seleção em seções recolhíveis: Combate - Armas de Fogo, Combate - Físico, Criação, Agropecuária, Condicionamento Corporal e Sobrevivência.

## Componentes

`CreationLayout`, `StepIndicator`, `WizardFooter`, `BasicInfoStep`, `AppearanceStep`, `LocationStep`, `TraitsStep`, `SkillsStep`, `SummaryStep`.

## Interações

- `Próximo` valida etapa atual.
- `Voltar` retorna sem perder dados.
- `Criar Personagem` envia payload completo.
- Remover traço usa ação explícita por linha.

## Validações

Nome, profissão e cidades são obrigatórios. Traços não podem duplicar. Habilidades respeitam range definido. Resumo deve bloquear envio se alguma etapa estiver inválida.

## Futuro

Modo edição, presets de build, importação/exportação e cálculo de pontos de traços.
