AI Assistant (Mastra CLI)

A command-line AI travel assistant built with the **Mastra** TypeScript framework.
It helps employees plan business trips by answering questions about flights, hotels, currency conversion, and company travel policy (via a simulated RAG tool).

## Features

- Interactive CLI chatbot with streaming responses
- Conversation memory across turns
- Four tools:
  - Flight schedule & price
  - Hotel options
  - Currency conversion
  - Internal RAG (company allowance / travel policy)
- Uses OpenRouter for model access
- Graceful Ctrl+C exit and basic error handling

## Requirements

- Node.js **≥ 22.13**
- An [OpenRouter](https://openrouter.ai) API key

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Edit .env
OPENROUTER_API_KEY=add-your-real-key
MODEL_NAME=add-your-model-name

# 4. Run the CLI
npm run cli

# 5. Example session:
──────────────────────────────────────────────
  Corporate Travel Assistant (Mastra CLI)
  Type your question and press Enter.
  Type 'exit' or press Ctrl+C to quit.
──────────────────────────────────────────────

You: Flight from Lagos to Nairobi and the daily allowance?
🤖 Assistant: ...

Type exit or press Ctrl+C to leave.

# License
MIT
