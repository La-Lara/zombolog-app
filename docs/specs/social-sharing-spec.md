# Social Sharing Spec

## Escopo

Compartilhamento social de ficha de personagem. A UI não aparece no mockup, mas o requisito deve ser preparado para detalhe e resumo.

## Entrada

Um `Character` completo com avatar, profissão, status, métricas, localização, traços e habilidades principais.

## Saídas

- imagem compartilhável da ficha;
- texto curto com nome, profissão e status;
- deep link para abrir o personagem quando backend/links existirem.

## Pontos de Acesso

- detalhe do personagem;
- resumo ao finalizar criação;
- futura tela de perfil público.

## Comportamento

Usuário toca em ação de compartilhar, o app gera asset visual e abre share sheet nativo. Em caso de erro, exibir fallback para compartilhar texto.

## Privacidade

Compartilhar apenas dados do personagem. Não incluir username, token, e-mail ou dados privados da conta.

## Decisões Pendentes

- formato visual do cartão compartilhável;
- necessidade de backend público;
- suporte a watermarks;
- idiomas do texto gerado;
- analytics de compartilhamento.
