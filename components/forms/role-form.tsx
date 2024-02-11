"use client"

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
import { useForm } from "react-hook-form"
import { z } from "zod"



export default function UserForm({ user, players }) {
    const { toast } = useToast()

    // 1. Zod validation 
    const formSchema = z.object({
        name: z.string().min(2).max(50),
        email: z.string().email(),
        // password: z.string().min(8).max(50),
        // confirmPassword: z.string().min(8).max(50),
        player: z.string()
        //.refine(value => players.some(player => player.name === value), {            message: "Invalid player name"    })

    })

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name || "",
            email: user.email || "",
            // password: "",
            // confirmPassword: "",
        },
    })
    // Submit handler
    async function onSubmit(data) {

        toast({
            title: "Your todo has been created.",
        })
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
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={`${user.name || "Enter your name"}`}
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
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={`${user.email || "Enter your email"}`}
                                                {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public email.
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
