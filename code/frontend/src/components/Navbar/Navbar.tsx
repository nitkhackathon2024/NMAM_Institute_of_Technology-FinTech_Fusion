"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const userName = session?.user?.name;
  return (
    <>
      <nav className="flex flex-wrap border border-white">
        This is navbar
        {session ? (
          <div>
            <p>{userName}</p>
            <button onClick={() => signOut()}>SignOut</button>
          </div>
        ) : (
          <div>
            <button onClick={() => signIn("google")}>SignIn</button>
          </div>
        )}
      </nav>
    </>
  );
}
