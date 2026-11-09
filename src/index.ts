#!/usr/bin/env node
import lexer from "./lexer/main.ts";
import process from "node:process";
import fs from "node:fs";
import glob from "fast-glob";
import chalk from "chalk";
import * as config from "./config.ts";
import { logg } from "./util.ts"
import { logType } from "./type.ts";
import path from "node:path"

const paths = glob.globSync(process.argv[2]);

for (const Filepath of paths) {
    if (!Filepath.endsWith(config.prefix)) {
        continue
    }

    logg(logType.information, "reading file " + path.resolve(Filepath))
    
    lexer(fs.readFileSync(Filepath).toString());
}