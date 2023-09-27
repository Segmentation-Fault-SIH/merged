import * as fs from 'fs/promises';
import { CustomWebLoader } from '@/utils/custom_web_loader';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { SupabaseVectorStore } from 'langchain/vectorstores';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { supabaseClient } from '@/utils/supabase-client';
import { urls } from '@/config/notionurls';
async function extractDataFromUrl(url) {
    try {
        const loader = new CustomWebLoader(url);
        const docs = await loader.load();
        return docs;
    }
    catch (error) {
        console.error(`Error while extracting data from ${url}: ${error}`);
        return [];
    }
}
async function extractDataFromUrls(urls) {
    console.log('extracting data from urls...');
    const documents = [];
    for (const url of urls) {
        const docs = await extractDataFromUrl(url);
        documents.push(...docs);
    }
    console.log('data extracted from urls');
    const json = JSON.stringify(documents);
    await fs.writeFile('franknotion.json', json);
    console.log('json file containing data saved on disk');
    return documents;
}
async function embedDocuments(client, docs, embeddings) {
    console.log('creating embeddings...');
    await SupabaseVectorStore.fromDocuments(client, docs, embeddings);
    console.log('embeddings successfully stored in supabase');
}
async function splitDocsIntoChunks(docs) {
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 2000,
        chunkOverlap: 200,
    });
    return await textSplitter.splitDocuments(docs);
}
(async function run(urls) {
    try {
        //load data from each url
        const rawDocs = await extractDataFromUrls(urls);
        //split docs into chunks for openai context window
        const docs = await splitDocsIntoChunks(rawDocs);
        //embed docs into supabase
        await embedDocuments(supabaseClient, docs, new OpenAIEmbeddings());
    }
    catch (error) {
        console.log('error occured:', error);
    }
})(urls);