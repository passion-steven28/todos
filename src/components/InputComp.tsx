"use client"
import React, { FormEvent } from 'react';
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
import { addTask } from '@/actions';
import { TaskInputSchema } from '../../schema';



type Props = {}

export default function InputComp({ }: Props) {
    const [, startTransition] = useTransition();

    const formRef = React.useRef<HTMLFormElement>(null);

    const form = useForm({
        resolver: zodResolver(TaskInputSchema),
        defaultValues: {
            title: "",
            category: "",
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => {
                    startTransition(() => {
                        const formData = new FormData();
                        formData.append('title', values.title);
                        formData.append('category', values.category);
                        addTask(formData);
                    });
                })}
                ref={formRef}
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
                                    <SelectItem value="family">family</SelectItem>
                                    <SelectItem value="school">school</SelectItem>
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
