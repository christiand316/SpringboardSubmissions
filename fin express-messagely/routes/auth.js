const express = require("express")
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const ExpressError = require("../expressError")

const router = new express.Router()

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body
    try {
        if (!username || !password) throw new ExpressError(`Didn't provide username and/or password`, 400)
        if (await User.authenticate(username, password)) {
            const token = jwt.sign({ username }, SECRET_KEY)
            await User.updateLoginTimestamp(username)
            return res.json({token})
        }
        else throw new ExpressError(`User credentials do not match`)
    } catch (error) {
        return next(error)
    }
})


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post("/register", async (req, res, next) => {
    try {
        const user = await User.register(req.body)
        const token = jwt.sign({ username: user.username }, SECRET_KEY)
        await User.updateLoginTimestamp(user.username)
        return res.json({ token })

    } catch (error) {
        return next(error)
    }

})

module.exports = router