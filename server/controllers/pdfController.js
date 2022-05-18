const db = require("../DataBase");
const pdf = require('html-pdf');
const financialHtml = require("../html/financialHtml");
const Path = require("path");

class PdfController {
  async getFinancial(req, res) {
    try {
      const {year} = req.params

      console.log(year)
      const yearn = await db.query(`
        select sum(products.count) from (select sum(op.product_count) * p.price as count, co.order_date from ordered_product op 
        join client_order co on op.order_id = co.id
        join product p on op.product_id = p.id
        where co.order_status = 8 and co.order_date > '${year}-01-01'
        group by p.id, co.order_date) as products
      `)
      const cost = await db.query(`
        select sum(full_prices.full_sum) from (select sum(supplying_products.avg_price) * supplying_products.count as full_sum 
        from (
        select avg(ps.price) as avg_price, s.supply_date, sum(ps.product_count) as count 
        from product_supply ps 
        join supply s on ps.supply_id = s.id 
        where s.supply_date > '${year}-01-01'
        group by ps.product_id, s.supply_date
        ) as supplying_products 
        group by supplying_products.count) as full_prices 
      `)
      let resultHtml = financialHtml(year, yearn.rows[0].sum, cost.rows[0].sum)

      pdf.create(resultHtml, {}).toFile('pdf/financial.pdf', (err) => {
        if (err) {
          console.log('не создалась пдфка')
        }
      })

      res.sendFile(Path.resolve(__dirname, '..', 'pdf/financial.pdf'))
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new PdfController()