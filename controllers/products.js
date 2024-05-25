const Product = require("../models/products")
const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }
  if (featured) {
    queryObject.featured = featured;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" }
  }

  let apiData = Product.find(queryObject)

  if (sort) {
    let sortFix = sort.split(",").join(" ")
    apiData = apiData.sort(sortFix)
  }

  if (select) {
    let selectFix = select.split(",").join(" ")
    apiData = apiData.select(selectFix)
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 6;

  let skip = (page - 1) * limit;
  apiData = apiData.skip(skip).limit(limit);

  const Products = await apiData;
  res.status(200).json({ Products , nbHits:myData.length })
}

const getAllProductsTesting = async (req, res) => {
  const Products = await Product.find(req.query).select('name');

  res.status(200).json({Products})
}

module.exports = { getAllProducts, getAllProductsTesting }
