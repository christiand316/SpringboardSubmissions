import prisma from "../../prisma";
import { UserCreateType, UserUpdateType } from "@lib/schemas/UserSchemas";


export const UserServices = {
    async CreateUser(userData: UserCreateType) {
        const user = await prisma.user.create({ data: { ...userData } })
        return user
    },
    async GetUser(id: string) {
        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        })
        return user
    },
    async UpdateUserById(userData: UserUpdateType, id: string) {
        const newUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                ...userData
            }
        })
        return newUser
    },
    async DeleteUser(id: string) {
        const user = await prisma.user.delete({ where: { id } })
        return user
    },
    async GetAllUsers() {
        const users = await prisma.user.findMany()
        return users
    },
    async CheckUserExists(id: string) {
        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        })
        if (user) {
            return true
        } else {
            return false
        }
    },
}