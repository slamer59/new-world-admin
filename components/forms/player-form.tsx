"use client"

import { createPlayerAction, updatePlayerAction } from "@/app/actions"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function PlayerForm({ player }: { player: any }, redirectPath = "/dashboard/player", revalidateThisPath = "/dashboard/player") {
    const router = useRouter()
    const { toast } = useToast()
    // 1. Zod validation 

    const formSchema = z.object({
        name: z.string(),
    })

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: player?.name || "",
        },
    })
    // Submit handler
    async function onSubmit(data: any) {
        if (player?.createId) {
            await createPlayerAction(player.createId, data)
            toast({
                title: "Your Player has been created.",
            })
        } else {
            await updatePlayerAction(player?.id, data)

            toast({
                title: "Your player has been updated.",
            })
        }

        form.reset()
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Create an Account</h1>
                        <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Player Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={`${player?.name || "Enter your player name"}`}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full">Submit</Button>
                    </div>
                </div>
            </form >
        </Form >
    )
}
