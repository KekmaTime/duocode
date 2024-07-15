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
import { createRoomActions } from "./action"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(2250),
  language: z.string().min(1).max(50),
  githubRepo: z.string().min(1).max(50),
})

export function CreateRoomForm() {

    const router = useRouter();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            language: "",
            githubRepo: "",
        },
      })
     
      async function onSubmit(values: z.infer<typeof formSchema>) {
        await createRoomActions(values)
        router.push("/")
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
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Programming Language</FormLabel>
                  <FormControl>
                    <Input placeholder="Specify the programming language" {...field} />
                  </FormControl>
                  <FormDescription>
                    Indicate the programming languages used in this room.
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
                    <Input placeholder="Enter the GitHub repository URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide the URL of the GitHub repository associated with this room.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Create Room</Button>
          </form>
        </Form>
      )
    }