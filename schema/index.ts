import * as z from "zod";

export const TaskInputSchema = z.object({
    category: z.string(),
    title: z.string(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
})