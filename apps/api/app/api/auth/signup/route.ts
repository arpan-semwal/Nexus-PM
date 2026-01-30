import { NextResponse } from "next/server";
import { AuthService } from "../../../../src/services/auth.service";

const authService = new AuthService();

export async function POST(req:Request){
    try{
        const body = await req.json();
        const result = await authService.signup(body);

        return NextResponse.json(result , {status:201});

    }catch(error:any){
        console.error("Signup Error:",error);
        return NextResponse.json(
            {message:error.message || 'Something went wrong'},
            {status: error.statusCode || 500}
        );
    }
}