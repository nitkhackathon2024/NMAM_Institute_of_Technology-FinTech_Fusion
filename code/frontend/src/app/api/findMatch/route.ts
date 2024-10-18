import { prisma } from "@/lib/prisma/prisma"

export async function GET(request:Request){
    const url=new URL(request.url)
    const email=url.searchParams.get('email')
    if(!email){
        return Response.json("Email is required")
    }
    const user=await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    const skills=user?.skills
    const learning=user?.learningGoals
    const matchedUsers = await prisma.user.findMany({
        where: {
          skills: {
            hasSome: learning,
          },
          learningGoals: {
            hasSome: skills,
          },
        },
      });
      return new Response(JSON.stringify(matchedUsers,))      
}