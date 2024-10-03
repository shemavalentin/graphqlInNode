const express = require("express");

// Importing the function to build GraphQl Schemas
const { buildSchema } = require("graphql");

// Importing the express-graphql to connect express to graphql schema
// and let's use the destructuring to take the specific library from the library

const { graphqlHTTP } = require("express-graphql");

// Starting to build the schema
const schema = buildSchema(`
    type Query{
    description: String
    price: Float
    }
    `);

// Let's define the root object
const root = {
  description: "Red Shoe",
  price: 42.42,
};
// Now how to connect this GraphQl structure to Express? that't where express-graphql comes in

const app = express();

// Adding Express-graphql middleware to express server
app.use(
  "/graphql",
  graphqlHTTP({
    // this function passed in (graphqlHTTP) takes some arguments which configure how graphql will respond
    // Now passing in the schema we created and defines the shape of our data
    schema: schema,
    rootValue: root,

    // Important to add the following to make our API useful, which determines the values that will be used in the response of our query
  })
);

app.listen(3000, () => {
  console.log("Running GraphQl sever...");
});
