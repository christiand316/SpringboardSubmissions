import prisma from "../../prisma";
import { ZodError, z } from "zod";
import ErrorHandler from "./ErrorHandlers";
import { NextApiRequest, NextApiResponse } from "next";
import { UserServices } from "@lib/services/UserServices";
import { UserUpdateSchema } from "@lib/schemas/UserSchemas";

export const UserController = {
    async GetUser(req: NextApiRequest, res: NextApiResponse) {
        try {
            const parsedId = await z.string().uuid().parseAsync(req.query.userId)
            const user = await UserServices.GetUser(parsedId)
            return res.status(200).json(user)
        } catch (e) {
            const error = await ErrorHandler(req, res, e)
            return error
        }
    },
    async CreateUser(req: NextApiRequest, res: NextApiResponse) {
        try {
            const parsedData = await UserUpdateSchema.parseAsync(req.body)
            const user = await UserServices.CreateUser(parsedData)
            return res.status(200).json(user)
        } catch (e) {
            const error = await ErrorHandler(req, res, e)
            return error
        }
    },
    async GetAllUsers(req: NextApiRequest, res: NextApiResponse) {
        const users = await prisma.user.findMany()
        return res.status(200).json({ users })
    },
    async getUserGroups(req: NextApiRequest, res: NextApiResponse) {
        try {
            const parsedId = await z.string().parseAsync(req.query.userId)

            if (await !UserServices.CheckUserExists(parsedId)) {
                return res.status(404).json("User does not exist")
            }

            const groups = await prisma.group.findMany({
                where: {
                    users: {
                        some: {
                            id: parsedId
                        }
                    }
                }
            })
            if (groups) {
                return res.status(200).json(groups)
            }
            else {
                return res.status(404).json("User is not part of any groups.")
            }
        } catch (e) {
            const error = await ErrorHandler(req, res, e)
            return error
        }
    },
    async UpdateUser(req: NextApiRequest, res: NextApiResponse) {
        try {
            const parsedId = await z.string().uuid().parseAsync(req.query.userId)
            const parsedUser = await UserUpdateSchema.parseAsync(req.body)
            if (!parsedUser) {
                return res.status(400)
            }
            const user = await UserServices.UpdateUserById(parsedUser, parsedId)
            return res.status(200).json(user)
        } catch (e) {
            const error = await ErrorHandler(req, res, e)
            return error
        }
    },
    async DeleteUser(req: NextApiRequest, res: NextApiResponse) {
        try {
            const parsedId = await z.string().uuid().parseAsync(req.query.userId)
            const user = UserServices.DeleteUser(parsedId)
            return res.status(200).json(user)
        } catch (e) {
            const error = await ErrorHandler(req, res, e)
            return error
        }
    }
}