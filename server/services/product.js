const productModel = require("../models/product");

class ProductService {
  async find() {
    const products = await productModel.find();
    return products;
  }

  async findById(id) {
    const product = await productModel.findById(id);
    return product;
  }

  async findByCategoryId(categoryId) {
    const products = await productModel.findByCategoryId(categoryId);
    return products;
  }

  async findCategories() {
    const categories = await productModel.findCategories();
    return categories;
  }
}

module.exports = new ProductService();
