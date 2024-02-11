"use client"

import { createRoleAction, updateRoleAction } from "@/app/actions"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { faker } from "@faker-js/faker"
import { zodResolver } from "@hookform/resolvers/zod"
import { RoleType, Rune, Weapon, WeightLimit } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function RoleForm({ role }) {

    const { toast } = useToast()

    // 1. Zod validation 
    const formSchema = z.object({
        name: z.string().min(2).max(50),
        roleType: z.string(),
        rune: z.string(),
        weapon: z.string(),
        weightLimit: z.string(),
    })

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: role?.name || faker.person.firstName(),
            roleType: role?.roleType || RoleType.zzz_lvling,
            rune: role?.rune || Rune.BileBomb,
            weapon: role?.weapon || Weapon.Blunderbuss,
            weightLimit: role?.weightLimit || WeightLimit.Light,
        },
    })
    // Submit handler
    async function onSubmit(data) {
        if (role?.createId) {
            await createRoleAction(role.createId, data)
            toast({
                title: "Your role has been created.",
            })
        } else {
            await updateRoleAction(role.id, data)

            toast({
                title: "Your role has been updated.",
            })
        }
        form.reset()
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Create a Role</h1>
                        <p className="text-gray-500 dark:text-gray-400">Enter your information to create a role</p>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rolename</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={`${role?.name || "Enter your name"}`}
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
                        <FormField
                            control={form.control}
                            name="roleType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {(Object.keys(RoleType) as Array<keyof typeof RoleType>).map((roleType: keyof typeof RoleType) => (
                                                <SelectItem key={roleType} value={roleType}>{roleType}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rune"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rune</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a rune" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {(Object.keys(Rune) as Array<keyof typeof Rune>).map((rune: keyof typeof Rune) => (
                                                <SelectItem key={rune} value={rune}>{rune}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="weapon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Weapon</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a weapon" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {(Object.keys(Weapon) as Array<keyof typeof Weapon>).map((weapon: keyof typeof Weapon) => (
                                                <SelectItem key={weapon} value={weapon}>{weapon}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="weightLimit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Weight Limit</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a weight limit" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {(Object.keys(WeightLimit).map((weightLimit: keyof typeof WeightLimit) => (
                                                    <SelectItem key={weightLimit} value={weightLimit}>{weightLimit}</SelectItem>
                                                )))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Submit</Button>
                    </div>
                </div>
            </form >
        </Form >
    )
}
