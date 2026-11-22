import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CallItemsDetail from './CallItemsDetail';
import userEvent from '@testing-library/user-event';

const mockCall = [
    {
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
    },
    {
        id: 2,
        direction: "Outbound",
        from: '+33 6 22 33 44 55',
        to: '+33 1 23 45 67 89',
        call_type: "missed",
        duration: 0,
        created_at: Date.now(),
        is_archived: true,
        notes: []
    }
];

describe('CallItemsDetail', () => {
    test('should render call details correctly', () => {
        render(<CallItemsDetail call={mockCall[0]} />);

        expect(screen.getByText('Inbound')).toBeInTheDocument();
        expect(screen.getByText('+33 1 23 45 67 89')).toBeInTheDocument();
        expect(screen.getByText('+33 6 11 22 33 44')).toBeInTheDocument();
        expect(screen.getByText('answered')).toBeInTheDocument();
        expect(screen.getByText(`${mockCall[0].duration}s`)).toBeInTheDocument();
        expect(screen.getByText(mockCall[0].created_at)).toBeInTheDocument();
        expect(screen.getByText('Technical support — resolved connectivity issue')).toBeInTheDocument();
    });

    test('should display a message when call has no notes', () => {
        render(<CallItemsDetail call={mockCall[1]} />);

        expect(screen.getByText('No notes for this call.')).toBeInTheDocument();
    });

    test('should call onBack when a user clicks the back button', async () => {
        const handleBackButton = vi.fn();
        render(<CallItemsDetail call={mockCall[0]} onBack={handleBackButton} />);

        const user = userEvent.setup();
        const backButton = screen.getByRole('button', { name: /Back to calls/i });
        await user.click(backButton);

        expect(handleBackButton).toHaveBeenCalledTimes(1);
    });
});