import { getRoom } from "@/services/rooms";
import { GithubIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { TagsList } from "@/components/tags-list";
import { splitTags } from "@/lib/utils";
import { DuoCodeVideoPlayer } from "./videoplayer";
import { unstable_noStore } from "next/cache";

export default async function RoomPage(
    props: { params: { roomId: string } }
) {
    const roomId = props.params.roomId
    unstable_noStore();
    const room = await getRoom(roomId);

    if(!room) {
        return <div>Room of this ID not found</div>
    }

    return(
        <div className="grid grid-cols-4 h-full min-h-screen">
            <div className="col-span-3 p-4 pl-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
                    <DuoCodeVideoPlayer room={room} />
                </div>
            </div>
            <div className="col-span-1 p-4 pr-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
                    <h1 className="text-base">{room?.name }</h1>
                    {
                        room?.githubRepo && (
                            <Link
                                href={room?.githubRepo}
                                className="flex items-center gap-2 text-center text-sm"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <GithubIcon className="w-4 h-4" />
                                <span>Github Repo</span>
                            </Link>
                        )
                    }
                    <p className="text-base text-gray-600">{room?.description}</p>

                    <TagsList tags ={splitTags(room?.tags)} />
                </div>
            </div>
        </div>
    )
}