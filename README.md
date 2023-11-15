## Running the app in Local

Prerequisites:
* MySQL Server v8.2.0
* Node.js v20.9.0

### MySQL credentials

Update the following credentials in `.env` file

```
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_SCHEMA=dev-assessment
```

### MySQL database schema

Execute the SQL statements from `mysql-init.sql` file

### Installation

```bash
$ npm install -g @nestjs/cli
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running the app in Docker

Prerequisites:
* Docker v20.10.25

### Running the app

```bash
$ docker-compose up -d
``` 
