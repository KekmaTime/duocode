import { db } from "@/db";
import { eq, like } from "drizzle-orm";
import { room } from "@/db/schema";
import { getSession } from "@/lib/auth";

export async function getRooms(search: string | undefined) {
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getMyRooms() {
  const session = await getSession();
  if (!session?.user.id) {
    throw new Error("User not logged in");
  }
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session?.user.id),
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  return await db.query.room.findFirst({
    where: eq(room.id, roomId)
  });
}

export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}
