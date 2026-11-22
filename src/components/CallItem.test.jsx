import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CallItem from './CallItem';
import userEvent from '@testing-library/user-event';

const mockCallItems = [
    {
        id: 1,
        call_type: 'missed',
        from: '+33 1 23 45 67 89',
        to: '+33 6 98 76 54 32',
        duration: 120,
        is_archived: false
    },
    {
        id: 2,
        call_type: 'answered',
        from: '+33 6 12 34 56 78',
        to: '+33 1 23 45 67 89',
        duration: 0,
        is_archived: false
    },
];

describe('CallItem', () => {
    test("should check when render that number 'from', number 'to' and call type appears", () => {
        render(<CallItem call={mockCallItems[0]} />);

        expect(screen.getByText((content) => content.startsWith('+33 1 23 45 67 89'))).toBeInTheDocument();
        expect(screen.getByText((content) => content.endsWith('+33 6 98 76 54 32'))).toBeInTheDocument();
        expect(screen.getByText('missed')).toBeInTheDocument();
    });

    test('should render the duration of item if that exist', () => {
        render(<CallItem call={mockCallItems[0]} />);

        expect(screen.getByText(`${mockCallItems[0].duration}s`)).toBeInTheDocument();
    }); 

    test('should not render the duration of item if that not exist', () => {
        render(<CallItem call={mockCallItems[1]} />);

        expect(screen.queryByText(`${mockCallItems[1].duration}s`)).not.toBeInTheDocument();
    });

    
    test('should archive a call item when user clicks on archive button', async () => {
        const handleArchive = vi.fn();
        render(<CallItem call={mockCallItems[0]} onArchive={handleArchive} />);

        const user = userEvent.setup();
        const archiveButton = screen.getByRole('button', { name: /archive/i });
        await user.click(archiveButton);

        expect(handleArchive).toHaveBeenCalledWith(mockCallItems[0].id);
    });
});