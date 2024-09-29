import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserRoomCard } from "./user-room-card";
import { getMyRooms } from "@/services/rooms";
import { unstable_noStore } from "next/cache";

export default async function Home() {
  unstable_noStore();
  const rooms = await getMyRooms();
  return (
    <main className="min-h-screen p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => { 
          return <UserRoomCard key={room.id} room={room} />;
        }
      )}
    </div>
    </main>
  );
}
