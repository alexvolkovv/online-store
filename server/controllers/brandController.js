const db = require("../DataBase");

class BrandController {
  async create(req, res) {
    try {
      const {name} = req.body
      const sql = `insert into brand (brand_name) values('${name}') returning id;`
      const response = await db.query(sql)
      const createdBrand = await db.query(`select * from brand where id = ${response.rows[0].id}`)

      res.json(createdBrand.rows[0])
    } catch (e) {
      console.log(e)
    }
  }

  async getAll(req, res) {
    try {
      const sql = `select * from brand`
      const response = await db.query(sql)

      res.json(response.rows)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new BrandController()