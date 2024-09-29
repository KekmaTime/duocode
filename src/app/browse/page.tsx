import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/services/rooms";
import { SearchBar } from "./search-bar";
import { RoomCard } from "@/app/browse/room-card";
import { unstable_noStore } from "next/cache";

export default async function Home({searchParams}: {searchParams: {search?: string}}) {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search);
  return (
    <main className="min-h-screen p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Find Rooms to Code</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="mb-8">
      <SearchBar />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => { 
          return <RoomCard key={room.id} room={room} />;
        }
      )}
    </div>
    </main>
  );
}
