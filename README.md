# Projeto Store Manager API

# Contexto
Este foi um dos projetos realizados durante meus estudos no módulo de Back-end do curso de Desenvolvimento Web Full Stack da [Trybe](https://www.betrybe.com/formacao-desenvolvimento-web). O principal objetivo do projeto era colocar em prática os conceitos de arquitetura de software MSC. Assim, foi utilizado tecnologias como Node.js, Express e MySQL para desenvolver um CRUD de produtos e vendas.

Os arquivos connection.js, migration.sql e seed.sql já vieram confugurados pela Trybe. A instituição também forneceu o Diagrama de Entidade-Relacionamento para facilitar na manipulação das tabelas. 

![Diagrama de Entidade-Relacionamento](/images/db.png)

>Importante: o diagrama apresentado e de propriedade da [Trybe](https://www.betrybe.com/).

## Técnologias utilizadas

NodeJS, ExpressJS, MySQL, ES6, Mocha, sinon, chai.

## Configurando o Projeto

### Clonando o repositório

```bash
git clone git@github.com:GabrielSartori27/store-manager-api.git

cd store-manager-api
```

###  Configure o arquivo .env:
* Você vai encontrar o arquivo .env.example no projeto. Mude seu nome para .env e altere as informações presentes para que correspondam as suas próprias informações.
* Estrutura do arquivo:  
```bash
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourMysqlPassword
MYSQL_DATABASE=StoreManager
PORT=3000
```

### Rodando com Docker:
>Observação: os arquivos docker.compose.yml e Dockefile já vieram configurados pela Trybe.
* Inicie o container e instale as dependências:
```bash
docker-compose up -d
docker exec -it store_manager bash 
npm install
```
### Rodando Localmente:
Observação: para rodar localmente é necessário ter o MySQL e o Node.js instalados em sua máquina.
* Instale as dependências:
```bash 
npm install
``` 
## Executando aplicação

* Para criar e popular o banco de dados:
  ```
  npm run migration
  npm run seed
  ``` 

* Para iniciar a aplicação:

  ```
  npm start
  ```

## Testes

Para rodar os testes:
```
  npm run test:mocha
```

## Documentação

A documentação da API foi criada  utilizando o Swagger. Assim que a aplicação estiver rodando ela pode ser acessada pela seguinte url:  

  ```
    http://localhost:3000/api-docs/
  ```