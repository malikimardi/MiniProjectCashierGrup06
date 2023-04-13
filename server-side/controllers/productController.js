const { db, query } = require("../database");
const bcrypt = require("bcrypt");

module.exports = {
  addProduct: async (req, res) => {
    const { productName, productPrice, productDesc, id_category } = req.body;

    const idusers = req.user.id;

    const { file } = req;
    const filepath = file ? "/" + file.filename : null;

    let addProductQuery = `INSERT INTO product VALUES (null, ${db.escape(
      productName
    )}, ${db.escape(productPrice)}, ${db.escape(
      productDesc
    )}, null, ${db.escape(filepath)},true,${db.escape(idusers)})`;
    let addProductResult = await query(addProductQuery);

    return res
      .status(200)
      .send({ data: addProductResult, message: "product created!", filepath });
  },

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
  sortProduct: async (req, res) => {
    try {
      const nameParams = toString(req.params.product_name);
      if (req.product.product_name != nameParams) {
        return res.status(400).send("tidak ada product tersebut");
      }
      const sortProducts = await query(
        `SELECT * FROM product where product_name = ${db.escape(nameParams)}`
      );

      return res.status(200).send(sortProducts);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  fetchAllProducts: async (req, res) => {
    try {
      const products = await query(`SELECT * FROM product limit 0,9`);
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
  sortAscProducts: async (req, res) => {
    try {
      const sortAscProducts = await query(`SELECT * FROM product order by asc`);

      return res.status(200).send(sortAscProducts);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  sortDscProducts: async (req, res) => {
    try {
      const sortDscProducts = await query(
        `SELECT * FROM product order by desc`
      );

      return res.status(200).send(sortDscProducts);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  sortDscProducts: async (req, res) => {
    try {
      const sortDscProducts = await query(
        `SELECT * FROM product order by desc`
      );

      return res.status(200).send(sortDscProducts);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};
