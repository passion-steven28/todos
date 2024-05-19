import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import FilterMenu from './FilterMenu'
import { Separator } from './ui/separator'
import { UserButton } from '@clerk/nextjs'


const SideNav = () => {
    return (
        <aside className='relative h-full w-full bg-slate-100 shadow shadow-slate-700 p-2 px-4'>
            <div className="flex flex-col items-center justify-center w-full p-2">
                <Image
                src='/logo.svg'
                    alt='logo'
                    width={50}
                    height={50}
                />
                <h1>todoS</h1>
            </div>

            <Separator className='my-4 h-[2px] bg-slate-300' />

            <FilterMenu />

            <div className='absolute bottom-2 inset-x-0 flex items-center justify-center gap-4 w-full'>
                <Avatar>
                    <UserButton />
                </Avatar>
                <h1>passion steven</h1>
            </div>
        </aside>
    )
}

export default SideNav
