import lexer from "./lexer.ts"

export default function(code: string) {
    try {
        const codee = lexer(code)
        console.log(codee)
        return codee
    } catch (err) {
        console.error("lexer", err)
    }
}