import { Document } from 'langchain/document';
import { BaseDocumentLoader } from 'langchain/document_loaders';
export class CustomWebLoader extends BaseDocumentLoader {
    constructor(webPath) {
        super();
        this.webPath = webPath;
    }
    static async _scrape(url) {
        const { load } = await CustomWebLoader.imports();
        const response = await fetch(url);
        const html = await response.text();
        return load(html);
    }
    async scrape() {
        return CustomWebLoader._scrape(this.webPath);
    }
    async load() {
        const $ = await this.scrape();
        const title = $('h1.entry-title').text();
        const date = $('meta[property="article:published_time"]').attr('content');
        const content = $('.entry-content')
            .clone()
            .find('div.elementor, style')
            .remove()
            .end()
            .text();
        const cleanedContent = content.replace(/\s+/g, ' ').trim();
        const contentLength = cleanedContent?.match(/\b\w+\b/g)?.length ?? 0;
        const metadata = { source: this.webPath, title, date, contentLength };
        return [new Document({ pageContent: cleanedContent, metadata })];
    }
    static async imports() {
        try {
            const { load } = await import('cheerio');
            return { load };
        }
        catch (e) {
            console.error(e);
            throw new Error('Please install cheerio as a dependency with, e.g. `yarn add cheerio`');
        }
    }
}
