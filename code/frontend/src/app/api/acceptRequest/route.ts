import { prisma } from "@/lib/prisma/prisma";
import { connect } from "http2";
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
    const senderExists = await prisma.user.findUnique({
      where: { id: senderId },
    });
    const receiverExists = await prisma.user.findUnique({
      where: { id: receiverId },
    });

    if (!senderExists || !receiverExists) {
      console.log("Sender or receiver does not exist");
    }
    const create1 = await prisma.connections.create({
      data: {
        userId: senderId,
      },
    });
    const create2 = await prisma.connections.create({
      data: {
        userId: receiverId,
      },
    });
    const update1 = await prisma.connections.update({
      where: {
        id: create1.id,
      },
      data: {
        cuis: {
          push: receiverId,
        },
      },
    });
    const update2 = await prisma.connections.update({
      where: {
        id: create2.id,
      },
      data: {
        cuis: {
          push: senderId,
        },
      },
    });
  } else {
    return Response.json("Invalid sender or receiver ID");
  }
  return Response.json("Updated status");
}
