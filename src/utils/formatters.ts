export function cleanUrl(inputUrl: string): string {
    try {
        const url = inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`;
        const parsed = new URL(url);
        return parsed.origin
    } catch {
        return inputUrl;
    }
}