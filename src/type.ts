export interface Token {
    type: TokenType;
    text: string;
    position: { // for debug usage
        line: number,
        pointer: number
    }
}

export enum TokenType {
    identifier = "identifier",
    CLine = "CLine",
    number = "number",
    symbol = "symbol",
    string = "string"
}

export interface config {
    maxToken: number
}