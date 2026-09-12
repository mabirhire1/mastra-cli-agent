import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import {
  getFlightScheduleTool,
  getHotelScheduleTool,
  convertCurrencyTool,
  queryInternalRagTool,
} from "../tools/index";

// Create the OpenRouter provider using the env var
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

// The model name also comes from the environment
const modelName = process.env.MODEL_NAME || "openai/gpt-4o-mini";

export const travelAgent = new Agent({
  id: "travel-agent",
  name: "Travel Assistant",
  instructions: `You are a professional corporate travel assistant.

You help employees plan business trips. You have access to four tools:
1. get_flight_schedule – flight duration & price
2. get_hotel_schedule – hotel options & prices
3. convert_currency – currency conversion
4. query_internal_rag – company travel policy & allowances

Always:
- Be clear, concise and friendly
- Use tools when you need real data
- Mention the daily allowance when relevant
- Summarize costs helpfully`,

  model: openrouter(modelName),

  tools: {
    getFlightScheduleTool,
    getHotelScheduleTool,
    convertCurrencyTool,
    queryInternalRagTool,
  },

  // Conversation memory
  memory: new Memory({
    options: {
      lastMessages: 12,
    },
  }),
});
