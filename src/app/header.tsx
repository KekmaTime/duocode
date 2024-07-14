"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const session = useSession();

  return (
    <div className="flex justify-end">
      {session.data ? (
        <Button onClick={() => signOut()}>Sign out</Button>
      ) : (
        <Button onClick={() => signIn("google")}>Sign in</Button>
      )}
      <ModeToggle />
    </div>
  );
}