const db = require('../DataBase')

class CategoryController {
  async create(req, res) {
    try {
      const {category_name} = req.body

      const sql = `insert into category (category_name) values ('${category_name}') returning id;`
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

  async change(req, res) {
    try {
      const {category_name, id} = req.body

      console.log(category_name, id)
      const sql = `
                UPDATE category SET category_name = '${category_name}'
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
      // Проверка: есть ли продукты в данной категории. Если есть - отменяем удаление
      const checkingProductsSQL = `
        select * from product where category_id = ${id};
      `
      const checkingResponse = await db.query(checkingProductsSQL)

      if (checkingResponse.rows.length !== 0 ) {
        res.json({
          error: 'В данной категории уже имеются продукты'
        })

        return
      }

      const sql = `delete from category where id = ${id}`
      const response = await db.query(sql)

      res.json(response.rows[0])
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new CategoryController()