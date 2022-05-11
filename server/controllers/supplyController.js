const db = require("../DataBase");

class SupplyController {

  async getAll(req, res) {
    try {
      let sql = `
          select sp.id, sp.stock_id, sp.price, sp.supply_date, sp.supplier_id, s.stock_name, s.address,
          s2.supplier_name, s2.phone_number
          from supply sp
          join stock s on sp.stock_id = s.id 
          join supplier s2 on sp.supplier_id = s2.id
        `

      const response = await db.query(sql)

      res.json(response.rows)
    } catch (e) {
      console.log(e)
    }
  }

  async getOne(req, res) {
    try {
      let {id} = req.params
      let sql = `
          select sp.id, sp.stock_id, sp.price, sp.supply_date, sp.supplier_id, s.stock_name, s.address,
          s2.supplier_name, s2.phone_number
          from supply sp
          join stock s on sp.stock_id = s.id 
          join supplier s2 on sp.supplier_id = s2.id
          where sp.id = ${id}
        `

      const response = await db.query(sql)
      let productsSql = `
        select ps.supply_id, ps.product_id, ps.price, ps.product_count, p.product_name
        from product_supply ps 
        join product p on ps.product_id = p.id
        where ps.supply_id = ${id}
      `
      const products = await db.query(productsSql)

      res.json({supply: response.rows[0], products: products.rows})
    } catch (e) {
      console.log(e)
    }
  }

  async delete(req, res) {
    try {
      const {id} = req.params
      //Получем удаляемую поставку
      const gettingSupply = await db.query(`select * from supply where id = ${id}`)
      const supply = gettingSupply.rows[0]
      //Получаем товары в поставке
      const gettingProductsSupply = await db.query(`select * from product_supply where supply_id = ${id};`)
      const supplyProducts = [...gettingProductsSupply.rows]

      // Удалим каждый товар со склада. Если товара по какой то причине меньше, то удалим оставшуюся часть.
      for (const supplyProduct of supplyProducts) {
        const gettingProductOnStock = await db.query(`
                    select * from product_stock
                    where product_id = ${supplyProduct.product_id} and stock_id = ${supply.stock_id}`
        )
        const productOnStock = gettingProductOnStock.rows[0]
        let decreasingSql = ``

        if (supplyProduct.product_count > productOnStock.product_count) {
          decreasingSql = `
            update product_stock 
            set product_count = 0
            where product_id = ${supplyProduct.product_id} and stock_id = ${supply.stock_id}  
          `
        } else {
          decreasingSql = `
            update product_stock 
            set product_count = product_count - ${supplyProduct.product_count}
            where product_id = ${supplyProduct.product_id} and stock_id = ${supply.stock_id}  
          `
        }

        await db.query(decreasingSql)
      }


      // const checkSQL = `
      //   select * from supply where supplier_id = ${id};
      // `
      // const responseCheck = await db.query(checkSQL)
      //
      // if (responseCheck.rows.length) {
      //   res.json({
      //     error: 'Есть поставки, связанные с данным поставщиком. Удаление невозомжно '
      //   })
      //   return
      // }

      const sql = `delete from supply where id = ${id};`
      const response = await db.query(sql)

      res.json(response.rows[0])
    } catch (e) {
      console.log(e)
      res.json({
        error: 'Ошибка'
      })
    }
  }

  async create(req, res) {
    try {
      const {supply, products, info} = req.body
      console.log(supply, products, info)
      // добавляем поставку
      const sql = `
        insert into supply (stock_id, price, supply_date, supplier_id) 
        values (${info.stock.id}, ${supply.price}, '${supply.supply_date}', ${info.supplier.id}) returning id
      `
      const response = await db.query(sql)
      const createdSupply = await db.query(`select * from supply where id = ${response.rows[0].id}`)

      // Добавление новых товаров на склад.
      for (const product of products) {
        //Есть ли данный продукт уже на складе
        const searchingProductSQL = `
            select * from product_stock where stock_id = ${info.stock.id} and product_id = ${product.product_id}
        `
        const responseCheck = await db.query(searchingProductSQL)

        console.log(responseCheck.rows)
        let addingSQL = ``

        //если на складе уже есть товар, то увеличим его количество. в другом случае добавим
        if (responseCheck.rows.length !== 0) {
          addingSQL = `
            update product_stock 
            set product_count = product_count + ${product.product_count} 
            where product_id = ${product.product_id} and stock_id = ${info.stock.id} 
          `
        } else {
          addingSQL = `
            insert into product_stock (stock_id, product_id, product_count) 
            values (${info.stock.id}, ${product.product_id}, ${product.product_count})
          `
        }

        console.log(addingSQL)
        await db.query(addingSQL)

        //  Добавление связи между товаром и поставкой

        console.log(createdSupply)
        const createProductSupplySQL = `
          insert into product_supply (supply_id, product_id, price, product_count) 
          values (${createdSupply.rows[0].id}, ${product.product_id}, ${product.price}, ${product.product_count})
        `
        await db.query(createProductSupplySQL)
      }

      res.json(createdSupply.rows[0])
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
      // supply : {price, supply_date, id}
      // info : {
      //    stock: {id},
      //    supplier: {id}
      // }
      // products : [
      //  {supply_id, product_id, price, product_count, product_name}
      //
      // ]
      const {supply, products, info} = req.body

      console.log(supply)
      console.log(products)
      console.log(info)

      const updateSupplySQL = `
            update supply set stock_id = ${info.stock.id}, price = ${supply.price}, supply_date = '${supply.supply_date}', 
            supplier_id  = ${info.supplier.id}
            where id = ${supply.id}`
      const gettingOldValues = `
        select * from supply where id = ${supply.id}
      `
      console.log('go')
      // Получаем старую поставку и обновляем её
      const oldSupply = await db.query(gettingOldValues)
      const response = await db.query(updateSupplySQL)

      const deletingProductsSQL = `
      select * from product_supply where supply_id = ${supply.id};
      `
      const deletingProducts = await db.query(deletingProductsSQL)

      for (const product of deletingProducts.rows) {
        const deletingSQL = `delete from product_supply where supply_id = ${supply.id} and product_id = ${product.product_id}`
        const updateProductCount = `
          update product_stock 
          set product_count = product_count - ${product.product_count} 
          where product_id = ${product.product_id} and stock_id = ${oldSupply.rows[0].stock_id} 
        `
        await db.query(deletingSQL)
        await db.query(updateProductCount)
      }


      for (const product of products) {
        const checkingSQL = `
            select * from product_stock 
            where product_id = ${product.product_id} and stock_id = ${info.stock.id}
        `
        const checkedValues = await db.query(checkingSQL)

        let updatingProductCountStockSQL = ''
        if (checkedValues.rows.length) {
          updatingProductCountStockSQL = `
          update product_stock 
          set product_count = product_count + ${product.product_count} 
          where product_id = ${product.product_id} and stock_id = ${info.stock.id} 
          `
        } else {
          updatingProductCountStockSQL = `
            insert into product_stock(stock_id, product_id, product_count) values 
            (${info.stock.id}, ${product.product_id}, ${product.product_count})
          `
        }

        await db.query(updatingProductCountStockSQL)

        const creatingProductSupply = `
          insert into product_supply(supply_id, product_id, price, product_count) values 
          (${supply.id}, ${product.product_id}, ${product.price}, ${product.product_count})
        `
        await db.query(creatingProductSupply)
        console.log('good')

      }

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

module.exports = new SupplyController()