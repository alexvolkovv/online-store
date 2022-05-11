const db = require("../DataBase");

function f() {
  
}

class OrderController {
  async getBasketOrder(req, res) {
    try {
      const {id} = req.params
      const sql = `select * from client_order where client_id = ${id} and order_status = 1;`
      const response = await db.query(sql)
      const sqlGettingForCurrentOrder = `
        select p.id, p.article, p.product_name, p.price, p.description, p.category_id, p.brand_id, p.image, 
               max(op.product_count) as product_count, sum(ps.product_count) as max_count
        from product p 
        join ordered_product op on p.id = op.product_id 
        join product_stock ps on p.id=ps.product_id 
        where order_id = ${response.rows[0]?.id}
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
      const sql = `
          select co.id, co.client_id, co.order_date, co.price, co.order_status, s.status_name 
          from client_order co 
          join status s on co.order_status = s.id
          where co.order_status != 1 and co.client_id = ${id};
      `

      const response = await db.query(sql)
      console.log(response.rows)

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

  async confirmOrder(req, res) {
    try {
      const {products, order} = req.body
      const blockedProducts = []

      for (let i = 0; i < products.length; i++) {
        const isStock = `select sum(product_count) from product_stock ps where ps.product_id = ${products[i].id} group by product_id;`
        const response = await db.query(isStock)
        if (+response.rows[0].sum === 0 || +response.rows[0].sum < +products[i].product_count) {
          blockedProducts.push({...products[i], neededCount: response.rows[0].sum})
        }
      }

      console.log('Blocked products', blockedProducts)

      if (blockedProducts.length !== 0) {
        res.json({
          error: 'Некоторых продуктов недостаточно на складе',
          blockedProducts
        })

        return
      }

      for (let i = 0; i < products.length; i++) {
        let count = products[i].product_count
        const stocksForProduct = await db.query(`select * from product_stock ps where product_id = ${products[i].id};`)

        console.log('stocks', stocksForProduct.rows)
        console.log('count', count)
        for (const stock of stocksForProduct.rows) {
          console.log('перед иф')
          console.log(stock)
          if (+stock.product_count >= +count) {
            console.log('попали в иф')
            console.log('Все свойства:', products[i].id, stock.id, count)
            console.log(stock)
            const changeProductCountInStock = await db.query(`
                  UPDATE product_stock SET product_count = product_count - ${count}
                  where product_id = ${products[i].id} and stock_id = ${stock.stock_id};`
            )
            console.log('succes')

            break;
          }
          console.log('после иф')


          const changeProductCountInStock = await db.query(`
                UPDATE product_stock SET product_count = product_count - product_count
                where product_id = ${products[i].id} and stock_id = ${stock.stock_id};`
          )
          console.log('succes')
        }
      }

      const checkedProducts = []
      for (const product of products) {
        const productFromDB = await db.query(`select * from product where id = ${product.id}`)
        checkedProducts.push({...productFromDB.rows[0], product_count: product.product_count})
      }

      let orderPrice = checkedProducts.reduce((prev, current) => {
        return prev + (+current.price * current.product_count)
      }, 0)

      const changeOrderStatus = await db.query(`
            UPDATE client_order SET order_status = 2, price = ${orderPrice}, order_date = Now()
            where id = ${order.id};
      `)

      const newOrder = await db.query(`
        insert into client_order (client_id, order_date, price, order_status)
        values (${order.client_id}, now(), 0, 1) returning id`
      )
      const getOrder = await db.query(`select * from client_order where id=${newOrder.rows[0].id}`)
      res.json(getOrder.rows[0])

    } catch (e) {
      console.log(e)
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const {orderId, newStatus} = req.body
      const sqlCode = `
      UPDATE client_order SET order_status = ${newStatus}
      where id = ${orderId};
      `

      const response = await db.query(sqlCode)

      res.json(response)
    } catch (e) {
      console.log('Ошибка обновления статуса продукта', e)
    }
  }
  async getProductsFromOrder(req, res) {
    const {orderId} = req.params
    try {
      const sqlCode = `
      select * from ordered_product op 
      join product p on op.product_id = p.id
      where order_id = ${orderId};
    `
      const response = await db.query(sqlCode)

      res.json(response.rows)
    } catch (e) {
      console.log(e)
    }
  }

  async getOrdersForAdmin(req, res) {
    const sqlCode = `
        select co.id, co.order_status, s.status_name, co.order_date, co.price, c.email from client_order co
        join client c on co.client_id = c.id
        join status s on co.order_status = s.id
        where order_status != 1
    `
    const response = await db.query(sqlCode)

    console.log(response.rows)

    res.json(response.rows)
  }
}

module.exports = new OrderController()