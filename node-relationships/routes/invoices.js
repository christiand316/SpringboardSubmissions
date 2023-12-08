const express = require('express')
const {query} = require("../db")
const ExpressError = require('../expressError')
const invoicesRouter = new express.Router()

async function checkIfCompanyExists(code) {
    try {
        const result = await query(`SELECT code, name, description FROM companies WHERE code = $1`, [code])
        if (result.rows == []) {
            return false
        }
        return true
    } catch (error) {
        throw new Error()
    }
}

invoicesRouter.get("/", async (req, res) => {
    try {
        const result = await query(`SELECT comp_Code, amt, paid, paid_date, id FROM invoices`)
        return res.json(result.rows)
    } catch (e) {
        throw new ExpressError(`Bad request`, 400)
    }
})

invoicesRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const result = await query(`SELECT i.id, 
        i.comp_code, 
        i.amt, 
        i.paid, 
        i.add_date, 
        i.paid_date, 
        c.name, 
        c.description 
 FROM invoices AS i
   INNER JOIN companies AS c ON (i.comp_code = c.code)  
 WHERE id = $1`, [id])
        if (result.rowCount === null) throw new ExpressError(`Invoice not found`, 404)
        //{invoice: {id, amt, paid, add_date, paid_date, company: {code, name, description}}}
    const dataToSend = result.rows.map(data => ({
        invoice: {
            comp_code: data.comp_code,
            id: data.id,
            paid: data.paid,
            add_date: data.add_date,
            amt: data.amt,
            paid_date: data.paid_date
        },
        company: {
            name: data.name,
            description: data.description
        }
    }))
        return res.json(dataToSend)
    } catch (e) {
        if (e instanceof ExpressError) throw e
        throw new ExpressError(`Invoice not found`, 404)
    }
})

invoicesRouter.post("/", async (req, res) => {
    const { comp_code, amt } = req.body
    try {
        const result = await query(`INSERT INTO invoices (comp_Code, amt) VALUES ($1, $2) RETURNING id, comp_Code, amt, paid, paid_date`, [comp_code, amt])
        if (result.rows.length === 0) {
            throw new ExpressError("Not found", 404)
        }
        return res.json(result.rows)
    } catch (e) {
        if (e instanceof ExpressError) throw e
        throw new ExpressError(`Bad request`, 400)
    }
})
invoicesRouter.put("/:id", async (req, res) => {
    const id = req.params.id
    const { amt } = req.body

    const doesExist = await query(`SELECT comp_Code FROM invoices WHERE id = $1`, [id])

    if (doesExist.rows == []) {
        throw new ExpressError(`${id} invoice does not exist`, 404)
    }

    try {
        const result = await query(`UPDATE invoices SET amt=$1 RETURNING comp_Code, amt, paid, paid_date`, [amt])
        if (result.rows == []) {
            throw new Error()
        }
        return res.json(result.rows)
    } catch (e) {
        if (e instanceof ExpressError) {
            throw new ExpressError(e.message, e.status)
        }
        throw new ExpressError(`Bad request`, 400)
    }
})
invoicesRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const result = await query(`DELETE FROM invoices WHERE id = $1`, [id])
        res.json({status: "deleted"})
    } catch (e) {
        throw e
    }
})

module.exports = invoicesRouter