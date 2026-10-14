import "dotenv/config";

/**
 * Config object contains:
 * GEMIN_API_KEY, MISTRAL_API_KEY, COHERE_API_KEY
 * readonly properties cannot be modified
*/
type CONFIG = {
    readonly GEMINI_API_KEY: string;
    readonly GROQ_API_KEY: string;
    readonly COHERE_API_KEY: string;
}

const config: CONFIG = {
    GEMINI_API_KEY: process.env.GEMIN_API_KEY || "",
    GROQ_API_KEY: process.env.MISTRAL_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || ""
}

export default config;