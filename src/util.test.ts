import { assertEquals } from "jsr:@std/assert";
import { code, getKeyContent } from "./util.ts";

Deno.test({
    name: "get keyword test",
    fn() {
        const CharSet =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

        const expectKeyword = {
            text: "sulfur",
            slice: 6,
        };

        const source = code(
            "sulfur werw ererer nii",
        );

        const resultKeyword = getKeyContent(CharSet, source);

        assertEquals(resultKeyword, expectKeyword);
    },
});