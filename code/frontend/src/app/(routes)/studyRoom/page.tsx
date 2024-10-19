"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001");
import { useSession } from "next-auth/react";

export default function StudyRoom() {
  const [message, setMessage] = useState("");
  const [prevMessages, setPrevMessages] = useState<string[]>([]);
  const [oldMessages, setOldMessages] = useState<{text:string}[]>([]);
  const { data: session } = useSession();

  socket.emit("join");

  const sendMessage = async () => {
    let data = session?.user?.name + " : " + message;
    socket.emit("send_message", data);
    const addData = await fetch(`/api/fetchMessages?text=${data}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setMessage("");
  };

  const fetchOldMesssages = async () => {
    const res = await fetch("/api/fetchMessages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data)
    setOldMessages(data);
  };

  useEffect(()=>{
    fetchOldMesssages()
  },[])

  useEffect(() => {
    socket.on("receive_message", (message) => {
      console.log(message, "Received");
      setPrevMessages((old) => [...old, message]);
    });
  }, [socket]);
  return (
    <div className="mt-44">
      <h1 className="text-3xl m-10">Study room</h1>
      <div className="md:grid grid-cols-10 px-10">
        <div className="col-span-3 md:mt-[250px] max-md:hidden">
          <input
            type="text"
            placeholder="Enter a message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="text-black px-2 py-3 rounded-3xl"
          />
          <button
            onClick={sendMessage}
            className="bg-green-700 py-3 px-2 ml-4 rounded-2xl"
          >
            Send
          </button>
        </div>
        <div
          className="max-h-80 min-h-80 overflow-y-auto border border-gray-300 p-4 text-white col-span-7"
          ref={(el) => {
            if (el) {
              el.scrollTop = el.scrollHeight;
            }
          }}
        >
          {oldMessages.map((m, i) => {
            return (
              <div key={i}>
                <p>{m.text}</p>
              </div>
            );
          })}
          {prevMessages.map((m, i) => {
            return (
              <div key={i}>
                <p>{m}</p>
              </div>
            );
          })}
        </div>
        <div className="col-span-3 mt-8 md:hidden">
          <input
            type="text"
            placeholder="Enter a message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="text-black px-2 py-3 rounded-3xl"
          />
          <button
            onClick={sendMessage}
            className="bg-green-700 py-3 px-2 ml-4 rounded-2xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
