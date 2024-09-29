"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { editRoomActions } from "./action"
import { useParams, useRouter } from "next/navigation"
import { Room } from "@/db/schema"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(2250),
  tags: z.string().min(1).max(50),
  githubRepo: z.string().min(1).max(50),
})

export function EditRoomForm({room}: {room: Room}) {

    const router = useRouter();
    const params = useParams();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: room.name,
            description: room.description ?? "",
            tags: room.tags ?? "",
            githubRepo: room.githubRepo ?? "",
        },
      })
     
      async function onSubmit(values: z.infer<typeof formSchema>) {
        await editRoomActions({...values, id: params.roomId as string})
        toast({
            title: "Room updated",
            description: "Your room has been updated",
        })
        router.push(`/rooms/${room.id}`)
      }

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the room name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a unique and descriptive name for your room.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a brief description" {...field} />
                  </FormControl>
                  <FormDescription>
                    Summarize the purpose and content of this room.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="githubRepo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Repository</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/user/repo" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide the URL of the GitHub repository associated with this room.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="typescript, react, nextjs, tailwind" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add the languages, frameworks and libraries used in this room.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
    }