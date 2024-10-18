"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ConnectionRequests() {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const [users, setUsers] = useState<{ name: string; id: string }[]>([]);
  const getRequests = async () => {
    const res = await fetch(`/api/connectUser?user=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data, email, "Requests");
    setUsers(data);
  };

  const acceptConnection = async (senderId: string) => {
    const res = await fetch(
      `/api/acceptRequest?email=${email}&senderId=${senderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    getRequests();
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="text-xl border border-green-700 w-fit p-8 rounded-md bg-green-950 m-10">
      <p className="text-center font-bold">Connection Requests : </p>
      <hr className="my-5" />
      {users &&
        users.map((user, i) => {
          return (
            <div key={i} className="flex justify-between items-center">
              <p>{user.name}</p>
              <button onClick={() => acceptConnection(user.id)} className="border border-white p-2 m-2">accept</button>
            </div>
          );
        })}
      {/* <button onClick={getRequests}>get Requests</button> */}
    </div>
  );
}
