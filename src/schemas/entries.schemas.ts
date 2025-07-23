import {z} from "zod";

export const entrySchema = z.object({
    id: z.uuidv7().optional(),
    entry: z.string().min(1, "Content cannot be empty").max(20, "Content cannot exceed 20 characters"),
    createdAt: z.string().optional()
})

export const idSchema = z.uuidv7({error: "Invalid ID format, must be a valid UUIDv7"});

export type Entry = z.infer<typeof entrySchema>;
