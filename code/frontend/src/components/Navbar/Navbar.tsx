"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const userName = session?.user?.name;
  const imageUrl = session?.user?.image;

  return (
    <div className="fixed w-full top-5">
      <nav className="flex flex-wrap border border-green-700 justify-between items-center px-4 py-3 m-5 rounded-2xl bg-black">
        <Link href="/">
          <p className="text-xl">Skill Sphere</p>
        </Link>
        {session ? (
          <Link href="/userDetails">
            <div className="flex space-x-3 justify-center items-center">
              <Image
                src={imageUrl || ""}
                alt="profile-img"
                width="40"
                height="40"
                className="rounded-full"
              />
              <p>{userName}</p>
              <button
                onClick={() => signOut()}
                className="bg-red-600 px-3 py-2 rounded-md"
              >
                SignOut
              </button>
            </div>
          </Link>
        ) : (
          <div>
            <button
              onClick={() => signIn()}
              className="bg-green-400 px-3 py-2 rounded-md"
            >
              SignIn
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
