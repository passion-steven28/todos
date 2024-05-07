import { cn } from '@/lib/utils'
import { CalendarSearch, Plus, PlusCircle } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

type Props = {}

const filterTag = [
    {
        name: 'personal',
        type: 'personal',
        color: 'blue'
    },
    {
        name: 'personal',
        type: 'personal',
        color: 'blue'
    },
    {
        name: 'personal',
        type: 'personal',
        color: 'blue'
    },
]

export default function FilterMenu({ }: Props) {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between w-full gap-4'>
                <CalendarSearch />
                <h1>Today tasks</h1>
            </div>

            <div className='flex flex-col gap-4'>
                {filterTag.map((tag) =>
                    <Button
                        variant={'outline'}
                        color={'gray'}
                        key={tag.name}
                        className='flex items-center justify-start w-full gap-2'
                    >
                        <span style={{ backgroundColor: tag.color }} className='w-4 h-4 rounded-full'></span>
                        <h1>{tag.name}</h1>
                    </Button>
                )}
                <Button className='flex items-center w-full gap-2'>
                    <PlusCircle />
                    Add Filter
                </Button>
            </div>
        </div>
    )
}
