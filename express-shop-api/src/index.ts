import express, { Request, Response } from 'express';
import itemRouter from './itemsRoute';

const app = express()


//GET /items, POST /items, GET /items/:name, PATCH /items/:item, DELETE /items/:name
app.use(express.json())

app.all("/items", itemRouter)

app.all("/", (_, res: Response) => {
    res.json({error: "Your request didn't match anything."})
})


app.listen(3000, () => {"Now listening"})