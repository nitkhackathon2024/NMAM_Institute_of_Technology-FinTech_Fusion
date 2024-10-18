"use client";
import { useSession } from "next-auth/react";
import WelcomePage from "@/components/WelcomePage/page";
import FindPeople from "@/components/FindPeople/page";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <WelcomePage />
      </>
    );
  }
  return (
    <>
      <h1>Hello world</h1>
      <FindPeople />
    </>
  );
}
