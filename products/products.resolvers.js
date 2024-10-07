const productsModel = require("./products.model");

module.exports = {
  Query: {
    products: () => {
      // To get the list of products, we have to pass in parameters like parent
      //   return parent.products; // But thi is not realistic. It can't work in very large app

      return productsModel.getAllProducts();
    },

    productsByPrice: (_, args) => {
      // to return the product price, we have to use the function from product model
      return productsModel.getProductsByPrice(args.min, args.max);
    },

    // Adding a top level resolver function to get product by ID
    product: (_, args) => {
      return productsModel.getProductById(args.id);
    },
  },

  Mutation: {
    addNewProduct: (_, args) => {
      // the body of the function will be to add all arguments
      return productsModel.addNewProduct(args.id, args.description, args.price);
    },

    addNewProductReview: (_, args) => {
      return productsModel.addNewProductReview(
        args.id,
        args.rating,
        args.comment
      );
    },
  },
};
