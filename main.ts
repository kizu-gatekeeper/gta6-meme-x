// Entry program for the make.fun bounty "Post a GTA 6 meme on X"
// (gta6-meme-x-01). The post on X is the entry; this program's whole
// job is to hand the grader the post's address: it copies POST.json
// from the repository directory to the output directory, byte for
// byte, and prints nothing on success.
//
// The grader runs it as:
//   MAKEFUN_BOT_DIR=<repo> MAKEFUN_OUTPUT_DIR=<out> node main.ts
// (with no environment set, the repository is the working directory
// and the output directory is /output). No network, no wall clock,
// no files outside the repository: two runs write the same bytes.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir: string = process.env.MAKEFUN_BOT_DIR || ".";
const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const post: Buffer = readFileSync(join(botDir, "POST.json"));
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "POST.json"), post);
