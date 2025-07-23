import {type NextFunction, type Response, type Request} from "express";
import { entrySchema, idSchema } from "../schemas/entries.schemas.ts";
import { entries } from "../store/entries.store.ts";
import { v7 as uuidv7 } from "uuid";
import { HttpError } from "../errors/http.errors.ts";

export function getEntries(req: Request, res: Response) {
    res.status(200).json(entries);
}

export function addEntry(req: Request, res: Response, next: NextFunction) {
    try {
        const parsedEntry = entrySchema.parse(req.body);
        const newEntry = {
            id: uuidv7(),
            entry: parsedEntry.entry,
            createdAt: new Date().toISOString()
        };
        entries.push(newEntry);
        res.status(201).json({ message: "Entry added successfully" });
    } catch (error) {
        next(error);
    }
}

export function updateEntry(req: Request, res: Response, next: NextFunction) {
    try {
        const parsedId = idSchema.parse(req.params.id);
        const parsedEntry = entrySchema.parse(req.body);
        const index = entries.findIndex(entry => entry.id === parsedId);

        if (index === -1) {
            throw new HttpError(404, "Entry not found");
        }

        entries[index] = {
            ...entries[index],
            entry: parsedEntry.entry,
            createdAt: new Date().toISOString()
        };
        res.status(200).json({ message: "Entry updated successfully" });
    } catch (error) {
        next(error);
    }
}

export function deleteEntry(req: Request, res: Response, next: NextFunction) {
    try {
        const parsedId = idSchema.parse(req.params.id);
        const index = entries.findIndex(entry => entry.id === parsedId);

        if (index === -1) {
            throw new HttpError(404, "Entry not found");
        }

        entries.splice(index, 1);
        res.status(200).json({ message: "Entry deleted successfully" });
    } catch (error) {
        next(error);
    }
}
