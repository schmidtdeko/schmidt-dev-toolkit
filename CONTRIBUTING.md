# Como Contribuir para o Schmidt Dev Toolkit

Agradecemos o seu interesse em contribuir para o Schmidt Dev Toolkit! Sua ajuda é fundamental para tornar este HUB ainda mais famoso e útil para a comunidade de desenvolvedores.

Este documento descreve as diretrizes para contribuir com o projeto.

## Sumário

- [Como Contribuir para o Schmidt Dev Toolkit](#como-contribuir-para-o-schmidt-dev-toolkit)
  - [Sumário](#sumário)
  - [Começando](#começando)
    - [Configuração do Ambiente de Desenvolvimento](#configuração-do-ambiente-de-desenvolvimento)
  - [Reportando Bugs](#reportando-bugs)
  - [Sugerindo Novas Ferramentas ou Melhorias](#sugerindo-novas-ferramentas-ou-melhorias)
  - [Enviando Pull Requests](#enviando-pull-requests)
  - [Padrões de Código](#padrões-de-código)
  - [Licença](#licença)

## Começando

Para começar a trabalhar no projeto, siga os passos abaixo:

### Configuração do Ambiente de Desenvolvimento

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/schmidtdeko/schmidt-dev-toolkit.git
    ```
    (Substitua `seu-usuario` pelo nome de usuário correto do repositório, se for diferente)
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd schmidt-dev-toolkit
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver em uso).

## Reportando Bugs

Se você encontrar um bug, por favor, abra uma [Issue no GitHub](https://github.com/schmidtdeko/schmidt-dev-toolkit/issues). Ao reportar um bug, inclua o máximo de detalhes possível:

-   Uma descrição clara e concisa do problema.
-   Passos para reproduzir o comportamento.
-   O comportamento esperado.
-   O comportamento real.
-   Capturas de tela ou vídeos (se aplicável).
-   Informações sobre seu ambiente (navegador, sistema operacional, etc.).

## Sugerindo Novas Ferramentas ou Melhorias

Temos o prazer de receber sugestões para novas ferramentas ou melhorias nas existentes! Para sugerir algo:

1.  Abra uma [Issue no GitHub](https://github.com/schmidtdeko/schmidt-dev-toolkit/issues).
2.  Use o template de "Feature Request" (se disponível) ou descreva sua ideia detalhadamente.
3.  Explique o problema que a nova ferramenta/melhoria resolveria e como ela beneficiaria os usuários.

## Enviando Pull Requests

1.  **Faça um fork** do repositório.
2.  **Crie uma nova branch** para sua feature ou correção de bug:
    ```bash
    git checkout -b feature/minha-nova-ferramenta
    # ou
    git checkout -b bugfix/correcao-de-erro
    ```
3.  **Faça suas alterações** e certifique-se de que o código esteja formatado e sem erros de lint.
4.  **Escreva testes** para suas alterações (se aplicável).
5.  **Commit suas alterações** com uma mensagem clara e descritiva.
6.  **Envie suas alterações** para o seu fork:
    ```bash
    git push origin feature/minha-nova-ferramenta
    ```
7.  **Abra um Pull Request** para o branch `main` do repositório original.
    -   Descreva suas alterações detalhadamente.
    -   Mencione quaisquer issues relacionadas (ex: `Closes #123`).
    -   Certifique-se de que todos os testes passem.

## Padrões de Código

-   Siga os padrões de código existentes no projeto.
-   Utilize o ESLint para garantir a consistência do código.
-   Escreva código claro, conciso e bem comentado.

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.
