import ConnectionRequests from "@/components/ConnectionRequests/page"
import { prisma } from "@/lib/prisma/prisma"

export async function POST(request:Request){
    const url=new URL(request.url)
    const sender=url.searchParams.get("sender")
    const receiver=url.searchParams.get("receiver")
    let senderUser = await prisma.user.findFirst({
        where: {
            email: sender
        }
    })
    let receiverUser = await prisma.user.findFirst({
        where: {
            email: receiver
        }
    })
    if (!receiverUser || !senderUser) {
        return
    }
    const senderId = senderUser.id
    const receiverId = receiverUser.id
    const res=await prisma.connectionRequest.create({
        data:{
            fromUserId:senderId,
            toUserId:receiverId
        }
    })
    return new Response(JSON.stringify("Request sent"))
}

export async function GET(request:Request){
    const url=new URL(request.url)
    const email=url.searchParams.get("user")
    console.log(email)
    const id=await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    if(!id){
        return Response.json("provide id")
    }
    const userId=id.id
    const user = await prisma.connectionRequest.findMany({
        where: {
            toUserId: userId,
            status:false
        }
    })
    const finalUsers = await prisma.user.findMany({
        where: {
            id: {
                in: user.map(u => u.fromUserId)
            }
        }
    })
    return new Response(JSON.stringify(finalUsers))
}   