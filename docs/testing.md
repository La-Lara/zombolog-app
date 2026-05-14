# Testes

## Estratégia

Use uma pirâmide pragmática:

- Unitários para funções puras, mappers, schemas e stores.
- Componentes para UI compartilhada e telas com estados importantes.
- Integração para fluxos críticos, como login e atualização de perfil.
- E2E apenas para jornadas de alto valor.

## Ferramentas Recomendadas

- Jest com preset compatível com Expo.
- React Native Testing Library para componentes.
- MSW para mocks de API em testes de integração.
- Maestro para E2E de jornadas críticas.

## Convenções

Arquivos de teste devem ficar próximos ao código testado ou em `__tests__` quando a feature for grande.

```txt
src/features/auth/screens/login-screen.tsx
src/features/auth/screens/login-screen.test.tsx
```

## O que Testar

Teste comportamento observável, não implementação interna. Verifique texto, estados, callbacks e navegação esperada.

## Dados de Teste

Factories ficam em `src/test/factories`. Evite fixtures enormes. Prefira factories pequenas com override:

```ts
makeUser({ displayName: 'Ana' });
```

## Critério Mínimo

Toda feature nova deve incluir testes para regras de negócio, validação de formulário e estados principais de tela quando houver risco de regressão.
