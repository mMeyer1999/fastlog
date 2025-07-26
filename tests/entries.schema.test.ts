import { describe, it, expect } from "vitest";
import { entrySchema} from "../src/schemas/entries.schemas.ts";

describe('Entry Schema', () => {
    it('should validate a valid entry', () => {
        const data = {
            entry: "Valid entry",
        };
        const result = entrySchema.safeParse(data);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.entry).toBe("Valid entry");
        }
    });
    it('should fail when entry is empty', () => {
        const date = {
            entry: "",
        };
        const result = entrySchema.safeParse(date);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.message).toContain("Content cannot be empty");
        }
    });
    it('should fail when entry exceeds 50 characters', () => {
        const data = {
            entry: "a".repeat(51), // 51 characters long
        };
        const result = entrySchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.message).toContain("Content cannot exceed 20 characters");
        }
    });
})
