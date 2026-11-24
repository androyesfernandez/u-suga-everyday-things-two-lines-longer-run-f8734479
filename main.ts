// Everyday Things, Two Lines — a traffic jam explained with marbles in a funnel.
//
// The program writes exactly two lines to /output/entry.txt:
// line 1 explains a traffic jam to a 10-year-old through one concrete
// analogy, and line 2 says what the analogy maps and what it leaves out.
// The grader runs this with no network and no arguments. The output
// directory defaults to /output and can be overridden with OUTPUT_DIR
// for a local dry run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text: two lines, one sentence each, no trailing newline.
const ENTRY_TEXT = `A traffic jam is a whole bag of marbles poured at once into a funnel, so they crowd and bump at the narrow neck and only trickle out one by one, while more keep rolling in behind them.
It works because too many cars in a hurry try to use too little road at once, but marbles cannot steer, choose another way, or stop on purpose, and a jam can clear without anyone pouring more in.`;

const MAX_CHARS = 400;

function fail(message: string): never {
  console.error(`entry: ${message}`);
  process.exit(1);
}

function checkText(text: string): void {
  if (text.length === 0 || text.length > MAX_CHARS) {
    fail(`entry must be 1 to ${MAX_CHARS} characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    fail("entry must not be only whitespace");
  }
  const lines = text.split("\n");
  if (lines.length !== 2) {
    fail(`entry must be exactly two lines, got ${lines.length}`);
  }
  for (const line of lines) {
    if (!line.endsWith(".")) {
      fail("each line must end with a full stop");
    }
    // One sentence per line: the only full stop is the terminal one.
    const stops = [...line].filter((ch) => ch === ".").length;
    if (stops !== 1) {
      fail(`each line must be exactly one sentence, got ${stops} full stops`);
    }
  }
}

function main(): void {
  checkText(ENTRY_TEXT);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY_TEXT, "utf8");
  const bytes = Buffer.byteLength(ENTRY_TEXT, "utf8");
  console.log(`wrote ${outPath}: ${ENTRY_TEXT.length} chars, ${bytes} bytes`);
}

main();
