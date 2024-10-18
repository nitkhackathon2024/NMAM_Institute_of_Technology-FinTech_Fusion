"use session"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function GetConnections(){
    const [users,setUsers]=useState<{name:string;id:string}[]>([])
    const {data:session}=useSession()
    const email=session?.user?.email
    const getUsers=async()=>{
        const res=await fetch(`/api/getConnections?email=${email}`)
        const data=await res.json()
        console.log(data)
        setUsers(data)
    }

    useEffect(()=>{
        getUsers()
    },[])
    return(
        <div className="">
            <p>Connections : </p>
            {users.length > 0 && users.map((user,i)=>{
                return <div key={i} className="flex"><p>{user.name}</p><Link href="/studyRoom" className="border border-white p-2 m-2">Join study room</Link></div>
            })}
        </div>
    )
}