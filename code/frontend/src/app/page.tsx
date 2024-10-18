"use client";
import { useSession } from "next-auth/react";
import WelcomePage from "@/components/WelcomePage/page";
import FindPeople from "@/components/FindPeople/page";
import ConnectionRequests from "@/components/ConnectionRequests/page";
import GetConnections from "@/components/GetConnections/page";

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
      <p>Connection Requests : </p>
      <ConnectionRequests />
      <GetConnections />
    </>
  );
}
