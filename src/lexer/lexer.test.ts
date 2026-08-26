import { assertEquals, assertFalse } from "jsr:@std/assert";
import { Token, TokenType } from "../type.ts";
import { code, token } from "../util.ts";
import lexer, { IsNumber, isSymbol } from "./lexer.ts";

Deno.test({
    name: "assertEquals is normal",
    fn() {
        assertEquals(1, 1);
    },
});

Deno.test({
    name: "lexer cLine test",
    fn() {
        const inputCode = code(
            "execute as @a at @s run say fuck",
            "",
            "beebeelaboo",
        );

        const expectToken: Token[] = [
            token(TokenType.CLine, "execute as @a at @s run say fuck", 1, 1),
            token(TokenType.identifier, "beebeelaboo", 3, 1),
        ];

        const resultToken = lexer(inputCode);

        assertEquals(resultToken, expectToken);
    },
});

Deno.test({
    name: "lexer number test",
    fn() {
        const inputCode = code(
            "execute as @a at @s run say fuck",
            "",
            "beebeelaboo laboobeebee 901211",
        );

        const expectToken: Token[] = [
            token(TokenType.CLine, "execute as @a at @s run say fuck", 1, 1),
            token(TokenType.identifier, "beebeelaboo", 3, 1),
            token(TokenType.identifier, "laboobeebee", 3, 13),
            token(TokenType.number, "901211", 3, 25),
        ];

        const resultToken = lexer(inputCode);

        assertEquals(resultToken, expectToken);
    },
});

Deno.test({
    name: "lexer number validation test",
    fn() {
        assertEquals(IsNumber("122"), true);
        assertEquals(IsNumber("122.133"), true);
        assertFalse(IsNumber("122.2.1"))
    },
});

Deno.test({
    name: "lexer symbol validation test",
    fn() {
        assertEquals(isSymbol(">"), true)
        assertEquals(isSymbol("<"), true)
        assertEquals(isSymbol(">="), true)
        assertEquals(isSymbol("<="), true)
        assertEquals(isSymbol("="), true)
        assertEquals(isSymbol("+="), true)
        assertEquals(isSymbol("-="), true)
        assertEquals(isSymbol("="), true)
        assertEquals(isSymbol("+"), true)
        assertEquals(isSymbol("-"), true)
        assertEquals(isSymbol("=-"), false)
        assertEquals(isSymbol("=+"), false)
        assertEquals(isSymbol("=<"), false)
        assertEquals(isSymbol("=>"), false)
    }
})