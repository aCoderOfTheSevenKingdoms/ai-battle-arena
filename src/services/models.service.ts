import config from "../config/config.js";
import {ChatGoogle} from "@langchain/google";
import {ChatCohere} from "@langchain/cohere";
import {ChatGroq} from "@langchain/groq";

export const geminiModel = new ChatGoogle({
    model: "gemini-3-flash",
    apiKey: config.GEMINI_API_KEY
});

export const cohereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: config.COHERE_API_KEY
});

export const groqModel = new ChatGroq({
    model: "openai/gpt-oss-20b",
    apiKey: config.GROQ_API_KEY
});