import { prisma } from "@/lib/prisma/prisma";
import Email from "next-auth/providers/email";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const senderId = url.searchParams.get("senderId");
  const receiverEmail = url.searchParams.get("email");

  if (!senderId) {
    return Response.json("Id not recieved");
  }

  const receiver = await prisma.user.findFirst({
    where: {
      email: receiverEmail,
    },
  });
  const receiverId = receiver?.id;
  const data = await prisma.connectionRequest.findFirst({
    where: {
      fromUserId: senderId,
      toUserId: receiverId,
    },
  });
  const reqId = data?.id;
  const accept = await prisma.connectionRequest.update({
    where: {
      id: reqId,
    },
    data: {
      status: true,
    },
  });
  if (senderId && receiverId) {
    const createConnection1 = await prisma.connections.create({
      data: {
        userId: senderId,
      },
    });
    const createConnection2 = await prisma.connections.create({
      data: {
        userId: receiverId,
      },
    });
  } else {
    return Response.json("Invalid sender or receiver ID");
  }
  return Response.json("Updated status");
}
