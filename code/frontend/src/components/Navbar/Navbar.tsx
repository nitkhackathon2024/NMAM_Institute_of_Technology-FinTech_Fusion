"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const userName = session?.user?.name;
  return (
    <>
      <nav>This is navbar</nav>
      {/* <SignIn /> */}
      <p>{userName}</p>
      <button onClick={() => signIn("google")}>SignIn</button>
    </>
  );
}
