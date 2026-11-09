import { assertEquals } from "jsr:@std/assert";
import lexer from "../lexer/lexer.ts";
import expression from "./expression.ts"
import { expresion, expressionType } from "./type.ts";

Deno.test({
    name: "parser test",
    fn() {
        function rnd(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        function doOperator(operator: expresion) {
            console.log("hey", operator)
            if (operator.type == expressionType.number) {
                return operator.value
            }

            if (operator.type == "operator") {
                const left = doOperator(operator.left)
                const right = doOperator(operator.right)

                switch (operator.operation) {
                    case "+":
                        return left + right
                    case "-":
                        return left - right
                    case "*":
                        return left * right
                    case "/":
                        return left / right
                }
            }
        }

        for (let i = 0; i < 1000; i++) {
            const a = []

            for (let i = 0; i < 20; i++) {
                a.push(["+", "-", "*", "/"][rnd(0, 4)])
                a.push(rnd(1, 11))
            }

            a.shift()

            const answer = eval(a.join(" "))

            const ab = expression(lexer(a.join(" ")))

            assertEquals(doOperator(ab), answer)
        }

    },
});

Deno.test({
    name: "parser test simple",
    fn() {
            const ab = expression(lexer("2 + 30 + b(ace + 1 / 26)"))
            console.log(ab)
        }
});