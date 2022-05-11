const db = require("../DataBase");

class CharacteristicsController {
  async create(req, res) {
    try {
      const {name} = req.body
      const sql = `insert into characteristic (name) values('${name}') returning id;`
      const response = await db.query(sql)
      const createdBrand = await db.query(`select * from characteristic where id = ${response.rows[0].id}`)

      res.json(createdBrand.rows[0])
    } catch (e) {
      console.log(e)
      res.json({
        error: e
      })
    }
  }

  async change(req, res) {
    try {
      const {name, id} = req.body
      const sql = `update characteristic set name = '${name}' where id = ${id}`
      const response = await db.query(sql)

      res.json(response.rows[0])
    } catch (e) {
      console.log(e)
      res.json({
        error: e
      })
    }
  }

  async delete(req, res) {
    try {
      const {id} = req.params
      // Проверка: есть ли продукты в данной категории. Если есть - отменяем удаление
      const checkSQL = `
        select * from product_info where info_name = ${id};
      `
      const checkingResponse = await db.query(checkSQL)

      if (checkingResponse.rows.length !== 0 ) {
        res.json({
          error: 'Данная характеристика используется в товарах'
        })

        return
      }

      const sql = `delete from characteristic where id = ${id}`
      const response = await db.query(sql)

      res.json(response.rows[0])
    } catch (e) {
      console.log(e)
    }
  }

  async getAll(req, res) {
    try {
      const sql = `select * from characteristic`
      const response = await db.query(sql)

      res.json(response.rows)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new CharacteristicsController()