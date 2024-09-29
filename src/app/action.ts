"use server";

import { deleteUser } from "@/services/users";
import { getSession } from "@/lib/auth";

export async function deleteAccountAction() {
  const session = await getSession();

  if (!session) {
    throw new Error("you must be logged in to delete your account");
  }
  await deleteUser(session.user.id);
}