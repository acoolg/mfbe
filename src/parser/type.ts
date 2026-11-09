import { Token } from "../type.ts";

export enum expressionType {
    number = "number",
    functionCall = "functionCall",
    operator = "operator",
    variableCall = "variableCall"
}

export type expresion = treeFunctionCall | treeNumber | treeOperator | treeVariableCall

export type representer = treeFunctionCall | treeNumber | treeVariableCall

export interface treeFunctionCall {
    type: expressionType.functionCall,
    function: string,
    param: expresion
}

export interface treeNumber {
    type: expressionType.number,
    value: number
}

export interface treeOperator {
    type: expressionType.operator,
    operation: string,
    left: representer,
    right: representer
}

export interface treeVariableCall {
    type: expressionType.variableCall,
    name: string
}