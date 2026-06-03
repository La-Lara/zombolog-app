# Zombolog App

Zombolog App e um companion mobile para jogadores de Project Zomboid. O app organiza fichas de sobreviventes, acompanha dias de sobrevivencia e zumbis abatidos, registra profissao, cidades, tracos e habilidades, e oferece um fluxo guiado para criar ou editar personagens.

O projeto usa React Native com Expo, TypeScript e Expo Router, seguindo uma arquitetura por features documentada em [`docs/architecture.md`](docs/architecture.md).

## Navegacao de Telas

### Entrada

O fluxo inicia pela autenticacao do usuario, com acesso as fichas salvas.

![Tela de login](docs/PrintTelasDoApp/Screenshot_20260531-160218.png)

### Home

A Home lista os personagens cadastrados, destaca status, profissao, dias de sobrevivencia, zumbis abatidos e cidade atual. A partir dela, o usuario acessa a ficha de um personagem ou inicia a criacao de um novo.

![Home com lista de personagens](docs/PrintTelasDoApp/Screenshot_20260531-160223.png)

### Ficha do Personagem

A ficha mostra o resumo do sobrevivente, dados principais da run, secoes de habilidades e tracos, alem da acao de editar personagem.

![Ficha do personagem](docs/PrintTelasDoApp/Screenshot_20260531-160619.png)

### Criacao e Edicao

O cadastro e a edicao usam um wizard de sete etapas para preencher informacoes basicas, profissao, aparencia, localizacao, tracos, habilidades e resumo final.

| Informacoes basicas | Profissao |
| --- | --- |
| ![Etapa de informacoes basicas](docs/PrintTelasDoApp/Screenshot_20260531-160629.png) | ![Etapa de profissao](docs/PrintTelasDoApp/Screenshot_20260531-160633.png) |

| Aparencia | Localizacao |
| --- | --- |
| ![Etapa de aparencia](docs/PrintTelasDoApp/Screenshot_20260531-160644.png) | ![Etapa de localizacao](docs/PrintTelasDoApp/Screenshot_20260531-160647.png) |

| Tracos positivos | Tracos negativos |
| --- | --- |
| ![Selecao de tracos positivos](docs/PrintTelasDoApp/Screenshot_20260531-160650.png) | ![Selecao de tracos negativos](docs/PrintTelasDoApp/Screenshot_20260531-160654.png) |

| Habilidades | Resumo |
| --- | --- |
| ![Etapa de habilidades](docs/PrintTelasDoApp/Screenshot_20260531-160656.png) | ![Resumo do personagem](docs/PrintTelasDoApp/Screenshot_20260531-160703.png) |

### Revisao Final

Antes de salvar, o usuario revisa os dados principais e os tracos escolhidos. As telas tambem demonstram a edicao de valores de habilidades e a continuidade do fluxo.

| Resumo com tracos | Habilidades preenchidas |
| --- | --- |
| ![Resumo com tracos selecionados](docs/PrintTelasDoApp/Screenshot_20260531-160706.png) | ![Habilidades com valores preenchidos](docs/PrintTelasDoApp/Screenshot_20260531-161124.png) |

![Selecao adicional de tracos](docs/PrintTelasDoApp/Screenshot_20260531-161106.png)

## License

Copyright (c) 2026 Lara Luz. All rights reserved.

This project is proprietary. No part of this code may be copied, modified, distributed, published, sold, sublicensed, reused, or used to create derivative works without prior written permission from the author.

## Licenca

Copyright (c) 2026 Lara Luz. Todos os direitos reservados.

Este projeto e proprietario. Nenhuma parte deste codigo pode ser copiada, modificada, distribuida, publicada, vendida, sublicenciada, reutilizada ou utilizada para criar obras derivadas sem autorizacao previa e por escrito da autora.
