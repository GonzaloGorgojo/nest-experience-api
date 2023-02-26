# Nest.js API

## Description

This is an API built with NestJS. The purpose of this API is to provide endpoints for a frontend application to consume in order to retrieve and manage education and work experience from users. I will use it in my personal webpage <br>
The Api got a few usefull things:<br>

- Login that use JWT security, this was made to do all operations except the ones that read data.
- bcrypt hashing and salting to store passwords.
- env variable checkings
- automapper
- swagger documentation (once app is running you can check at 'http://localhost:3000/api-documentation')

### :computer: Technologies/Libraries used

- Nest.JS
- Typescript
- Docker
- PostgresSql
- JWT
- OpenApi/Swagger
- TypeOrm
- Envalid
- Bcrypt

## To run this API, you will need to have the following installed on your machine:

- Node.js
- npm
- Docker

## Installation

```bash
$ npm install
```

Create a new file called .env in the root directory of the API. This file should contain same env variables as example.env

## Local DB setup

```bash
$ docker compose up
$ npm run typeorm:migrate --name=initial-migration
$ npm run typeorm:run
$ npm run seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# debug mode
$
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
