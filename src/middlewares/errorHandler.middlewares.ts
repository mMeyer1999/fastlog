import {type Request, type Response, type NextFunction} from 'express';
import {z} from 'zod';
import {HttpError} from '../errors/http.errors.js';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    console.error(err);

    if (err instanceof z.ZodError) {
        res.status(400).json({
            errors: err.issues.map((e) => ({
                path: e.path.join("."),
                message: e.message,
            })),
        });
        return;
    }

    if (err instanceof HttpError) {
        res.status(err.status).json({ message: err.message });
        return;
    }

    res.status(500).json({ message: "Internal Server Error" });
}
