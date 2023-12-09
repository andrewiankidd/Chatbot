import { AIMessage } from "langchain/schema";

export default class openaidummy {

    constructor() {
    }

    public async humanMessage(_text: string) {

        const message = 'Save on credits!' +  Math.floor(Math.random() * 100)
        const responsePayload = {
            lc_serializable: true,
            lc_kwargs: {
                content: message,
                additional_kwargs: { function_call: undefined, tool_calls: undefined }
            },
            lc_namespace: [ 'langchain_core', 'messages' ],
            content: message,
            name: undefined,
            additional_kwargs: { function_call: undefined, tool_calls: undefined }
        }
        await new Promise(resolve => setTimeout(resolve, 100 * Math.floor(Math.floor(Math.random() * 6) + 1)));
        return await Promise.resolve(responsePayload as any as AIMessage);
    }
}