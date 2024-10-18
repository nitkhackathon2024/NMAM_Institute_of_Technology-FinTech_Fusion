import { prisma } from "@/lib/prisma/prisma";

export async function GET(){
    const data=await prisma.chats.findMany()
    return new Response(JSON.stringify(data))
}

export async function POST(request:Request){
    const url=new URL(request.url)
    const message = url.searchParams.get("text");
    if (message === null) {
        return new Response("Message text is required", { status: 400 });
    }
    const data = await prisma.chats.create({
        data: {
            text: message
        }
    });
    return Response.json("Added successfully")
}