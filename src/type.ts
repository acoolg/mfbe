export interface Token {
    type: TokenType;
    text: string;
    position: { // for debug usage
        line: number,
        pointer: number
    }
}

export interface PreToken {
    type: TokenType;
    text: string;
}

export enum TokenType {
    identifier = "identifier",
    CLine = "CLine",
    number = "number",
    symbol = "symbol",
    string = "string",
    A = "A", // if parser needs a special token
}

export enum logType {
    error = "error",
    sucsess = "sucsess",
    recommand = "recommand",
    information = "information"
}

export interface config {
    maxToken: number,
    commandList: string[],
    prefix: string
}