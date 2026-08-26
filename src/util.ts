import * as config from "./config.ts";
import { Token, TokenType } from "./type.ts";
import chalk from "chalk"

export function token(type: TokenType, content: string, line: number, pointer: number): Token {
    return {
        type: type,
        text: content,
        position: {
            line: line,
            pointer: pointer
        }
    };
}

export function getKeyContent(CharSet: string[], context: string) {
    const set = new Set(CharSet)
    let pointer = 0;
    const result: string[] = [];
    let count = 0;

    while (true) {
        const keyCharacter = context.charAt(pointer);

        if (count === config.maxTokenLength) { // 4096 as default
            ErrorMaxToken()
        }

        if (set.has(keyCharacter)) {
            result.push(keyCharacter);
            pointer += 1;
        } else {
            break;
        }

        count += 1;
    }

    return {
        text: result.join(""),
        slice: pointer,
    };
}

export function code(...line: string[]) {
    return line.join("\n");
}

export function logSucsess(text: unknown) {
    console.log(chalk.bgGreen.whiteBright("sucsess"), text)
}

function ErrorMaxToken() {
    throw new Error("max token length exceed, change it in config")
}