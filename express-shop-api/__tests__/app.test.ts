import request from "supertest";
import { app } from "../src/app";

describe("Successfully routes and accesses itemsRoute", () => {
    test("Get default item", async () => {
        const res = await request(app).get("/items")
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(
            [{
                name: "Default",
                price: 12.15
            }]
        )
    })
    test("Create, get, update, get item", async () => {
        const data = {name: "Eggrolls", price: 12.99}
        const res = await request(app).post("/items").send(data)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(data)
        
        const res2 = await request(app).get("/items?name=Eggrolls")
        expect(res2.body).toEqual(data)

        const data2 = {name: "Eggrolls", price: 11.99}
        const res3 = await request(app).patch("/items").send(data2)
        expect(res3.body).toEqual({
                old: data,
                updated: data2
        })
    })
})