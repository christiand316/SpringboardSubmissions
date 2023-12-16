import prisma from "@p/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { object, z } from "zod";
import ErrorHandler from "./ErrorHandlers";
import { GroupUpdateSchema } from "@lib/schemas/GroupSchemas";
import { GroupServices } from "@lib/services/GroupServices";

export const GroupController = {
  async GetAllGroups(req: NextApiRequest, res: NextApiResponse) {
    const groups = await GroupServices.GetAllGroups();
    return res.status(200).json(groups);
  },
  async GetGroup(req: NextApiRequest, res: NextApiResponse) {
    try {
      const parsedId = await z.string().uuid().parseAsync(req.query);
      const group = await GroupServices.GetGroupById(parsedId);
      return res.status(200).json(group);
    } catch (e) {
      const error = await ErrorHandler(req, res, e);
      return error;
    }
  },
  async CreateGroup(req: NextApiRequest, res: NextApiResponse) {
    try {
      const groupData = await GroupUpdateSchema.parseAsync(req.body);
      const group = await GroupServices.CreateGroup(groupData);
      return res.status(200).json(group);
    } catch (e) {
      const error = await ErrorHandler(req, res, e);
      return error;
    }
  },
  async DeleteGroup(req: NextApiRequest, res: NextApiResponse) {
    try {
      const parsedId = await z.string().uuid().parseAsync(req.query);
      const group = await GroupServices.DeleteGroup(parsedId);
      return res.status(200).json(group);
    } catch (e) {
      const error = await ErrorHandler(req, res, e);
      return error;
    }
  },
  async UpdateGroup(req: NextApiRequest, res: NextApiResponse) {
    try {
      const parsedId = await z.string().uuid().parseAsync(req.query);
      const parsedGroupData = await GroupUpdateSchema.parseAsync(req.body);
      const group = await GroupServices.UpdateGroup(parsedId, parsedGroupData);
      return res.status(200).json(group);
    } catch (e) {
      const error = await ErrorHandler(req, res, e);
      return error;
    }
  },
};
