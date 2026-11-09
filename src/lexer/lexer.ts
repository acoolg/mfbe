import { logType, PreToken, Token, TokenType } from "../type.ts";
import * as config from "../config.ts";
import { getKeyContent, logg, logSucsess, preToken, preTokenToToken, token } from "../util.ts";
import { log } from "node:console";

const charSet = {
    identifierStart: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@".split(""),
    identifier: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(""),
    number: "1234567890.".split(""),
    dquote: "\"".split(""),
    symbol: "()[]{}".split(""),
    calcSymbol: ">=<+-*/".split(""), // because += -= is one token, but () should be two
    punchuation: ".".split("")
};

const wholeSet = new Set()

Object.entries(charSet).forEach(e => {
    e[1].forEach(e => wholeSet.add(e))
})

export default function (code: string): Token[] {
    logg(logType.sucsess, "lexer loaded")

    const result: Token[] = [];
    const lines = code.split("\n");
    let linePointer = 0;
    let pointer = 1;

    log(lines)

    for (let line of lines) {
        log(line)
        // debug info
        linePointer += 1
        pointer = 1

        // content detecter (if it's a line of normal command return the whole line as "normalLine" type and skip lexer)
        const firstIdentifier = findFirstMeaningfulToken(line);

        if (!firstIdentifier) {
            continue;
        }

        if (config.commandList.includes(firstIdentifier)) {
            result.push(token(TokenType.CLine, line.trim(), linePointer, pointer));
            continue;
        }

        // content lexer
        while (line !== "") {
            log(line)
            const token = getToken(line)

            if (token.preToken != undefined) {
                result.push(preTokenToToken(token.preToken, linePointer, pointer))
            }

            pointer += token.slice
            line = line.slice(token.slice)
        }
    }
    
    return result;
}

function getToken(line: string) {
    const is = (charSet: string[]) => {
        return charSet.includes(keyCharacter);
    };

    let slice = 1;
    const keyCharacter = line.charAt(0);
    let result = undefined

    // is identifier
    if (is(charSet.identifierStart)) {
        const keyWord = getKeyContent(charSet.identifier, line);

        result = preToken(TokenType.identifier, keyWord.text);

        slice = keyWord.slice;
    }

    // is number
    if (is(charSet.number)) {
        const keyWord = getKeyContent(charSet.number, line);

        result = preToken(TokenType.number, keyWord.text);

        slice = keyWord.slice;
    }

    if (is(charSet.symbol)) {
        result = preToken(TokenType.symbol, keyCharacter)

        slice = 1
    }

    if (is(charSet.calcSymbol)) {
        const keyWord = getKeyContent(charSet.calcSymbol, line);

        result = preToken(TokenType.symbol, keyWord.text)

        slice = keyWord.slice
    }

    if (is(charSet.dquote)) {
        const keyWord = getString(line);

        result = preToken(TokenType.string, keyWord.text)

        slice = keyWord.slice
    }

    return {
        preToken: result,
        slice: slice
    }
}

function checkToken(token: Token) {
    const type = token.type
    
    if (type == TokenType.number) {
        if (!IsNumber(token.text)) ErrorIllegal(token) 
    } 
}
// TODO: let's be more fun

/**
 * what this do is because most of the time code have indent, a lexer cannot read a space and says "uhh unknown token, let's throw a error and stop code for fun"
 * @param {string} line codeing101: interm to read a line you need to have the line
 */
export function findFirstMeaningfulToken(line: string) {
    // check out aether legend, it's fire
    while (true) { // do not panic, i will break later
        if (line.length == 0) {
            return false;
        }

        if (wholeSet.has(line.charAt(0))) {
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
    return (new Set(["+", "-", "=", "+=", "-=", ">", "<", ">=", "<=", "*", "/"])).has(symbol)
}

function ErrorIllegal(token: Token) {
    throw new Error(`token unacceptable, illegal ${token.type} at ${token.position.line}:${token.position.pointer}`)
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