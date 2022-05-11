const db = require("../DataBase");

class BrandController {
  async create(req, res) {
    try {
      const {brand_name} = req.body
      const sql = `insert into brand (brand_name) values('${brand_name}') returning id;`
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

  async change(req, res) {
    try {
      const {brand_name, id} = req.body

      console.log(brand_name, id)
      const sql = `
                UPDATE brand SET brand_name = '${brand_name}'
                where id = ${id};`
      const response = await db.query(sql)

      res.json(response.rows[0])
    } catch (e) {
      console.log(e)
    }
  }

  async delete(req, res) {
    try {
      const {id} = req.params

      const checkingSQL = `select * from product where brand_id = ${id};`
      const checkingResponse = await db.query(checkingSQL)

      if (checkingResponse.rows.length !== 0) {
        res.json({
          error: 'Есть продукты, связанные с этим брендом'
        })

        return
      }

      const sql = `delete from brand where id = ${id}`
      const response = await db.query(sql)

      res.json(response.rows[0])
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new BrandController()