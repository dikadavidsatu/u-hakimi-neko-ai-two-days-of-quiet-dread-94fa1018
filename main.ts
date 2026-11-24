import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "Approved. In a hundred years none of this will matter, which is honestly the strongest review I can give this PR.";

function validate(text: string): void {
  if (typeof text !== "string") throw new Error("entry must be a string");
  if (text.length < 1 || text.length > 140) throw new Error(`entry length ${text.length} outside 1..140`);
  if (text.trim().length === 0) throw new Error("entry must not be only whitespace");
  if (text.includes("\n") || text.includes("\r")) throw new Error("entry must be a single line");
  if (!text.startsWith("Approved")) throw new Error("entry must approve the pull request");
  if (text !== text.trim()) throw new Error("entry must not have leading or trailing whitespace");
  if (text.includes("!")) throw new Error("entry must keep a flat, quiet tone (no exclamation)");
}

validate(ENTRY);

const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "entry.txt"), ENTRY, "utf8");
