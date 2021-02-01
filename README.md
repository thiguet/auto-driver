# Auto Driver

Auto Driver is a NodeJS Ts.Ed (Express based) API that aims to control a small renting car app.

[You can check the demo here](https://enigmatic-dusk-05979.herokuapp.com/).

[You can check the ERD here](https://github.com/thiguet/auto-driver/blob/master/docs/ERD.png)

> It is an awesome project based on this stack:

- [Ts.ED framework](https://tsed.io/) (over [ExpressJS](https://expressjs.com/pt-br/))
- [Typescript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [NPM](https://www.npmjs.com/) (as the default package manager).
- [Local Swagger UI instance / Open API 3.0.3 Spec](https://swagger.io/specification/)
- [TypeORM](https://typeorm.io/#/) (over a [Postgresql DB](https://www.postgresql.org/))
- [Jest](https://jestjs.io/) (Unit Testing)
- [Docker](https://www.docker.com/) + [Heroku](https://dashboard.heroku.com/) (How and where we are running our app for free)
- [Github Actions](https://github.com/features/actions) (CI/CD tool)

> See [Ts.ED](https://tsed.io) project for more information.

This API has the following features:

- Car:
  - CRUD operations
  - List cars by color and brand
- Driver:
  - CRUD operations
  - List drivers by name
- Rental:
  - Enable a driver to start renting car.
  - Enable a driver to stop renting car.
  - List all renting data.

## Build setup

> **Important!** Ts.ED requires Node >= 10, Express >= 4 and TypeScript >= 3.

```batch
# install dependencies
$ npm run i

# For Development
$ npm run dev

# For Production
$ npm run build
$ npm run start
```

You can also use `docker-compose up` to run our app! Don't forget to overwrite the `.env` file.

```batch
# Docker Compose
$ docker-compose up
```
