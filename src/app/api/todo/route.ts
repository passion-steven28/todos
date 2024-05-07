import { user } from './../../../types';
import { prisma } from "@/lib/prisma";
import { todo } from "@/types";

export async function POST(request: Request) {
    const user: user = await prisma.user.findUnique({
        where: {
            id: 1,
        },
    });



    const data: todo = await prisma.todo.create({
        data: {
            title: "title",
            completed: false,
            user: {
                connect: {
                    id: user?.id,
                },
            },
        },
    });


    return new Response(JSON.stringify(data));
}


// export async function GET(request: Request) {
//     const data = await prisma.todo.findMany();
//     console.log(data);

//     return new Response(JSON.stringify(data));
// }

// export async function POST(request: Request) {
//     const data = await request.json();

//     return await prisma.todo.create({
//         data: {
//             title: data.title,
//             completed: false,
//         },
//     });
// }

// export async function PUT(request: Request) {
//     const data = await request.json();

//     return await prisma.todo.update({
//         where: {
//             id: data.id,
//         },
//         data: {
//             title: data.title,
//             completed: data.completed,
//         },
//     });
// }

// export async function DELETE(request: Request) {
//     const data = await request.json();

//     return await prisma.todo.delete({
//         where: {
//             id: data.id,
//         },
//     });
// }
