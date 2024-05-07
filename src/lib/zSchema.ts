import { z } from "zod";

export const FormSchema = z.object({
    title: z.string().min(10, {
        message: "Task must be at least 10 characters.",
    }),
})