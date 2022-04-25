const db = require('../DataBase')

class CategoryController {
  async create(req, res) {
    try {
      const {name} = req.body
      const sql = `insert into category (category_name) values ('${name}') returning id;`
      const response = await db.query(sql)
      const createdCategory = await db.query(`select * from category where id = ${response.rows[0].id}`)
      res.json(createdCategory.rows[0])
    } catch (e) {
      console.log(e)
    }
  }

  async getAll(req, res) {
    try {
      const sql = `select * from category`
      const response = await db.query(sql)

      res.json(response.rows)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new CategoryController()