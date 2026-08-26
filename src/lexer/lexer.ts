import { Token, TokenType } from "../type.ts";
import * as config from "../config.ts";
import { getKeyContent, logSucsess, token } from "../util.ts";

const charSet = {
    identifierStart: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@".split(""),
    identifier: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(""),
    number: "123456790.".split(""),
    dquote: "\"".split(""),
    symbol: "()[]{}".split(""),
    calcSymbol: ">=<+-".split(""), // because += -= is one token, but () should be two
    punchuation: ".".split("")
};

export default function (code: string): Token[] {
    logSucsess("lexer loaded")

    const result: Token[] = [];
    const lines = code.split("\n");
    let linePointer = 0;
    let pointer = 1;

    for (let line of lines) {
        // debug info
        linePointer += 1
        pointer = 1

        // content detecter (if it's a line of normal command return the whole line as "normalLine" type and skip lexer)
        const firstIdentifier = findFirstMeaningfulIdentifier(line);

        if (!firstIdentifier) {
            continue;
        }

        if (config.commandList.includes(firstIdentifier)) {
            result.push(token(TokenType.CLine, line.trim(), linePointer, pointer));
            continue;
        }

        // content lexer
        while (line !== "") {

            const is = (charSet: string[]) => {
                return charSet.includes(keyCharacter);
            };

            let slice = 1;
            const keyCharacter = line.charAt(0);

            // is identifier
            if (is(charSet.identifierStart)) {
                const keyWord = getKeyContent(charSet.identifier, line);

                result.push(token(TokenType.identifier, keyWord.text, linePointer, pointer));

                slice = keyWord.slice;
            }

            // is number
            if (is(charSet.number)) {
                const keyWord = getKeyContent(charSet.number, line);

                // number check
                if (!IsNumber(keyWord.text)) {
                    ErrorIllegal(TokenType.number, linePointer, pointer)
                }

                result.push(token(TokenType.number, keyWord.text, linePointer, pointer));

                slice = keyWord.slice;
            }

            if (is(charSet.symbol)) {
                result.push(token(TokenType.symbol, keyCharacter, linePointer, pointer))

                slice = 1
            }

            if (is(charSet.calcSymbol)) {
                const keyWord = getKeyContent(charSet.calcSymbol, line);

                if (!isSymbol(keyWord.text)) {
                    ErrorIllegal(TokenType.symbol, linePointer, pointer)
                }

                result.push(token(TokenType.symbol, keyWord.text, linePointer, pointer))

                slice = keyWord.slice
            }

            if (is(charSet.dquote)) {
                const keyWord = getString(line);

                result.push(token(TokenType.string, keyWord.text, linePointer, pointer))

                slice = keyWord.slice
            }

            // content lexer end
            // slice
            line = line.slice(slice);
            
            // debug info
            pointer += slice
        }
    }

    return result;
}

// TODO: let's be more fun

/**
 * what this do is because most of the time code have indent, a lexer cannot read a space and says "uhh unknown token, let's throw a error and stop code for fun"
 * @param {string} line codeing101: interm to read a line you need to have the line
 */
export function findFirstMeaningfulIdentifier(line: string) {
    // check out aether legend, it's fire
    while (true) { // do not panic, i will break later
        if (line.length == 0) {
            return false;
        }

        if (charSet.identifierStart.includes(line.charAt(0))) {
            return getKeyContent(charSet.identifierStart, line).text;
        } else {
            line = line.slice(1);
        }
    }
}


/**
 * this runs a number string through many use case
 * @param { number } number the string
 * @returns { boolean } if the number is good
 */
export function IsNumber(number: string) {
    const acceptNumberStart = "1234567890".split("")

    // not a number case
    if (!acceptNumberStart.includes(number.charAt(0))) {
        return false
    }

    // too much . case (like 1.16.0 isn't a leagal number)
    if (number.split(".").length > 2) {
        return false
    }

    return true
}

export function isSymbol(symbol: string) {
    return (new Set(["+", "-", "=", "+=", "-=", ">", "<", ">=", "<="])).has(symbol)
}

function ErrorIllegal(type: TokenType, line: number, pointer: number) {
    throw new Error(`token unacceptable, illegal ${type} at ${line}:${pointer}`)
}

function ErrorMaxToken() {
    throw new Error("max token length exceed")
}

function getString(code: string) {
    let pointer: number = 1
    const result: string[] = []

    while (true) {
        if (pointer == config.maxTokenLength) {
            ErrorMaxToken()
        }

        const char = code.charAt(pointer)

        if (char == "\"") {
            break
        }

        result.push(char)

        pointer += 1
    }

    return {
        text: result.join(""),
        slice: result.length + 2
    }
}