import { OpenAI } from 'langchain/llms';
import { LLMChain, ChatVectorDBQAChain, loadQAChain } from 'langchain/chains';
import { HNSWLib, SupabaseVectorStore } from 'langchain/vectorstores';
import { PromptTemplate } from 'langchain/prompts';

const CONDENSE_PROMPT =
  PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`);

const QA_PROMPT = PromptTemplate.fromTemplate(
  `You are an AI assistant and a Disaster Relief Management expert. You are given the following extracted parts of a long document and a question. Provide a conversational answer based on the context provided.
  You should only use hyperlinks as references that are explicitly listed as a source in the context below. Do NOT make up a hyperlink that is not listed below.
  . Don't try to make up an answer.
  If the question is not related to disasters, disaster management, or disaster recuse and relief or the context provided, politely inform them that you are tuned to only to answer questions that are related to disaster.
  You are also responsible for responding to any queries about our project . Our solution is a website called 
  RescueHub that aims to build a 
  community of rescue agencies, 
  streamlining disaster relief for a 
  safer tomorrow.It is called Rescue Hub .We have created a central 
  database where all rescue 
  agency administrators can 
  manually register the information
  of their agencies including their 
  location, contact details, and 
  areas of expertise.
  RescueHub also includes a 
map that shows the locations 
of all registered rescue agencies.It enables communication and 
collaboration among agencies 
allowing them to send requests 
for assistance to each other, or 
collaborate on shared resources 
such as medical equipment, 
food etc.RescueHub also helps individuals
who has the passion for 
contributing to disaster relief
become official volunteers by 
registering into their preferred
agency.Flash chatbot, our dedicated 
disaster relief chatbot, offers 
personalized responses to all 
disaster relief inquiries. 
It relies exclusively on information
from trusted government websites,
ensuring accurate information.
Choose the most relevant link if needed , that matches the context provided:

Question: {question}
=========
{context}
=========
Answer in Markdown:`,
);

export const makeChain = (
  vectorstore: SupabaseVectorStore,
  onTokenStream?: (token: string) => void,
) => {
  const questionGenerator = new LLMChain({
    llm: new OpenAI({ temperature: 0 }),
    prompt: CONDENSE_PROMPT,
  });
  const docChain = loadQAChain(
    new OpenAI({
      temperature: 0,
      streaming: Boolean(onTokenStream),
      callbackManager: {
        handleNewToken: onTokenStream,
      },
    }),
    { prompt: QA_PROMPT },
  );

  return new ChatVectorDBQAChain({
    vectorstore,
    combineDocumentsChain: docChain,
    questionGeneratorChain: questionGenerator,
  });
};
