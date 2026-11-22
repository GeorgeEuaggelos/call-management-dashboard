import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const { mockGetCalls, mockGetCallById, mockArchiveCall } = vi.hoisted(() => ({
    mockGetCalls: vi.fn(),
    mockGetCallById: vi.fn(),
    mockArchiveCall: vi.fn()
}));

vi.mock('./services/callService.js', () => ({
    getCalls: mockGetCalls,
    getCallById: mockGetCallById,
    archiveCall: mockArchiveCall
}));

import App from './App';

describe('App', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should return the calls from API and App displays them on the screen', async () => {
        const mockCalls = [
            { 
                id: 1,
                direction: "Inbound",
                call_type: 'missed',
                from: '+33 9 12 34 16 08',
                to: '+33 6 98 76 54 32',
                duration: 120,
                is_archived: false 
            },
            { 
                id: 2,
                direction: "Outbound",
                call_type: 'answered',
                from: '+33 6 12 34 56 78',
                to: '+33 1 23 45 67 89',
                duration: 0,
                is_archived: false 
            }
        ];

        mockGetCalls.mockResolvedValue(mockCalls);

        render(<App />);
        await screen.findByText('Activity Feed');

        const callItems = screen.getAllByRole('listitem');

        expect(mockGetCalls).toHaveBeenCalledTimes(1);
        expect(callItems).toHaveLength(mockCalls.length);

        expect(callItems[0]).toHaveTextContent(mockCalls[0].from);
        expect(callItems[0]).toHaveTextContent(mockCalls[0].to);

        expect(callItems[1]).toHaveTextContent(mockCalls[1].from);
        expect(callItems[1]).toHaveTextContent(mockCalls[1].to);
    });

    test('should display call details', async () => {
        const mockCalls = [
            { 
                id: 1,
                direction: "Inbound",
                call_type: 'missed',
                from: '+33 9 12 34 16 08',
                to: '+33 6 98 76 54 32',
                duration: 120,
                is_archived: false 
            }
        ];

        const mockCallDetails = {
            id: 1,
            direction: "Inbound",
            from: '+33 1 23 45 67 89',
            to: '+33 6 11 22 33 44',
            call_type: "answered",
            duration: 120,
            created_at: Date.now(),
            is_archived: false,
            notes: [
                {
                    "id": 1,
                    "content": "Technical support — resolved connectivity issue"
                }
            ]
        };

        mockGetCalls.mockResolvedValue(mockCalls);
        mockGetCallById.mockResolvedValue(mockCallDetails);

        render(<App />);
        await screen.findByText('Activity Feed');

        const user = userEvent.setup();
        const callItems = screen.getAllByRole('listitem');
        await user.click(callItems[0]);

        expect(mockGetCallById).toHaveBeenCalledTimes(1);
        expect(mockGetCallById).toHaveBeenCalledWith(mockCalls[0].id);

        expect(await screen.findByText(mockCallDetails.notes[0].content)).toBeInTheDocument();
    });

    test('should archive a call when the user presses the archive button', async () => {
        const mockCalls = [
            { 
                id: 1,
                direction: "Inbound",
                call_type: 'missed',
                from: '+33 9 12 34 16 08',
                to: '+33 6 98 76 54 32',
                duration: 120,
                is_archived: false 
            },
            { 
                id: 2,
                direction: "Outbound",
                call_type: 'answered',
                from: '+33 6 12 34 56 78',
                to: '+33 1 23 45 67 89',
                duration: 0,
                is_archived: false 
            }
        ];
        mockGetCalls.mockResolvedValue(mockCalls);
        mockArchiveCall.mockResolvedValue({
            ...mockCalls[0],
            is_archived: true
        });

        render(<App />);
        await screen.findByText('Activity Feed');

        const user = userEvent.setup();
        const archiveButton = screen.getAllByRole('button', { name: /archive/i });

        await user.click(archiveButton[0]);

        expect(mockArchiveCall).toHaveBeenCalledTimes(1);
        expect(mockArchiveCall).toHaveBeenCalledWith(mockCalls[0].id);

        await waitFor(() => { expect(screen.getAllByRole('listitem')).toHaveLength(1); });

        const remainingCallItems = screen.getAllByRole('listitem');

        expect(remainingCallItems[0]).toHaveTextContent(mockCalls[1].from);
    });
});
