# olympicgames-appJS
Projeto Jogos Olímpicos

## Instalação

```bash
$ npm install
```
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
   "dateTimeStarts":"Wed, 06 Oct 2021 20:00:00 GMT-0300",
   "dateTimeFinish":"Wed, 06 Oct 2021 20:30:00 GMT-0300",
   "nation1":"Brazil",
   "nation2":"Japan",
   "stageType":"FINAL"
}
```

### Retornar Todas as Competições

Realizar requisição GET para o endpoint "/competitions".