import config from "../config/config.js";
import {ChatGoogle} from "@langchain/google";
import {ChatCohere} from "@langchain/cohere";
import {ChatGroq} from "@langchain/groq";

/**
 * Roster exposed by the read-only GET /models endpoint.
 * Identifiers mirror the models passed to the LangChain clients below.
 */
export const MODEL_ROSTER = {
    fighter_1: {
        model: "openai/gpt-oss-20b",
        name: "GPT-OSS 20B",
        provider: "Groq",
    },
    fighter_2: {
        model: "command-a-03-2025",
        name: "Command A",
        provider: "Cohere",
    },
    judge: {
        model: "gemini-3.1-flash-lite",
        name: "Gemini 3.1 Flash Lite",
        provider: "Google",
    },
} as const;

export const geminiModel = new ChatGoogle({
    model: MODEL_ROSTER.judge.model,
    apiKey: config.GEMINI_API_KEY
});

export const cohereModel = new ChatCohere({
    model: MODEL_ROSTER.fighter_2.model,
    apiKey: config.COHERE_API_KEY
});

export const groqModel = new ChatGroq({
    model: MODEL_ROSTER.fighter_1.model,
    apiKey: config.GROQ_API_KEY
});

/** Model metadata for Fighter 1, Fighter 2, and the judge. */
export function getModelsInfo() {
    return {
        fighters: {
            solution_1: MODEL_ROSTER.fighter_1,
            solution_2: MODEL_ROSTER.fighter_2,
        },
        judge: MODEL_ROSTER.judge,
    };
}