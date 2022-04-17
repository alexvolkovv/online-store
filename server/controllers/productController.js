const uuid = require('uuid')
const path = require('path')
const db = require("../DataBase");
const ApiError = require("../error/ApiError");

class ProductController {
  async create(req, res, next) {
    try {
      let {name, article, price, description, category_id, brand_id, info} = req.body
      const {img} = req.files
      let fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const sql = `insert into product
                 (article, product_name, price, description, category_id, brand_id, image) values
                     (${article}, '${name}', ${price}, '${description}', ${category_id}, ${brand_id}, '${fileName}') returning id;`
      const response = await db.query(sql)

      if (info) {
        info = JSON.parse(info)
        info.forEach((item) => {
          const creatingNewInfo = `insert into product_info (info_name, info_value, product_id) values
                                                            ('${item.name}', '${item.value}', ${response.rows[0].id})`
        })
      }

      res.json(response.rows[0])
    } catch (e) {
      console.log(e)
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    try {
      let {category_id, brand_id, limit, page} = req.query
      page = page || 1
      limit = limit || 9
      let offset = page * limit - limit
      let sql = ``
      let sqlForCount
      if (!category_id && !brand_id) {
        sql = `select * from product limit ${limit} offset ${offset}`
        sqlForCount = `select count(*) from product`
      }
      if (category_id && !brand_id) {
        sql = `select * from product where category_id=${category_id} limit ${limit} offset ${offset}`
        sqlForCount = `select count(*) from product where category_id=${category_id}`
      }
      if (!category_id && brand_id) {
        sql = `select * from product where brand_id=${brand_id} limit ${limit} offset ${offset}`
        sqlForCount = `select count(*) from product where brand_id=${brand_id}`
      }
      if (category_id && brand_id) {
        sql = `select * from product where brand_id=${brand_id} and category_id=${category_id} limit ${limit} offset ${offset}`
        sqlForCount = `select count(*) from product where brand_id=${brand_id} and category_id=${category_id}`
      }

      const products = await db.query(sql)
      const count = await db.query(sqlForCount)

      res.json({products: products.rows, count: count.rows[0].count})
    } catch (e) {
      console.log(e)
      res.json(ApiError.badRequest(e.message))
    }
  }

  async getOne(req, res) {
    try {
      const {id} = req.params
      const product = `select * from product where id = ${id};`
      const data = await db.query(product)
      const productInfo = `select * from product_info where product_id = ${id}`
      const dataProductInfo = await db.query(productInfo)

      res.json({product: data.rows, productInfo: dataProductInfo.rows})
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new ProductController()