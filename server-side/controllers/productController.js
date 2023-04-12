const { db, query } = require("../database");
const bcrypt = require("bcrypt");

module.exports = {
  fetchAllProducts: async (req, res) => {
    try {
      const products = await query(`SELECT * FROM product`);
      return res.status(200).send(products);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  fetchProduct: async (req, res) => {
    try {
      const idParams = parseInt(req.params.id);
      if (req.product.id !== idParams) {
        return res.status(400).send("tidak ada product tersebut");
      }
      const product = await query(
        `SELECT * FROM product WHERE id_product = ${db.escape(idParams)}`
      );
      return res.status(200).send(product);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  filterProductsByName: async (req, res) => {
    try {
      const nameParams = toString(req.params.product_name);
      if (req.product.product_name != nameParams) {
        return res.status(400).send("tidak ada product tersebut");
      }
      const filterProductsByName = await query(
        `SELECT * FROM product where product_name = ${db.escape(nameParams)}`
      );

      return res.status(200).send(filterProductsByName);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};
