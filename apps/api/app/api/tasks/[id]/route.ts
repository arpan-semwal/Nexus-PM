import { NextResponse } from "next/server";
import { verifyAuth } from "../../../../src/middleware/auth.middleware";
import { prisma } from "../../../../src/lib/prisma";

export async function PATCH(
    req:Request,
    {params }: {params: Promise<{id:string}>} // take out id from url
) {
    const auth = await verifyAuth(req);
    if(auth.error) return NextResponse.json({message:auth.error} , {status:auth.status});
    try{
        const {id} = await params;
        const body = await req.json();
        

        //check that the task belong this user only
        const task = await prisma.task.findUnique({
            where: {id: id}
        });

        if(!task || task.userId !== auth.userId){
            return NextResponse.json({message: "Task not found or unauthorized"} , {status:404});
        }

        //Task update karo
        const updatedTask = await prisma.task.update({
            where:{id : id},
            data:{
                status:body.status,
                title:body.title,
                description:body.description
            }
        });
        return NextResponse.json(updatedTask);
    }catch(error){
        return NextResponse.json({message: "Update Failed"} , {status:500});
    }
}

//Delete method: To delete the task

export async function DELETE(
    req:Request,
    {params }:{params: Promise<{id:string}>}
){
    const auth = await verifyAuth(req);

    if(auth.error){
        return NextResponse.json({message:auth.error} , {status:auth.status});
    }

    try{
         const {id} = await params;
        

        //check ownership before checking
        const task = await prisma.task.findUnique({
            where: {id: id}
        });

        if(!task || task.userId !== auth.userId){
            return NextResponse.json({message: "Task not found"} , {status:404});
        }

        await prisma.task.delete({
            where: {id: id}
        });

        return NextResponse.json({message:"Task deleted successfully"});

    }catch(error){
        return NextResponse.json({message:"Delete failed"} , {status:500});
    }
}