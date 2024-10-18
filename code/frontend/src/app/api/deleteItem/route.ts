import { prisma } from "@/lib/prisma/prisma";
import { emit } from "process";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  const index = url.searchParams.get("index");
  const type = url.searchParams.get("type");
  if (!email) {
    return Response.json("Email not found");
  }
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (type === "skill") {
    let skills = user?.skills;
    skills = skills?.filter((skill, i) => i !== parseInt(index as string));
    const data = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        skills,
      },
    });
    return Response.json("Done");
  } else if (type === "learning") {
    let learningGoals = user?.learningGoals;
    learningGoals = learningGoals?.filter((skill, i) => i !== parseInt(index as string));
    const data = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        learningGoals,
      },
    });
    return Response.json("Done");
  }
  return Response.json("Something went wrong");
}
