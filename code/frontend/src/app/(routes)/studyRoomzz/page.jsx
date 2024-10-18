"use client"
import { useEffect, useState } from "react"
import io from "socket.io-client"
const socket =io("http://localhost:3001")

export default function StudyRoom(){
    const [message,setMessage]=useState("")
    const [newMessage,setNewMessage]=useState("")
    socket.emit("join")

    const sendMessage=()=>{
        socket.emit("send_message",(message))
        setMessage("")
    }

    useEffect(()=>{
        socket.on("receive_message",(message)=>{
            console.log(newMessage,"Received")
            setNewMessage(message)
        })
    },[socket])
    return(
        <div>
            <h1>Study room</h1>
            <input type="text" placeholder="Enter a message" value={message} onChange={(e)=>{setMessage(e.target.value)}} className="text-black"/>
            <button onClick={sendMessage}>Send</button>
            <p>Message</p>
            <p className="text-white">{newMessage}</p>
        </div>
    )
}