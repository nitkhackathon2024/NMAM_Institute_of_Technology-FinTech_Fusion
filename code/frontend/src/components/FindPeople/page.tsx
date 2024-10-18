"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function FindPeople() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<{ name: string }[]>([]);

  const email = session?.user?.email;

  const findMatch = async () => {
    const response = await fetch(`/api/findMatch?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data =await response.json();
    console.log(data)
    setUsers(data)
  };

  return (
    <div>
      <p>
        Find people who align with your interest click on serch now to begin
      </p>
      <button onClick={findMatch} className="p-4 bg-blue-400 rounded-sm">Search Now</button>
      {users.length > 0 &&
        users.map((user, i) => {
          return <div key={i}>{user.name}</div>;
        })}
    </div>
  );
}
