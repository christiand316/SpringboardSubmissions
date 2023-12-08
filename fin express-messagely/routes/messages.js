const express = require("express")
const { ensureCorrectUser } = require("../middleware/auth")
const Message = require("../models/message")
const ExpressError = require("../expressError")
const router = new express.Router()




/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
*
* Make sure that the currently-logged-in users is either the to or from user.
*
**/

router.get(`/:id`, ensureCorrectUser, async (req, res, next) => {
    try {
        const data = await Message.get(req.params.id)
        return res.json(data)
    } catch (error) {
        return next(error)
    }
})



/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post(`/`, ensureCorrectUser, async (req, res, next) => {
    try {
        const {to_username, body} = req.body
        if (!to_username || !body) throw new ExpressError(`Failed to provide find to_username or body`, 400)
        const data = await Message.get({to_username, body})
        return res.json(data)
    } catch (error) {
        return next(error)
    }
})


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

module.exports = router