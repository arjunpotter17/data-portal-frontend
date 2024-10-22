"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Navbar() {
  const router = useRouter();

  return (
    <>
      <div className="fixed top-0 bg-black inset-x-0 w-full flex justify-between items-center px-4 md:px-10 shadow z-50 h-16">
        <div className="flex gap-x-1 relative w-[100px]">
          <Image src="/images/logo.png" alt="logo" height={24} width={24} />
        </div>

        {/* Button to open the modal */}
        <button
          className="rounded-sm bg-proto-blue hover:bg-proto-dark-blue text-white px-4 py-1 transition duration-200 ease-in-out"
          onClick={() => router.push("/auth/register")} // Open the modal on click
        >
          Purchase
        </button>
      </div>
    </>
  );
}

export default Navbar;
