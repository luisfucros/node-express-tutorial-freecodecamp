const Product = require("../models/product.model");
const asyncWrapper = require('../middleware/async')

const getProducts = asyncWrapper(async (req, res) => {
    const products = await Product.find({})
    res.status(200).json(products)
})

const getProduct = asyncWrapper(async (req, res) => {

    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: `No product with id : ${id}` })
    }
    res.status(200).json(product);

});

const createProduct = asyncWrapper(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(200).json(product);
})

const updateProduct = asyncWrapper(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: `No product with id : ${id}` });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
})

const deleteProduct = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: `No product with id : ${id}` });
    }

    res.status(200).json({ message: "Product deleted successfully" });
})

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};