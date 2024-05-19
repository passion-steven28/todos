import InputComp from "@/components/InputComp";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { completed, deleteTask } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Circle, Trash } from "lucide-react";
import { Prisma } from "@/lib/prisma";
import { date } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area"
import TodosListCard from "@/components/TodosListCard";
import { auth } from "@clerk/nextjs/server";


export default async function Home() {
  const { userId } = auth();

  return (
    <main className="grid grid-cols-12 gap-4">
      <div className="col-span-12 text-center">
        <h1 className="text-5xl uppercase font-bold">today main focus</h1>
        <p className="text-2xl underline text-slate-700">welcome again todoS&apos;S</p>
      </div>

      <div className="col-start-3 col-end-10">
        <InputComp
          userId={userId}
        />
      </div>

      <div className="col-start-3 col-end-10 h-full">
        <TodosListCard />
      </div>
    </main>
  );
}
