const db = require("../DataBase");

export async function updateOrderStatus(req, res) {
  try {
    const {orderId, newStatus} = req.body
    const sqlCode = `
      UPDATE client_order SET order_status = ${newStatus}
      where id = ${orderId};
    `
    const response = await db.query(sqlCode)

    return response
  } catch (e) {
    console.log('Ошибка обновления статуса продукта', e)
  }
}