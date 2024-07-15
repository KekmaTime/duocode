import { CreateRoomForm } from "./create-room-form";


export default function CreateRoom() {
  return(
    <div className="container mx-auto flex flex-col gap-8 pt-10">
      <h1 className="text-2xl font-bold">Create Room</h1>
      <CreateRoomForm />
    </div>
  );
}