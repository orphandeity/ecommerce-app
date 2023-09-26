const productModel = require("../models/product");

class ProductService {
  async find() {
    const products = await productModel.find();
    return products;
  }

  async findByCategoryId(categoryId) {
    const products = await productModel.findByCategoryId(categoryId);
    return products;
  }

  async findById(id) {
    const product = await productModel.findById(id);
    return product;
  }
}

module.exports = new ProductService();
