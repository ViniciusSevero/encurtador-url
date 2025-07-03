# Setup
1. Copie o arquivo .env.example, setando as variáveis de ambiente, principalmente as suas chaves para conexao com o Cloudfare R2
2. Execute o comando `docker-compose up` para subir o container com a base postgres + o container da aplicação
3. Execute o camndo `npm run migrate` para executar as migrations na base de dados
4. Acesse a url http://localhost:3333/docs para acessar a documentação da API


## Funcionalidades e Regras

- [ X ]  Deve ser possível criar um link
    - [ X ]  Não deve ser possível criar um link com URL encurtada mal formatada
    - [ X ]  Não deve ser possível criar um link com URL encurtada já existente
- [ X ]  Deve ser possível deletar um link
- [ X ]  Deve ser possível obter a URL original por meio de uma URL encurtada
- [ X ]  Deve ser possível listar todas as URL’s cadastradas
- [ X ]  Deve ser possível incrementar a quantidade de acessos de um link
- [ X ]  Deve ser possível exportar os links criados em um CSV
    - [ X ]  Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
    - [ X ]  Deve ser gerado um nome aleatório e único para o arquivo
    - [ X ]  Deve ser possível realizar a listagem de forma performática
    - [ X ]  O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.