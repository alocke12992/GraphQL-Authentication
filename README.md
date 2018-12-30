# GraphQL Authentication with Node.js and Prisma
This simple plug an play starter project will get you up and running with authentication using GraphQL in minutes. This project uses graphql-yoga and Prisma to implement authentication. 

## Building a GraphQL Server with Node.js & Prisma Tutorial
This authentication was built using a tutorial taken from the [How to graphQL website.](https://www.howtographql.com/graphql-js/0-introduction/)

You can visit the website to learn how to build a GraphQL server with graphql-yoga, Node.js & Prisma and best practices for authentication, filtering, pagination and subscriptions.

## Overview

GraphQL is the rising star of backend technologies. It replaces REST as an API design paradigm and is becoming the new standard for exposing the data and functionality of a server. So, with that in mind, it will be imperative to have a simple solution for authentication when using this rising star.

This project uses the following technologies:

* [`graphql-yoga`](https://github.com/prisma/graphql-yoga): Fully-featured GraphQL server with focus on easy setup, performance & great developer experience. It is built on top of [Express](https://expressjs.com/), [`apollo-server`](https://github.com/apollographql/apollo-server), [`graphql-js`](https://github.com/graphql/graphql-js) and more.
* [Prisma](https://www.prisma.io/): Prisma replaces traditional ORMs. Use the Prisma client to implement your GraphQL resolvers and simplify database access 
* [GraphQL Playground](https://github.com/prisma/graphql-playground): "GraphQL IDE" that allows to interactively explore the functionality of a GraphQL API by sending queries and mutations to it. It's somewhat similar to [Postman](https://www.getpostman.com/) which offers comparable functionality for REST APIs. Among other things, a GraphQL Playground...
  * ... auto-generates a comprehensive documentation for all available API operations.
  * ... provides an editor where you can write queries, mutations & subscriptions, with auto-completion(!) and syntax highlighting.
  * ... lets you easily share your API operations.

## Get started

To get the project up and running, clone or download [this repository.](https://github.com/alocke12992/GraphQL-Authentication)

`cd` into `GraphQL-Authentication` and run `yarn` or `npm init` to install the required dependencies.

### Environment Variables
Since this project uses json-webtokens to facilitate authentication, you will need to include an application secret which will be used during the authentication flow to authenticate a user. 

To get started, create a new `.env` file in your root directory, then add the following to it:

```bash
APP_SECRET="YOUR APP SECRET GOES HERE"
```

*Checkout `.env_example` to see an example of how to create your `.env`*

### Prisma Setup
The database layer is powered by [Prisma](https://www.prisma.io/) and is connected to the GraphQL server via the [Prisma client](https://www.prisma.io/docs/prisma-client). 

To learn more about setup, please read the [Prisma documentation ](https://www.prisma.io/docs/1.23/get-started/01-setting-up-prisma-demo-server-JAVASCRIPT-a001/) or check out this page from the [How to GraphQL website](https://www.howtographql.com/graphql-js/4-adding-a-database/). 

### Run the server

To run the server, type `yarn start` or `npm start` while in the root directory of the project.

Once you have started your server, you can access the GraphQL playground at [http://localhost:4000](http://localhost:4000)

## Example Queries

### Signup

#### Query

```js
mutation {
	signup(
    name:"USERNAME",
    email:"exampleEmail@email.com",
    password:"password"
  ){
    token
    user {
      id
      name
      email
    }
  }
}
```

#### Response 

```json
{
  "data": {
    "signup": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanFiOHZvaDFhaXJhMGE1NW9zamQyNmE5IiwiaWF0IjoxNTQ2MTk1NTAxfQ.a76tyWGcf90HuNjJeHMvXFiBNS1ZhlyUuIJApIefpVg",
      "user": {
        "id": "cjqb8voh1aira0a55osjd26a9",
        "name": "USERNAME",
        "email": "exampleEmail@email.com"
      }
    }
  }
}
```

### Login

Prior to executing the Login Query, you must set the HTTP HEADER with the token granted during signup: 

#### HTTP HEADERS

```json
{
  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanFiOHZvaDFhaXJhMGE1NW9zamQyNmE5IiwiaWF0IjoxNTQ2MTk1NTAxfQ.a76tyWGcf90HuNjJeHMvXFiBNS1ZhlyUuIJApIefpVg"
}
```
#### Query

```js
mutation {
  login(email:"exampleEmail@email.com", password:"password"){
    user {
      name
      email
    }
  }
}
```

#### Response
```json
{
  "data": {
    "login": {
      "user": {
        "name": "USERNAME",
        "email": "exampleEmail@email.com"
      }
    }
  }
}
```
