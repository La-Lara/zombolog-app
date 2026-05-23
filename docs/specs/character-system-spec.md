# Character System Spec

## Escopo

Sistema de personagens inspirado em fichas de sobreviventes. A home lista personagens e o detalhe organiza informações em seções.

## Modelo Base

```ts
type CharacterStatus = 'alive' | 'dead' | 'missing';

type Character = {
  id: string;
  name: string;
  profession: string;
  status: CharacterStatus;
  avatarId: string;
  spawnCity: string;
  currentCity: string;
  daysAlive: number;
  zombiesKilled: number;
  positiveTraitIds: string[];
  negativeTraitIds: string[];
  skills: CharacterSkill[];
};
```

## Regras de Negócio

- Nome do personagem é obrigatório.
- Profissão é obrigatória.
- Cidade de spawn e cidade atual são obrigatórias.
- Dias de sobrevivência e zumbis abatidos começam em `0`, mas podem ser preenchidos manualmente na criação e edição.
- Status inicial é `alive`.
- Traços positivos e negativos são listas separadas.
- Habilidades são níveis inteiros dentro do range permitido pelo domínio.

## Telas Relacionadas

- Home: lista resumida.
- Detalhe: ficha principal e navegação para seções.
- Habilidades: lista detalhada de skills.
- Traços: lista detalhada de efeitos positivos/negativos.

## Estados

- lista carregando;
- lista vazia;
- lista com personagens;
- personagem carregando;
- personagem não encontrado;
- erro de sincronização;
- edição pendente.

## Futuras Expansões

Equipamento, preferências, descrição textual, histórico de eventos, morte do personagem, exportação de ficha e presets por build.
