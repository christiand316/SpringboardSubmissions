import express, {Request, Response} from "express"
import { ItemManager } from "./database"

const instance = ItemManager.getInstance()
const itemRouter = express.Router()

//GET /items, POST /items, GET /items/:name, PATCH /items/:item, DELETE /items/:name

function generateErrorMessage(message: string, obj?: any) {
    if(obj) {
        return ({error: message, obj})
    }
    return ({error: message})
}

//This isn't getting matched at all, so we're just going to hijack the query param of the next .get
// itemRouter.get("/", (req: Request, res: Response) => {
//     res.json(instance?.getAllItems())
// })

itemRouter.get("/:name", (req: Request, res: Response) => {
    const name = req.query.name as string
    if(!name) {
        return res.json(instance?.getAllItems())
    }
    const item = instance?.getItem(name)
    if (item) {
        res.json(item)
    }
    else {
        res.json(generateErrorMessage("Item not found"))
    }
})

itemRouter.post("/items", (req: Request, res: Response) => {
    const data = req.body
    const item = instance?.addOrUpdateItem(data)
    if (item) {
        res.json({added: item})
    }
    else {
        res.json(generateErrorMessage("Item not found or failed to update", data))
    }
})

itemRouter.patch("/:item", (req: Request, res: Response) => {
    const data = req.body
    const item = instance?.updateItem(data)
    if(item) {
        res.json({
            old: data,
            updated: item
        })
    }
    else {
        res.json({
            error: "Failed to update",
            old: data,
            attemptedUpdate: item
        })
    }
})

itemRouter.delete("/:name", (req: Request, res: Response) => {
    const name = req.query.name as string
    const item = instance?.deleteItem(name)
    if(item) {
        res.json({"successfully deleted": item})
    }
    else res.json(generateErrorMessage("Failed to delete record", name))
})

export default itemRouter