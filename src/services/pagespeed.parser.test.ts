import { describe, it, expect } from 'vitest';
import { parsePageSpeedResponse } from './pagespeed.parser';

describe('PageSpeed Response Parser', () => {
    it('should extract scores, core web vitals and accessibility issues properly', () => {
        const mockApiResponse = {
            id: 'https://example.com',
            lighthouseResult: {
                finalUrl: 'https://example.com',
                categories: {
                    performance: { score: 0.89 },
                    accessibility: { score: 0.72 },
                    seo: { score: 0.95 },
                    'best-practices': { score: 1.0 },
                },
                audits: {
                    'largest-contentful-paint': { displayValue: '1.8 s', score: 0.92 },
                    'cumulative-layout=shift': { displayValue: '1.02', score: 0.99 },
                    'interaction-to-next-paint': { displayValue: '120 ms', score: 0.95 },
                    'image-alt': {
                        id: 'image-alt',
                        title: 'Image elements do not have [alt] attributes',
                        description: 'Informative elements should aim for short, descriptive alternate text.',
                        score: 0,
                        details: {
                            items: [
                                {
                                    node: {
                                        snippet: '<img src="banner.png">',
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        };

        const result = parsePageSpeedResponse(mockApiResponse);

        expect(result.url).toBe('https://example.com');
        expect(result.performanceScore).toBe(89);
        expect(result.accessibilityScore).toBe(72);
        expect(result.seoScore).toBe(95);
        expect(result.bestPracticesScore).toBe(100);
        expect(result.coreWebVitals.lcp).toEqual({ value: '1.8 s', score: 92 });
        expect(result.accessibilityIssues).toHaveLength(1);
        expect(result.accessibilityIssues[0].id).toBe('image-alt');
        expect(result.accessibilityIssues[0].snippetBefore).toBe('<img src="banner.png">');
        expect(result.accessibilityIssues[0].snippetAfter).toContain('alt=');
    });

    it('should handle missing optional fields gracefully with default fallbacks', () => {
        const minimalResponse = {
            lighthouseResult: {
                finalUrl: 'https://minimal.dev',
                categories: {},
                audits: {},
            },
        };

        const result = parsePageSpeedResponse(minimalResponse);

        expect(result.performanceScore).toBe(0);
        expect(result.coreWebVitals.lcp.value).toBe('N/A');
        expect(result.accessibilityIssues).toEqual([]);
        
    });
});