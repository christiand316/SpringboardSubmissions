const request = require("supertest")
const app = require("./app")
const {query, pool} = require("./db")

beforeEach(async () => {
    await query(`DELETE FROM invoices`, [])
    await query(`DELETE FROM companies`, [])

    await query(`INSERT INTO companies
    VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
           ('ibm', 'IBM', 'Big blue.');
  
  INSERT INTO invoices (comp_Code, amt, paid, paid_date)
    VALUES ('apple', 100, false, null),
           ('apple', 200, false, null),
           ('apple', 300, true, '2018-01-01'),
           ('ibm', 400, false, null);`, [])
})

afterAll(async () => {
    await query(`DELETE FROM invoices`, [])
    await query(`DELETE FROM companies`, [])

    await query(`INSERT INTO companies
    VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
           ('ibm', 'IBM', 'Big blue.');
  
  INSERT INTO invoices (comp_Code, amt, paid, paid_date)
    VALUES ('apple', 100, false, null),
           ('apple', 200, false, null),
           ('apple', 300, true, '2018-01-01'),
           ('ibm', 400, false, null);`, [])
    await pool.end()
})

describe("Company routes", () => {
    it("GET /company", async () => {
        const res = await request(app).get('/company')
        expect(res.body).toEqual([
            {
              code: 'apple',
              name: 'Apple Computer',
              description: 'Maker of OSX.'
            },
            { code: 'ibm', name: 'IBM', description: 'Big blue.' }
          ])
    })
    it("GET /company/ibm", async () => {
        const res = await request(app).get('/company/ibm')
        expect(res.body).toEqual(
            { code: 'ibm', name: 'IBM', description: 'Big blue.' }
          )
    })
    it("POST /company", async () => {
        await request(app).post("/company").send({code: "abc", name: "A Company", description: "a"})
        const res = await request(app).get('/company/abc')
        expect(res.body).toEqual({code: "abc", name: "A Company", description: "a"})
    })
    it("POST /company with slugify", async () => {
        await request(app).post("/company").send({name: "A Company", description: "a"})
        const res = await request(app).get('/company/A-Company')
        expect(res.body).toEqual({code: "A-Company", name: "A Company", description: "a"})
    })
    it("PUT /company/ibm", async () => {
        const res1 = await request(app).put("/company/ibm").send({name: "New data", description: "New and unique"})
        const res2 = await request(app).get('/company/ibm')
        expect(res1.body).toEqual(res2.body)
    })
    it("DELETE /company/ibm", async () => {
        const res1 = await request(app).delete("/company/ibm")
        const res2 = await request(app).get('/company/ibm')
        expect(res1.body).toEqual({ code: 'ibm' })
        expect(res2.body).toEqual("")
    })
})

describe("Invoice routes", () => {
    it("GET /invoices", async () => {
        const res = await request(app).get("/invoices")
        expect(res.body.length).toEqual(4)
    })
    it("GET /invoices/id", async () => {
        const res = await request(app).get("/invoices")
        const id = res.body[0].id
        const res2 = await request(app).get(`/invoices/${id}`)
        expect(res2.body[0].invoice.id).toEqual(id)
    })
    it("POST /invoices", async () => {
        const res = await request(app).post("/invoices").send({comp_code: "ibm", amt: 9.99})
        const id = res.body[0].id
        const res2 = await request(app).get(`/invoices/${id}`)
        expect(id).toEqual(res2.body[0].invoice.id)
    })
    it("PUT /invoices/id", async () => {
        const res = await request(app).get("/invoices")
        const id = res.body[0].id
        const resOriginal = await request(app).get(`/invoices/${id}`)
        await request(app).put(`/invoices/${id}`).send({amt: 50})
        const resUpdated = await request(app).get(`/invoices/${id}`)
        expect(resUpdated.body[0].invoice.amt).toEqual(50)
    })
    it("DELETE /invoices/id", async () => {
        const res = await request(app).get("/invoices")
        const id = res.body[0].id
        const res1 = await request(app).delete(`/invoices/${id}`)
        const res2 = await request(app).get(`/invoices/${id}`)
        expect(res1.body).toEqual({ status: 'deleted' })
        expect(res2.body).toEqual([])
    })
})
