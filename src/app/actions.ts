import { user } from './../types';
'use server'

import { todo } from '@/types';
import { Prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth, currentUser } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';


// Get the userId from auth() -- if null, the user is not signed in
// const { userId } = auth();


export const getTasks = async () => { }

const getCategoryByName = async (name: string) => {
    const category = await Prisma.category.findUnique({
        where: {
            name,
        },
    });

    return category;
};

export const addTask = async (formData: FormData) => {
    const categoryName = formData.get("category") as string; // Replace with the desired category name
    const userId = formData.get("userId") as string;
    console.log(userId);
    const category = await getCategoryByName(categoryName);

    const allUsers = await Prisma.user.findMany();



    if (userId) {
        // Query DB for user specific information or display assets only to signed in users


        // creating a new user if does not exist
        let user = allUsers.find((user) => user.id === userId);

        if (!user) {
            user = await prisma?.user.create({
                data: {
                    id: userId,
                },
            });
        }


        if (!category) {
            // Handle the case when the category is not found
            console.error("Category not found.");
            return;
        }

        await Prisma.todo.create({
            data: {
                userId: userId, // Use the user ID from the auth() function
                categoryId: category.id, // Use the category ID from the fetched category
                title: formData.get("title") as string,
            },
        });

        formData = new FormData();

        revalidatePath("/");

    } else {
        // Display assets only to signed in users
        console.log("User is not signed in.");
        redirect("/sign-in");
    }
};

export const deleteTask = async (id: number) => {
    await Prisma.todo.delete({
        where: {
            id,
        },
    });

    revalidatePath('/');
}

export const createCategory = async (name: FormData) => {
    await Prisma.category.create({
        data: {
            name: name.get('name') as string,
        },
    });

    revalidatePath('/');
}

export const getCategory = async () => {
    const categories = await Prisma.category.findMany();
    return categories;
}



export const completed = async (id: string) => { }
export const uncompleted = async (id: string) => { }
