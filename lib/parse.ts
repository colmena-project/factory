import Parse from "parse";
import { initializeParse } from "@parse/react-ssr";

initializeParse(
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4040/parse",
  process.env.NEXT_PUBLIC_APP_ID || "APP_ID",
  process.env.NEXT_PUBLIC_MASTER_KEY || "MASTER_KEY"
);

Parse.CoreManager.set("REQUEST_HEADERS", {
  "X-Requested-With": process.env.NEXT_PUBLIC_HEADERS,
});

export const ParseServer = Parse;
