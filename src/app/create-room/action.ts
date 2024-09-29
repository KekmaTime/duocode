'use server';

import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { createRoom } from "@/services/rooms";
import { revalidatePath } from "next/cache";

export async function createRoomActions(roomData: Omit<Room,"id" | "userId">) {
    
    const session = await getSession();

    if(!session){
        throw new Error("You must be logged in to create a room")
    }

    await createRoom(session.user.id, roomData)

    revalidatePath("/");
}