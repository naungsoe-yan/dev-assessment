# NodeJS API Asessment

NestJS and TypeORM are used to implement the APIs

## Running the app in Local

Prerequisites:
* MySQL Server v8.2.0
* Node.js v20.9.0

### MySQL credentials

Update the following MySQL credentials in `.env` file

```sql
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_SCHEMA=dev-assessment
```

### MySQL database schema

Execute the SQL statements from `mysql-init.sql` file in MySQL server

### Installation

```bash
# nestjs cli
$ npm install -g @nestjs/cli

# dependencies
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

### Accessing the APIs

Go to the following URL to try out the APIs

```
http://localhost:3000/swagger
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Running the app in Docker

Prerequisites:
* Docker v20.10.25
* Docker Compose v2.23.0


### Running the app

Important:\
May need to disable VPN on your computer to allow the internet access.\
It will take a while to spin up containers and create database schema.

```bash
$ docker-compose up -d
```

### Accessing the APIs

Go to the following URL to try out the APIs

```
http://localhost:3000/swagger
```
