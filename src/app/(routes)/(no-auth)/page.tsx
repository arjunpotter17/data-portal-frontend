
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getServerSession();
  console.log("Session: ", session);
  if (session) {
    redirect('/home')
  }
  return (
    <div className="bg-[#0c0c0c] text-white pt-[100px] min-h-screen w-full flex items-center justify-center">
      <p><span className="text-proto-blue">PROTO </span> landing page under construction</p>
    </div>
  );
}
