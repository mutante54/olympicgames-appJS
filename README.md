# olympicgames-appJS
Projeto Jogos Olímpicos - Desenvolvido com NestJS/ Javascript

**Atenção**:
*Esta aplicação não se conecta a um servidor de banco de dados.*
*Todos os dados são armazenados e gerenciados pela própria instância da aplicação (in-memory).*

## Instalação

```bash
$ npm install

## Executando a Aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# Acesso:
http://localhost:3000/

```

## Teste

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

```

## Funcionalidades

### Cadastrar nova Competição

Realizar requisição POST ("application/JSON") para o endpoint "/competitions":

```
# exemplo de request
{
   "sportType":"SOCCER",
   "eventPlace":"Final Stadium",
   "dateTimeStarts":"Wed, 06 Oct 2021 20:00:00 GMT-0300",
   "dateTimeFinish":"Wed, 06 Oct 2021 20:30:00 GMT-0300",
   "nation1":"Brazil",
   "nation2":"Japan",
   "stageType":"FINAL"
}
```

### Retornar Todas as Competições

Realizar requisição GET para o endpoint "/competitions".

Opcionalmente, é possível adicionar filtro para o tipo de modalidade:

"/competitions?sportType=BASKETBALL"