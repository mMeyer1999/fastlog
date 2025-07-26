import { initTRPC } from "@trpc/server";
import type { Context } from "./context";
import { entriesRouter} from "./routers/entries";

const trpcContext = initTRPC.context<Context>().create();

export const appRouter = trpcContext.router({
    entries: entriesRouter,
})

export type AppRouter = typeof appRouter
