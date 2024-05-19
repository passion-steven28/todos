import { cn } from '@/lib/utils'
import { CalendarSearch, Plus, PlusCircle } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Prisma } from '@/lib/prisma'
import { createCategory } from '@/app/actions'

type Props = {}

export default async function FilterMenu({ }: Props) {
    // TODO: fetch filter tags from prisma
    const filterTags = await Prisma.category.findMany()

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between w-full gap-4'>
                <CalendarSearch />
                <h1>Today tasks</h1>
            </div>

            <div className='flex flex-col gap-4'>
                {filterTags.map((tag: any) =>
                    <Button
                        variant={'outline'}
                        key={tag.id}
                        className='flex items-center justify-start w-full gap-2'
                    >
                        <h1>{tag.name}</h1>
                    </Button>
                )}

                {/* Add Category */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='flex items-center w-full gap-2'>
                            <PlusCircle />
                            Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form action={createCategory}>
                            <DialogHeader>
                                <DialogTitle>Edit Category</DialogTitle>
                                <DialogDescription>
                                    Click save when you&apos;re done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        name="name"
                                        placeholder="Category name"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
