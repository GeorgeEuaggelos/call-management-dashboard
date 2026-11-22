import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CallsList from './CallsList.jsx';
import userEvent from '@testing-library/user-event';

const mockCalls = [
    {
        id: 1,
        from: '+33 6 12 34 56 78',
        call_type: 'answered',
        is_archived: false
    },
    {
        id: 2,
        from: '+33 6 98 76 54 32',
        call_type: 'missed',
        is_archived: false
    },
];

const archivedMockCalls = [
    {
        id: 1,
        from: '+33 9 12 34 16 08',
        call_type: 'answered',
        is_archived: true
    },
    {
        id: 2,
        from: '+33 2 78 70 24 38',
        call_type: 'missed',
        is_archived: false
    },
];

const emptyMockCalls = [];

describe('CallsList', () => {
    it('should render a list of calls', () => {
        render(<CallsList calls={mockCalls}/>);

        expect(screen.getByText('+33 6 12 34 56 78')).toBeInTheDocument();
        expect(screen.getByText('+33 6 98 76 54 32')).toBeInTheDocument();
    });

    it('should render calls that are not archived', () => {
        render(<CallsList calls={archivedMockCalls}/>);

        expect(screen.queryByText('+33 2 78 70 24 38')).toBeInTheDocument();
        expect(screen.queryByText('+33 9 12 34 16 08')).not.toBeInTheDocument();
    });

    it('should render a message that all calls have been archived', () => {
        render(<CallsList calls={emptyMockCalls}/>);

        expect(screen.getByText('All calls have been archived.')).toBeInTheDocument();
    });

    it('should render a selected item from CallsList', async () => {
        const handleSelectedItem = vi.fn();
        render(<CallsList calls={mockCalls} onSelect={handleSelectedItem} />);

        const user = userEvent.setup();
        const allListItems = screen.getAllByRole('listitem');
        await user.click(allListItems[0]);

        expect(handleSelectedItem).toHaveBeenCalledWith(mockCalls[0]);
    });
});