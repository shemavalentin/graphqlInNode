const express = require("express");

// Importing the function to build GraphQl Schemas
const { buildSchema } = require("graphql");

// Importing the express-graphql to connect express to graphql schema
// and let's use the destructuring to take the specific library from the library

// const { graphqlHTTP } = require("express-graphql");
const { createYoga } = require("graphql-yoga");

// Starting to build the schema
const schema = buildSchema(`
    type Query{
        product: [Product]
        orders: [ Order ]
    }
    
    type Product {
    id: ID!
    description: String!
    reviews: [Review]
    price: Float!
    }

    type Review {
    rating: Int!
    comment: String
    }

    type Order {
    date: String!
    subtotal: Float!
    items: [OrderItem]
    }

    type OrderItem {
    product: Product!
    quantity: Int!
    }

    `);

// Let's define the root object

const root = {
  products: [
    {
      id: "RedShoe",
      description: "Red shoe",
      price: 42.42,
    },

    {
      id: "bluejean",
      description: "Blue Jean",
      price: 55.55,
    },
  ],

  orders: [
    {
      date: "2005-05-05",
      subtotal: 90.22,
      items: [
        {
          product: {
            id: "redshoe",
            description: "Old Red Shoe",
            price: 45.11,
          },
          quantity: 2,
        },
      ],
    },
  ],
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
