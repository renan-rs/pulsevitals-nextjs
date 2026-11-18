export interface CoreWebVitals {
    lcp: { value: string; score: number };
    cls: { value: string; score: number };
    inp: { value: string; score: number };
}

export interface AccessibilityIssue{
    id: string;
    title: string;
    description: string;
    impact: 'critical' | 'serious' | 'moderate' | 'minor';
    snippetBefore?: string;
    snippetAfter?: string;
}

export interface ParsedAuditResult {
    url: string;
    performanceScore: number;
    accessibilityScore: number;
    seoScore: number;
    bestPracticesScore: number;
    coreWebVitals: CoreWebVitals;
    accessibilityIssues: AccessibilityIssue[]
}