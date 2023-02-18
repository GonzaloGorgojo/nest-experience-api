# Nest.js API

## Description

This is an API built with NestJS. The purpose of this API is to provide endpoints for a frontend application to consume in order to retrieve and manage my education and work experience. <br>
The Api got a login option that uses JWT security to use the post methods.

### :computer: Technologies used

- Nest.JS
- Typescript
- Docker
- PostgresSql
- JWT

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
