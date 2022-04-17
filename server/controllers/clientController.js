const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const db = require('../DataBase')
const jwt = require('jsonwebtoken')

const generateJWT = (id, first_name, last_name, email, role) => {
  return jwt.sign(
    {id, email, role, first_name, last_name},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class ClientController {
  async registration(req, res, next) {
    try {
      const {first_name, last_name, email, password, role} = req.body

      if (!email || !password) {
        return next(ApiError.badRequest('Некорректный пароль или email'))
      }

      const sqlCheck = `select * from client where email = '${email}'`
      const isClient = await db.query(sqlCheck)


      if (isClient.rows[0]) {
        return next(ApiError.badRequest('Пользователь с такой почтой уже существует'))
      }

      const hashPassword = await bcrypt.hash(password, 5)
      const creatingUser = `insert into client(first_name, last_name, email, "password", role) 
                            values ('${first_name}', '${last_name}', '${email}', '${hashPassword}', 1) returning id`
      const createdUser = await db.query(creatingUser)
      const creatingOrder = `insert into client_order (client_id, order_date, price, order_status) 
                                values (${createdUser.rows[0].id}, now(), 0, 1)`
      const createdOrder = await db.query(creatingOrder)

      const token = generateJWT(createdUser.rows[0].id, first_name, last_name, email, role)
      res.json({token})
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
        return next(ApiError.internal('Пользователь с таким именем не найден'))
      }

      let comparePassword = bcrypt.compareSync(password, user.password)

      if (!comparePassword) {
        return next(ApiError.internal('Пароль не совпадает'))
      }

      const token = generateJWT(user.id, user.first_name, user.last_name, user.email, user.role)
      res.json({token})
    } catch (e) {
      console.log(e)
    }
  }

  async check(req, res, next) {
    const token = generateJWT(req.client.id, req.client.first_name, req.client.last_name, req.client.email, req.client.role)
    return res.json({token})
  }
}

module.exports = new ClientController()