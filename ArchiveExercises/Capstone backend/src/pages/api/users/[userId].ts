import { UserController } from "@lib/controllers/UserController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            await UserController.GetUser(req, res)
            break
        case "PATCH":
            await UserController.UpdateUser(req, res)
            break
        case "DELETE":
            await UserController.DeleteUser(req, res)
            break
        default:
            res.status(405).end()
            break
    }
}
