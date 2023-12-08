/** User class for message.ly */
const bcrypt = require("bcrypt")
const client = require("../db")
const { BCRYPT_WORK_FACTOR } = require("../config")
const ExpressError = require("../expressError")


/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({ username, password, first_name, last_name, phone }) {
    try {
      const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
      const result = await client.query(
        `INSERT INTO users (
              username,
              password,
              first_name,
              last_name,
              phone,
              join_at,
              last_login_at)
            VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
            RETURNING username, password, first_name, last_name, phone`,
        [username, hashedPassword, first_name, last_name, phone])
        return result.rows[0];
    } catch (e) {
      return e
    }
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    try {
      const result = await client.query(`SELECT password FROM users WHERE username = $1`, [username])
      const user = result.rows[0]
      const compareResult = await bcrypt.compare(password, user.password)
      return compareResult
    } catch (e) {
      return false
    }
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
      const result = await client.query(`UPDATE users SET last_login_at = current_timestamp WHERE username = $1 RETURNING username`, [username])
      if(!result.rows[0]) throw new ExpressError(`User not found`, 404)
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() { 
    try {
      const result = await client.query(`SELECT username, first_name, last_name, phone FROM users`,[])
      return result.rows
      
    } catch (error) {
      return e
    }
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    try {
      const result = await client.query(`SELECT username, first_name, last_name, phone, join_at, last_login_at FROM users WHERE username = $1`, [username])
      const data = result.rows[0]
      if (!data) throw new ExpressError(`User ${username} does not exist`, 404)
      return data
    } catch (e) {
      return e
    }
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    try {
      const doesExist = await this.get(username)
      if(!doesExist) throw new ExpressError(`User does not exist`, 404)

      const results = await client.query(`SELECT m.id,
      m.to_username,
      m.body,
      m.sent_at,
      m.read_at,
      u.first_name,
      u.last_name,
      u.phone
FROM messages AS m
  JOIN users AS u ON m.to_username = u.username
WHERE from_username = $1`, [username])


      const formatted = results.rows.map(res => ({
        id: res.id,
        to_user: {
          username: res.to_username,
          first_name: res.first_name,
          last_name: res.last_name,
          phone: res.phone,
        },
        body: res.body,
        sent_at: res.sent_at,
        read_at: res.read_at,
      }))

      return formatted

    } catch (error) {
      return error
    }
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) { 
    try {
      const doesExist = await this.get(username)
      if(!doesExist) throw new ExpressError(`User does not exist`, 404)
      const results = await client.query(`SELECT m.id,
      m.from_username,
      m.body,
      m.sent_at,
      m.read_at,
      u.first_name,
      u.last_name,
      u.phone
FROM messages AS m
  JOIN users AS u ON m.from_username = u.username
WHERE to_username = $1`, [username])


      const formatted = results.rows.map(res => ({
        id: res.id,
        from_user: {
          username: res.from_username,
          first_name: res.first_name,
          last_name: res.last_name,
          phone: res.phone,
        },
        body: res.body,
        sent_at: res.sent_at,
        read_at: res.read_at,
      }))

      return formatted

    } catch (error) {
      return error
    }
  }
}


module.exports = User;