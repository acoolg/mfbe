import console from "node:console";
import * as config from "./config.ts";
import { logType, PreToken, Token, TokenType } from "./type.ts";
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

export function preToken(type: TokenType, content: string): PreToken {
    return {
        text: content,
        type: type
    }
}

export function preTokenToToken(preToken: PreToken, line: number, pointer: number) {
    return token(preToken.type, preToken.text, line, pointer)
}

export function getKeyContent(CharSet: string[], context: string) {
    const set = new Set(CharSet)
    let pointer = 1;
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
        text: context.charAt(0) + result.join(""),
        slice: pointer,
    };
}

export function code(...line: string[]) {
    return line.join("\n");
}

export function logSucsess(text: unknown) {
    console.log(chalk.bgGreen.whiteBright("sucsess"), text)
}

export function ErrorMaxToken() {
    throw new Error("max token length exceed, change it in config")
}


// logg to avoid node:console's log function
export function logg(type: logType, ...msg: unknown[]) {
    let title = undefined
    switch (type) {
        case logType.error :
            title = chalk.bgRed("error")
            break
        case logType.sucsess:
            title = chalk.bgGreen("sucsess")
            break
        case logType.recommand:
            title = chalk.bgYellow("recommand")
            break
        case logType.information:
            title = chalk.bgBlue("information")
    }
    console.log(title, ...msg)
}
