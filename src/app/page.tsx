import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import { getRooms } from "@/services/rooms";
import { TagsList} from "@/components/tags-list";
import { SearchBar } from "./search-bar";
import { splitTags } from "@/lib/utils";
function RoomCard({room}: {room: Room}){
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagsList tags={splitTags(room.tags)} />
        {room.githubRepo && <Link href={room.githubRepo} className="flex items-center gap-2"
        target="_blank"
        rel="noreffer noopenner">
          <GithubIcon/>Github Project
        </Link>}
      </CardContent>
      <CardFooter>
        <Button>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
  </Card>
  );
}

export default async function Home({searchParams}: {searchParams: {search?: string}}) {

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
