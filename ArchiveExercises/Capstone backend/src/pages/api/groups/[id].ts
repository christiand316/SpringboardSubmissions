import { GroupController } from "@lib/controllers/GroupController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await GroupController.GetGroup(req, res);
      break;
    case "POST":
      await GroupController.CreateGroup(req, res);
      break;
    case "PATCH":
      await GroupController.UpdateGroup(req, res);
    case "DELETE":
      await GroupController.DeleteGroup(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}
