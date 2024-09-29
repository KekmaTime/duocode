'use server';

import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { editRoom, getRoom } from "@/services/rooms";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editRoomActions(roomData: Omit<Room,"userId">) {
    
    const session = await getSession();

    const room = await getRoom(roomData.id);
    if (!room) {
        throw new Error("Room not found");
    }
    if (room.userId !== session?.user.id) {
        throw new Error("You are not the owner of this room");
    }
    if(!session){
        throw new Error("You must be logged in to edit a room")
    }

    await editRoom({...roomData, userId: room.userId})

    revalidatePath("/your-rooms");
    revalidatePath(`/edit-rooms/${roomData.id}`)
    redirect("/your-rooms")
}