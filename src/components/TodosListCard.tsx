import React from 'react'
import InputComp from "@/components/InputComp";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { completed, deleteTask } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Circle, ListTodo, Trash } from "lucide-react";
import { Prisma } from "@/lib/prisma";
import { date } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area"
import DeleteButton from './DeleteButton';
import { auth } from '@clerk/nextjs/server';

type Props = {}

async function getData() {
    const { userId } = auth();

    const todo = await Prisma.todo.findMany({
        where: {
            userId: userId as string,
        },
        orderBy: {
            createdAt: "desc",
        }
    });
    return todo;
}

export default async function TodosListCard({ }: Props) {
    const data = await getData();

    if (data.length === 0) {
        return (
            <div className="max-h-[70vh] h-[70vh] w-full p-2 flex flex-col items-center justify-center bg-slate-700 gap-2 overflow-y-auto">
                <p className="text-2xl text-center font-semibold text-gray-500">
                    you haven&apos;t added any task yet
                </p>
                <div>
                    <ListTodo size={50}  />
                </div>
            </div>
        )
    }

    return (
        <div
            className="h-[70vh] w-full p-2 flex flex-col bg-slate-700 gap-2 overflow-y-auto"
        >
            {data.map((item) => {
                return (
                    <Card
                        key={item.id}
                        className="space-y-4"
                    >
                        <CardContent className="flex flex-row items-center justify-between p-2">
                            <CardTitle className="text-xl font-semibold">
                                {item.title}
                            </CardTitle>

                            <div className="flex items-center gap-4">
                                <div>
                                    <CardTitle className="text-lg">
                                        {item.createdAt.toLocaleTimeString("en-US", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </CardTitle>
                                    <CardTitle className="text-xs text-gray-700">
                                        {item.createdAt.toLocaleDateString()}
                                    </CardTitle>
                                </div>
                                <DeleteButton
                                    id={item.id}
                                />
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    )
}