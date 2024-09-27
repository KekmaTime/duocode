"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogInIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";


function AccountDropDown(){
  const session = useSession();

  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">
          <Avatar>
            <AvatarImage src={session.data?.user?.image || ""} />
            <AvatarFallback>{session.data?.user?.name}</AvatarFallback>
          </Avatar>
          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => signOut({
            callbackUrl: "/",
          })}>
              <LogOutIcon className="w-4 h-4 mr-2"/>Log out
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Header() {
  const session = useSession();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <header className="py-2 px-2 mx-auto">
      <div className="flex justify-between items-center">
          <Link href="/" className="flex gap-2 items-center text-xl hover:underline">
          <Image 
            src="/logo.png" 
            alt="Duocode Icon"
            width="60"
            height="60"
            className={isDarkMode ? "filter invert" : ""}
          />
          DuoCode
          </Link>
        <div className="flex items-center gap-4">
          {session.data && <AccountDropDown />}
          {!session.data && <Button onClick={() => signIn("google")}>
            <LogInIcon className="w-4 h-4 mr-2"/>Log in
          </Button>}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}