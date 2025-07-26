import {describe, it, expect, beforeEach} from "vitest";
import request from "supertest";
import {v7 as uuidv7} from "uuid";
import app from "../src/app";
import {entries} from "../src/store/entries.store.ts";
import { appRouter} from "../src/trpc/router.ts";

const testEntry = { id: uuidv7(), entry: "Test entry", createdAt: new Date().toISOString() };

//Reset entries before each test to ensure a clean state
beforeEach(() => {
    entries.length = 0;
})

describe("TRPC Entries Router", () => {
    it('getAll should return all entries', async () => {
        const caller = appRouter.createCaller({});
        const result = await caller.entries.getAll();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(0); // Initially, there should be no entries
    });
    it('add should add a new entry and return it', async () => {
        const caller = appRouter.createCaller({});
        const result = await caller.entries.add(testEntry);
        expect(result.entry).toBe(testEntry.entry)
        expect(result.id).toBeDefined();
        expect(result.createdAt).toBeDefined();
        expect(entries.length).toBe(1); // Should have one entry now
    });
    it('update should update an existing entry', async () => {
        const caller = appRouter.createCaller({});
        entries.push(testEntry); // Add test entry to update
        const updatedEntry = { id: testEntry.id, entry: "Updated entry" };
        const result = await caller.entries.update(updatedEntry);
        expect(result.entry).toBe(updatedEntry.entry);
    });
    it('update should throw an error for non-existent entry', async () => {
        const caller = appRouter.createCaller({});
        const nonExistentId = uuidv7();
        await expect(caller.entries.update({ id: nonExistentId, entry: "Updated entry" })).rejects.toThrow("Entry not found");
    });
    it('delete should remove an entry', async () => {
        const caller = appRouter.createCaller({});
        entries.push(testEntry); // Add test entry to delete
        const result = await caller.entries.delete(testEntry.id);
        expect(result.message).toBe("Entry deleted successfully");
        expect(entries.length).toBe(0); // Should have no entries now
    });
    it('delete should throw an error for non-existent entry', async () => {
        const caller = appRouter.createCaller({});
        const nonExistentId = uuidv7();
        await expect(caller.entries.delete(nonExistentId)).rejects.toThrow("Entry not found");
    });
    it('add should throw an error for invalid entry', async () => {
        const caller = appRouter.createCaller({});
        const invalidEntry = { entry: "" }; // Invalid because entry is empty
        await expect(caller.entries.add(invalidEntry)).rejects.toThrow("Content cannot be empty");
    })
})

describe('Test HTTP Error Handling', () => {
    it('should return 404 for non-existent route', async () => {
        const response = await request(app).get("/non-existent-route");
        expect(response.status).toBe(404);
    });
    it('Validation error should return 400', async () => {
        const response = await request(app).post('/trpc/entries.add')
            .send({
                entry: "",
            });
        expect(response.status).toBe(400);
        expect(response.body.error.message).toContain("Content cannot be empty");
    })
})
