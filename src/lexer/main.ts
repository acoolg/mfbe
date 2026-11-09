import { logType } from "../type.ts";
import { logg } from "../util.ts";
import lexer from "./lexer.ts"

export default function(code: string) {
    try {
        const codee = lexer(code)
        logg(logType.information, codee)
        return codee
    } catch (err) {
        logg(logType.error, "lexer", err)
    }
}