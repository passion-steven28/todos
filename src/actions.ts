'use server'



import { todo } from '@/types';
import { Prisma } from './lib/prisma';
import { toast } from './components/ui/use-toast';
import { revalidatePath } from 'next/cache';

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
    const categoryName = formData.get('category') as string; // Replace with the desired category name
    const category = await getCategoryByName(categoryName);

    if (!category) {
        // Handle the case when the category is not found
        console.error('Category not found.');
        return;
    }

    await Prisma.todo.create({
        data: {
            categoryId: category.id, // Use the category ID from the fetched category
            title: formData.get('title') as string,
        },
    });

    formData = new FormData();

    revalidatePath('/');
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
