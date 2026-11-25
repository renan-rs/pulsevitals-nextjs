import { test, expect } from '@playwright/test';

test('Fluxo completo: Digitar URL, rodar auditoria e verificar relatório', async ({ page }) => {
    await page.route('**/api/audit', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ id: 'mock-audit-id-123' }),
        });
    });

    await page.goto('/');

    const urlInput = page.getByPlaceholder(/Insira a URL/i);
    await expect(urlInput).toBeVisible();
    await urlInput.fill('https://example.com');

    await page.getByRole('button', { name: /Auditar/i }).click();

    await page.waitForURL(/\/audit\/mock-audit-id-123/);
    await expect(page.getByRole('heading', { name: 'Relatório de Desempenho' })).toBeVisible();
});