const { db, query } = require("../database");

module.exports = {
  addTransaction: async (req, res) => {
    const { id_product, product_quantity, productPrice } = req.body;

    idUsers = req.id.user;
    totalPrice = product_quantity * productPrice;

    let addTransactionQuery = `INSERT INTO transaction_product VALUES (null, ${db.escape(
      id_product
    )}, ${db.escape(product_quantity)}, ${db.escape(productPrice)},${db.escape(
      totalPrice
    )}, ${db.escape(idUsers)})`;

    let addTransactionResult = await query(addTransactionQuery);

    return res.status(200).send({
      data: addTransactionResult,
      message: "transaction created!",
      success: true,
    });
  },
  fetchAllTransaction: async (req, res) => {
    try {
      const transactionProducts = await query(
        `SELECT * FROM transaction_product limit 0,9`
      );
      return res.status(200).send(transactionProducts);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};
