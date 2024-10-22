"use client";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

export default function Request():JSX.Element {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/home");
  }
  return (
    <div>
      <h1>Request for access page</h1>
    </div>
  );
}
