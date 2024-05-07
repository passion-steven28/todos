// // pages/api/createTodo.ts
// import { Prisma } from '@/lib/prisma';
// import type { NextApiRequest, NextApiResponse } from 'next';


// export async function POST(request: NextApiRequest, res: NextApiResponse) {
//     try {
//         const { title } = request.body;

//         const todo = await Prisma.todo.create({
//             data: {
//                 category
//                 title,
//                 completed: false,
//                 userId: 1, // You might want to adjust this based on your application's logic
//             },
//         });

//         res.status(200).json(todo);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create todo' });
//     }
// }

