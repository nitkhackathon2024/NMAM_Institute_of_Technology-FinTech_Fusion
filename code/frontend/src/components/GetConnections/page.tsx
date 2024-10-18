"use session"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

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
        <>
            <p>Connections : </p>
            {users.length > 0 && users.map((user,i)=>{
                return <div key={i}><p>{user.name}</p></div>
            })}
        </>
    )
}