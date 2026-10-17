import "dotenv/config";

/**
 * Config object contains:
 * GEMINI_API_KEY, GROQ_API_KEY, COHERE_API_KEY
 * readonly properties cannot be modified
*/
type CONFIG = {
    readonly GEMINI_API_KEY: string;
    readonly GROQ_API_KEY: string;
    readonly COHERE_API_KEY: string;
}

const config: CONFIG = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
    GROQ_API_KEY: process.env.GROQ_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || ""
}

export default config;