import { NextResponse } from "next/server";
import { verifyAuth } from "../../../src/middleware/auth.middleware";
import { TaskRepository } from "../../../src/repositories/task.repository";

const taskRepo = new TaskRepository();

export async function POST(req: Request) {
  //verify the user using middleware
  const auth = await verifyAuth(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  try {
    //➡️ “Wait for the request body to arrive, read it, convert JSON → JS object, then store it in body.”
    //Client sends JSON → Server waits → Reads → Converts → body ready

    const body = await req.json();

    // 2. Create task (use userId we got from token)

    const task = await taskRepo.create({
      title: body.title,
      description: body.description,
      userId: auth.userId!,
    });
    //NextResponse creates an HTTP response in JSON format
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating task" },
      { status: 500 },
    );
  }
}


//To get all the user task

export async function GET(req:Request){
    //check with the middleware which task is the user asking for

    const auth = await verifyAuth(req);
    if(auth.error){
        return NextResponse.json({message: auth.error} , {status: auth.status});

    }

    try{
        //asking repository to find all the task of the user
        const tasks = await taskRepo.findAllByUser(auth.userId!);


        //send the client list of the task

        return NextResponse.json(tasks,{status:200});
    }catch(error){
        return NextResponse.json({message: 'Error fetching tasks'},{status:500});
    }
}
