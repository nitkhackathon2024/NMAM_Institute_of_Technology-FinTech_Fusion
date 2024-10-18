import { prisma } from "@/lib/prisma/prisma";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const type=url.searchParams.get("type")
  console.log(type)
  if(type=="year"){
    const year = url.searchParams.get("year");
    const email = url.searchParams.get("email");
    if (!year || !email) {
      return new Response("Year and email,year are required", { status: 400 });
    }
    const response = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        yearOfStudy: parseInt(year),
      },
    });
    return new Response(JSON.stringify(response), { status: 200 });
  }
  if(type=="skill"){
    const skill = url.searchParams.get("skill");
    const email = url.searchParams.get("email");
    if (!skill || !email) {
      return new Response("Year and email,skill are required", { status: 400 });
    }
    const response = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        skills: {
          push: skill
        }
      },
    });
    return new Response(JSON.stringify(response), { status: 200 });
  }
  if(type=="learning"){
    const skill = url.searchParams.get("skill");
    const email = url.searchParams.get("email");
    if (!skill || !email) {
      return new Response("Year and email,skill are required", { status: 400 });
    }
    const response = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        learningGoals: {
          push: skill
        }
      },
    });
    return new Response(JSON.stringify(response), { status: 200 });
  }
}
