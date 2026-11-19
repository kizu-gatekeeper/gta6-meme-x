// GTA 6 meme entry for make.fun's "Post a GTA 6 meme on X" bounty
// (gta6-meme-x-01). The deliverable is the meme image (meme.png) plus
// the caption of the public X post that carries it.
//
// Running this file copies meme.png into the output directory and
// writes post.txt there: the exact caption of the X post and, once
// post.json names it, the URL of the published post.

import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

const CAPTION =
  'Waited 13 years for GTA 6. Five minutes into the game: "so... when is GTA 7?" \u{1F923} #GTA6 #GTAVI\n' +
  "\n" +
  "My entry for the @makefunai GTA 6 meme bounty \u2014 play code: xhekm2zm";

function readPostUrl(): string {
  const post = JSON.parse(readFileSync(join(root, "post.json"), "utf8"));
  return typeof post.post_url === "string" ? post.post_url.trim() : "";
}

function main(): void {
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });

  copyFileSync(join(root, "meme.png"), join(outDir, "meme.png"));

  const lines = [CAPTION];
  const postUrl = readPostUrl();
  if (postUrl !== "") {
    lines.push("", postUrl);
  }
  writeFileSync(join(outDir, "post.txt"), lines.join("\n") + "\n");

  console.log("meme.png and post.txt written to " + outDir);
}

main();
