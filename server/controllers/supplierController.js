const db = require("../DataBase");

class SupplierController {

  async getAll(req, res) {
    try {
      const sql = `select * from supplier`
      const response = await db.query(sql)

      res.json(response.rows)
    } catch (e) {
      console.log(e)
    }
  }

  async delete(req, res) {
    try {
      const {id} = req.params
      console.log('Deleting supplier', id)
      const checkSQL = `
        select * from supply where supplier_id = ${id};
      `
      const responseCheck = await db.query(checkSQL)

      if (responseCheck.rows.length) {
        res.json({
          error: 'Есть поставки, связанные с данным поставщиком. Удаление невозомжно '
        })
        return
      }

      const sql = `delete from supplier where id = ${id};`
      const response = await db.query(sql)

      res.json(response.rows[0])
    } catch (e) {
      console.log(e)
    }
  }

  async create(req, res) {
    try {
      const {supplier_name, phone_number} = req.body
      const sql = `insert into supplier (supplier_name, phone_number) values('${supplier_name}', '${phone_number}') returning id;`
      const response = await db.query(sql)
      const createdBrand = await db.query(`select * from supplier where id = ${response.rows[0].id}`)

      res.json(createdBrand.rows[0])
    } catch (e) {
      console.log(e)
      res.json({
        error: 'Неизвестная ошибка',
        msg: e.message
      })
    }
  }

  async change(req, res) {
    try {
      const {id, supplier_name, phone_number} = req.body
      const sql = `
            update supplier set supplier_name= '${supplier_name}', phone_number = '${phone_number}' 
            where id = ${id}`
      const response = await db.query(sql)

      res.json(response.rows[0])
    } catch (e) {
      console.log(e)
      res.json({
        error: 'Неизвестная ошибка',
        msg: e.message
      })
    }
  }
}

module.exports = new SupplierController()