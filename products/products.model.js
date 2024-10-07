// module.exports = [ It an in memory array database of products let's assign it to constant
const products = [
  {
    id: "RedShoe",
    description: "Red shoe",
    price: 42.42,
    reviews: [],
  },

  {
    id: "bluejean",
    description: "Blue Jean",
    price: 55.55,
    reviews: [],
  },
];

// In very large scale project we will have these functions
function getAllProducts() {
  return products;
}

// function to get products by price
function getProductsByPrice(min, max) {
  // by using filter function
  return products.filter((product) => {
    return product.price >= min && product.price <= max;
  });
}

// Function to get a product by ID
function getProductById(id) {
  return products.find((product) => {
    return product.id === id;
  });
}

// Function to add new product
function addNewProduct(id, description, price) {
  const newProduct = {
    id,
    price,
    description,
    reviews: [],
  };
}

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductById,
  addNewProduct,
};
