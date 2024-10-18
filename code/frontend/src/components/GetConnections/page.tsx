"use session"
import { useState } from "react"
import { useSession } from "next-auth/react"

export default function GetConnections(){
    const [users,setUsers]=useState([])
    const {data:session}=useSession()
    const email=session?.user?.email
    const getUsers=async()=>{
        const res=await fetch(`/api/getConnections?email=${email}`)
        const data=await res.json()
        console.log(data)
    }
    return(
        <>
            <p>Connections : </p>
            <button onClick={getUsers}>Get Connections</button>
        </>
    )
}