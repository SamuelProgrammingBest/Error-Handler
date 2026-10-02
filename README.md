# make-errors-known

A lightweight, rule-based error handling package for Express.js applications built with TypeScript.

## Overview

This library helps you centralize error handling in a clean, readable way. It gives you:

- a custom `AppError` class for operational errors
- a configurable global `errorHandler` middleware
- a `tryCatch` wrapper for async route handlers
- rule-based matching for custom error responses

## Features

- Rule-based matching for third-party or application errors
- Custom status codes and response messages
- Clean async error handling without repeated `try/catch`
- Strong TypeScript support

## Installation

Install the package along with Express:

```bash
npm install make-errors-known express
```

> If your app already uses Express, you only need to install `make-errors-known`.

## Quick Start

### 1) Throw a custom application error

```ts
import AppError from "make-errors-known";

const user = await findUserById(req.params.id);

if (!user) {
  throw new AppError("User not found", 404);
}
```

### 2) Register the global error handler

```ts
import express from "express";
import { errorHandler } from "make-errors-known";

const app = express();

app.use(express.json());

app.use(
  errorHandler({
    customRules: [
      {
        match: (err: any) => err.code === "MONGO_DOWN_ERROR",
        statusCode: 503,
        message: "Database is currently offline. Please try again later.",
      },
    ],
    defaultMessage: "An unexpected internal server error occurred.",
  }),
);
```

This middleware checks each custom rule in order. If a rule matches, it responds with the configured status code and message. Otherwise, it falls back to the default error response.

### 3) Wrap async routes with `tryCatch`

```ts
import { tryCatch, AppError } from "make-errors-known";

app.get(
  "/data",
  tryCatch(async (req, res, next) => {
    const data = await fetchSomeDataFromDatabase();

    if (!data) {
      throw new AppError("Data missing", 404);
    }

    res.status(200).json({
      status: "success",
      data,
    });
  }),
);
```

`tryCatch` forwards rejected promises to Express's next error handler so you can keep route code cleaner.

## Example custom rule

```ts
const customRules = [
  {
    match: (err: any) => err.code === "DB_ERROR",
    statusCode: 500,
    message: "Database is currently unavailable.",
  },
];
```

## License

ISC
