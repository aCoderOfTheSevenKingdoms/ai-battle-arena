import { StateSchema, MessagesValue, ReducedValue, StateGraph, START, END } from "@langchain/langgraph";
import type { GraphNode, StateType } from "@langchain/langgraph";
import { HumanMessage, createAgent, providerStrategy } from "langchain";
import {z} from "zod";
import { cohereModel, groqModel, geminiModel } from "./models.service.js";

const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next;
        }
    }),
    solution_2: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next;
        }
    }),
    judge_recommendation: new ReducedValue(z.object().default({
        solution_1_score: 0,
        solution_2_score: 0, 
        winner: "solution_1" as "solution_1" | "solution_2"
    }), {
        reducer: (current, next) => {
            return next
        }
    })
});

const solutionNode = async (state: typeof State) => {
    
    const [groq_solution, cohere_solution] = await Promise.all([
        groqModel.invoke(state.messages[0].text),
        cohereModel.invoke(state.messages[0].text)
    ]);

    return {
        solution_1: groq_solution.text,
        solution_2: cohere_solution.text
    }
}

const judgeNode = async (state: typeof State) => {
    const {solution_1, solution_2} = state;
    const judge = createAgent({
        model: geminiModel,
        tools: [],
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10)
        }))
    });

    const judgeResponse = await judge.invoke({
        messages: [
            new HumanMessage(
                `You are a judge tasked with evaluating the quality of two solutions to a problem. The problem is: ${state.messages[0].text}. The first solution is: ${solution_1}. The second solution is: ${solution_2}. Please provide a score between 0 and 10 for each solution, where 0 means the solution is completely incorrect or irrelevant, and 10 means the solution is perfect and fully addresses the problem.`
            )
        ]
    });

    const result = judgeResponse.structuredResponse;
    return {
        judge_recommendation: result
    }
}

const graph = new StateGraph(State)
   .addNode("solution", solutionNode)
   .addEdge(START, "solution")
   .addEdge("solution", END)
   .compile();

export default async function(userMessage: string) {
    const result = await graph.invoke({
        messages: [
            new HumanMessage(userMessage)
        ]
    });

    return result;
}
