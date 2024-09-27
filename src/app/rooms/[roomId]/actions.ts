'use server'

import { getSession } from "@/lib/auth";
import { StreamChat } from "stream-chat";
export async function generateToken(){
    const session = await getSession();
    if(!session){
        throw new Error('No session found');
    }
    const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY;
    const apiSecret = process.env.GET_STREAM_API_SECRET;
    if (!apiKey || !apiSecret) {
        throw new Error('Stream API key or secret is missing');
    }
    const serverClient = StreamChat.getInstance(apiKey, apiSecret);
    const token = serverClient.createToken(session.user.id);
    return token;
}