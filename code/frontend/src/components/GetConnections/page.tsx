"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function GetConnections() {
  const [users, setUsers] = useState<{ name: string; id: string }[]>([{
      name: "",
      id: ""
  }]);
  const { data: session } = useSession();
  const email = session?.user?.email;

  //add a loading animation for 3s
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    const res = await fetch(`/api/getConnections?email=${email}`);
    const data = await res.json();
    console.log(data);
    setUsers(data);
  };

  useEffect(()=>{
      getUsers()
  },[])


  if (users.length == 0) {
    return <h1>No users Found</h1>;
  }
  return (
    <div className="text-xl border border-green-700 w-fit p-8 rounded-md bg-green-950 m-10">
      <p className="text-center font-bold">My Connections : </p>
      <hr className="my-5" />
      {users.length > 0 &&
        users.map((user, i) => {
          return (
            <div key={i} className="flex items-center justify-between">
              <p>{user.name}</p>
              <Link href="/studyRoom" className="border border-white p-2 m-2">
                Join study room
              </Link>
            </div>
          );
        })}
    </div>
  );
}
