# Routine Planner

A Routine Planner for a student who do part-time jobs with his studies and also want to make his study schedules seamlessly.

## Tech Stack

**Client:** Typescript, NextJs, TailwindCSS, Tanstack Query, Shadcn

**Server:** Typescript, Node Js, Express Js, Prisma, MongoDb, Swagger, Jest, Supertest

## Run Locally

Clone the project

```bash
  git clone https://github.com/ridoystarlord/Routine-Planner-Backend.git
```

Go to the project directory

```bash
  cd Routine-Planner-Backend
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```

Run Project Using Docker

```bash
  docker compose up --build -d
```

## Running Tests

To run tests, run the following command

```bash
  yarn test
```

## Documentation

[Swagger](http://localhost:5000/api-docs/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

```bash
  NODE_ENV = development
  PORT = 5000
  DATABASE_URL =
  JWT_SECRET = 9gaR1trFUFmiChZJ4Cu92DlcTM1ng8FGo91Q00M176HgG4p5D8zlh2F5Yr8C5L58E6H9mkamJywLX78iE434W7ocd6B7uX7Ze6497bb1wzk8kHg9malnR0prqg9qlY1C
  JWT_EXPIRES_IN = 30d
```

## Build

To build this project use

```bash
  yarn build
```
