import console from "node:console";
import { Token, TokenType, logType } from "../type.ts";
import { logg, token } from "../util.ts";
import { expresion, expressionType, representer, treeFunctionCall, treeNumber, treeOperator } from "./type.ts";


export default function (TokenList: Token[]) {
    TokenList.push(A())
    return parse(TokenList, 0)
}
function parse(sequence: Token[], bind: number) {
    console.log(sequence)
    const left = parseRepresenter(sequence)
    let leftHandSide = left[0]

    next(left[1])

    while (now().type != TokenType.A) {
        if (now().type == TokenType.A) {
            break
        }
        
        const operation = now()

        if (operation.type == TokenType.A && now().type == TokenType.A) break

        const thisBinding = bindings(operation)

        if (thisBinding < bind) {
            break
        }

        next(1)

        if (now().type == TokenType.A) {
            break
        }

        const rightHandSide = parse(sequence, thisBinding + 0.1)

        leftHandSide = parseOperator(operation, leftHandSide, rightHandSide)
    }

    return leftHandSide

    function next(peice) {
        for (let i = 0; i < peice; i++) {
            sequence.shift()
        }
    }

    function peek() {
        return sequence[1]
    }

    function now() {
        return sequence[0]
    }
}

// function bindParentheses(tokens: Token[]) {
//     for (const token in tokens) {
//         if 
//     }
// }

function bindings(token: Token) {
    const operator = token.text

    switch (operator) {
        case "+":
            return 1
        case "-":
            return 1
        case "*":
            return 2
        case "/":
            return 2
        case "=":
            return 4
    }

    return 0
}

function A(): Token {
    return {
        type: TokenType.A,
        text: "EOF",
        position: {
            line: 0,
            pointer: 0
        }
    }
}

function parseOperator(operation: Token, left: representer, right: representer): treeOperator {
    return {
        type: expressionType.operator,
        operation: operation.text,
        left: left,
        right: right
    }
}

function parseRepresenter(token: Token[]):[representer, number] {
    if (token[0].type == TokenType.number) {
        return [parseNumber(token[0]), 1]
    }

    if (token[0].type == TokenType.identifier && token[1].text == "(") {
        let index = 2
        const tokenList: Token[] = []

        while (true) {
            if (token[index].text == ")") {
                break
            }
            tokenList.push(token[index])
            index++
        }

        tokenList.push(A())

        const result: treeFunctionCall = {
            type: expressionType.functionCall,
            function: token[0].text,
            param: parse(tokenList, 0)
        }

        return [result, index]
    } else if (token[0].type == TokenType.identifier) {
        return [{
            type: expressionType.variableCall,
            name: token[0].text
        }, 1]
    }

    throw new Error("the parser broke badly, this issue is caused by the compiler itself" + token.text + token.position.pointer)
}

function parseFunctionCall(tokens: Token[]) {
    
}

function parseNumber(token: Token): treeNumber {
    if (token.type != TokenType.number) {
        errorWrongType(token)
    }

    return {
        type: expressionType.number,
        value: Number(token.text)
    }
}

function errorWrongType(reality: Token) {
    throw new Error(`unexpected type of ${reality.type} at ${reality.position.line}:${reality.position.pointer}, it is usually a issue of me sorry and send me a issue on github with this error and the code you're trying to compile`)
}