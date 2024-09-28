const Product = require('../models/product.model')
const { CustomError } = require('../errors/custom-error')

const getProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
}

const getProduct = async (req, res, next) => {

    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product) {
      throw new CustomError(`No product with id : ${id}`)
    }
    res.status(200).json(product)

}

const createProduct = async (req, res) => {
    const product = await Product.create(req.body)
    res.status(200).json(product);
}

const updateProduct = async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body)

    if (!product) {
      throw new CustomError(`No product with id : ${id}`)
    }

    const updatedProduct = await Product.findById(id)
    res.status(200).json(updatedProduct);
}

const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw new CustomError(`No product with id : ${id}`)
    }

    res.status(200).json({ message: "Product deleted successfully" })
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};