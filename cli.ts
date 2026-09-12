#!/usr/bin/env node
import "dotenv/config"; 
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { mastra } from "./src/mastra/index.js";

// Validation of environment variables
if (!process.env.OPENROUTER_API_KEY) {
  console.error("  Missing OPENROUTER_API_KEY in .env");
  process.exit(1);
}

if (!process.env.MODEL_NAME) {
  console.warn("  MODEL_NAME not set, falling back to openai/gpt-4o-mini");
}

// Mastra instance Agent
const agent = mastra.getAgent("travelAgent");
if (!agent) {
  console.error("  Could not find travelAgent");
  process.exit(1);
}

// Conversation identifiers
const RESOURCE_ID = "cli-user-001";
const THREAD_ID = `thread-${Date.now()}`;

// Readline interface
const rl = readline.createInterface({ input, output });
process.on("SIGINT", () => {
  console.log("\n\n  Goodbye!");
  rl.close();
  process.exit(0);
});

// Streaming
async function streamReply(userMessage: string) {
  process.stdout.write("\n Assistant: ");

  try {
    const stream = await agent.stream(userMessage, {
      memory: {
        resource: RESOURCE_ID,
        thread: THREAD_ID,
      },
    });

    // Stream tokens as they arrive
    for await (const chunk of stream.textStream) {
      process.stdout.write(chunk);
    }

    console.log("\n");
  } catch (err: any) {
    console.error("\n  Error while talking to the agent:");
    console.error(err?.message || err);
    console.log("");
  }
}

// Main interactive loop
async function main() {
  console.log("──────────────────────────────────────────────");
  console.log("  Corporate Travel Assistant (Mastra CLI)");
  console.log("  Type your question and press Enter.");
  console.log("  Type 'exit' or press Ctrl+C to quit.");
  console.log("──────────────────────────────────────────────\n");

  while (true) {
    const userInput = await rl.question("You: ");

    const trimmed = userInput.trim();

    if (!trimmed) continue;

    if (["exit", "quit", "q"].includes(trimmed.toLowerCase())) {
      console.log("\n  Goodbye!");
      break;
    }

    await streamReply(trimmed);
  }

  rl.close();
}

main().catch((err: any) => {
  if (err?.name === "AbortError" || err?.code === "ABORT_ERR") {
    console.log("\n  Goodbye!");
    process.exit(0);
  }
  console.error("Fatal error:", err);
  process.exit(1);
});
