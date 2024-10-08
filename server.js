const path = require("path");
const cors = require("cors");
const express = require("express");

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const { loadFilesSync } = require("@graphql-tools/load-files");

// Taking one function from graphql tools installed by using destructuring

const { makeExecutableSchema } = require("@graphql-tools/schema");

// constant to help us load files.

// const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql")); //loadFilesSynch has been updated

const typesArray = loadFilesSync("**/*", {
  extensions: ["graphql"],
});

// Finding the resovers file by using PATH.JOIN to look inside of the current directory(__dirname)
// then join that with file pattern that lookes inside any subdirectory('**/ for a file that ends in .resolvers.js');

// const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));
// // depricated;

const resolversArray = loadFilesSync("**/*", {
  extensions: ["resolvers.js"],
});

// function to make use of apollo server
async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  // Creating the server object for apollo to handle the typeDefs and resolvers
  const server = new ApolloServer({
    schema,
  });

  // Telling the apollo server to prepare to handle graphql operations
  await server.start();

  // If we want to configure how our server manages CROSS-ORIGIN REQUESTS , we will need to
  // do that using the CORS Middleware.

  app.use(cors());

  // Speaking of middleware, any express server needs to handle JSON in request needs to add a parser
  // for that incoming JSON
  app.use(express.json());

  // Now connect apollo with express
  app.use("/graphql", expressMiddleware(server));

  app.listen(3000, () => {
    console.log("Running GraphQl sever...");
  });
}

startApolloServer();

/*
N.B: For bigger projects, we need to use GraphQl tools to help us split our schema into
parts so that not all logic live in the same files

* THE GRAPHQL TOOLS WITHT THE FUNCTION USED(makeExecutableSchema) is going to help
to modularize/ separate out schema
*/
