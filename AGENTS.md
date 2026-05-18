# Repository Guidelines

## Objetivo

Este repositório documenta a arquitetura base de um app React Native profissional com Expo, TypeScript e padrões escaláveis.

## Como Trabalhar

- Leia `/docs/architecture.md` antes de propor mudanças estruturais.
- Use `/docs/folder-structure.md` para decidir onde criar arquivos.
- Siga `/docs/conventions.md` para naming, imports, hooks e separação de responsabilidades.
- Registre decisões relevantes em `/ai/decisions.md`.
- Atualize `/ai/current-plan.md` e `/ai/tasks.md` ao iniciar ou concluir trabalho significativo.

## Workflow Padrao

- Cada task deve ser desenvolvida em branch propria.
- A branch principal de integracao do projeto e `main`.
- Apos aprovacao da task:
  - mergear a branch da task na branch principal `main`;
  - atualizar a branch principal;
  - criar a branch da proxima task a partir da principal atualizada.
- Nao faca push para o GitHub no fluxo padrao; push deve ocorrer somente quando solicitado expressamente.

## Convencao de Branches

- Use o padrao `implement-p<prioridade>-<escopo>`.
- Exemplos:
  - `implement-p0-tasks`;
  - `implement-p1-auth`;
  - `implement-p1-home`.

## Fluxo de Aprovacao

- Implemente apenas o escopo da task atual.
- Valide com typecheck, testes e lint quando aplicavel.
- Faca commit na branch da task.
- Aguarde aprovacao explicita antes de mergear na branch principal.

## Continuidade Entre Tasks

- Depois do merge aprovado, sempre volte para `main`.
- Garanta que a principal esteja atualizada localmente ou com o remote, quando existir.
- Crie a proxima branch somente depois desse ponto.
- Nao implemente a proxima task antes de a branch correta existir.

## Regras para Agentes

- Não introduza bibliotecas sem justificar impacto, manutenção e alternativa nativa.
- Evite duplicar documentação; referencie o arquivo correto em `/docs`.
- Prefira soluções simples, tipadas e consistentes com Expo.
- Não misture UI, regra de negócio, acesso a API e estado no mesmo arquivo.
- Antes de criar uma feature, consulte o padrão em `/docs/folder-structure.md`.
