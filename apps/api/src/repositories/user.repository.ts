import { User } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class UserRepository {
    //Naya user banane ke liye
    async create(data:any):Promise<User>{
        return prisma.user.create({
            data,
        })
    }


    //Email se user dhudne ke liye (Login me kaam aega)
    async findByEmail(email:string) : Promise<User | null>{
        return prisma.user.findUnique({
            where: {email},
        });
    }
}