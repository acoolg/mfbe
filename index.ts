#!/usr/bin/env node
import lexer from "./src/lexer/main.ts";
import process from "node:process";
import fs from "node:fs";
import glob from "fast-glob";
import chalk from "chalk";
import * as config from "./src/config.ts";

// console.log(process.argv)

const paths = glob.globSync(process.argv[2]);

for (const path of paths) {
    if (!path.endsWith(config.prefix)) {
        continue
    }
    console.log(chalk.bgBlue("file detected"), path)
    lexer(fs.readFileSync(path).toString());
}
