import express from 'express';
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./trpc/router.ts";
import { createContext } from "./trpc/context.ts";

const app = express();
app.use(express.json());

app.use('/trpc', createExpressMiddleware({
    router: appRouter,
    createContext
}));

export default app
