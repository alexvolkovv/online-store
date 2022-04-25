const uuid = require('uuid')
const path = require('path')
const db = require("../DataBase");

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
      const createdProduct = await db.query(`select * from product where id = ${response.rows[0].id}`)

      if (info) {
        info = JSON.parse(info)
        info.forEach((item) => {
          const creatingNewInfo = `insert into product_info (info_name, info_value, product_id) values
                                                            ('${item.name}', '${item.value}', ${response.rows[0].id})`
        })
      }

      res.json(createdProduct.rows[0])
    } catch (e) {
      console.log(e)
    }
  }

  async getAll(req, res) {
    try {
      let {category_id, brand_id} = req.query
      let sql = ``
      let sqlForCount
      if (!category_id && !brand_id) {
        sql = `
            select p.id, p.article, p.product_name, p.price, p.description, p.category_id, p.brand_id, p.image,
            sum(ps.product_count) as max_count
            from product p
            join product_stock ps on p.id=ps.product_id
            group by p.id;
        `
      }
      if (category_id && !brand_id) {
        sql = `
            select p.id, p.article, p.product_name, p.price, p.description, p.category_id, p.brand_id, p.image,
                   sum(ps.product_count) as max_count
            from product p
                     join product_stock ps on p.id=ps.product_id
            where category_id=${category_id}
            group by p.id;
        `
        sqlForCount = `select count(*) from product where category_id=${category_id}`
      }
      if (!category_id && brand_id) {
        sql = `
            select p.id, p.article, p.product_name, p.price, p.description, p.category_id, p.brand_id, p.image,
                   sum(ps.product_count) as max_count
            from product p
                     join product_stock ps on p.id=ps.product_id
            where brand_id=${brand_id}
            group by p.id;
        `
        sqlForCount = `select count(*) from product where brand_id=${brand_id}`
      }
      if (category_id && brand_id) {
        sql = `
            select p.id, p.article, p.product_name, p.price, p.description, p.category_id, p.brand_id, p.image,
                   sum(ps.product_count) as max_count
            from product p
                     join product_stock ps on p.id=ps.product_id
            where brand_id=${brand_id} and category_id=${category_id}
            group by p.id;
        `
        sqlForCount = `select count(*) from product where brand_id=${brand_id} and category_id=${category_id}`
      }

      const products = await db.query(sql)
      // const count = await db.query(sqlForCount)

      res.json(products.rows)
    } catch (e) {
      console.log(e)
    }
  }

  async getOne(req, res) {
    try {
      const {id} = req.params
      const product = `
          select p.id, p.article, p.product_name, p.price, p.description, p.category_id, p.brand_id, p.image,
                 sum(ps.product_count) as max_count
          from product p
                   join product_stock ps on p.id=ps.product_id
          where p.id = ${id}
          group by p.id;
      `
      const data = await db.query(product)
      const productInfo = `select * from product_info where product_id = ${id}`
      const dataProductInfo = await db.query(productInfo)
      const productCount = await db.query(`select sum(product_count) from product_stock where product_id = ${id};`)

      res.json({product: data.rows[0], productInfo: dataProductInfo.rows})
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new ProductController()