import { GroupController } from "@lib/controllers/GroupController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await GroupController.GetAllGroups(req, res);
      break;
    case "POST":
      await GroupController.CreateGroup(req, res);
      break;
    case "DELETE":
      await GroupController.DeleteGroup(req, res);
      break;
    case "PATCH":
      await GroupController.UpdateGroup(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}
