import { Poppins } from "next/font/google";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className={cn('text-6xl font-semibold text-white drop-shadow-md text-center', font.className)}>Auth</h1>
        <p className="text-white text-lg">
          Auth demo project
        </p>
        <div className="flex flex-col space-y-6">
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
          <LoginButton asChild mode="modal">
            <Button size="lg">Sign in modal</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
