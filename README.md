<p align="center">
  <a href="https://docs.nestjs.com/" target="_blank"> <img src="https://repository-images.githubusercontent.com/180571949/1816f680-a221-11ea-8ae0-8d90df8436bb" alt="Nest Logo" /></a>
</p>

## Description

A simple TODO application under Docker environment.
* NestJS
* TypeORM
* PostgreSQL
* Swagger
* PGadmin4
* JWT
* Docker

# Running the app on docker
## Docker build & start

```bash
# docker env build
$ docker-compose build

# docker env start
$ docker-compose up

# remove docker container (services & networks)
$ docker-compose down
```
## Migration

```bash
# generate migration
$ docker-compose run nestjs npm run typeorm:generate AnyNameYouLike

# run migration
$ docker-compose run nestjs npm run typeorm:run
```

# Running the app without docker
## Installation

```bash
$ npm install
```
## Migration

```bash
# generate migration
$ npm run typeorm:generate AnyNameYouLike

# run migration
$ npm run typeorm:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
