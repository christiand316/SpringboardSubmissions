const express = require('express')
const {query} = require("../db")
const ExpressError = require('../expressError')
const { default: slugify } = require('slugify')
const companyRouter = new express.Router()

// app.get("/", async (req, res) => {
//     const result = await query(`SELECT * FROM companies`)
//     return res.json(result.rows)
//   })

companyRouter.get("/", async (req, res, next) => {
    try {
        const result = await query(`SELECT code, name, description FROM companies`)
        res.json(result.rows)
    } catch (e) {
        return next(new ExpressError(`Internal service failure`, 500))
    }
})

companyRouter.get("/:code", async (req, res, next) => {
    try {
        const code = req.params.code
        const result = await query(`SELECT code, name, description FROM companies WHERE code = $1`, [code])
        res.json(result.rows[0])
    } catch (e) {
        return next(new ExpressError(`Company ${code} not found`, 404))
    }
})

companyRouter.post("/", async (req, res, next) => {
    let {code, name, description} = req.body
    if (!code) {code = slugify(name)}
    try {
        console.log(code)
        const result = await query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`, [code, name, description])
        res.json(result.rows[0])
    } catch (e) {
        return next(new ExpressError(`Failed to insert ${code}, ${name}, ${description}`, 500) )
    }
})

companyRouter.put("/:code", async (req, res, next) => {
    const code = req.params.code
    const {name, description} = req.body
    try {
        const result = await query(`UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description`, [name, description, code])
        if (result.rowCount === 0) throw new Error()
        res.json(result.rows[0])
    } catch (e) {
        return next (new ExpressError(`Failed to update ${code}, ${name}, ${description}`, 500))
    }
})

companyRouter.delete("/:code", async (req, res, next) => {
    const code = req.params.code
    try {
        const res1 = await query(`SELECT code, name, description FROM companies WHERE code = $1`, [code])
        if (res1.rowCount === 0) return next(new ExpressError(`Company ${code} does not exist`, 404)) 

        const result = await query(`DELETE FROM companies WHERE code=$1 RETURNING code`, [code])
        res.json(result.rows[0])
    } catch (e) {
        return next(new ExpressError(`Company ${code} does not exist}`, 404))
    }
})

companyRouter.all("/*", async (req, res, next) => {
    return next(new ExpressError("Didn't match any routes", 404))
})

module.exports = companyRouter