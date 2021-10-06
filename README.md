# olympicgames-appJS
Projeto Jogos Olímpicos

## Instalação

```bash
$ npm install
```
## Executando APP

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

# test coverage
$ npm run test:cov
```

## Funcionalidades

### Cadastrar nova Competição

Realizar requisição POST ("application/JSON") para o endpoint "/competitions":

```
# exemplo de request
{
   "sportType":"SOCCER",
   "eventPlace":"Final Stadium",
   "dateTimeStarts":"30/09/2021 10:00:00",
   "dateTimeFinish":"30/09/2021 11:00:00",
   "nation1":"Brazil",
   "nation2":"Japan",
   "competitionStageType":"Final"
}
```

### Retornar todas as competições

Realizar requisição GET para o endpoint "/competitions".