import { UserController } from "@lib/controllers/UserController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        await UserController.getUserGroups(req, res)
    }
    else {
        res.status(405).end()
    }
}
