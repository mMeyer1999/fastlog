import {describe, it, expect, beforeEach} from "vitest";
import request from "supertest";
import {v7 as uuidv7} from "uuid";
import app from "../src/app";
import {entries} from "../src/store/entries.store.ts";

const testEntry = { id: uuidv7(), entry: "Test entry", createdAt: new Date().toISOString() };

//Reset entries before each test to ensure a clean state
beforeEach(() => {
    entries.length = 0;
})

describe("Entries API", () => {
    it("GET /entries should return all entries and status 200", async () => {
        const response = await request(app).get("/entries");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
    it("GET /entry/:id should return a specific entry by ID and status 200", async () => {
        entries.push(testEntry);
        const response = await request(app).get(`/entries/${testEntry.id}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(testEntry.id);
        expect(response.body.entry).toBe(testEntry.entry);
    });
    it("GET /entry/:id should return 404 for non-existent entry", async () => {
        const nonExistentId = uuidv7();
        const response = await request(app).get(`/entries/${nonExistentId}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Entry not found");
    })
    it("POST /entry should add a new entry and return status 201", async () => {
        const newEntry = { entry: "Test entry" };
        const response = await request(app).post("/entries").send(newEntry);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Entry added successfully");
    });
    it("POST /entry should return 400 for invalid entry", async () => {
        const invalidEntry = { entry: "" }; // Invalid because entry is empty
        const response = await request(app).post("/entries").send(invalidEntry);
        expect(response.status).toBe(400);
        expect(response.body.errors[0].message).toBe("Content cannot be empty");
    })
    it('GET /entries should return one element when it was added', async () => {
        entries.push(testEntry);
        const expectedEntry = { entry: "Test entry" };
        const response = await request(app).get("/entries");
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].entry).toBe(expectedEntry.entry);
    });
    it('PUT /entry/:id should update element', async () => {
        entries.push(testEntry);
        const entriesResponse = await request(app).get("/entries");
        const entryId = entriesResponse.body[0].id;
        const updatedEntry = { entry: "Updated entry" };
        const response = await request(app).put(`/entries/${entryId}`).send(updatedEntry);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Entry updated successfully");

        // Verify entry was updated correctly
        const updatedEntriesResponse = await request(app).get("/entries");
        expect(updatedEntriesResponse.body[0].entry).toBe(updatedEntry.entry);
    });
    it('PUT /entry/:id should return 404 for non-existent entry', async () => {
        const nonExistentId = uuidv7();
        const updatedEntry = { entry: "Updated entry" };
        const response = await request(app).put(`/entries/${nonExistentId}`).send(updatedEntry);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Entry not found");
    });
    it('DELETE /entry/:id should delete element', async () => {
        entries.push(testEntry);
        const entriesResponse = await request(app).get("/entries");
        const entryId = entriesResponse.body[0].id;
        const response = await request(app).delete(`/entries/${entryId}`);
        expect(response.status).toBe(200);
        const updatedEntriesResponse = await request(app).get("/entries");
        expect(updatedEntriesResponse.body.length).toBe(0);
    });
    it('DELETE /entry/:id should return 404 for non-existent entry', async () => {
        const nonExistentId = uuidv7();
        const response = await request(app).delete(`/entries/${nonExistentId}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Entry not found");
    });
})
