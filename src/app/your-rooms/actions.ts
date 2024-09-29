"use server"

import { getSession } from "@/lib/auth";
import { getRoom, deleteRoom } from "@/services/rooms";
import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string) {
  
    const session = await getSession();
    if (!session) {
        throw new Error("User not logged in");
    }
    const room = await getRoom(roomId);
    if (!room) {
        throw new Error("Room not found");
    }
    if (room.userId !== session.user.id) {
        throw new Error("You are not the owner of this room");
    }
  await deleteRoom(roomId);

  revalidatePath("/your-rooms");
}
