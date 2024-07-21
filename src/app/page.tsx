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

function RoomCard({room}: {room: Room}){
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
  </Card>
  );
}

export default async function Home() {

  const rooms = await db.query.room.findMany();
  return (
    <main className="min-h-screen p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Find Rooms to Code</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      {rooms.map((room) => { 
        return <RoomCard key={room.id} room={room} />;
      }
    )}
    </main>
  );
}
