import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const getFlightScheduleTool = createTool({
  id: "get_flight_schedule",
  description: "Returns flight duration in hours and ticket price in USD between origin and destination.",
  inputSchema: z.object({
    origin: z.string().describe("Origin airport/city"),
    destination: z.string().describe("Destination airport/city"),
  }),
  execute: async ({ origin, destination }) => {
    return {
      origin,
      destination,
      flight_time_hours: 5.5,
      price_usd: 920,
    };
  },
});

export const getHotelScheduleTool = createTool({
  id: "get_hotel_schedule",
  description: "Returns available hotels in the specified city with their prices.",
  inputSchema: z.object({
    city: z.string().describe("City name"),
  }),
  execute: async ({ city }) => {
    return {
      city,
      hotels: [
        { name: "Nairobi Serena", price_usd: 250 },
        { name: "Radisson Blu", price_usd: 200 },
      ],
    };
  },
});

export const convertCurrencyTool = createTool({
  id: "convert_currency",
  description: "Converts currency from one type to another.",
  inputSchema: z.object({
    amount: z.number().describe("Amount to convert"),
    from_currency: z.string().describe("Base currency e.g. USD"),
    to_currency: z.string().describe("Target currency e.g. NGN"),
  }),
  execute: async ({ amount, from_currency, to_currency }) => {
    const exchangeRates: Record<string, number> = {
      USD_NGN: 1400,
    };
    const key = `${from_currency}_${to_currency}`;
    const rate = exchangeRates[key] ?? 1.0;
    return {
      amount_converted: amount * rate,
      currency: to_currency,
      rate_used: rate,
    };
  },
});

export const queryInternalRagTool = createTool({
  id: "query_internal_rag",
  description: "Queries internal document database / RAG system for company allowance and travel policies.",
  inputSchema: z.object({
    query: z.string().describe("Search query for internal knowledge base"),
  }),
  execute: async ({ query }) => {
    const q = query.toLowerCase();
    if (q.includes("allowance") || q.includes("nairobi") || q.includes("per diem")) {
      return {
        results: [
          "Corporate Travel Policy Section 4.2: Daily per diem allowance for Nairobi is $150 USD per day for incidentals and meals.",
        ],
      };
    }
    return { results: ["No relevant internal information found."] };
  },
});
