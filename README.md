# Auto Driver

Auto Driver is a NodeJS Ts.Ed (Express based) API that aims to control a small renting car app.

You can checkout this example here.

> It is an awesome project based on Ts.ED framework, built to simulate a driver example

See [Ts.ED](https://tsed.io) project for more information.

This API needs to have the following features:

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
$ npm run install

# serve
$ npm run start

# build for production
$ npm run build
$ npm run start
```

You can also use `docker-compose up`

```batch
# Docker Compose
$ docker-compose up
```
