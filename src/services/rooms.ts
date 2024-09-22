import { db } from "@/db";
import { eq } from "drizzle-orm";
import { room } from "@/db/schema";
import { unstable_noStore } from "next/cache";

export async function getRooms(){
    unstable_noStore();
    const rooms = await db.query.room.findMany();
    return rooms;
}

export async function getRoom(roomId: string){
    unstable_noStore();
    return await db.query.room.findFirst({
        where: eq(room.id, roomId)
    });
}