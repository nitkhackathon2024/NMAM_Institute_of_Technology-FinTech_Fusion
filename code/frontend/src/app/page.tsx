"use client";
import { useSession } from "next-auth/react";
import WelcomePage from "@/components/WelcomePage/page";
import FindPeople from "@/components/FindPeople/page";
import ConnectionRequests from "@/components/ConnectionRequests/page";
import GetConnections from "@/components/GetConnections/page";
import HeroSection from "@/components/HeroSection/page";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <HeroSection />
        <p className="text-3xl text-center mb-20">Sign In to get Started</p>
      </>
    );
  }
  return (
    <>
      <HeroSection />
      <FindPeople />
      <hr className="border border-green-700 mx-40 my-10" />
      <div className="flex justify-center items-center space-x-5 mb-10">
        <p className="text-3xl">Your Connections</p>
        {/* <Link
          href="/connections"
          className="bg-green-700 rounded-3xl text-3xl px-4 py-3"
        >
          Check it out
        </Link> */}
      </div>
      <div>
        <div className="md:flex justify-center">
          <ConnectionRequests />
          <GetConnections />
        </div>
      </div>
    </>
  );
}
