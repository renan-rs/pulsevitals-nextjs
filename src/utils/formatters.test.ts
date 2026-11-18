import { describe, it, expect } from 'vitest';
import { cleanUrl } from './formatters';

describe('Formatters Utils', () => {
    it('should format raw domain into clean origin url', () => {
        expect(cleanUrl('google.com')).toBe('https://google.com');
        expect(cleanUrl('https://github.com/test')).toBe('https://github.com');
    });
});