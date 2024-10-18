import { prisma } from "@/lib/prisma/prisma";

export async function GET(request:Request){
    const url=new URL(request.url)
    const userEmail=url.searchParams.get("email")

    const data=await prisma.user.findFirst({
        where:{
            email:userEmail
        },
        include:{
            Connections:true
        }
    })
    return new Response(JSON.stringify(data))
}