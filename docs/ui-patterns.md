# Padrões de UI

## Design System

Crie componentes base em `src/shared/ui`: `Button`, `TextField`, `Text`, `Screen`, `Card`, `Avatar`, `EmptyState`, `ErrorState` e `LoadingState`.

Features devem compor esses componentes, não recriar variações visuais.

O mockup exige uma linguagem dark, temática e densa. Padronize cards com borda sutil, textos compactos, CTAs de largura total em fluxos principais e badges pequenos para status como `Vivo`.

## Componentes Derivados do Mockup

Promova para compartilhado quando usados por duas ou mais features: `AppBackground`, `ScreenHeader`, `CharacterPortrait`, `StatusBadge`, `MetricRow`, `SectionMenuItem`, `StepIndicator`, `SelectField`, `SkillMeter` e `TraitList`.

## Theming

Centralize tokens em `src/shared/theme`:

```ts
export const spacing = { xs: 4, sm: 8, md: 16, lg: 24 };
export const radius = { sm: 6, md: 8, lg: 12 };
```

Use tokens para cor, espaçamento, fonte, raio, sombra e z-index. Não espalhe valores mágicos.

Estilos devem ser criados com `StyleSheet` ou helpers internos que consumam tokens. Bibliotecas de styling só devem entrar após decisão registrada em `/ai/decisions.md`.

## Acessibilidade

Componentes interativos devem ter `accessibilityRole`, labels úteis e área mínima de toque. Não comunique estado apenas por cor.

## Formulários

Use React Hook Form para estado de formulário e Zod para validação.

```ts
const form = useForm<LoginForm>({
  resolver: zodResolver(loginSchema),
});
```

Inputs devem integrar com `Controller` ou abstração própria, mantendo mensagens de erro consistentes.

## Estados de Tela

Toda tela com dados remotos deve tratar:

- loading inicial;
- erro com retry quando aplicável;
- lista vazia;
- refresh manual quando fizer sentido;
- conteúdo carregado.

## Performance de UI

Use `FlatList` ou `FlashList` para listas grandes. Evite renderizar listas longas com `ScrollView`. Memoize apenas quando houver custo real ou re-render comprovado.
