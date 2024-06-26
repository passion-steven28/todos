"use client"
import React, { FormEvent, useEffect, useState } from 'react';
import { useTransition } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Input } from './ui/input'
import { toast } from './ui/use-toast'
import { ToastAction } from './ui/toast'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FormSchema } from '@/lib/zSchema'
import { Prisma } from '@/lib/prisma'
import { addTask, getCategory } from '@/app/actions';
import { TaskInputSchema } from '../../schema';

import { useUser } from "@clerk/nextjs";

// Define an interface for the category
interface Category {
    id: number;
    name: string;
}

type Props = {
    userId?: string | null;
}

export default function InputComp({ userId }: Props) {
    const [, startTransition] = useTransition();
    const [categories, setCategories] = useState<Category[]>([]);

    console.log(userId)

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategory();
            setCategories(categories);
        };

        fetchCategories();
    }, []);

    const formRef = React.useRef<HTMLFormElement>(null);

    const form = useForm({
        resolver: zodResolver(TaskInputSchema),
        defaultValues: {
            title: "",
            category: "",
            userId: userId,
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => {
                    if (!values.title || !values.category) return;

                    startTransition(() => {
                        const formData = new FormData();
                        formData.append('title', values.title);
                        formData.append('category', values.category);
                        // Ensure values.userId is a string before appending
                        if (typeof values.userId === 'string') {
                            formData.append('userId', values.userId);
                        }
                        addTask(formData);
                    });
                    toast({
                        title: "Todo added successfully!",
                        description: "Friday, February 10, 2023 at 5:57 PM",
                    });

                    // Use the reset method from react-hook-form to reset the form fields
                    form.reset({
                        title: "",
                        category: "",
                    });
                })}
                className="flex items-center justify-around gap-2"
            >
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.name}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem
                            className="w-full"
                        >
                            <Input
                                {...field}
                                type="text"
                                placeholder="what is your next task?"
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <input type="hidden" name="userId" value="userId" />
                {/* <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                        <FormItem>
                            <Input
                             
                                type="hidden"
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
