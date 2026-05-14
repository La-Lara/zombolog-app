# Repository Guidelines

## Objetivo

Este repositório documenta a arquitetura base de um app React Native profissional com Expo, TypeScript e padrões escaláveis.

## Como Trabalhar

- Leia `/docs/architecture.md` antes de propor mudanças estruturais.
- Use `/docs/folder-structure.md` para decidir onde criar arquivos.
- Siga `/docs/conventions.md` para naming, imports, hooks e separação de responsabilidades.
- Registre decisões relevantes em `/ai/decisions.md`.
- Atualize `/ai/current-plan.md` e `/ai/tasks.md` ao iniciar ou concluir trabalho significativo.

## Regras para Agentes

- Não introduza bibliotecas sem justificar impacto, manutenção e alternativa nativa.
- Evite duplicar documentação; referencie o arquivo correto em `/docs`.
- Prefira soluções simples, tipadas e consistentes com Expo.
- Não misture UI, regra de negócio, acesso a API e estado no mesmo arquivo.
- Antes de criar uma feature, consulte o padrão em `/docs/folder-structure.md`.
