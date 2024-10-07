const ordersModel = require("./orders.model");

module.exports = {
  Query: {
    orders: () => {
      //  We now don't need to depend on the rootValue for the hard coded data
      // we now going to use the data from our orders model

      return ordersModel.getAllOrders();
    },
  },
};

/* 
The query object of orders resolvers will be merged in with the products resovers by makeExecutableSchema 
in the server. and the result will be from products and orders

*/
