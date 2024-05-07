'use client'
import React from 'react'
import { Button } from './ui/button'
import { deleteTask } from '@/actions'
import { Trash } from 'lucide-react'

type Props = {
    id: number
}

export default function DeleteButton({id }: Props) {
    return (
        <Button
            variant={"destructive"}
            size={"icon"}
            onClick={() => deleteTask(id)}
        >
            <Trash />
        </Button>
    )
}