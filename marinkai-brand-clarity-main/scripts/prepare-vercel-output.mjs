/**
 * TanStack Start + Nitro writes Build Output API v3 to `.vercel/output`.
 * For nested-repo Vercel deploys, copy that folder to the git root so
 * `vercel build` picks up config.json + server functions (not static-only).
 */
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, "..");
const repoRoot = resolve(appRoot, "..");
const source = join(appRoot, ".vercel", "output");
const target = join(repoRoot, ".vercel", "output");

if (!existsSync(source)) {
  console.error(`[prepare-vercel-output] Missing build output: ${source}`);
  process.exit(1);
}

mkdirSync(join(repoRoot, ".vercel"), { recursive: true });
rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });

console.log(`[prepare-vercel-output] Copied ${source} -> ${target}`);
