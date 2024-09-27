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
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  search: z.string().min(1).max(50),
})

export function SearchBar() {
    const router = useRouter();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
        },
      })
     
      async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.search){
            router.push(`/search?q=${values.search}`)
        }
        else {
            router.push("/")
        }
      }

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-y-8 gap-2">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search</FormLabel>
                  <FormControl>
                    <Input className="w-[440px]" {...field} placeholder="Search for a room"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit"><SearchIcon className="mr-2"/> Search</Button>
          </form>
        </Form>
      )
}