import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RequestStatus from './RequestStatus';
import userEvent from '@testing-library/user-event';

const mockError = {
    status: 500,
    message: "Server error"
};

describe('RequestStatus', () => {
    test('should display Loading... when loading is true', () => {
        render(<RequestStatus loading={true}/>);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('should display errors', () => {
        render(<RequestStatus error={mockError} />);

        expect(screen.getByText('500')).toBeInTheDocument();
        expect(screen.getByText('Server error')).toBeInTheDocument();
    });

    test('should handle retry and back buttons', async () => {
        const handleRetry = vi.fn();
        const handleBack = vi.fn();

        render(<RequestStatus error={mockError} onRetry={handleRetry} onBack={handleBack}/>);

        const user = userEvent.setup();
        const retryButton = screen.getByRole('button', { name: /Retry/i });
        const backButton = screen.getByRole('button', { name: /Back to Activity Feed/i });
        await user.click(retryButton);
        await user.click(backButton);

        expect(handleRetry).toHaveBeenCalledTimes(1);
        expect(handleBack).toHaveBeenCalledTimes(1);
    });
});