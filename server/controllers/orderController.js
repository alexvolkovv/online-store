const db = require("../DataBase");

class OrderController {
  async getBasketOrder(req, res) {
    try {
      const {id} = req.params
      const sql = `select * from client_order where client_id = ${id} and order_status = 1;`
      const response = await db.query(sql)
      const sqlGettingForCurrentOrder = `
        select p.id, p.article, p.product_name, p.price, p.description, p.category_id, p.brand_id, p.image, 
               max(op.product_count) as product_count, sum(ps.product_count) as max_count
        from product p join ordered_product op on p.id = op.product_id 
        join product_stock ps on p.id=ps.product_id 
        where order_id = ${response.rows[0].id}
        group by p.id;
      `
      const orderedProducts = await db.query(sqlGettingForCurrentOrder)

      res.json({order: response.rows[0], products: orderedProducts.rows})
    } catch (e) {
      console.log(e)
    }
  }

  async getAllOrders(req, res) {
    try {
      const {id} = req.params
      const sql = `select * from client_order join status s on order_status=s.id where client_id = ${id};`
      const response = await db.query(sql)

      res.json(response.rows)
    } catch (e) {
      console.log(e)
    }
  }

  async addProductToOrder(req, res) {
    try {
      const {product, order} = req.body
      const sql = `
                    insert into ordered_product(order_id, product_id, product_count) 
                    values (${order.id}, ${product.id}, ${product.product_count || 1});`
      const response = await db.query(sql)

      res.json(response.rows)
    } catch (e) {
      console.log(e)
    }
  }

  async deleteProductFromOrder(req, res) {
    try {
      const {product, order} = req.body
      const sql = `delete from ordered_product where product_id = ${product.id} and order_id = ${order.id};`
      const response = await db.query(sql)

      res.json(response.rows)
    } catch (e) {
      console.log(e)
    }
  }

  async changeProductCountInOrder(req, res) {
    try {
      const {product, order} = req.body
      const sql = `
          UPDATE ordered_product SET product_count = ${product.product_count}
          where product_id = ${product.id} and order_id = ${order.id};
      `
      const response = await db.query(sql)

      res.json(response.rows)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new OrderController()