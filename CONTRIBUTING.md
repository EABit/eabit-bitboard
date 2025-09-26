# Como Contribuir para o BitBoard

Olá! Ficamos felizes com o seu interesse em contribuir para o **BitBoard**. Este projeto é uma iniciativa de código aberto da EABit Software, e toda ajuda é bem-vinda, desde a correção de bugs e melhoria na documentação até a sugestão de novas funcionalidades.

Para garantir um ambiente saudável e organizado, pedimos que siga estas diretrizes.

## Código de Conduta

Antes de contribuir, por favor, leia nosso [Código de Conduta](./CODE_OF_CONDUCT.md). Esperamos que todos os membros da comunidade sigam estas regras para mantermos um ambiente respeitoso e colaborativo.

## Como Reportar um Bug

Se você encontrou um bug, por favor, verifique primeiro se ele já não foi reportado em nossa [seção de Issues](https://github.com/EABitSoftware/eabit-bitboard/issues).

Se for um novo bug, abra uma nova issue com as seguintes informações:

* **Título claro e descritivo:** Ex: "Erro de validação ao criar recado com mais de 280 caracteres".
* **Descrição do problema:** Uma explicação clara e concisa do que está acontecendo.
* **Passos para reproduzir:** Descreva o passo a passo para que possamos reproduzir o erro.
* **Comportamento esperado:** O que você esperava que acontecesse?
* **Comportamento atual:** O que de fato aconteceu?
* **Ambiente:** Versão do Node.js, sistema operacional, navegador, etc.

## Sugerindo Melhorias ou Novas Funcionalidades

Adoramos novas ideias! Se você tem uma sugestão para melhorar o BitBoard:

1.  Abra uma nova [issue](https://github.com/EABitSoftware/eabit-bitboard/issues).
2.  Use o título para indicar que é uma sugestão (ex: `[Feature Request] Adicionar reações de emoji aos recados`).
3.  Descreva a sua ideia em detalhes, explicando o problema que ela resolve e por que seria uma adição valiosa ao projeto.

## Nosso Fluxo de Desenvolvimento

Nosso processo de contribuição é baseado no modelo "Fork & Pull Request".

1.  **Faça um Fork do repositório:** Clique no botão "Fork" no canto superior direito da página do projeto.

2.  **Clone o seu fork localmente:**
    ```bash
    git clone git@github.com:SEU-USUARIO/eabit-bitboard.git
    cd eabit-bitboard
    ```

3.  **Crie uma nova branch:** Crie uma branch descritiva a partir da `main`.
    ```bash
    git checkout -b feature/minha-nova-feature  # Para novas funcionalidades
    # ou
    git checkout -b fix/correcao-de-bug       # Para correções de bugs
    ```

4.  **Faça suas alterações:** Escreva seu código! Certifique-se de seguir os padrões de estilo do projeto (usamos ESLint e Prettier para isso).

5.  **Faça o commit das suas alterações:** Use mensagens de commit claras e descritivas.
    ```bash
    git commit -m "feat: Adiciona funcionalidade X que faz Y"
    # ou
    git commit -m "fix: Corrige bug Z no componente W"
    ```
    *Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/).*

6.  **Envie suas alterações para o seu fork:**
    ```bash
    git push origin feature/minha-nova-feature
    ```

7.  **Abra um Pull Request (PR):**
    Vá para o repositório original e clique em "New Pull Request". Compare sua branch com a `main` do repositório original.

    * Dê um título claro ao seu PR.
    * Na descrição, referencie a issue que o seu PR resolve (ex: `Closes #42`).
    * Explique as alterações que você fez e por quê.

Aguarde a revisão da equipe. Faremos o nosso melhor para revisar seu PR o mais rápido possível!

## Padrões de Código

* **TypeScript:** Todo o código deve ser escrito em TypeScript.
* **Estilo:** Usamos [Prettier](https://prettier.io/) para formatação e [ESLint](https://eslint.org/) para linting. Execute `pnpm lint` e `pnpm format` para verificar seu código antes de commitar.
* **Testes:** (Em breve) Toda nova funcionalidade deve ser acompanhada de testes unitários ou de integração.

Obrigado por ajudar a construir o BitBoard! 🚀