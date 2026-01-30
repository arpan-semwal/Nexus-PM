 
import { prisma } from "../lib/prisma";

export class TaskRepository {


    /**
     * 
     * Create : Naya task database mein save karne ke liye.
     * Kyun : Hum userId isliye maang rahe hain taaki har task kisi na kisi user se Linked rahe.
     * @returns 
     */
    async create(data: {title:string ; description?:string; userId: string}){
        //Prisma ka istemal karke 'task' table mein naya record insert kar
        return prisma.task.create({
            data,
        });
    }

    async findAllByUser(userId:string){
        return prisma.task.findMany({
            where: {userId},
            orderBy:{createdAt: 'desc'},
        });
    }
}

