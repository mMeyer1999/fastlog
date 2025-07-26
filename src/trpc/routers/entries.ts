import { z } from 'zod';
import { entries } from "../../store/entries.store.ts";
import { v7 as uuidv7 } from 'uuid';
import {initTRPC, TRPCError} from "@trpc/server";
import type {Context} from "../context.ts";
import {entrySchema, idSchema} from "../../schemas/entries.schemas.ts";

const trpcRouter = initTRPC.context<Context>().create();

export const entriesRouter = trpcRouter.router({
  getAll: trpcRouter.procedure.query(() => {
    return entries;
  }),
  add: trpcRouter.procedure
      .input(entrySchema)
      .mutation(({ input }) => {
          const newEntry = {
              id: uuidv7(),
                entry: input.entry,
                createdAt: new Date().toISOString()
          };
          entries.push(newEntry);
          return newEntry;
      }),
  update: trpcRouter.procedure
      .input(entrySchema)
      .mutation(({ input }) => {
          const index = entries.findIndex((entry) => entry.id === input.id);
            if (index === -1) throw new TRPCError({code: 'NOT_FOUND', message: "Entry not found"});
            entries[index] = { ...entries[index], entry: input.entry };
            return entries[index];
      }),
  delete: trpcRouter.procedure
      .input(idSchema)
      .mutation(({ input }) => {
          const index = entries.findIndex((entry) => entry.id === input);
          if (index === -1) throw new TRPCError({code: 'NOT_FOUND', message: "Entry not found"});
          entries.splice(index, 1);
          return { message: "Entry deleted successfully" };
      })
})
