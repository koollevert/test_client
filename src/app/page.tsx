import {Poppins} from "next/font/google";
import { Button } from "@/components/ui/button";
// import Image from "next/image";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-500"> 
      <div className="space-76 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          Buu Bus Ticket Booking
        </h1>
        
        <LoginButton mode ="modal" asChild>
          <Button variant="secondary" size="lg">Sign in</Button>
        </LoginButton>
      </div>
    </main>
  );
}
