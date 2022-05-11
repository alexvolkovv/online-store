const db = require("../DataBase");

class StockController {
  async create(req, res) {
    try {
      const {stock_name, address} = req.body
      const sql = `insert into stock (stock_name, address) values('${stock_name}', '${address}') returning id;`
      const response = await db.query(sql)
      const createdBrand = await db.query(`select * from stock where id = ${response.rows[0].id}`)

      res.json(createdBrand.rows[0])
    } catch (e) {
      console.log(e)
    }
  }

  async change(req, res) {
    try {
      const {id, stock_name, address} = req.body
      const sql = `
            update stock set stock_name= '${stock_name}', address = '${address}' 
            where id = ${id}`
      const response = await db.query(sql)

      res.json(response.rows[0])
    } catch (e) {
      console.log(e)
    }
  }

  async getAll(req, res) {
    try {
      const sql = `select * from stock`
      const response = await db.query(sql)

      res.json(response.rows)
    } catch (e) {
      console.log(e)
    }
  }

  async delete(req, res) {
    try {
      const {id} = req.params
      const checkSQL = `
        select * from product_stock where stock_id = ${id};
      `
      const responseCheck = await db.query(checkSQL)

      if (responseCheck.rows.length) {
        res.json({
          error: 'На данном складе есть товары.'
        })
        return
      }

      const sql = `delete from stock where id = ${id};`
      const response = await db.query(sql)

      res.json(response.rows[0])
    } catch (e) {
      console.log(e)
    }
  }

}

module.exports = new StockController()