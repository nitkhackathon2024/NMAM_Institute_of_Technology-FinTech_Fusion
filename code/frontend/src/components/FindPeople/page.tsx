"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function FindPeople() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<
    { name: string; image: string; email: string }[]
  >([]);

  const email = session?.user?.email;

  const findMatch = async () => {
    const response = await fetch(`/api/findMatch?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setUsers(data);
  };

  const connectUser = async (receiver: string) => {
    const response = await fetch(
      `api/connectUser?sender=${email}&receiver=${receiver}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response)
  };

  return (
    <div>
      <p>
        Find people who align with your interest click on serch now to begin
      </p>
      <button onClick={findMatch} className="p-4 bg-blue-400 rounded-sm">
        Search Now
      </button>
      <div className="w-fit">
        {users.length > 0 &&
          users.map((user, i) => {
            return (
              <div
                key={i}
                className="p-2 border border-white w-full flex space-x-2 items-center justify-between m-2"
              >
                <Image
                  src={user.image}
                  height="30"
                  width="30"
                  alt="profile-img"
                />
                <p>{user.name}</p>
                <button
                  className="bg-blue-500 p-2"
                  onClick={() => connectUser(user.email)}
                >
                  follow
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
