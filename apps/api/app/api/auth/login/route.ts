import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";
import { comparePassword, generateToken } from "../../../../src/lib/auth";


export async function POST(req:Request) {
    try{
        const {email , password} = await req.json();

        //Find User
        const user = await prisma.user.findUnique({where:{email}});
        if(!user){
            return NextResponse.json({message:'Invalid Credentials'}, {status:401});
        }

        //Check Password
        const isMatch = await comparePassword(password , user.password);
        if(!isMatch){
            return NextResponse.json({message:"Invalid credentials"} , {status:401});
        }

        //Generate Token

        const token = generateToken(user.id);


        return NextResponse.json({
            user: {id:user.id , email:user.email , name:user.name},
            token
        });


    }catch(error){
        return NextResponse.json({message:"Internal Server Error"} , {status:500});
    }
}