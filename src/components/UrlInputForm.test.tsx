import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UrlInputForm } from './UrlInputForm';

describe('UrlInputForm Component', () => {
    it('should render input and submit button', () => {
        render(<UrlInputForm onSubmit={() => { }} isLoading={false} />);

        expect(screen.getByPlaceholderText(/Insira a URL/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Auditar/i })).toBeInTheDocument();
    });

    it('should show error when submitting empty url', async () => {
        const handleSubmit = vi.fn();
        render(<UrlInputForm onSubmit={handleSubmit} isLoading={false} />);

        const button = screen.getByRole('button', { name: /Auditar/i });
        await userEvent.click(button);

        expect(screen.getByText(/Por favor, insira uma URL/i)).toBeInTheDocument();
        expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('should call onSubmit with typed url', async () => {
        const handleSubmit = vi.fn();
        render(<UrlInputForm onSubmit={handleSubmit} isLoading={false} />);

        const input = screen.getByPlaceholderText(/Insira a URL/i);
        await userEvent.type(input, 'example.com');

        const button = screen.getByRole('button', { name: /Auditar/i });
        await userEvent.click(button);

        expect(handleSubmit).toHaveBeenCalledWith('example.com');
    });
});