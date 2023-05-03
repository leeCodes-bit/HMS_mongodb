# REST API implementation

### 1. Convert rest API of an Hospital Management System from an SQL database(SQLite) to a No-SQL database(mongodb)

This is an app that enables health professional to take record of their patients and perform the basic CRUD operation.

### 2. get the app running

- Run yarn to install all dependencies.
- Run yarn compile to transpile typescript.
- Run yarn dev to start the app.

### 3. Test the app

- Run yarn test

### 4. Tools used

- Express.js
- Mongodb.



### Clarification
- Used `MONGODB` as database
- Implement all functionalities on CRUD
- Implement pagination with limit of 5 values for each page`
- Create Authentication and Authorization  using a middleware function
- Implement Validation for incoming request using  **Joi or Zod**
- Only registered users can access all `endpoints`
- Containerize the app.
- Used mongoDB-compass for local development

### Test Coverage (Test is mandatory. No tests equals zero(0) marks):
- Tested my database using mongodb-memory-server
- Tested all endpoints `(GET, POST, PUT, DELETE)`

### Documentation
- Documented APIs with postman

