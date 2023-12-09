import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";

export default class openaihelper {

    private chatModel: ChatOpenAI;

    constructor() {
        this.chatModel = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0.9,
        });
    }

    public async humanMessage(text: string) {
        const messages = [new HumanMessage({ content: text })];
        return await this.chatModel.predictMessages(messages);
    }
}