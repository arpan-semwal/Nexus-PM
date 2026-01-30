import { PrismaClient } from "@prisma/client";
//Global variable declare kar rage hai taaaki development mein
//hot reload ki vajah se baar baar naye connection na banein.

const globalForPrisma = global as unknown as {prisma: PrismaClient};

export const prisma = globalForPrisma.prisma || new PrismaClient({
    log: ['query','error','warn'], //development me SQL quries console pe dikhengi

});

if(process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;