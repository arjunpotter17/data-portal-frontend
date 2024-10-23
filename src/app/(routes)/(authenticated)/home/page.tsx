"use client";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="pt-[72px] w-full min-h-screen flex items-center justify-center flex-col gap-y-5">
      <h1>Home page under construction</h1>
      <button
        className="rounded-sm bg-proto-blue hover:bg-proto-dark-blue text-white px-4 py-1"
        onClick={() => signOut()} // Open the modal on click
      >
        Logout
      </button>
    </div>
  );
}
