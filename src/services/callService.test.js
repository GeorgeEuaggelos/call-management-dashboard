import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCalls, getCallById, archiveCall } from './callService.js';

describe('getCalls', () => {
    const fetchCalls = vi.fn();

    beforeEach(() => {
        fetchCalls.mockResolvedValue({
            ok: true,
            json: async () => ({
                calls: [
                    { id: 1, from: "111", to: "222" },
                    { id: 2, from: "333", to: "444" }
                ]
            })
        });

        vi.stubGlobal('fetch', fetchCalls);
    });

    it('should return an array of call objects', async () => {
        const result = await getCalls();

        expect(result).toEqual([
            { id: 1, from: "111", to: "222" },
            { id: 2, from: "333", to: "444" }
        ]);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });
});

describe(getCallById, () => {
    const fetchCallsById = vi.fn();

    beforeEach(() => {
        fetchCallsById.mockResolvedValue({
            ok: true,
            json: async () => (
                { id: 1, from: "111", to: "222" }
            )
        });
        
        vi.stubGlobal('fetch', fetchCallsById);
    });

    it('should return an object call based on specific id', async () => {
        const result = await getCallById(1);

        expect(result).toEqual(
            { id: 1, from: "111", to: "222" }
        );

        expect(fetchCallsById).toHaveBeenCalledWith(
            "https://call-center-mu.vercel.app/calls/1",
            expect.any(Object)
        );
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });
});

describe(archiveCall, () => {
    const archiveCallById = vi.fn();

    beforeEach(() => {
        archiveCallById.mockResolvedValue({
            ok: true,
            json: async () => ({
                success: true,
                message: "Call archived successfully"
            })
        });

        vi.stubGlobal('fetch', archiveCallById);
    });

    it('should archive a call successfully', async () => {
        const result = await archiveCall(1);

        expect(result).toEqual({
            success: true,
            message: "Call archived successfully"
        });

        expect(archiveCallById).toHaveBeenCalledWith(
            "https://call-center-mu.vercel.app/calls/1/archive",
            expect.objectContaining({
                method: "PATCH"
            })
        );
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });
});