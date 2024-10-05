const path = require("path");
const express = require("express");

// Importing the function to build GraphQl Schemas
//const { buildSchema } = require("graphql");

// Importing the express-graphql to connect express to graphql schema
// and let's use the destructuring to take the specific library from the library

// const { graphqlHTTP } = require("express-graphql");
const { createYoga } = require("graphql-yoga");

// importing the function from graphql tools to help in loading orders and products schemas

const { loadFilesSync } = require("@graphql-tools/load-files");

// Taking one function from graphql tools installed by using destructuring

const { makeExecutableSchema } = require("@graphql-tools/schema");

// constant to help us load files

// const typeArray = loadFilesSync(path.join(__dirname, "**/*.graphql")); #loadFilesSynch has been updated

const typeArray = loadFilesSync("**/* ", {
  extensions: ["graphql"],
});

// Let's make Graphql tools schema to replaace the buildSchema function
const schema = makeExecutableSchema({
  // it will take in object and the way the graphql tool calls schema it uses typeDefs
  // and we need to pass in one of the schema. Let's define the schema structure above
  typeDefs: typeArray,
});

// Let's define the root object

const root = {
  products: require("./products/products.model"),
  orders: require("./products/products.model"),
};

// Now how to connect this GraphQl structure to Express? that't where express-graphql comes in

const app = express();

// Adding Express-graphql middleware to express server
app.use(
  "/graphql",
  createYoga({
    // this function passed in (graphqlHTTP) takes some arguments which configure how graphql will respond
    // Now passing in the schema we created and defines the shape of our data
    schema: schema,

    // Important to add the following to make our API useful, which determines the values that will be used in the response of our query

    // rootValue: root, # this also does not exist in express-yoga

    // Enabling Graphiql
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Running GraphQl sever...");
});

/*
N.B: For bigger projects, we need to use GraphQl tools to help us split our schema into
parts so that not all logic live in the same files

* THE GRAPHQL TOOLS WITHT THE FUNCTION USED(makeExecutableSchema) is going to help
to modularize/ separate out schema
*/
