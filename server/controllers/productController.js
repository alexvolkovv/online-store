const uuid = require('uuid')
const path = require('path')
const db = require("../DataBase");

class ProductController {
  async create(req, res) {
    try {
      let {name, article, price, description, category_id, brand_id, info} = req.body
      const {img} = req.files
      let fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      console.log(name, article, price, description, category_id, brand_id, info)
      const sql = `insert into product
                 (article, product_name, price, description, category_id, brand_id, image) values
                     (${article}, '${name}', ${price}, '${description}', ${category_id}, ${brand_id}, '${fileName}') returning id;`
      const response = await db.query(sql)
      const createdProduct = await db.query(`select * from product where id = ${response.rows[0].id}`)
      console.log('good')

      if (info) {
        info = JSON.parse(info)

        for (const infoElement of info) {
          const creatingNewInfo = `insert into product_info (info_name, info_value, product_id) values
                                                            ('${infoElement.id}', '${infoElement.info_value}', ${response.rows[0].id})`
          const complete = await db.query(creatingNewInfo)
        }
      }

      res.json(createdProduct.rows[0])
    } catch (e) {
      console.log(e)
    }
  }

  async getAll(req, res) {
    try {
      let {category_id, brand_id, priceFrom, priceTo, sort} = req.query
      let priceFromNew = priceFrom || 0
      let priceToNew = priceTo || 100000000000000
      sort = sort || 'price'
      let sql = ``
      if (!category_id && !brand_id) {
        sql = `
            select p.id, p.article, p.product_name, p.price, p.description, p.category_id, p.brand_id, p.image,
            coalesce(sum(ps.product_count), 0) as max_count
            from product p
            left join product_stock ps on p.id=ps.product_id
            where price >= ${priceFromNew} and price <= ${priceToNew}
            group by p.id
            order by ${sort};
        `
      }
      if (category_id && !brand_id) {
        sql = `
            select p.id, p.article, p.product_name, p.price, p.description, p.category_id, p.brand_id, p.image,
                   coalesce(sum(ps.product_count), 0) as max_count
            from product p
                     left join product_stock ps on p.id=ps.product_id
            where category_id=${category_id} and price >= ${priceFromNew} and price <= ${priceToNew}
            group by p.id
            order by ${sort};

        `
      }
      if (!category_id && brand_id) {
        sql = `
            select p.id, p.article, p.product_name, p.price, p.description, p.category_id, p.brand_id, p.image,
                   coalesce(sum(ps.product_count), 0) as max_count
            from product p
                     left join product_stock ps on p.id=ps.product_id
            where brand_id=${brand_id} and price >= ${priceFromNew} and price <= ${priceToNew}
            group by p.id
            order by ${sort};
        `
      }
      if (category_id && brand_id) {
        sql = `
            select p.id, p.article, p.product_name, p.price, p.description, p.category_id, p.brand_id, p.image,
                   coalesce(sum(ps.product_count), 0) as max_count
            from product p
                     left join product_stock ps on p.id=ps.product_id
            where brand_id=${brand_id} and category_id=${category_id} and price >= ${priceFromNew} and price <= ${priceToNew}
            group by p.id
            order by ${sort};
        `
      }

      const products = await db.query(sql)
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
                 coalesce(sum(ps.product_count), 0) as max_count
          from product p
                   left join product_stock ps on p.id=ps.product_id
          where p.id = ${id}
          group by p.id;
      `
      const data = await db.query(product)
      const productInfo = `select info_value, c.name as info_name, product_id, c.id from product_info
                                                                                             join characteristic c on info_name = c.id
                           where product_id = ${id}`
      const dataProductInfo = await db.query(productInfo)

      res.json({product: data.rows[0], productInfo: dataProductInfo.rows})
    } catch (e) {
      console.log(e)
    }
  }

  async delete(req, res) {
    try {
      const {id} = req.params

      // Проверка, есть ли заказанные продукты. Если есть, отменить удаление
      const checkingSQL = `
        select * from ordered_product where product_id = ${id};
      `
      const checkingResponse = await db.query(checkingSQL)

      if (checkingResponse.rows.length !== 0) {
        res.json({
          error: 'Данные товары используются в заказах. Их удаление временно невозможно.'
        })
        return
      }

      const sql = `delete from product where id = ${id}`
      const response = await db.query(sql)

      res.json(response)
    } catch (e) {
      console.log(e)
    }
  }

  async update(req, res) {
    try {
      const {id} = req.params
      let {name, article, price, description, category_id, brand_id, info} = req.body
      const img = req.files?.img || null
      let fileName = ''

      if (img) {
        fileName = uuid.v4() + '.jpg'
        await img.mv(path.resolve(__dirname, '..', 'static', fileName))
      }

      console.log(name, article, price, description, category_id, brand_id, info, fileName)

      const sql = `
            UPDATE product 
            SET article = ${article}, product_name = '${name}', description = '${description}', category_id = ${category_id}, 
            brand_id = ${brand_id}, image = ${img ? `'${fileName}'` : 'image'}, price = ${price}
            where id = ${id};
         `
      const response = await db.query(sql)

      if (info) {
        const deletedRows = await db.query(`delete from product_info where product_id = ${id};`)
        info = JSON.parse(info)

        for (const infoElement of info) {
          const creatingNewInfo = `insert into product_info (info_name, info_value, product_id) values
                                                            ('${infoElement.id}', '${infoElement.info_value}', ${id})`
          const complete = await db.query(creatingNewInfo)
        }
      }

      res.json(response.rows[0])
    } catch (e) {
      console.log(e)
    }
  }

}

module.exports = new ProductController()