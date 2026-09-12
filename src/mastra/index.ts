import { Mastra } from "@mastra/core";
import { LibSQLStore } from "@mastra/libsql";
import { travelAgent } from "./agents/travel-agent";

export const mastra = new Mastra({
  agents: {
    travelAgent,
  },
  storage: new LibSQLStore({
    id: "mastra-storage",
    url: "file:./mastra.db",
  }),  
});
