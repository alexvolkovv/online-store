const bcrypt = require('bcrypt')
const db = require('../DataBase')

class ClientController {
  async registration(req, res, next) {
    try {
      const {email, password, role} = req.body

      if (!email || !password) {
        return
      }

      const checkTwin = `select * from client where email = '${email}'`
      const isClient = await db.query(checkTwin)


      if (isClient.rows[0]) {
        res.json({
          error: 'Пользователь с такой почтой уже существует'
        })

        return
      }

      const hashPassword = await bcrypt.hash(password, 5)
      const creatingUserSQL = `insert into client(email, password, role) 
                            values ('${email}', '${hashPassword}', 1) returning id`
      const creatingUser = await db.query(creatingUserSQL)
      const createdUser = await db.query(`select * from client where id = ${creatingUser.rows[0].id}`)

      const creatingOrderSQL = `insert into client_order (client_id, order_date, price, order_status) 
                                values (${creatingUser.rows[0].id}, now(), 0, 1)`
      const createdOrder = await db.query(creatingOrderSQL)

      res.json(createdUser.rows[0])
    } catch (e) {
      console.log(e)
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body
      const userRows = await db.query(`select * from client where email = '${email}'`)
      const user = userRows.rows[0]

      if (!user) {
        res.json({
          error: 'Пользователь с таким именем не найден'
        })

        return
      }

      let comparePassword = bcrypt.compareSync(password, user.password)

      if (!comparePassword) {
        res.json({
          error: 'Пароль не совпадает'
        })

        return
      }

      res.json(user)
    } catch (e) {
      console.log(e)
    }
  }
  async getAll(req, res) {
    try {
      const {id} = req.params
      console.log('id',id)
      const gettingUsers = await db.query(`
            select client.id, email, role, cr.role_name 
            from client 
            join client_role cr ON client."role" = cr.id
            where client.id != ${id}`)
      const users = gettingUsers.rows
      console.log(users)
      res.json(users)
    } catch (e) {

    }
  }

  async changeRole(req, res) {
    try {
      const {id} = req.params
      const {newRole} = req.body

      const update = await db.query(`
            update client
            set role = ${newRole}
            where id = ${id}`)

      res.json(update.rows)
    } catch (e) {

    }
  }
}

module.exports = new ClientController()