import { prisma } from "@/lib/prisma/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const emailId = url.searchParams.get("userEmail");
  if (!emailId) {
    return Response.json("Email id is required");
  }
  const data = await prisma.user.findFirst({
    where: {
      email: emailId,
    },
  });
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
