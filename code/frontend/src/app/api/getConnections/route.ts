import { prisma } from "@/lib/prisma/prisma";

export async function GET(request:Request){
    const url=new URL(request.url)
    const userEmail=url.searchParams.get("email")

    const data=await prisma.user.findFirst({
        where:{
            email:userEmail
        }
    })
    const connections=await prisma.connections.findMany({
        where:{
            userId:data?.id
        },select:{
            cuis:true
        }
    })
    const user=await prisma.user.findMany({
        where:{
            id: { in: connections.map((c) => c.cuis).flat() }
        }
    })
    return new Response(JSON.stringify(user))
}