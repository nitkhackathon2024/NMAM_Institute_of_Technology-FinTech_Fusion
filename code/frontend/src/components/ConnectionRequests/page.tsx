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
    <div>
      {users &&
        users.map((user, i) => {
          return (
            <div key={i}>
              <p>{user.name}</p>
              <button onClick={() => acceptConnection(user.id)}>accept</button>
            </div>
          );
        })}
      {/* <button onClick={getRequests}>get Requests</button> */}
    </div>
  );
}
