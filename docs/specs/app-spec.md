# App Spec

## Visão Geral

App mobile companion para Project Zomboid focado em criar, consultar e compartilhar perfis de sobreviventes. O mockup define uma experiência dark, densa e temática, com autenticação simples, lista de personagens, detalhe de personagem e criação guiada em seis etapas.

## Usuários e Objetivos

- Jogador: registrar personagens, acompanhar atributos, profissão, localização, dias vivos, zumbis mortos e traços.
- Criador de conteúdo: montar uma ficha visual compartilhável.
- Usuário recorrente: acessar rapidamente personagens existentes e editar fichas.

## Entidades Principais

- `User`: displayName, username, credentials, settings.
- `Character`: id, ownerId, name, profession, status, avatar, spawnCity, currentCity, daysAlive, zombiesKilled.
- `Appearance`: gender, skinTone, hairStyle, hairColor, portraitVariant.
- `Trait`: id, name, type positive/negative, description, effects, points.
- `Skill`: id, name, category, level, icon.
- `ShareProfile`: characterId, imagePreset, visibility, generatedAssetUrl.

## Componentes Compartilháveis

`AppBackground`, `ScreenHeader`, `AuthForm`, `TextField`, `PasswordField`, `PrimaryButton`, `SecondaryButton`, `CharacterCard`, `CharacterPortrait`, `StatusBadge`, `MetricRow`, `SectionListItem`, `StepIndicator`, `SelectField`, `SkillMeter`, `TraitList`, `EmptyState`, `ErrorState`.

## Fluxos Principais

1. Login ou cadastro.
2. Home lista personagens do usuário.
3. Usuário abre detalhes, edita ou cria novo personagem.
4. Criação percorre seis passos: básico, aparência, localização, traços, habilidades e resumo.
5. Detalhes permitem acessar seções de atributos, traços, informações gerais, equipamento, preferências e descrição.
6. Compartilhamento social será acionado a partir do detalhe/resumo, embora não esteja visível no mockup.

## Gaps Funcionais

- Recuperação de senha não aparece.
- Logout não aparece.
- Edição de personagem é indicada, mas fluxo não está desenhado.
- Equipamento, preferências e descrição aparecem no detalhe, mas não têm telas no mockup.
- Compartilhamento social é requisito, mas não há UI desenhada.
- Não há estado vazio da home nem tratamento visual de erro.

## Riscos

Listas de habilidades e traços podem crescer e exigir busca/filtro. O fluxo de criação longo precisa persistir rascunho para evitar perda de dados. O visual escuro com texto pequeno exige atenção a contraste e acessibilidade.
