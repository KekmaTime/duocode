import { getRoom } from "@/services/rooms";
import { EditRoomForm } from "./edit-room-form";
import { unstable_noStore } from "next/cache";


export default async function EditRoom({params}: {params: {roomId: string}}) {
  unstable_noStore();
  const room = await getRoom(params.roomId);
  if(!room){
    return <div>Room not found</div>
  }
  return(
    <div className="container mx-auto flex flex-col gap-8 pt-10">
      <h1 className="text-2xl font-bold">Edit Room</h1>
      <EditRoomForm room={room} />
    </div>
  );
}