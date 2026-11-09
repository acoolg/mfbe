#!/usr/bin/env node
import * as fs$4 from "node:fs";
import fs from "node:fs";
import process$1 from "node:process";
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, { get: (a, b) => (typeof require !== "undefined" ? require : a)[b] }) : x)(function(x) {
	if (typeof require !== "undefined") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + x + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
//#endregion
//#region src/config.ts
const commandPreset = {
	"mcbe2026Default": [
		"?",
		"ability",
		"allowlist",
		"aimassist",
		"alwaysday",
		"camera",
		"camerashake",
		"changesetting",
		"clear",
		"clearspawnpoint",
		"clone",
		"connect",
		"controlscheme",
		"damage",
		"daylock",
		"dedicatedwsserver",
		"deop",
		"dialogue",
		"difficulty",
		"editor-allowlist",
		"effect",
		"enchant",
		"event",
		"execute",
		"fill",
		"fog",
		"function",
		"gamemode",
		"gamerule",
		"gametest",
		"gametips",
		"give",
		"help",
		"hud",
		"immutableworld",
		"inputpermission",
		"kick",
		"kill",
		"list",
		"locate",
		"loot",
		"me",
		"mobevent",
		"msg",
		"music",
		"op",
		"ops",
		"particle",
		"permission",
		"place",
		"playanimation",
		"playsound",
		"project",
		"recipe",
		"reload",
		"reloadconfig",
		"reloadpacketlimitconfig",
		"remove",
		"replaceitem",
		"ride",
		"save",
		"say",
		"schedule",
		"scoreboard",
		"script",
		"scriptevent",
		"sendshowstoreoffer",
		"set_movement_authority",
		"setblock",
		"setmaxplayers",
		"setworldspawn",
		"spawnpoint",
		"spreadplayers",
		"stop",
		"stopsound",
		"structure",
		"summon",
		"tag",
		"teleport",
		"tell",
		"tellraw",
		"testfor",
		"testforblock",
		"testforblocks",
		"tickingarea",
		"time",
		"title",
		"titleraw",
		"toggledownfall",
		"tp",
		"transfer",
		"w",
		"wb",
		"weather",
		"whitelist",
		"worldbuilder",
		"wsserver",
		"xp"
	],
	"empty": []
};
let config = {
	commandList: commandPreset["mcbe2026Default"],
	prefix: ".mfbe",
	maxToken: 4096
};
try {
	const configFile = JSON.parse(fs$4.readFileSync("mfbe.json").toString());
	if (configFile["prefix"] != void 0) config.prefix = configFile["prefix"];
	if (configFile["commandList"] != void 0) {
		if (configFile["extraList"] != void 0) config.commandList = commandPreset[configFile["commandList"]].concat(configFile["extraList"]);
		else config.commandList = commandPreset[configFile["commandList"]];
	}
	if (configFile["maxToken"] != void 0) config.maxToken = configFile["maxToken"];
} catch (_err) {
	console.log("cannnot read the config file, using default config");
}
const maxTokenLength = config.maxToken;
const prefix = config.prefix;
const commandList = config.commandList;
//#endregion
//#region node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, postfix) {
	let index = string.indexOf(substring);
	if (index === -1) return string;
	const substringLength = substring.length;
	let endIndex = 0;
	let returnValue = "";
	do {
		returnValue += string.slice(endIndex, index) + substring + postfix;
		endIndex = index + substringLength;
		index = string.indexOf(substring, endIndex);
	} while (index !== -1);
	returnValue += string.slice(endIndex);
	return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
	let endIndex = 0;
	let returnValue = "";
	do {
		const isGotCR = string[index - 1] === "\r";
		returnValue += string.slice(endIndex, isGotCR ? index - 1 : index) + prefix + (isGotCR ? "\r\n" : "\n") + postfix;
		endIndex = index + 1;
		index = string.indexOf("\n", endIndex);
	} while (index !== -1);
	returnValue += string.slice(endIndex);
	return returnValue;
}
//#endregion
//#region node_modules/chalk/source/vendor/ansi-styles/index.js
const ANSI_BACKGROUND_OFFSET = 10;
const ANSI_UNDERLINE_OFFSET = 20;
const wrapAnsi16 = (offset = 0) => (code) => `\u{1B}[${code + offset}m`;
const wrapAnsi256 = (offset = 0) => (code) => `\u{1B}[${38 + offset};5;${code}m`;
const wrapAnsi16m = (offset = 0) => (red, green, blue) => `\u{1B}[${38 + offset};2;${red};${green};${blue}m`;
const wrapUnderlineAnsi = (code) => `\u{1B}[58;5;${code < 90 ? code - 30 : code - 90 + 8}m`;
const styles$1 = {
	modifier: {
		reset: [0, 0],
		bold: [1, 22],
		dim: [2, 22],
		italic: [3, 23],
		underline: [4, 24],
		underlineDouble: ["4:2", 24],
		underlineCurly: ["4:3", 24],
		underlineDotted: ["4:4", 24],
		underlineDashed: ["4:5", 24],
		overline: [53, 55],
		inverse: [7, 27],
		hidden: [8, 28],
		strikethrough: [9, 29]
	},
	color: {
		black: [30, 39],
		red: [31, 39],
		green: [32, 39],
		yellow: [33, 39],
		blue: [34, 39],
		magenta: [35, 39],
		cyan: [36, 39],
		white: [37, 39],
		blackBright: [90, 39],
		gray: [90, 39],
		grey: [90, 39],
		redBright: [91, 39],
		greenBright: [92, 39],
		yellowBright: [93, 39],
		blueBright: [94, 39],
		magentaBright: [95, 39],
		cyanBright: [96, 39],
		whiteBright: [97, 39]
	},
	bgColor: {
		bgBlack: [40, 49],
		bgRed: [41, 49],
		bgGreen: [42, 49],
		bgYellow: [43, 49],
		bgBlue: [44, 49],
		bgMagenta: [45, 49],
		bgCyan: [46, 49],
		bgWhite: [47, 49],
		bgBlackBright: [100, 49],
		bgGray: [100, 49],
		bgGrey: [100, 49],
		bgRedBright: [101, 49],
		bgGreenBright: [102, 49],
		bgYellowBright: [103, 49],
		bgBlueBright: [104, 49],
		bgMagentaBright: [105, 49],
		bgCyanBright: [106, 49],
		bgWhiteBright: [107, 49]
	},
	underlineColor: {
		underlineBlack: ["58;5;0", 59],
		underlineRed: ["58;5;1", 59],
		underlineGreen: ["58;5;2", 59],
		underlineYellow: ["58;5;3", 59],
		underlineBlue: ["58;5;4", 59],
		underlineMagenta: ["58;5;5", 59],
		underlineCyan: ["58;5;6", 59],
		underlineWhite: ["58;5;7", 59],
		underlineBlackBright: ["58;5;8", 59],
		underlineGray: ["58;5;8", 59],
		underlineGrey: ["58;5;8", 59],
		underlineRedBright: ["58;5;9", 59],
		underlineGreenBright: ["58;5;10", 59],
		underlineYellowBright: ["58;5;11", 59],
		underlineBlueBright: ["58;5;12", 59],
		underlineMagentaBright: ["58;5;13", 59],
		underlineCyanBright: ["58;5;14", 59],
		underlineWhiteBright: ["58;5;15", 59]
	}
};
Object.keys(styles$1.modifier);
const foregroundColorNames = Object.keys(styles$1.color);
const backgroundColorNames = Object.keys(styles$1.bgColor);
Object.keys(styles$1.underlineColor);
[...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
	const codes = /* @__PURE__ */ new Map();
	for (const [groupName, group] of Object.entries(styles$1)) {
		for (const [styleName, style] of Object.entries(group)) {
			styles$1[styleName] = {
				open: `\u{1B}[${style[0]}m`,
				close: `\u{1B}[${style[1]}m`
			};
			group[styleName] = styles$1[styleName];
			codes.set(Number.parseInt(style[0], 10), style[1]);
		}
		Object.defineProperty(styles$1, groupName, {
			value: group,
			enumerable: false
		});
	}
	Object.defineProperty(styles$1, "codes", {
		value: codes,
		enumerable: false
	});
	styles$1.color.close = "\x1B[39m";
	styles$1.bgColor.close = "\x1B[49m";
	styles$1.underlineColor.close = "\x1B[59m";
	styles$1.color.ansi = wrapAnsi16();
	styles$1.color.ansi256 = wrapAnsi256();
	styles$1.color.ansi16m = wrapAnsi16m();
	styles$1.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
	styles$1.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
	styles$1.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
	styles$1.underlineColor.ansi = wrapUnderlineAnsi;
	styles$1.underlineColor.ansi256 = wrapAnsi256(ANSI_UNDERLINE_OFFSET);
	styles$1.underlineColor.ansi16m = wrapAnsi16m(ANSI_UNDERLINE_OFFSET);
	Object.defineProperties(styles$1, {
		rgbToAnsi256: {
			value(red, green, blue) {
				if (red === green && green === blue) {
					if (red < 8) return 16;
					if (red > 248) return 231;
					return Math.round((red - 8) / 247 * 24) + 232;
				}
				return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
			},
			enumerable: false
		},
		hexToRgb: {
			value(hex) {
				const matches = /[\da-f]{6}|[\da-f]{3}/i.exec(hex.toString(16));
				if (!matches) return [
					0,
					0,
					0
				];
				let [colorString] = matches;
				if (colorString.length === 3) colorString = [...colorString].map((character) => character + character).join("");
				const integer = Number.parseInt(colorString, 16);
				return [
					integer >> 16 & 255,
					integer >> 8 & 255,
					integer & 255
				];
			},
			enumerable: false
		},
		hexToAnsi256: {
			value: (hex) => styles$1.rgbToAnsi256(...styles$1.hexToRgb(hex)),
			enumerable: false
		},
		ansi256ToAnsi: {
			value(code) {
				if (code < 8) return 30 + code;
				if (code < 16) return 90 + (code - 8);
				let red;
				let green;
				let blue;
				if (code >= 232) {
					red = ((code - 232) * 10 + 8) / 255;
					green = red;
					blue = red;
				} else {
					code -= 16;
					const remainder = code % 36;
					red = Math.floor(code / 36) / 5;
					green = Math.floor(remainder / 6) / 5;
					blue = remainder % 6 / 5;
				}
				const value = Math.max(red, green, blue) * 2;
				if (value === 0) return 30;
				let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
				if (value === 2) result += 60;
				return result;
			},
			enumerable: false
		},
		rgbToAnsi: {
			value: (red, green, blue) => styles$1.ansi256ToAnsi(styles$1.rgbToAnsi256(red, green, blue)),
			enumerable: false
		},
		hexToAnsi: {
			value: (hex) => styles$1.ansi256ToAnsi(styles$1.hexToAnsi256(hex)),
			enumerable: false
		}
	});
	return styles$1;
}
const ansiStyles = assembleStyles();
//#endregion
//#region node_modules/chalk/source/vendor/supports-color/browser.js
const level = (() => {
	if (!("navigator" in globalThis)) return 0;
	if (globalThis.navigator.userAgentData) {
		if (globalThis.navigator.userAgentData.brands.find(({ brand }) => brand === "Chromium")?.version > 93) return 3;
	}
	if (/\b(?:Chrome|Chromium)\//.test(globalThis.navigator.userAgent)) return 1;
	return 0;
})();
const colorSupport = level !== 0 && {
	level,
	hasBasic: true,
	has256: level >= 2,
	has16m: level >= 3
};
//#endregion
//#region node_modules/chalk/source/index.js
const { stdout: stdoutColor, stderr: stderrColor } = {
	stdout: colorSupport,
	stderr: colorSupport
};
const GENERATOR = Symbol("GENERATOR");
const STYLER = Symbol("STYLER");
const IS_EMPTY = Symbol("IS_EMPTY");
const LEVEL = Symbol("LEVEL");
const styles = Object.create(null);
const assertValidLevel = (level) => {
	if (!Number.isSafeInteger(level) || level < 0 || level > 3) throw new Error("The `level` should be an integer from 0 to 3");
};
const levelDescriptor = {
	enumerable: true,
	get() {
		return this[LEVEL];
	},
	set(level) {
		assertValidLevel(level);
		this[LEVEL] = level;
	}
};
const applyOptions = (object, options = {}) => {
	if (options.level !== void 0) assertValidLevel(options.level);
	const colorLevel = stdoutColor ? stdoutColor.level : 0;
	object[LEVEL] = options.level === void 0 ? colorLevel : options.level;
};
const chalkFactory = (options) => {
	const chalk = (...strings) => strings.join(" ");
	applyOptions(chalk, options);
	Object.setPrototypeOf(chalk, createChalk.prototype);
	return chalk;
};
function createChalk(options) {
	return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansiStyles)) styles[styleName] = { get() {
	const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
	Object.defineProperty(this, styleName, { value: builder });
	return builder;
} };
styles.visible = { get() {
	const builder = createBuilder(this, this[STYLER], true);
	Object.defineProperty(this, "visible", { value: builder });
	return builder;
} };
const createModelConverters = (model, type) => {
	const style = ansiStyles[type];
	if (model === "rgb") {
		const ansi = (red, green, blue) => style.ansi(ansiStyles.rgbToAnsi(red, green, blue));
		const ansi256 = (red, green, blue) => style.ansi256(ansiStyles.rgbToAnsi256(red, green, blue));
		return [
			ansi,
			ansi,
			ansi256,
			style.ansi16m
		];
	}
	if (model === "hex") {
		const ansi = (hex) => style.ansi(ansiStyles.hexToAnsi(hex));
		const ansi256 = (hex) => style.ansi256(ansiStyles.hexToAnsi256(hex));
		return [
			ansi,
			ansi,
			ansi256,
			(hex) => style.ansi16m(...ansiStyles.hexToRgb(hex))
		];
	}
	const ansi = (code) => style.ansi(ansiStyles.ansi256ToAnsi(code));
	return [
		ansi,
		ansi,
		style.ansi256,
		style.ansi256
	];
};
for (const model of [
	"rgb",
	"hex",
	"ansi256"
]) {
	const capitalizedModel = model[0].toUpperCase() + model.slice(1);
	for (const [styleName, type] of [
		[model, "color"],
		["bg" + capitalizedModel, "bgColor"],
		["underline" + capitalizedModel, "underlineColor"]
	]) {
		const { close } = ansiStyles[type];
		const converters = createModelConverters(model, type);
		styles[styleName] = { get() {
			const styleFunction = function(first, second, third) {
				const open = converters[this.level](first, second, third);
				return createBuilder(this, createStyler(open, close, this[STYLER]), this[IS_EMPTY]);
			};
			Object.defineProperty(this, styleName, { value: styleFunction });
			return styleFunction;
		} };
	}
}
const proto = Object.defineProperties(() => {}, {
	...styles,
	level: {
		enumerable: true,
		get() {
			return this[GENERATOR].level;
		},
		set(level) {
			this[GENERATOR].level = level;
		}
	}
});
const createStyler = (open, close, parent) => {
	let openAll;
	let closeAll;
	if (parent === void 0) {
		openAll = open;
		closeAll = close;
	} else {
		openAll = parent.openAll + open;
		closeAll = close + parent.closeAll;
	}
	return {
		open,
		close,
		openAll,
		closeAll,
		parent
	};
};
const createBuilder = (self, _styler, _isEmpty) => {
	const builder = (...arguments_) => {
		if (arguments_.length === 1) return applyStyle(builder, "" + arguments_[0]);
		if (arguments_.length === 2) return applyStyle(builder, arguments_[0] + " " + arguments_[1]);
		return applyStyle(builder, arguments_.join(" "));
	};
	Object.setPrototypeOf(builder, proto);
	builder[GENERATOR] = self[GENERATOR] ?? self;
	builder[STYLER] = _styler;
	builder[IS_EMPTY] = _isEmpty;
	return builder;
};
const applyStyle = (self, string) => {
	if (self[GENERATOR][LEVEL] <= 0 || !string) return self[IS_EMPTY] ? "" : string;
	let styler = self[STYLER];
	if (styler === void 0) return string;
	const { openAll, closeAll } = styler;
	if (string.includes("\x1B")) while (styler !== void 0) {
		string = stringReplaceAll(string, styler.close, styler.open);
		styler = styler.parent;
	}
	const lfIndex = string.indexOf("\n");
	if (lfIndex !== -1) string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
	return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, {
	...styles,
	level: levelDescriptor
});
const chalk = createChalk();
createChalk({ level: stderrColor ? stderrColor.level : 0 });
//#endregion
//#region src/util.ts
function token(type, content, line, pointer) {
	return {
		type,
		text: content,
		position: {
			line,
			pointer
		}
	};
}
function getKeyContent(CharSet, context) {
	const set = new Set(CharSet);
	let pointer = 0;
	const result = [];
	let count = 0;
	while (true) {
		const keyCharacter = context.charAt(pointer);
		if (count === maxTokenLength) ErrorMaxToken$1();
		if (set.has(keyCharacter)) {
			result.push(keyCharacter);
			pointer += 1;
		} else break;
		count += 1;
	}
	return {
		text: result.join(""),
		slice: pointer
	};
}
function logSucsess(text) {
	console.log(chalk.bgGreen.whiteBright("sucsess"), text);
}
function ErrorMaxToken$1() {
	throw new Error("max token length exceed, change it in config");
}
//#endregion
//#region src/lexer/lexer.ts
const charSet = {
	identifierStart: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@".split(""),
	identifier: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(""),
	number: "123456790.".split(""),
	dquote: "\"".split(""),
	symbol: "()[]{}".split(""),
	calcSymbol: ">=<+-".split(""),
	punchuation: ".".split("")
};
function lexer_default(code) {
	logSucsess("lexer loaded");
	const result = [];
	const lines = code.split("\n");
	let linePointer = 0;
	let pointer = 1;
	for (let line of lines) {
		linePointer += 1;
		pointer = 1;
		const firstIdentifier = findFirstMeaningfulIdentifier(line);
		if (!firstIdentifier) continue;
		if (commandList.includes(firstIdentifier)) {
			result.push(token("CLine", line.trim(), linePointer, pointer));
			continue;
		}
		while (line !== "") {
			const is = (charSet) => {
				return charSet.includes(keyCharacter);
			};
			let slice = 1;
			const keyCharacter = line.charAt(0);
			if (is(charSet.identifierStart)) {
				const keyWord = getKeyContent(charSet.identifier, line);
				result.push(token("identifier", keyWord.text, linePointer, pointer));
				slice = keyWord.slice;
			}
			if (is(charSet.number)) {
				const keyWord = getKeyContent(charSet.number, line);
				if (!IsNumber(keyWord.text)) ErrorIllegal("number", linePointer, pointer);
				result.push(token("number", keyWord.text, linePointer, pointer));
				slice = keyWord.slice;
			}
			if (is(charSet.symbol)) {
				result.push(token("symbol", keyCharacter, linePointer, pointer));
				slice = 1;
			}
			if (is(charSet.calcSymbol)) {
				const keyWord = getKeyContent(charSet.calcSymbol, line);
				if (!isSymbol(keyWord.text)) ErrorIllegal("symbol", linePointer, pointer);
				result.push(token("symbol", keyWord.text, linePointer, pointer));
				slice = keyWord.slice;
			}
			if (is(charSet.dquote)) {
				const keyWord = getString(line);
				result.push(token("string", keyWord.text, linePointer, pointer));
				slice = keyWord.slice;
			}
			line = line.slice(slice);
			pointer += slice;
		}
	}
	return result;
}
/**
* what this do is because most of the time code have indent, a lexer cannot read a space and says "uhh unknown token, let's throw a error and stop code for fun"
* @param {string} line codeing101: interm to read a line you need to have the line
*/
function findFirstMeaningfulIdentifier(line) {
	while (true) {
		if (line.length == 0) return false;
		if (charSet.identifierStart.includes(line.charAt(0))) return getKeyContent(charSet.identifierStart, line).text;
		else line = line.slice(1);
	}
}
/**
* this runs a number string through many use case
* @param { number } number the string
* @returns { boolean } if the number is good
*/
function IsNumber(number) {
	if (!"1234567890".split("").includes(number.charAt(0))) return false;
	if (number.split(".").length > 2) return false;
	return true;
}
function isSymbol(symbol) {
	return (/* @__PURE__ */ new Set([
		"+",
		"-",
		"=",
		"+=",
		"-=",
		">",
		"<",
		">=",
		"<="
	])).has(symbol);
}
function ErrorIllegal(type, line, pointer) {
	throw new Error(`token unacceptable, illegal ${type} at ${line}:${pointer}`);
}
function ErrorMaxToken() {
	throw new Error("max token length exceed");
}
function getString(code) {
	let pointer = 1;
	const result = [];
	while (true) {
		if (pointer == maxTokenLength) ErrorMaxToken();
		const char = code.charAt(pointer);
		if (char == "\"") break;
		result.push(char);
		pointer += 1;
	}
	return {
		text: result.join(""),
		slice: result.length + 2
	};
}
//#endregion
//#region src/lexer/main.ts
function main_default(code) {
	try {
		const codee = lexer_default(code);
		console.log(codee);
		return codee;
	} catch (err) {
		console.error("lexer", err);
	}
}
//#endregion
//#region node_modules/fast-glob/out/utils/array.js
var require_array = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.splitWhen = exports.flatten = void 0;
	function flatten(items) {
		return items.reduce((collection, item) => [].concat(collection, item), []);
	}
	exports.flatten = flatten;
	function splitWhen(items, predicate) {
		const result = [[]];
		let groupIndex = 0;
		for (const item of items) if (predicate(item)) {
			groupIndex++;
			result[groupIndex] = [];
		} else result[groupIndex].push(item);
		return result;
	}
	exports.splitWhen = splitWhen;
}));
//#endregion
//#region node_modules/fast-glob/out/utils/errno.js
var require_errno = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isEnoentCodeError = void 0;
	function isEnoentCodeError(error) {
		return error.code === "ENOENT";
	}
	exports.isEnoentCodeError = isEnoentCodeError;
}));
//#endregion
//#region node_modules/fast-glob/out/utils/fs.js
var require_fs$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createDirentFromStats = void 0;
	var DirentFromStats = class {
		constructor(name, stats) {
			this.name = name;
			this.isBlockDevice = stats.isBlockDevice.bind(stats);
			this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
			this.isDirectory = stats.isDirectory.bind(stats);
			this.isFIFO = stats.isFIFO.bind(stats);
			this.isFile = stats.isFile.bind(stats);
			this.isSocket = stats.isSocket.bind(stats);
			this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
		}
	};
	function createDirentFromStats(name, stats) {
		return new DirentFromStats(name, stats);
	}
	exports.createDirentFromStats = createDirentFromStats;
}));
//#endregion
//#region node_modules/util/support/isBufferBrowser.js
var require_isBufferBrowser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function isBuffer(arg) {
		return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
	};
}));
//#endregion
//#region node_modules/inherits/inherits_browser.js
var require_inherits_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (typeof Object.create === "function") module.exports = function inherits(ctor, superCtor) {
		ctor.super_ = superCtor;
		ctor.prototype = Object.create(superCtor.prototype, { constructor: {
			value: ctor,
			enumerable: false,
			writable: true,
			configurable: true
		} });
	};
	else module.exports = function inherits(ctor, superCtor) {
		ctor.super_ = superCtor;
		var TempCtor = function() {};
		TempCtor.prototype = superCtor.prototype;
		ctor.prototype = new TempCtor();
		ctor.prototype.constructor = ctor;
	};
}));
//#endregion
//#region node_modules/util/util.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
		if (!isString(f)) {
			var objects = [];
			for (var i = 0; i < arguments.length; i++) objects.push(inspect(arguments[i]));
			return objects.join(" ");
		}
		var i = 1;
		var args = arguments;
		var len = args.length;
		var str = String(f).replace(formatRegExp, function(x) {
			if (x === "%%") return "%";
			if (i >= len) return x;
			switch (x) {
				case "%s": return String(args[i++]);
				case "%d": return Number(args[i++]);
				case "%j": try {
					return JSON.stringify(args[i++]);
				} catch (_) {
					return "[Circular]";
				}
				default: return x;
			}
		});
		for (var x = args[i]; i < len; x = args[++i]) if (isNull(x) || !isObject(x)) str += " " + x;
		else str += " " + inspect(x);
		return str;
	};
	exports.deprecate = function(fn, msg) {
		if (isUndefined(global.process)) return function() {
			return exports.deprecate(fn, msg).apply(this, arguments);
		};
		if (process.noDeprecation === true) return fn;
		var warned = false;
		function deprecated() {
			if (!warned) {
				if (process.throwDeprecation) throw new Error(msg);
				else if (process.traceDeprecation) console.trace(msg);
				else console.error(msg);
				warned = true;
			}
			return fn.apply(this, arguments);
		}
		return deprecated;
	};
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
		if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || "";
		set = set.toUpperCase();
		if (!debugs[set]) {
			if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
				var pid = process.pid;
				debugs[set] = function() {
					var msg = exports.format.apply(exports, arguments);
					console.error("%s %d: %s", set, pid, msg);
				};
			} else debugs[set] = function() {};
		}
		return debugs[set];
	};
	/**
	* Echos the value of a value. Trys to print the value out
	* in the best way possible given the different types.
	*
	* @param {Object} obj The object to print out.
	* @param {Object} opts Optional options object that alters the output.
	*/
	function inspect(obj, opts) {
		var ctx = {
			seen: [],
			stylize: stylizeNoColor
		};
		if (arguments.length >= 3) ctx.depth = arguments[2];
		if (arguments.length >= 4) ctx.colors = arguments[3];
		if (isBoolean(opts)) ctx.showHidden = opts;
		else if (opts) exports._extend(ctx, opts);
		if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
		if (isUndefined(ctx.depth)) ctx.depth = 2;
		if (isUndefined(ctx.colors)) ctx.colors = false;
		if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
		if (ctx.colors) ctx.stylize = stylizeWithColor;
		return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	inspect.colors = {
		"bold": [1, 22],
		"italic": [3, 23],
		"underline": [4, 24],
		"inverse": [7, 27],
		"white": [37, 39],
		"grey": [90, 39],
		"black": [30, 39],
		"blue": [34, 39],
		"cyan": [36, 39],
		"green": [32, 39],
		"magenta": [35, 39],
		"red": [31, 39],
		"yellow": [33, 39]
	};
	inspect.styles = {
		"special": "cyan",
		"number": "yellow",
		"boolean": "yellow",
		"undefined": "grey",
		"null": "bold",
		"string": "green",
		"date": "magenta",
		"regexp": "red"
	};
	function stylizeWithColor(str, styleType) {
		var style = inspect.styles[styleType];
		if (style) return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
		else return str;
	}
	function stylizeNoColor(str, styleType) {
		return str;
	}
	function arrayToHash(array) {
		var hash = {};
		array.forEach(function(val, idx) {
			hash[val] = true;
		});
		return hash;
	}
	function formatValue(ctx, value, recurseTimes) {
		if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
			var ret = value.inspect(recurseTimes, ctx);
			if (!isString(ret)) ret = formatValue(ctx, ret, recurseTimes);
			return ret;
		}
		var primitive = formatPrimitive(ctx, value);
		if (primitive) return primitive;
		var keys = Object.keys(value);
		var visibleKeys = arrayToHash(keys);
		if (ctx.showHidden) keys = Object.getOwnPropertyNames(value);
		if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) return formatError(value);
		if (keys.length === 0) {
			if (isFunction(value)) {
				var name = value.name ? ": " + value.name : "";
				return ctx.stylize("[Function" + name + "]", "special");
			}
			if (isRegExp(value)) return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
			if (isDate(value)) return ctx.stylize(Date.prototype.toString.call(value), "date");
			if (isError(value)) return formatError(value);
		}
		var base = "", array = false, braces = ["{", "}"];
		if (isArray(value)) {
			array = true;
			braces = ["[", "]"];
		}
		if (isFunction(value)) base = " [Function" + (value.name ? ": " + value.name : "") + "]";
		if (isRegExp(value)) base = " " + RegExp.prototype.toString.call(value);
		if (isDate(value)) base = " " + Date.prototype.toUTCString.call(value);
		if (isError(value)) base = " " + formatError(value);
		if (keys.length === 0 && (!array || value.length == 0)) return braces[0] + base + braces[1];
		if (recurseTimes < 0) {
			if (isRegExp(value)) return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
			else return ctx.stylize("[Object]", "special");
		}
		ctx.seen.push(value);
		var output;
		if (array) output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
		else output = keys.map(function(key) {
			return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
		});
		ctx.seen.pop();
		return reduceToSingleString(output, base, braces);
	}
	function formatPrimitive(ctx, value) {
		if (isUndefined(value)) return ctx.stylize("undefined", "undefined");
		if (isString(value)) {
			var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, "\"") + "'";
			return ctx.stylize(simple, "string");
		}
		if (isNumber(value)) return ctx.stylize("" + value, "number");
		if (isBoolean(value)) return ctx.stylize("" + value, "boolean");
		if (isNull(value)) return ctx.stylize("null", "null");
	}
	function formatError(value) {
		return "[" + Error.prototype.toString.call(value) + "]";
	}
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
		var output = [];
		for (var i = 0, l = value.length; i < l; ++i) if (hasOwnProperty(value, String(i))) output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
		else output.push("");
		keys.forEach(function(key) {
			if (!key.match(/^\d+$/)) output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
		});
		return output;
	}
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
		var name, str, desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
		if (desc.get) {
			if (desc.set) str = ctx.stylize("[Getter/Setter]", "special");
			else str = ctx.stylize("[Getter]", "special");
		} else if (desc.set) str = ctx.stylize("[Setter]", "special");
		if (!hasOwnProperty(visibleKeys, key)) name = "[" + key + "]";
		if (!str) {
			if (ctx.seen.indexOf(desc.value) < 0) {
				if (isNull(recurseTimes)) str = formatValue(ctx, desc.value, null);
				else str = formatValue(ctx, desc.value, recurseTimes - 1);
				if (str.indexOf("\n") > -1) {
					if (array) str = str.split("\n").map(function(line) {
						return "  " + line;
					}).join("\n").substr(2);
					else str = "\n" + str.split("\n").map(function(line) {
						return "   " + line;
					}).join("\n");
				}
			} else str = ctx.stylize("[Circular]", "special");
		}
		if (isUndefined(name)) {
			if (array && key.match(/^\d+$/)) return str;
			name = JSON.stringify("" + key);
			if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
				name = name.substr(1, name.length - 2);
				name = ctx.stylize(name, "name");
			} else {
				name = name.replace(/'/g, "\\'").replace(/\\"/g, "\"").replace(/(^"|"$)/g, "'");
				name = ctx.stylize(name, "string");
			}
		}
		return name + ": " + str;
	}
	function reduceToSingleString(output, base, braces) {
		var numLinesEst = 0;
		if (output.reduce(function(prev, cur) {
			numLinesEst++;
			if (cur.indexOf("\n") >= 0) numLinesEst++;
			return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
		}, 0) > 60) return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
		return braces[0] + base + " " + output.join(", ") + " " + braces[1];
	}
	function isArray(ar) {
		return Array.isArray(ar);
	}
	exports.isArray = isArray;
	function isBoolean(arg) {
		return typeof arg === "boolean";
	}
	exports.isBoolean = isBoolean;
	function isNull(arg) {
		return arg === null;
	}
	exports.isNull = isNull;
	function isNullOrUndefined(arg) {
		return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	function isNumber(arg) {
		return typeof arg === "number";
	}
	exports.isNumber = isNumber;
	function isString(arg) {
		return typeof arg === "string";
	}
	exports.isString = isString;
	function isSymbol(arg) {
		return typeof arg === "symbol";
	}
	exports.isSymbol = isSymbol;
	function isUndefined(arg) {
		return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	function isRegExp(re) {
		return isObject(re) && objectToString(re) === "[object RegExp]";
	}
	exports.isRegExp = isRegExp;
	function isObject(arg) {
		return typeof arg === "object" && arg !== null;
	}
	exports.isObject = isObject;
	function isDate(d) {
		return isObject(d) && objectToString(d) === "[object Date]";
	}
	exports.isDate = isDate;
	function isError(e) {
		return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
	}
	exports.isError = isError;
	function isFunction(arg) {
		return typeof arg === "function";
	}
	exports.isFunction = isFunction;
	function isPrimitive(arg) {
		return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
	}
	exports.isPrimitive = isPrimitive;
	exports.isBuffer = require_isBufferBrowser();
	function objectToString(o) {
		return Object.prototype.toString.call(o);
	}
	function pad(n) {
		return n < 10 ? "0" + n.toString(10) : n.toString(10);
	}
	var months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	function timestamp() {
		var d = /* @__PURE__ */ new Date();
		var time = [
			pad(d.getHours()),
			pad(d.getMinutes()),
			pad(d.getSeconds())
		].join(":");
		return [
			d.getDate(),
			months[d.getMonth()],
			time
		].join(" ");
	}
	exports.log = function() {
		console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
	};
	/**
	* Inherit the prototype methods from one constructor into another.
	*
	* The Function.prototype.inherits from lang.js rewritten as a standalone
	* function (not on Function.prototype). NOTE: If this file is to be loaded
	* during bootstrapping this function needs to be rewritten using some native
	* functions as prototype setup using normal JavaScript does not work as
	* expected during bootstrapping (see mirror.js in r114903).
	*
	* @param {function} ctor Constructor function which needs to inherit the
	*     prototype.
	* @param {function} superCtor Constructor function to inherit prototype from.
	*/
	exports.inherits = require_inherits_browser();
	exports._extend = function(origin, add) {
		if (!add || !isObject(add)) return origin;
		var keys = Object.keys(add);
		var i = keys.length;
		while (i--) origin[keys[i]] = add[keys[i]];
		return origin;
	};
	function hasOwnProperty(obj, prop) {
		return Object.prototype.hasOwnProperty.call(obj, prop);
	}
}));
//#endregion
//#region node_modules/path/path.js
var require_path$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isWindows = process.platform === "win32";
	var util = require_util();
	function normalizeArray(parts, allowAboveRoot) {
		var res = [];
		for (var i = 0; i < parts.length; i++) {
			var p = parts[i];
			if (!p || p === ".") continue;
			if (p === "..") {
				if (res.length && res[res.length - 1] !== "..") res.pop();
				else if (allowAboveRoot) res.push("..");
			} else res.push(p);
		}
		return res;
	}
	function trimArray(arr) {
		var lastIndex = arr.length - 1;
		var start = 0;
		for (; start <= lastIndex; start++) if (arr[start]) break;
		var end = lastIndex;
		for (; end >= 0; end--) if (arr[end]) break;
		if (start === 0 && end === lastIndex) return arr;
		if (start > end) return [];
		return arr.slice(start, end + 1);
	}
	var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
	var splitTailRe = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;
	var win32 = {};
	function win32SplitPath(filename) {
		var result = splitDeviceRe.exec(filename), device = (result[1] || "") + (result[2] || ""), tail = result[3] || "";
		var result2 = splitTailRe.exec(tail);
		return [
			device,
			result2[1],
			result2[2],
			result2[3]
		];
	}
	function win32StatPath(path) {
		var result = splitDeviceRe.exec(path), device = result[1] || "", isUnc = !!device && device[1] !== ":";
		return {
			device,
			isUnc,
			isAbsolute: isUnc || !!result[2],
			tail: result[3]
		};
	}
	function normalizeUNCRoot(device) {
		return "\\\\" + device.replace(/^[\\\/]+/, "").replace(/[\\\/]+/g, "\\");
	}
	win32.resolve = function() {
		var resolvedDevice = "", resolvedTail = "", resolvedAbsolute = false;
		for (var i = arguments.length - 1; i >= -1; i--) {
			var path;
			if (i >= 0) path = arguments[i];
			else if (!resolvedDevice) path = process.cwd();
			else {
				path = process.env["=" + resolvedDevice];
				if (!path || path.substr(0, 3).toLowerCase() !== resolvedDevice.toLowerCase() + "\\") path = resolvedDevice + "\\";
			}
			if (!util.isString(path)) throw new TypeError("Arguments to path.resolve must be strings");
			else if (!path) continue;
			var result = win32StatPath(path), device = result.device, isUnc = result.isUnc, isAbsolute = result.isAbsolute, tail = result.tail;
			if (device && resolvedDevice && device.toLowerCase() !== resolvedDevice.toLowerCase()) continue;
			if (!resolvedDevice) resolvedDevice = device;
			if (!resolvedAbsolute) {
				resolvedTail = tail + "\\" + resolvedTail;
				resolvedAbsolute = isAbsolute;
			}
			if (resolvedDevice && resolvedAbsolute) break;
		}
		if (isUnc) resolvedDevice = normalizeUNCRoot(resolvedDevice);
		resolvedTail = normalizeArray(resolvedTail.split(/[\\\/]+/), !resolvedAbsolute).join("\\");
		return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
	};
	win32.normalize = function(path) {
		var result = win32StatPath(path), device = result.device, isUnc = result.isUnc, isAbsolute = result.isAbsolute, tail = result.tail, trailingSlash = /[\\\/]$/.test(tail);
		tail = normalizeArray(tail.split(/[\\\/]+/), !isAbsolute).join("\\");
		if (!tail && !isAbsolute) tail = ".";
		if (tail && trailingSlash) tail += "\\";
		if (isUnc) device = normalizeUNCRoot(device);
		return device + (isAbsolute ? "\\" : "") + tail;
	};
	win32.isAbsolute = function(path) {
		return win32StatPath(path).isAbsolute;
	};
	win32.join = function() {
		var paths = [];
		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!util.isString(arg)) throw new TypeError("Arguments to path.join must be strings");
			if (arg) paths.push(arg);
		}
		var joined = paths.join("\\");
		if (!/^[\\\/]{2}[^\\\/]/.test(paths[0])) joined = joined.replace(/^[\\\/]{2,}/, "\\");
		return win32.normalize(joined);
	};
	win32.relative = function(from, to) {
		from = win32.resolve(from);
		to = win32.resolve(to);
		var lowerFrom = from.toLowerCase();
		var lowerTo = to.toLowerCase();
		var toParts = trimArray(to.split("\\"));
		var lowerFromParts = trimArray(lowerFrom.split("\\"));
		var lowerToParts = trimArray(lowerTo.split("\\"));
		var length = Math.min(lowerFromParts.length, lowerToParts.length);
		var samePartsLength = length;
		for (var i = 0; i < length; i++) if (lowerFromParts[i] !== lowerToParts[i]) {
			samePartsLength = i;
			break;
		}
		if (samePartsLength == 0) return to;
		var outputParts = [];
		for (var i = samePartsLength; i < lowerFromParts.length; i++) outputParts.push("..");
		outputParts = outputParts.concat(toParts.slice(samePartsLength));
		return outputParts.join("\\");
	};
	win32._makeLong = function(path) {
		if (!util.isString(path)) return path;
		if (!path) return "";
		var resolvedPath = win32.resolve(path);
		if (/^[a-zA-Z]\:\\/.test(resolvedPath)) return "\\\\?\\" + resolvedPath;
		else if (/^\\\\[^?.]/.test(resolvedPath)) return "\\\\?\\UNC\\" + resolvedPath.substring(2);
		return path;
	};
	win32.dirname = function(path) {
		var result = win32SplitPath(path), root = result[0], dir = result[1];
		if (!root && !dir) return ".";
		if (dir) dir = dir.substr(0, dir.length - 1);
		return root + dir;
	};
	win32.basename = function(path, ext) {
		var f = win32SplitPath(path)[2];
		if (ext && f.substr(-1 * ext.length) === ext) f = f.substr(0, f.length - ext.length);
		return f;
	};
	win32.extname = function(path) {
		return win32SplitPath(path)[3];
	};
	win32.format = function(pathObject) {
		if (!util.isObject(pathObject)) throw new TypeError("Parameter 'pathObject' must be an object, not " + typeof pathObject);
		var root = pathObject.root || "";
		if (!util.isString(root)) throw new TypeError("'pathObject.root' must be a string or undefined, not " + typeof pathObject.root);
		var dir = pathObject.dir;
		var base = pathObject.base || "";
		if (!dir) return base;
		if (dir[dir.length - 1] === win32.sep) return dir + base;
		return dir + win32.sep + base;
	};
	win32.parse = function(pathString) {
		if (!util.isString(pathString)) throw new TypeError("Parameter 'pathString' must be a string, not " + typeof pathString);
		var allParts = win32SplitPath(pathString);
		if (!allParts || allParts.length !== 4) throw new TypeError("Invalid path '" + pathString + "'");
		return {
			root: allParts[0],
			dir: allParts[0] + allParts[1].slice(0, -1),
			base: allParts[2],
			ext: allParts[3],
			name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
		};
	};
	win32.sep = "\\";
	win32.delimiter = ";";
	var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var posix = {};
	function posixSplitPath(filename) {
		return splitPathRe.exec(filename).slice(1);
	}
	posix.resolve = function() {
		var resolvedPath = "", resolvedAbsolute = false;
		for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
			var path = i >= 0 ? arguments[i] : process.cwd();
			if (!util.isString(path)) throw new TypeError("Arguments to path.resolve must be strings");
			else if (!path) continue;
			resolvedPath = path + "/" + resolvedPath;
			resolvedAbsolute = path[0] === "/";
		}
		resolvedPath = normalizeArray(resolvedPath.split("/"), !resolvedAbsolute).join("/");
		return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
	};
	posix.normalize = function(path) {
		var isAbsolute = posix.isAbsolute(path), trailingSlash = path && path[path.length - 1] === "/";
		path = normalizeArray(path.split("/"), !isAbsolute).join("/");
		if (!path && !isAbsolute) path = ".";
		if (path && trailingSlash) path += "/";
		return (isAbsolute ? "/" : "") + path;
	};
	posix.isAbsolute = function(path) {
		return path.charAt(0) === "/";
	};
	posix.join = function() {
		var path = "";
		for (var i = 0; i < arguments.length; i++) {
			var segment = arguments[i];
			if (!util.isString(segment)) throw new TypeError("Arguments to path.join must be strings");
			if (segment) {
				if (!path) path += segment;
				else path += "/" + segment;
			}
		}
		return posix.normalize(path);
	};
	posix.relative = function(from, to) {
		from = posix.resolve(from).substr(1);
		to = posix.resolve(to).substr(1);
		var fromParts = trimArray(from.split("/"));
		var toParts = trimArray(to.split("/"));
		var length = Math.min(fromParts.length, toParts.length);
		var samePartsLength = length;
		for (var i = 0; i < length; i++) if (fromParts[i] !== toParts[i]) {
			samePartsLength = i;
			break;
		}
		var outputParts = [];
		for (var i = samePartsLength; i < fromParts.length; i++) outputParts.push("..");
		outputParts = outputParts.concat(toParts.slice(samePartsLength));
		return outputParts.join("/");
	};
	posix._makeLong = function(path) {
		return path;
	};
	posix.dirname = function(path) {
		var result = posixSplitPath(path), root = result[0], dir = result[1];
		if (!root && !dir) return ".";
		if (dir) dir = dir.substr(0, dir.length - 1);
		return root + dir;
	};
	posix.basename = function(path, ext) {
		var f = posixSplitPath(path)[2];
		if (ext && f.substr(-1 * ext.length) === ext) f = f.substr(0, f.length - ext.length);
		return f;
	};
	posix.extname = function(path) {
		return posixSplitPath(path)[3];
	};
	posix.format = function(pathObject) {
		if (!util.isObject(pathObject)) throw new TypeError("Parameter 'pathObject' must be an object, not " + typeof pathObject);
		var root = pathObject.root || "";
		if (!util.isString(root)) throw new TypeError("'pathObject.root' must be a string or undefined, not " + typeof pathObject.root);
		return (pathObject.dir ? pathObject.dir + posix.sep : "") + (pathObject.base || "");
	};
	posix.parse = function(pathString) {
		if (!util.isString(pathString)) throw new TypeError("Parameter 'pathString' must be a string, not " + typeof pathString);
		var allParts = posixSplitPath(pathString);
		if (!allParts || allParts.length !== 4) throw new TypeError("Invalid path '" + pathString + "'");
		allParts[1] = allParts[1] || "";
		allParts[2] = allParts[2] || "";
		allParts[3] = allParts[3] || "";
		return {
			root: allParts[0],
			dir: allParts[0] + allParts[1].slice(0, -1),
			base: allParts[2],
			ext: allParts[3],
			name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
		};
	};
	posix.sep = "/";
	posix.delimiter = ":";
	if (isWindows) module.exports = win32;
	else module.exports = posix;
	module.exports.posix = posix;
	module.exports.win32 = win32;
}));
//#endregion
//#region node_modules/fast-glob/out/utils/path.js
var require_path = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.convertPosixPathToPattern = exports.convertWindowsPathToPattern = exports.convertPathToPattern = exports.escapePosixPath = exports.escapeWindowsPath = exports.escape = exports.removeLeadingDotSegment = exports.makeAbsolute = exports.unixify = void 0;
	const os$1 = __require("os");
	const path = require_path$1();
	const IS_WINDOWS_PLATFORM = os$1.platform() === "win32";
	const LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2;
	/**
	* All non-escaped special characters.
	* Posix: ()*?[]{|}, !+@ before (, ! at the beginning, \\ before non-special characters.
	* Windows: (){}[], !+@ before (, ! at the beginning.
	*/
	const POSIX_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\()|\\(?![!()*+?@[\]{|}]))/g;
	const WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()[\]{}]|^!|[!+@](?=\())/g;
	/**
	* The device path (\\.\ or \\?\).
	* https://learn.microsoft.com/en-us/dotnet/standard/io/file-path-formats#dos-device-paths
	*/
	const DOS_DEVICE_PATH_RE = /^\\\\([.?])/;
	/**
	* All backslashes except those escaping special characters.
	* Windows: !()+@{}
	* https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file#naming-conventions
	*/
	const WINDOWS_BACKSLASHES_RE = /\\(?![!()+@[\]{}])/g;
	/**
	* Designed to work only with simple paths: `dir\\file`.
	*/
	function unixify(filepath) {
		return filepath.replace(/\\/g, "/");
	}
	exports.unixify = unixify;
	function makeAbsolute(cwd, filepath) {
		return path.resolve(cwd, filepath);
	}
	exports.makeAbsolute = makeAbsolute;
	function removeLeadingDotSegment(entry) {
		if (entry.charAt(0) === ".") {
			const secondCharactery = entry.charAt(1);
			if (secondCharactery === "/" || secondCharactery === "\\") return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT);
		}
		return entry;
	}
	exports.removeLeadingDotSegment = removeLeadingDotSegment;
	exports.escape = IS_WINDOWS_PLATFORM ? escapeWindowsPath : escapePosixPath;
	function escapeWindowsPath(pattern) {
		return pattern.replace(WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
	}
	exports.escapeWindowsPath = escapeWindowsPath;
	function escapePosixPath(pattern) {
		return pattern.replace(POSIX_UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
	}
	exports.escapePosixPath = escapePosixPath;
	exports.convertPathToPattern = IS_WINDOWS_PLATFORM ? convertWindowsPathToPattern : convertPosixPathToPattern;
	function convertWindowsPathToPattern(filepath) {
		return escapeWindowsPath(filepath).replace(DOS_DEVICE_PATH_RE, "//$1").replace(WINDOWS_BACKSLASHES_RE, "/");
	}
	exports.convertWindowsPathToPattern = convertWindowsPathToPattern;
	function convertPosixPathToPattern(filepath) {
		return escapePosixPath(filepath);
	}
	exports.convertPosixPathToPattern = convertPosixPathToPattern;
}));
//#endregion
//#region node_modules/is-extglob/index.js
var require_is_extglob = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*!
	* is-extglob <https://github.com/jonschlinkert/is-extglob>
	*
	* Copyright (c) 2014-2016, Jon Schlinkert.
	* Licensed under the MIT License.
	*/
	module.exports = function isExtglob(str) {
		if (typeof str !== "string" || str === "") return false;
		var match;
		while (match = /(\\).|([@?!+*]\(.*\))/g.exec(str)) {
			if (match[2]) return true;
			str = str.slice(match.index + match[0].length);
		}
		return false;
	};
}));
//#endregion
//#region node_modules/is-glob/index.js
var require_is_glob = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*!
	* is-glob <https://github.com/jonschlinkert/is-glob>
	*
	* Copyright (c) 2014-2017, Jon Schlinkert.
	* Released under the MIT License.
	*/
	var isExtglob = require_is_extglob();
	var chars = {
		"{": "}",
		"(": ")",
		"[": "]"
	};
	var strictCheck = function(str) {
		if (str[0] === "!") return true;
		var index = 0;
		var pipeIndex = -2;
		var closeSquareIndex = -2;
		var closeCurlyIndex = -2;
		var closeParenIndex = -2;
		var backSlashIndex = -2;
		while (index < str.length) {
			if (str[index] === "*") return true;
			if (str[index + 1] === "?" && /[\].+)]/.test(str[index])) return true;
			if (closeSquareIndex !== -1 && str[index] === "[" && str[index + 1] !== "]") {
				if (closeSquareIndex < index) closeSquareIndex = str.indexOf("]", index);
				if (closeSquareIndex > index) {
					if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) return true;
					backSlashIndex = str.indexOf("\\", index);
					if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) return true;
				}
			}
			if (closeCurlyIndex !== -1 && str[index] === "{" && str[index + 1] !== "}") {
				closeCurlyIndex = str.indexOf("}", index);
				if (closeCurlyIndex > index) {
					backSlashIndex = str.indexOf("\\", index);
					if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) return true;
				}
			}
			if (closeParenIndex !== -1 && str[index] === "(" && str[index + 1] === "?" && /[:!=]/.test(str[index + 2]) && str[index + 3] !== ")") {
				closeParenIndex = str.indexOf(")", index);
				if (closeParenIndex > index) {
					backSlashIndex = str.indexOf("\\", index);
					if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) return true;
				}
			}
			if (pipeIndex !== -1 && str[index] === "(" && str[index + 1] !== "|") {
				if (pipeIndex < index) pipeIndex = str.indexOf("|", index);
				if (pipeIndex !== -1 && str[pipeIndex + 1] !== ")") {
					closeParenIndex = str.indexOf(")", pipeIndex);
					if (closeParenIndex > pipeIndex) {
						backSlashIndex = str.indexOf("\\", pipeIndex);
						if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) return true;
					}
				}
			}
			if (str[index] === "\\") {
				var open = str[index + 1];
				index += 2;
				var close = chars[open];
				if (close) {
					var n = str.indexOf(close, index);
					if (n !== -1) index = n + 1;
				}
				if (str[index] === "!") return true;
			} else index++;
		}
		return false;
	};
	var relaxedCheck = function(str) {
		if (str[0] === "!") return true;
		var index = 0;
		while (index < str.length) {
			if (/[*?{}()[\]]/.test(str[index])) return true;
			if (str[index] === "\\") {
				var open = str[index + 1];
				index += 2;
				var close = chars[open];
				if (close) {
					var n = str.indexOf(close, index);
					if (n !== -1) index = n + 1;
				}
				if (str[index] === "!") return true;
			} else index++;
		}
		return false;
	};
	module.exports = function isGlob(str, options) {
		if (typeof str !== "string" || str === "") return false;
		if (isExtglob(str)) return true;
		var check = strictCheck;
		if (options && options.strict === false) check = relaxedCheck;
		return check(str);
	};
}));
//#endregion
//#region node_modules/glob-parent/index.js
var require_glob_parent = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isGlob = require_is_glob();
	var pathPosixDirname = require_path$1().posix.dirname;
	var isWin32 = __require("os").platform() === "win32";
	var slash = "/";
	var backslash = /\\/g;
	var enclosure = /[\{\[].*[\}\]]$/;
	var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/;
	var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;
	/**
	* @param {string} str
	* @param {Object} opts
	* @param {boolean} [opts.flipBackslashes=true]
	* @returns {string}
	*/
	module.exports = function globParent(str, opts) {
		if (Object.assign({ flipBackslashes: true }, opts).flipBackslashes && isWin32 && str.indexOf(slash) < 0) str = str.replace(backslash, slash);
		if (enclosure.test(str)) str += slash;
		str += "a";
		do
			str = pathPosixDirname(str);
		while (isGlob(str) || globby.test(str));
		return str.replace(escaped, "$1");
	};
}));
//#endregion
//#region node_modules/braces/lib/utils.js
var require_utils$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.isInteger = (num) => {
		if (typeof num === "number") return Number.isInteger(num);
		if (typeof num === "string" && num.trim() !== "") return Number.isInteger(Number(num));
		return false;
	};
	/**
	* Find a node of the given type
	*/
	exports.find = (node, type) => node.nodes.find((node) => node.type === type);
	/**
	* Find a node of the given type
	*/
	exports.exceedsLimit = (min, max, step = 1, limit) => {
		if (limit === false) return false;
		if (!exports.isInteger(min) || !exports.isInteger(max)) return false;
		return (Number(max) - Number(min)) / Number(step) >= limit;
	};
	/**
	* Escape the given node with '\\' before node.value
	*/
	exports.escapeNode = (block, n = 0, type) => {
		const node = block.nodes[n];
		if (!node) return;
		if (type && node.type === type || node.type === "open" || node.type === "close") {
			if (node.escaped !== true) {
				node.value = "\\" + node.value;
				node.escaped = true;
			}
		}
	};
	/**
	* Returns true if the given brace node should be enclosed in literal braces
	*/
	exports.encloseBrace = (node) => {
		if (node.type !== "brace") return false;
		if (node.commas >> 0 + node.ranges >> 0 === 0) {
			node.invalid = true;
			return true;
		}
		return false;
	};
	/**
	* Returns true if a brace node is invalid.
	*/
	exports.isInvalidBrace = (block) => {
		if (block.type !== "brace") return false;
		if (block.invalid === true || block.dollar) return true;
		if (block.commas >> 0 + block.ranges >> 0 === 0) {
			block.invalid = true;
			return true;
		}
		if (block.open !== true || block.close !== true) {
			block.invalid = true;
			return true;
		}
		return false;
	};
	/**
	* Returns true if a node is an open or close node
	*/
	exports.isOpenOrClose = (node) => {
		if (node.type === "open" || node.type === "close") return true;
		return node.open === true || node.close === true;
	};
	/**
	* Reduce an array of text nodes.
	*/
	exports.reduce = (nodes) => nodes.reduce((acc, node) => {
		if (node.type === "text") acc.push(node.value);
		if (node.type === "range") node.type = "text";
		return acc;
	}, []);
	/**
	* Flatten an array
	*/
	exports.flatten = (...args) => {
		const result = [];
		const flat = (arr) => {
			for (let i = 0; i < arr.length; i++) {
				const ele = arr[i];
				if (Array.isArray(ele)) {
					flat(ele);
					continue;
				}
				if (ele !== void 0) result.push(ele);
			}
			return result;
		};
		flat(args);
		return result;
	};
}));
//#endregion
//#region node_modules/braces/lib/stringify.js
var require_stringify = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const utils = require_utils$3();
	module.exports = (ast, options = {}) => {
		const stringify = (node, parent = {}) => {
			const invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
			const invalidNode = node.invalid === true && options.escapeInvalid === true;
			let output = "";
			if (node.value) {
				if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) return "\\" + node.value;
				return node.value;
			}
			if (node.value) return node.value;
			if (node.nodes) for (const child of node.nodes) output += stringify(child);
			return output;
		};
		return stringify(ast);
	};
}));
//#endregion
//#region node_modules/is-number/index.js
/*!
* is-number <https://github.com/jonschlinkert/is-number>
*
* Copyright (c) 2014-present, Jon Schlinkert.
* Released under the MIT License.
*/
var require_is_number = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(num) {
		if (typeof num === "number") return num - num === 0;
		if (typeof num === "string" && num.trim() !== "") return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
		return false;
	};
}));
//#endregion
//#region node_modules/to-regex-range/index.js
/*!
* to-regex-range <https://github.com/micromatch/to-regex-range>
*
* Copyright (c) 2015-present, Jon Schlinkert.
* Released under the MIT License.
*/
var require_to_regex_range = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const isNumber = require_is_number();
	const toRegexRange = (min, max, options) => {
		if (isNumber(min) === false) throw new TypeError("toRegexRange: expected the first argument to be a number");
		if (max === void 0 || min === max) return String(min);
		if (isNumber(max) === false) throw new TypeError("toRegexRange: expected the second argument to be a number.");
		let opts = {
			relaxZeros: true,
			...options
		};
		if (typeof opts.strictZeros === "boolean") opts.relaxZeros = opts.strictZeros === false;
		let relax = String(opts.relaxZeros);
		let shorthand = String(opts.shorthand);
		let capture = String(opts.capture);
		let wrap = String(opts.wrap);
		let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
		if (toRegexRange.cache.hasOwnProperty(cacheKey)) return toRegexRange.cache[cacheKey].result;
		let a = Math.min(min, max);
		let b = Math.max(min, max);
		if (Math.abs(a - b) === 1) {
			let result = min + "|" + max;
			if (opts.capture) return `(${result})`;
			if (opts.wrap === false) return result;
			return `(?:${result})`;
		}
		let isPadded = hasPadding(min) || hasPadding(max);
		let state = {
			min,
			max,
			a,
			b
		};
		let positives = [];
		let negatives = [];
		if (isPadded) {
			state.isPadded = isPadded;
			state.maxLen = String(state.max).length;
		}
		if (a < 0) {
			negatives = splitToPatterns(b < 0 ? Math.abs(b) : 1, Math.abs(a), state, opts);
			a = state.a = 0;
		}
		if (b >= 0) positives = splitToPatterns(a, b, state, opts);
		state.negatives = negatives;
		state.positives = positives;
		state.result = collatePatterns(negatives, positives, opts);
		if (opts.capture === true) state.result = `(${state.result})`;
		else if (opts.wrap !== false && positives.length + negatives.length > 1) state.result = `(?:${state.result})`;
		toRegexRange.cache[cacheKey] = state;
		return state.result;
	};
	function collatePatterns(neg, pos, options) {
		let onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
		let onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
		let intersected = filterPatterns(neg, pos, "-?", true, options) || [];
		return onlyNegative.concat(intersected).concat(onlyPositive).join("|");
	}
	function splitToRanges(min, max) {
		let nines = 1;
		let zeros = 1;
		let stop = countNines(min, nines);
		let stops = /* @__PURE__ */ new Set([max]);
		while (min <= stop && stop <= max) {
			stops.add(stop);
			nines += 1;
			stop = countNines(min, nines);
		}
		stop = countZeros(max + 1, zeros) - 1;
		while (min < stop && stop <= max) {
			stops.add(stop);
			zeros += 1;
			stop = countZeros(max + 1, zeros) - 1;
		}
		stops = [...stops];
		stops.sort(compare);
		return stops;
	}
	/**
	* Convert a range to a regex pattern
	* @param {Number} `start`
	* @param {Number} `stop`
	* @return {String}
	*/
	function rangeToPattern(start, stop, options) {
		if (start === stop) return {
			pattern: start,
			count: [],
			digits: 0
		};
		let zipped = zip(start, stop);
		let digits = zipped.length;
		let pattern = "";
		let count = 0;
		for (let i = 0; i < digits; i++) {
			let [startDigit, stopDigit] = zipped[i];
			if (startDigit === stopDigit) pattern += startDigit;
			else if (startDigit !== "0" || stopDigit !== "9") pattern += toCharacterClass(startDigit, stopDigit, options);
			else count++;
		}
		if (count) pattern += options.shorthand === true ? "\\d" : "[0-9]";
		return {
			pattern,
			count: [count],
			digits
		};
	}
	function splitToPatterns(min, max, tok, options) {
		let ranges = splitToRanges(min, max);
		let tokens = [];
		let start = min;
		let prev;
		for (let i = 0; i < ranges.length; i++) {
			let max = ranges[i];
			let obj = rangeToPattern(String(start), String(max), options);
			let zeros = "";
			if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
				if (prev.count.length > 1) prev.count.pop();
				prev.count.push(obj.count[0]);
				prev.string = prev.pattern + toQuantifier(prev.count);
				start = max + 1;
				continue;
			}
			if (tok.isPadded) zeros = padZeros(max, tok, options);
			obj.string = zeros + obj.pattern + toQuantifier(obj.count);
			tokens.push(obj);
			start = max + 1;
			prev = obj;
		}
		return tokens;
	}
	function filterPatterns(arr, comparison, prefix, intersection, options) {
		let result = [];
		for (let ele of arr) {
			let { string } = ele;
			if (!intersection && !contains(comparison, "string", string)) result.push(prefix + string);
			if (intersection && contains(comparison, "string", string)) result.push(prefix + string);
		}
		return result;
	}
	/**
	* Zip strings
	*/
	function zip(a, b) {
		let arr = [];
		for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
		return arr;
	}
	function compare(a, b) {
		return a > b ? 1 : b > a ? -1 : 0;
	}
	function contains(arr, key, val) {
		return arr.some((ele) => ele[key] === val);
	}
	function countNines(min, len) {
		return Number(String(min).slice(0, -len) + "9".repeat(len));
	}
	function countZeros(integer, zeros) {
		return integer - integer % Math.pow(10, zeros);
	}
	function toQuantifier(digits) {
		let [start = 0, stop = ""] = digits;
		if (stop || start > 1) return `{${start + (stop ? "," + stop : "")}}`;
		return "";
	}
	function toCharacterClass(a, b, options) {
		return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
	}
	function hasPadding(str) {
		return /^-?(0+)\d/.test(str);
	}
	function padZeros(value, tok, options) {
		if (!tok.isPadded) return value;
		let diff = Math.abs(tok.maxLen - String(value).length);
		let relax = options.relaxZeros !== false;
		switch (diff) {
			case 0: return "";
			case 1: return relax ? "0?" : "0";
			case 2: return relax ? "0{0,2}" : "00";
			default: return relax ? `0{0,${diff}}` : `0{${diff}}`;
		}
	}
	/**
	* Cache
	*/
	toRegexRange.cache = {};
	toRegexRange.clearCache = () => toRegexRange.cache = {};
	/**
	* Expose `toRegexRange`
	*/
	module.exports = toRegexRange;
}));
//#endregion
//#region node_modules/fill-range/index.js
/*!
* fill-range <https://github.com/jonschlinkert/fill-range>
*
* Copyright (c) 2014-present, Jon Schlinkert.
* Licensed under the MIT License.
*/
var require_fill_range = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const util = require_util();
	const toRegexRange = require_to_regex_range();
	const isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
	const transform = (toNumber) => {
		return (value) => toNumber === true ? Number(value) : String(value);
	};
	const isValidValue = (value) => {
		return typeof value === "number" || typeof value === "string" && value !== "";
	};
	const isNumber = (num) => Number.isInteger(+num);
	const zeros = (input) => {
		let value = `${input}`;
		let index = -1;
		if (value[0] === "-") value = value.slice(1);
		if (value === "0") return false;
		while (value[++index] === "0");
		return index > 0;
	};
	const stringify = (start, end, options) => {
		if (typeof start === "string" || typeof end === "string") return true;
		return options.stringify === true;
	};
	const pad = (input, maxLength, toNumber) => {
		if (maxLength > 0) {
			let dash = input[0] === "-" ? "-" : "";
			if (dash) input = input.slice(1);
			input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
		}
		if (toNumber === false) return String(input);
		return input;
	};
	const toMaxLen = (input, maxLength) => {
		let negative = input[0] === "-" ? "-" : "";
		if (negative) {
			input = input.slice(1);
			maxLength--;
		}
		while (input.length < maxLength) input = "0" + input;
		return negative ? "-" + input : input;
	};
	const toSequence = (parts, options, maxLen) => {
		parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
		parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
		let prefix = options.capture ? "" : "?:";
		let positives = "";
		let negatives = "";
		let result;
		if (parts.positives.length) positives = parts.positives.map((v) => toMaxLen(String(v), maxLen)).join("|");
		if (parts.negatives.length) negatives = `-(${prefix}${parts.negatives.map((v) => toMaxLen(String(v), maxLen)).join("|")})`;
		if (positives && negatives) result = `${positives}|${negatives}`;
		else result = positives || negatives;
		if (options.wrap) return `(${prefix}${result})`;
		return result;
	};
	const toRange = (a, b, isNumbers, options) => {
		if (isNumbers) return toRegexRange(a, b, {
			wrap: false,
			...options
		});
		let start = String.fromCharCode(a);
		if (a === b) return start;
		return `[${start}-${String.fromCharCode(b)}]`;
	};
	const toRegex = (start, end, options) => {
		if (Array.isArray(start)) {
			let wrap = options.wrap === true;
			let prefix = options.capture ? "" : "?:";
			return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
		}
		return toRegexRange(start, end, options);
	};
	const rangeError = (...args) => {
		return /* @__PURE__ */ new RangeError("Invalid range arguments: " + util.inspect(...args));
	};
	const invalidRange = (start, end, options) => {
		if (options.strictRanges === true) throw rangeError([start, end]);
		return [];
	};
	const invalidStep = (step, options) => {
		if (options.strictRanges === true) throw new TypeError(`Expected step "${step}" to be a number`);
		return [];
	};
	const fillNumbers = (start, end, step = 1, options = {}) => {
		let a = Number(start);
		let b = Number(end);
		if (!Number.isInteger(a) || !Number.isInteger(b)) {
			if (options.strictRanges === true) throw rangeError([start, end]);
			return [];
		}
		if (a === 0) a = 0;
		if (b === 0) b = 0;
		let descending = a > b;
		let startString = String(start);
		let endString = String(end);
		let stepString = String(step);
		step = Math.max(Math.abs(step), 1);
		let padded = zeros(startString) || zeros(endString) || zeros(stepString);
		let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
		let toNumber = padded === false && stringify(start, end, options) === false;
		let format = options.transform || transform(toNumber);
		if (options.toRegex && step === 1) return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
		let parts = {
			negatives: [],
			positives: []
		};
		let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
		let range = [];
		let index = 0;
		while (descending ? a >= b : a <= b) {
			if (options.toRegex === true && step > 1) push(a);
			else range.push(pad(format(a, index), maxLen, toNumber));
			a = descending ? a - step : a + step;
			index++;
		}
		if (options.toRegex === true) return step > 1 ? toSequence(parts, options, maxLen) : toRegex(range, null, {
			wrap: false,
			...options
		});
		return range;
	};
	const fillLetters = (start, end, step = 1, options = {}) => {
		if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) return invalidRange(start, end, options);
		let format = options.transform || ((val) => String.fromCharCode(val));
		let a = `${start}`.charCodeAt(0);
		let b = `${end}`.charCodeAt(0);
		let descending = a > b;
		let min = Math.min(a, b);
		let max = Math.max(a, b);
		if (options.toRegex && step === 1) return toRange(min, max, false, options);
		let range = [];
		let index = 0;
		while (descending ? a >= b : a <= b) {
			range.push(format(a, index));
			a = descending ? a - step : a + step;
			index++;
		}
		if (options.toRegex === true) return toRegex(range, null, {
			wrap: false,
			options
		});
		return range;
	};
	const fill = (start, end, step, options = {}) => {
		if (end == null && isValidValue(start)) return [start];
		if (!isValidValue(start) || !isValidValue(end)) return invalidRange(start, end, options);
		if (typeof step === "function") return fill(start, end, 1, { transform: step });
		if (isObject(step)) return fill(start, end, 0, step);
		let opts = { ...options };
		if (opts.capture === true) opts.wrap = true;
		step = step || opts.step || 1;
		if (!isNumber(step)) {
			if (step != null && !isObject(step)) return invalidStep(step, opts);
			return fill(start, end, 1, step);
		}
		if (isNumber(start) && isNumber(end)) return fillNumbers(start, end, step, opts);
		return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
	};
	module.exports = fill;
}));
//#endregion
//#region node_modules/braces/lib/compile.js
var require_compile = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const fill = require_fill_range();
	const utils = require_utils$3();
	const compile = (ast, options = {}) => {
		const walk = (node, parent = {}) => {
			const invalidBlock = utils.isInvalidBrace(parent);
			const invalidNode = node.invalid === true && options.escapeInvalid === true;
			const invalid = invalidBlock === true || invalidNode === true;
			const prefix = options.escapeInvalid === true ? "\\" : "";
			let output = "";
			if (node.isOpen === true) return prefix + node.value;
			if (node.isClose === true) {
				console.log("node.isClose", prefix, node.value);
				return prefix + node.value;
			}
			if (node.type === "open") return invalid ? prefix + node.value : "(";
			if (node.type === "close") return invalid ? prefix + node.value : ")";
			if (node.type === "comma") return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
			if (node.value) return node.value;
			if (node.nodes && node.ranges > 0) {
				const args = utils.reduce(node.nodes);
				const range = fill(...args, {
					...options,
					wrap: false,
					toRegex: true,
					strictZeros: true
				});
				if (range.length !== 0) return args.length > 1 && range.length > 1 ? `(${range})` : range;
			}
			if (node.nodes) for (const child of node.nodes) output += walk(child, node);
			return output;
		};
		return walk(ast);
	};
	module.exports = compile;
}));
//#endregion
//#region node_modules/braces/lib/expand.js
var require_expand = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const fill = require_fill_range();
	const stringify = require_stringify();
	const utils = require_utils$3();
	const append = (queue = "", stash = "", enclose = false) => {
		const result = [];
		queue = [].concat(queue);
		stash = [].concat(stash);
		if (!stash.length) return queue;
		if (!queue.length) return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash;
		for (const item of queue) if (Array.isArray(item)) for (const value of item) result.push(append(value, stash, enclose));
		else for (let ele of stash) {
			if (enclose === true && typeof ele === "string") ele = `{${ele}}`;
			result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
		}
		return utils.flatten(result);
	};
	const expand = (ast, options = {}) => {
		const rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
		const walk = (node, parent = {}) => {
			node.queue = [];
			let p = parent;
			let q = parent.queue;
			while (p.type !== "brace" && p.type !== "root" && p.parent) {
				p = p.parent;
				q = p.queue;
			}
			if (node.invalid || node.dollar) {
				q.push(append(q.pop(), stringify(node, options)));
				return;
			}
			if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
				q.push(append(q.pop(), ["{}"]));
				return;
			}
			if (node.nodes && node.ranges > 0) {
				const args = utils.reduce(node.nodes);
				if (utils.exceedsLimit(...args, options.step, rangeLimit)) throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
				let range = fill(...args, options);
				if (range.length === 0) range = stringify(node, options);
				q.push(append(q.pop(), range));
				node.nodes = [];
				return;
			}
			const enclose = utils.encloseBrace(node);
			let queue = node.queue;
			let block = node;
			while (block.type !== "brace" && block.type !== "root" && block.parent) {
				block = block.parent;
				queue = block.queue;
			}
			for (let i = 0; i < node.nodes.length; i++) {
				const child = node.nodes[i];
				if (child.type === "comma" && node.type === "brace") {
					if (i === 1) queue.push("");
					queue.push("");
					continue;
				}
				if (child.type === "close") {
					q.push(append(q.pop(), queue, enclose));
					continue;
				}
				if (child.value && child.type !== "open") {
					queue.push(append(queue.pop(), child.value));
					continue;
				}
				if (child.nodes) walk(child, node);
			}
			return queue;
		};
		return utils.flatten(walk(ast));
	};
	module.exports = expand;
}));
//#endregion
//#region node_modules/braces/lib/constants.js
var require_constants$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		MAX_LENGTH: 1e4,
		CHAR_0: "0",
		CHAR_9: "9",
		CHAR_UPPERCASE_A: "A",
		CHAR_LOWERCASE_A: "a",
		CHAR_UPPERCASE_Z: "Z",
		CHAR_LOWERCASE_Z: "z",
		CHAR_LEFT_PARENTHESES: "(",
		CHAR_RIGHT_PARENTHESES: ")",
		CHAR_ASTERISK: "*",
		CHAR_AMPERSAND: "&",
		CHAR_AT: "@",
		CHAR_BACKSLASH: "\\",
		CHAR_BACKTICK: "`",
		CHAR_CARRIAGE_RETURN: "\r",
		CHAR_CIRCUMFLEX_ACCENT: "^",
		CHAR_COLON: ":",
		CHAR_COMMA: ",",
		CHAR_DOLLAR: "$",
		CHAR_DOT: ".",
		CHAR_DOUBLE_QUOTE: "\"",
		CHAR_EQUAL: "=",
		CHAR_EXCLAMATION_MARK: "!",
		CHAR_FORM_FEED: "\f",
		CHAR_FORWARD_SLASH: "/",
		CHAR_HASH: "#",
		CHAR_HYPHEN_MINUS: "-",
		CHAR_LEFT_ANGLE_BRACKET: "<",
		CHAR_LEFT_CURLY_BRACE: "{",
		CHAR_LEFT_SQUARE_BRACKET: "[",
		CHAR_LINE_FEED: "\n",
		CHAR_NO_BREAK_SPACE: "\xA0",
		CHAR_PERCENT: "%",
		CHAR_PLUS: "+",
		CHAR_QUESTION_MARK: "?",
		CHAR_RIGHT_ANGLE_BRACKET: ">",
		CHAR_RIGHT_CURLY_BRACE: "}",
		CHAR_RIGHT_SQUARE_BRACKET: "]",
		CHAR_SEMICOLON: ";",
		CHAR_SINGLE_QUOTE: "'",
		CHAR_SPACE: " ",
		CHAR_TAB: "	",
		CHAR_UNDERSCORE: "_",
		CHAR_VERTICAL_LINE: "|",
		CHAR_ZERO_WIDTH_NOBREAK_SPACE: "﻿"
	};
}));
//#endregion
//#region node_modules/braces/lib/parse.js
var require_parse$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const stringify = require_stringify();
	/**
	* Constants
	*/
	const { MAX_LENGTH, CHAR_BACKSLASH, CHAR_BACKTICK, CHAR_COMMA, CHAR_DOT, CHAR_LEFT_PARENTHESES, CHAR_RIGHT_PARENTHESES, CHAR_LEFT_CURLY_BRACE, CHAR_RIGHT_CURLY_BRACE, CHAR_LEFT_SQUARE_BRACKET, CHAR_RIGHT_SQUARE_BRACKET, CHAR_DOUBLE_QUOTE, CHAR_SINGLE_QUOTE, CHAR_NO_BREAK_SPACE, CHAR_ZERO_WIDTH_NOBREAK_SPACE } = require_constants$2();
	/**
	* parse
	*/
	const parse = (input, options = {}) => {
		if (typeof input !== "string") throw new TypeError("Expected a string");
		const opts = options || {};
		const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
		if (input.length > max) throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
		const ast = {
			type: "root",
			input,
			nodes: []
		};
		const stack = [ast];
		let block = ast;
		let prev = ast;
		let brackets = 0;
		const length = input.length;
		let index = 0;
		let depth = 0;
		let value;
		/**
		* Helpers
		*/
		const advance = () => input[index++];
		const push = (node) => {
			if (node.type === "text" && prev.type === "dot") prev.type = "text";
			if (prev && prev.type === "text" && node.type === "text") {
				prev.value += node.value;
				return;
			}
			block.nodes.push(node);
			node.parent = block;
			node.prev = prev;
			prev = node;
			return node;
		};
		push({ type: "bos" });
		while (index < length) {
			block = stack[stack.length - 1];
			value = advance();
			/**
			* Invalid chars
			*/
			if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) continue;
			/**
			* Escaped chars
			*/
			if (value === CHAR_BACKSLASH) {
				push({
					type: "text",
					value: (options.keepEscaping ? value : "") + advance()
				});
				continue;
			}
			/**
			* Right square bracket (literal): ']'
			*/
			if (value === CHAR_RIGHT_SQUARE_BRACKET) {
				push({
					type: "text",
					value: "\\" + value
				});
				continue;
			}
			/**
			* Left square bracket: '['
			*/
			if (value === CHAR_LEFT_SQUARE_BRACKET) {
				brackets++;
				let next;
				while (index < length && (next = advance())) {
					value += next;
					if (next === CHAR_LEFT_SQUARE_BRACKET) {
						brackets++;
						continue;
					}
					if (next === CHAR_BACKSLASH) {
						value += advance();
						continue;
					}
					if (next === CHAR_RIGHT_SQUARE_BRACKET) {
						brackets--;
						if (brackets === 0) break;
					}
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Parentheses
			*/
			if (value === CHAR_LEFT_PARENTHESES) {
				block = push({
					type: "paren",
					nodes: []
				});
				stack.push(block);
				push({
					type: "text",
					value
				});
				continue;
			}
			if (value === CHAR_RIGHT_PARENTHESES) {
				if (block.type !== "paren") {
					push({
						type: "text",
						value
					});
					continue;
				}
				block = stack.pop();
				push({
					type: "text",
					value
				});
				block = stack[stack.length - 1];
				continue;
			}
			/**
			* Quotes: '|"|`
			*/
			if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
				const open = value;
				let next;
				if (options.keepQuotes !== true) value = "";
				while (index < length && (next = advance())) {
					if (next === CHAR_BACKSLASH) {
						value += next + advance();
						continue;
					}
					if (next === open) {
						if (options.keepQuotes === true) value += next;
						break;
					}
					value += next;
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Left curly brace: '{'
			*/
			if (value === CHAR_LEFT_CURLY_BRACE) {
				depth++;
				block = push({
					type: "brace",
					open: true,
					close: false,
					dollar: prev.value && prev.value.slice(-1) === "$" || block.dollar === true,
					depth,
					commas: 0,
					ranges: 0,
					nodes: []
				});
				stack.push(block);
				push({
					type: "open",
					value
				});
				continue;
			}
			/**
			* Right curly brace: '}'
			*/
			if (value === CHAR_RIGHT_CURLY_BRACE) {
				if (block.type !== "brace") {
					push({
						type: "text",
						value
					});
					continue;
				}
				const type = "close";
				block = stack.pop();
				block.close = true;
				push({
					type,
					value
				});
				depth--;
				block = stack[stack.length - 1];
				continue;
			}
			/**
			* Comma: ','
			*/
			if (value === CHAR_COMMA && depth > 0) {
				if (block.ranges > 0) {
					block.ranges = 0;
					const open = block.nodes.shift();
					block.nodes = [open, {
						type: "text",
						value: stringify(block)
					}];
				}
				push({
					type: "comma",
					value
				});
				block.commas++;
				continue;
			}
			/**
			* Dot: '.'
			*/
			if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
				const siblings = block.nodes;
				if (depth === 0 || siblings.length === 0) {
					push({
						type: "text",
						value
					});
					continue;
				}
				if (prev.type === "dot") {
					block.range = [];
					prev.value += value;
					prev.type = "range";
					if (block.nodes.length !== 3 && block.nodes.length !== 5) {
						block.invalid = true;
						block.ranges = 0;
						prev.type = "text";
						continue;
					}
					block.ranges++;
					block.args = [];
					continue;
				}
				if (prev.type === "range") {
					siblings.pop();
					const before = siblings[siblings.length - 1];
					before.value += prev.value + value;
					prev = before;
					block.ranges--;
					continue;
				}
				push({
					type: "dot",
					value
				});
				continue;
			}
			/**
			* Text
			*/
			push({
				type: "text",
				value
			});
		}
		do {
			block = stack.pop();
			if (block.type !== "root") {
				block.nodes.forEach((node) => {
					if (!node.nodes) {
						if (node.type === "open") node.isOpen = true;
						if (node.type === "close") node.isClose = true;
						if (!node.nodes) node.type = "text";
						node.invalid = true;
					}
				});
				const parent = stack[stack.length - 1];
				const index = parent.nodes.indexOf(block);
				parent.nodes.splice(index, 1, ...block.nodes);
			}
		} while (stack.length > 0);
		push({ type: "eos" });
		return ast;
	};
	module.exports = parse;
}));
//#endregion
//#region node_modules/braces/index.js
var require_braces = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const stringify = require_stringify();
	const compile = require_compile();
	const expand = require_expand();
	const parse = require_parse$1();
	/**
	* Expand the given pattern or create a regex-compatible string.
	*
	* ```js
	* const braces = require('braces');
	* console.log(braces('{a,b,c}', { compile: true })); //=> ['(a|b|c)']
	* console.log(braces('{a,b,c}')); //=> ['a', 'b', 'c']
	* ```
	* @param {String} `str`
	* @param {Object} `options`
	* @return {String}
	* @api public
	*/
	const braces = (input, options = {}) => {
		let output = [];
		if (Array.isArray(input)) for (const pattern of input) {
			const result = braces.create(pattern, options);
			if (Array.isArray(result)) output.push(...result);
			else output.push(result);
		}
		else output = [].concat(braces.create(input, options));
		if (options && options.expand === true && options.nodupes === true) output = [...new Set(output)];
		return output;
	};
	/**
	* Parse the given `str` with the given `options`.
	*
	* ```js
	* // braces.parse(pattern, [, options]);
	* const ast = braces.parse('a/{b,c}/d');
	* console.log(ast);
	* ```
	* @param {String} pattern Brace pattern to parse
	* @param {Object} options
	* @return {Object} Returns an AST
	* @api public
	*/
	braces.parse = (input, options = {}) => parse(input, options);
	/**
	* Creates a braces string from an AST, or an AST node.
	*
	* ```js
	* const braces = require('braces');
	* let ast = braces.parse('foo/{a,b}/bar');
	* console.log(stringify(ast.nodes[2])); //=> '{a,b}'
	* ```
	* @param {String} `input` Brace pattern or AST.
	* @param {Object} `options`
	* @return {Array} Returns an array of expanded values.
	* @api public
	*/
	braces.stringify = (input, options = {}) => {
		if (typeof input === "string") return stringify(braces.parse(input, options), options);
		return stringify(input, options);
	};
	/**
	* Compiles a brace pattern into a regex-compatible, optimized string.
	* This method is called by the main [braces](#braces) function by default.
	*
	* ```js
	* const braces = require('braces');
	* console.log(braces.compile('a/{b,c}/d'));
	* //=> ['a/(b|c)/d']
	* ```
	* @param {String} `input` Brace pattern or AST.
	* @param {Object} `options`
	* @return {Array} Returns an array of expanded values.
	* @api public
	*/
	braces.compile = (input, options = {}) => {
		if (typeof input === "string") input = braces.parse(input, options);
		return compile(input, options);
	};
	/**
	* Expands a brace pattern into an array. This method is called by the
	* main [braces](#braces) function when `options.expand` is true. Before
	* using this method it's recommended that you read the [performance notes](#performance))
	* and advantages of using [.compile](#compile) instead.
	*
	* ```js
	* const braces = require('braces');
	* console.log(braces.expand('a/{b,c}/d'));
	* //=> ['a/b/d', 'a/c/d'];
	* ```
	* @param {String} `pattern` Brace pattern
	* @param {Object} `options`
	* @return {Array} Returns an array of expanded values.
	* @api public
	*/
	braces.expand = (input, options = {}) => {
		if (typeof input === "string") input = braces.parse(input, options);
		let result = expand(input, options);
		if (options.noempty === true) result = result.filter(Boolean);
		if (options.nodupes === true) result = [...new Set(result)];
		return result;
	};
	/**
	* Processes a brace pattern and returns either an expanded array
	* (if `options.expand` is true), a highly optimized regex-compatible string.
	* This method is called by the main [braces](#braces) function.
	*
	* ```js
	* const braces = require('braces');
	* console.log(braces.create('user-{200..300}/project-{a,b,c}-{1..10}'))
	* //=> 'user-(20[0-9]|2[1-9][0-9]|300)/project-(a|b|c)-([1-9]|10)'
	* ```
	* @param {String} `pattern` Brace pattern
	* @param {Object} `options`
	* @return {Array} Returns an array of expanded values.
	* @api public
	*/
	braces.create = (input, options = {}) => {
		if (input === "" || input.length < 3) return [input];
		return options.expand !== true ? braces.compile(input, options) : braces.expand(input, options);
	};
	/**
	* Expose "braces"
	*/
	module.exports = braces;
}));
//#endregion
//#region node_modules/picomatch/lib/constants.js
var require_constants$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const path = require_path$1();
	const WIN_SLASH = "\\\\/";
	const WIN_NO_SLASH = `[^${WIN_SLASH}]`;
	const DEFAULT_MAX_EXTGLOB_RECURSION = 0;
	/**
	* Posix glob regex
	*/
	const DOT_LITERAL = "\\.";
	const PLUS_LITERAL = "\\+";
	const QMARK_LITERAL = "\\?";
	const SLASH_LITERAL = "\\/";
	const ONE_CHAR = "(?=.)";
	const QMARK = "[^/]";
	const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
	const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
	const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
	const POSIX_CHARS = {
		DOT_LITERAL,
		PLUS_LITERAL,
		QMARK_LITERAL,
		SLASH_LITERAL,
		ONE_CHAR,
		QMARK,
		END_ANCHOR,
		DOTS_SLASH,
		NO_DOT: `(?!${DOT_LITERAL})`,
		NO_DOTS: `(?!${START_ANCHOR}${DOTS_SLASH})`,
		NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`,
		NO_DOTS_SLASH: `(?!${DOTS_SLASH})`,
		QMARK_NO_DOT: `[^.${SLASH_LITERAL}]`,
		STAR: `${QMARK}*?`,
		START_ANCHOR
	};
	/**
	* Windows glob regex
	*/
	const WINDOWS_CHARS = {
		...POSIX_CHARS,
		SLASH_LITERAL: `[${WIN_SLASH}]`,
		QMARK: WIN_NO_SLASH,
		STAR: `${WIN_NO_SLASH}*?`,
		DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
		NO_DOT: `(?!${DOT_LITERAL})`,
		NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
		NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
		NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
		QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
		START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
		END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
	};
	module.exports = {
		DEFAULT_MAX_EXTGLOB_RECURSION,
		MAX_LENGTH: 65536,
		POSIX_REGEX_SOURCE: {
			__proto__: null,
			alnum: "a-zA-Z0-9",
			alpha: "a-zA-Z",
			ascii: "\\x00-\\x7F",
			blank: " \\t",
			cntrl: "\\x00-\\x1F\\x7F",
			digit: "0-9",
			graph: "\\x21-\\x7E",
			lower: "a-z",
			print: "\\x20-\\x7E ",
			punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
			space: " \\t\\r\\n\\v\\f",
			upper: "A-Z",
			word: "A-Za-z0-9_",
			xdigit: "A-Fa-f0-9"
		},
		REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
		REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
		REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
		REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
		REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
		REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
		REPLACEMENTS: {
			__proto__: null,
			"***": "*",
			"**/**": "**",
			"**/**/**": "**"
		},
		CHAR_0: 48,
		CHAR_9: 57,
		CHAR_UPPERCASE_A: 65,
		CHAR_LOWERCASE_A: 97,
		CHAR_UPPERCASE_Z: 90,
		CHAR_LOWERCASE_Z: 122,
		CHAR_LEFT_PARENTHESES: 40,
		CHAR_RIGHT_PARENTHESES: 41,
		CHAR_ASTERISK: 42,
		CHAR_AMPERSAND: 38,
		CHAR_AT: 64,
		CHAR_BACKWARD_SLASH: 92,
		CHAR_CARRIAGE_RETURN: 13,
		CHAR_CIRCUMFLEX_ACCENT: 94,
		CHAR_COLON: 58,
		CHAR_COMMA: 44,
		CHAR_DOT: 46,
		CHAR_DOUBLE_QUOTE: 34,
		CHAR_EQUAL: 61,
		CHAR_EXCLAMATION_MARK: 33,
		CHAR_FORM_FEED: 12,
		CHAR_FORWARD_SLASH: 47,
		CHAR_GRAVE_ACCENT: 96,
		CHAR_HASH: 35,
		CHAR_HYPHEN_MINUS: 45,
		CHAR_LEFT_ANGLE_BRACKET: 60,
		CHAR_LEFT_CURLY_BRACE: 123,
		CHAR_LEFT_SQUARE_BRACKET: 91,
		CHAR_LINE_FEED: 10,
		CHAR_NO_BREAK_SPACE: 160,
		CHAR_PERCENT: 37,
		CHAR_PLUS: 43,
		CHAR_QUESTION_MARK: 63,
		CHAR_RIGHT_ANGLE_BRACKET: 62,
		CHAR_RIGHT_CURLY_BRACE: 125,
		CHAR_RIGHT_SQUARE_BRACKET: 93,
		CHAR_SEMICOLON: 59,
		CHAR_SINGLE_QUOTE: 39,
		CHAR_SPACE: 32,
		CHAR_TAB: 9,
		CHAR_UNDERSCORE: 95,
		CHAR_VERTICAL_LINE: 124,
		CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
		SEP: path.sep,
		/**
		* Create EXTGLOB_CHARS
		*/
		extglobChars(chars) {
			return {
				"!": {
					type: "negate",
					open: "(?:(?!(?:",
					close: `))${chars.STAR})`
				},
				"?": {
					type: "qmark",
					open: "(?:",
					close: ")?"
				},
				"+": {
					type: "plus",
					open: "(?:",
					close: ")+"
				},
				"*": {
					type: "star",
					open: "(?:",
					close: ")*"
				},
				"@": {
					type: "at",
					open: "(?:",
					close: ")"
				}
			};
		},
		/**
		* Create GLOB_CHARS
		*/
		globChars(win32) {
			return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
		}
	};
}));
//#endregion
//#region node_modules/picomatch/lib/utils.js
var require_utils$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	const path = require_path$1();
	const win32 = process.platform === "win32";
	const { REGEX_BACKSLASH, REGEX_REMOVE_BACKSLASH, REGEX_SPECIAL_CHARS, REGEX_SPECIAL_CHARS_GLOBAL } = require_constants$1();
	exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
	exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
	exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
	exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
	exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
	exports.removeBackslashes = (str) => {
		return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
			return match === "\\" ? "" : match;
		});
	};
	exports.supportsLookbehinds = () => {
		const segs = process.version.slice(1).split(".").map(Number);
		if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) return true;
		return false;
	};
	exports.isWindows = (options) => {
		if (options && typeof options.windows === "boolean") return options.windows;
		return win32 === true || path.sep === "\\";
	};
	exports.escapeLast = (input, char, lastIdx) => {
		const idx = input.lastIndexOf(char, lastIdx);
		if (idx === -1) return input;
		if (input[idx - 1] === "\\") return exports.escapeLast(input, char, idx - 1);
		return `${input.slice(0, idx)}\\${input.slice(idx)}`;
	};
	exports.removePrefix = (input, state = {}) => {
		let output = input;
		if (output.startsWith("./")) {
			output = output.slice(2);
			state.prefix = "./";
		}
		return output;
	};
	exports.wrapOutput = (input, state = {}, options = {}) => {
		let output = `${options.contains ? "" : "^"}(?:${input})${options.contains ? "" : "$"}`;
		if (state.negated === true) output = `(?:^(?!${output}).*$)`;
		return output;
	};
}));
//#endregion
//#region node_modules/picomatch/lib/scan.js
var require_scan = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const utils = require_utils$2();
	const { CHAR_ASTERISK, CHAR_AT, CHAR_BACKWARD_SLASH, CHAR_COMMA, CHAR_DOT, CHAR_EXCLAMATION_MARK, CHAR_FORWARD_SLASH, CHAR_LEFT_CURLY_BRACE, CHAR_LEFT_PARENTHESES, CHAR_LEFT_SQUARE_BRACKET, CHAR_PLUS, CHAR_QUESTION_MARK, CHAR_RIGHT_CURLY_BRACE, CHAR_RIGHT_PARENTHESES, CHAR_RIGHT_SQUARE_BRACKET } = require_constants$1();
	const isPathSeparator = (code) => {
		return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
	};
	const depth = (token) => {
		if (token.isPrefix !== true) token.depth = token.isGlobstar ? Infinity : 1;
	};
	/**
	* Quickly scans a glob pattern and returns an object with a handful of
	* useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
	* `glob` (the actual pattern), `negated` (true if the path starts with `!` but not
	* with `!(`) and `negatedExtglob` (true if the path starts with `!(`).
	*
	* ```js
	* const pm = require('picomatch');
	* console.log(pm.scan('foo/bar/*.js'));
	* { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
	* ```
	* @param {String} `str`
	* @param {Object} `options`
	* @return {Object} Returns an object with tokens and regex source string.
	* @api public
	*/
	const scan = (input, options) => {
		const opts = options || {};
		const length = input.length - 1;
		const scanToEnd = opts.parts === true || opts.scanToEnd === true;
		const slashes = [];
		const tokens = [];
		const parts = [];
		let str = input;
		let index = -1;
		let start = 0;
		let lastIndex = 0;
		let isBrace = false;
		let isBracket = false;
		let isGlob = false;
		let isExtglob = false;
		let isGlobstar = false;
		let braceEscaped = false;
		let backslashes = false;
		let negated = false;
		let negatedExtglob = false;
		let finished = false;
		let braces = 0;
		let prev;
		let code;
		let token = {
			value: "",
			depth: 0,
			isGlob: false
		};
		const eos = () => index >= length;
		const peek = () => str.charCodeAt(index + 1);
		const advance = () => {
			prev = code;
			return str.charCodeAt(++index);
		};
		while (index < length) {
			code = advance();
			let next;
			if (code === CHAR_BACKWARD_SLASH) {
				backslashes = token.backslashes = true;
				code = advance();
				if (code === CHAR_LEFT_CURLY_BRACE) braceEscaped = true;
				continue;
			}
			if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
				braces++;
				while (eos() !== true && (code = advance())) {
					if (code === CHAR_BACKWARD_SLASH) {
						backslashes = token.backslashes = true;
						advance();
						continue;
					}
					if (code === CHAR_LEFT_CURLY_BRACE) {
						braces++;
						continue;
					}
					if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
						isBrace = token.isBrace = true;
						isGlob = token.isGlob = true;
						finished = true;
						if (scanToEnd === true) continue;
						break;
					}
					if (braceEscaped !== true && code === CHAR_COMMA) {
						isBrace = token.isBrace = true;
						isGlob = token.isGlob = true;
						finished = true;
						if (scanToEnd === true) continue;
						break;
					}
					if (code === CHAR_RIGHT_CURLY_BRACE) {
						braces--;
						if (braces === 0) {
							braceEscaped = false;
							isBrace = token.isBrace = true;
							finished = true;
							break;
						}
					}
				}
				if (scanToEnd === true) continue;
				break;
			}
			if (code === CHAR_FORWARD_SLASH) {
				slashes.push(index);
				tokens.push(token);
				token = {
					value: "",
					depth: 0,
					isGlob: false
				};
				if (finished === true) continue;
				if (prev === CHAR_DOT && index === start + 1) {
					start += 2;
					continue;
				}
				lastIndex = index + 1;
				continue;
			}
			if (opts.noext !== true) {
				if ((code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK) === true && peek() === CHAR_LEFT_PARENTHESES) {
					isGlob = token.isGlob = true;
					isExtglob = token.isExtglob = true;
					finished = true;
					if (code === CHAR_EXCLAMATION_MARK && index === start) negatedExtglob = true;
					if (scanToEnd === true) {
						while (eos() !== true && (code = advance())) {
							if (code === CHAR_BACKWARD_SLASH) {
								backslashes = token.backslashes = true;
								code = advance();
								continue;
							}
							if (code === CHAR_RIGHT_PARENTHESES) {
								isGlob = token.isGlob = true;
								finished = true;
								break;
							}
						}
						continue;
					}
					break;
				}
			}
			if (code === CHAR_ASTERISK) {
				if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
				isGlob = token.isGlob = true;
				finished = true;
				if (scanToEnd === true) continue;
				break;
			}
			if (code === CHAR_QUESTION_MARK) {
				isGlob = token.isGlob = true;
				finished = true;
				if (scanToEnd === true) continue;
				break;
			}
			if (code === CHAR_LEFT_SQUARE_BRACKET) {
				while (eos() !== true && (next = advance())) {
					if (next === CHAR_BACKWARD_SLASH) {
						backslashes = token.backslashes = true;
						advance();
						continue;
					}
					if (next === CHAR_RIGHT_SQUARE_BRACKET) {
						isBracket = token.isBracket = true;
						isGlob = token.isGlob = true;
						finished = true;
						break;
					}
				}
				if (scanToEnd === true) continue;
				break;
			}
			if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
				negated = token.negated = true;
				start++;
				continue;
			}
			if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
				isGlob = token.isGlob = true;
				if (scanToEnd === true) {
					while (eos() !== true && (code = advance())) {
						if (code === CHAR_LEFT_PARENTHESES) {
							backslashes = token.backslashes = true;
							code = advance();
							continue;
						}
						if (code === CHAR_RIGHT_PARENTHESES) {
							finished = true;
							break;
						}
					}
					continue;
				}
				break;
			}
			if (isGlob === true) {
				finished = true;
				if (scanToEnd === true) continue;
				break;
			}
		}
		if (opts.noext === true) {
			isExtglob = false;
			isGlob = false;
		}
		let base = str;
		let prefix = "";
		let glob = "";
		if (start > 0) {
			prefix = str.slice(0, start);
			str = str.slice(start);
			lastIndex -= start;
		}
		if (base && isGlob === true && lastIndex > 0) {
			base = str.slice(0, lastIndex);
			glob = str.slice(lastIndex);
		} else if (isGlob === true) {
			base = "";
			glob = str;
		} else base = str;
		if (base && base !== "" && base !== "/" && base !== str) {
			if (isPathSeparator(base.charCodeAt(base.length - 1))) base = base.slice(0, -1);
		}
		if (opts.unescape === true) {
			if (glob) glob = utils.removeBackslashes(glob);
			if (base && backslashes === true) base = utils.removeBackslashes(base);
		}
		const state = {
			prefix,
			input,
			start,
			base,
			glob,
			isBrace,
			isBracket,
			isGlob,
			isExtglob,
			isGlobstar,
			negated,
			negatedExtglob
		};
		if (opts.tokens === true) {
			state.maxDepth = 0;
			if (!isPathSeparator(code)) tokens.push(token);
			state.tokens = tokens;
		}
		if (opts.parts === true || opts.tokens === true) {
			let prevIndex;
			for (let idx = 0; idx < slashes.length; idx++) {
				const n = prevIndex ? prevIndex + 1 : start;
				const i = slashes[idx];
				const value = input.slice(n, i);
				if (opts.tokens) {
					if (idx === 0 && start !== 0) {
						tokens[idx].isPrefix = true;
						tokens[idx].value = prefix;
					} else tokens[idx].value = value;
					depth(tokens[idx]);
					state.maxDepth += tokens[idx].depth;
				}
				if (idx !== 0 || value !== "") parts.push(value);
				prevIndex = i;
			}
			if (prevIndex && prevIndex + 1 < input.length) {
				const value = input.slice(prevIndex + 1);
				parts.push(value);
				if (opts.tokens) {
					tokens[tokens.length - 1].value = value;
					depth(tokens[tokens.length - 1]);
					state.maxDepth += tokens[tokens.length - 1].depth;
				}
			}
			state.slashes = slashes;
			state.parts = parts;
		}
		return state;
	};
	module.exports = scan;
}));
//#endregion
//#region node_modules/picomatch/lib/parse.js
var require_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const constants = require_constants$1();
	const utils = require_utils$2();
	/**
	* Constants
	*/
	const { MAX_LENGTH, POSIX_REGEX_SOURCE, REGEX_NON_SPECIAL_CHARS, REGEX_SPECIAL_CHARS_BACKREF, REPLACEMENTS } = constants;
	/**
	* Helpers
	*/
	const expandRange = (args, options) => {
		if (typeof options.expandRange === "function") return options.expandRange(...args, options);
		args.sort();
		const value = `[${args.join("-")}]`;
		try {
			new RegExp(value);
		} catch (ex) {
			return args.map((v) => utils.escapeRegex(v)).join("..");
		}
		return value;
	};
	/**
	* Create the message for a syntax error
	*/
	const syntaxError = (type, char) => {
		return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
	};
	const splitTopLevel = (input) => {
		const parts = [];
		let bracket = 0;
		let paren = 0;
		let quote = 0;
		let value = "";
		let escaped = false;
		for (const ch of input) {
			if (escaped === true) {
				value += ch;
				escaped = false;
				continue;
			}
			if (ch === "\\") {
				value += ch;
				escaped = true;
				continue;
			}
			if (ch === "\"") {
				quote = quote === 1 ? 0 : 1;
				value += ch;
				continue;
			}
			if (quote === 0) {
				if (ch === "[") bracket++;
				else if (ch === "]" && bracket > 0) bracket--;
				else if (bracket === 0) {
					if (ch === "(") paren++;
					else if (ch === ")" && paren > 0) paren--;
					else if (ch === "|" && paren === 0) {
						parts.push(value);
						value = "";
						continue;
					}
				}
			}
			value += ch;
		}
		parts.push(value);
		return parts;
	};
	const isPlainBranch = (branch) => {
		let escaped = false;
		for (const ch of branch) {
			if (escaped === true) {
				escaped = false;
				continue;
			}
			if (ch === "\\") {
				escaped = true;
				continue;
			}
			if (/[?*+@!()[\]{}]/.test(ch)) return false;
		}
		return true;
	};
	const normalizeSimpleBranch = (branch) => {
		let value = branch.trim();
		let changed = true;
		while (changed === true) {
			changed = false;
			if (/^@\([^\\()[\]{}|]+\)$/.test(value)) {
				value = value.slice(2, -1);
				changed = true;
			}
		}
		if (!isPlainBranch(value)) return;
		return value.replace(/\\(.)/g, "$1");
	};
	const hasRepeatedCharPrefixOverlap = (branches) => {
		const values = branches.map(normalizeSimpleBranch).filter(Boolean);
		for (let i = 0; i < values.length; i++) for (let j = i + 1; j < values.length; j++) {
			const a = values[i];
			const b = values[j];
			const char = a[0];
			if (!char || a !== char.repeat(a.length) || b !== char.repeat(b.length)) continue;
			if (a === b || a.startsWith(b) || b.startsWith(a)) return true;
		}
		return false;
	};
	const parseRepeatedExtglob = (pattern, requireEnd = true) => {
		if (pattern[0] !== "+" && pattern[0] !== "*" || pattern[1] !== "(") return;
		let bracket = 0;
		let paren = 0;
		let quote = 0;
		let escaped = false;
		for (let i = 1; i < pattern.length; i++) {
			const ch = pattern[i];
			if (escaped === true) {
				escaped = false;
				continue;
			}
			if (ch === "\\") {
				escaped = true;
				continue;
			}
			if (ch === "\"") {
				quote = quote === 1 ? 0 : 1;
				continue;
			}
			if (quote === 1) continue;
			if (ch === "[") {
				bracket++;
				continue;
			}
			if (ch === "]" && bracket > 0) {
				bracket--;
				continue;
			}
			if (bracket > 0) continue;
			if (ch === "(") {
				paren++;
				continue;
			}
			if (ch === ")") {
				paren--;
				if (paren === 0) {
					if (requireEnd === true && i !== pattern.length - 1) return;
					return {
						type: pattern[0],
						body: pattern.slice(2, i),
						end: i
					};
				}
			}
		}
	};
	const getStarExtglobSequenceOutput = (pattern) => {
		let index = 0;
		const chars = [];
		while (index < pattern.length) {
			const match = parseRepeatedExtglob(pattern.slice(index), false);
			if (!match || match.type !== "*") return;
			const branches = splitTopLevel(match.body).map((branch) => branch.trim());
			if (branches.length !== 1) return;
			const branch = normalizeSimpleBranch(branches[0]);
			if (!branch || branch.length !== 1) return;
			chars.push(branch);
			index += match.end + 1;
		}
		if (chars.length < 1) return;
		return `${chars.length === 1 ? utils.escapeRegex(chars[0]) : `[${chars.map((ch) => utils.escapeRegex(ch)).join("")}]`}*`;
	};
	const repeatedExtglobRecursion = (pattern) => {
		let depth = 0;
		let value = pattern.trim();
		let match = parseRepeatedExtglob(value);
		while (match) {
			depth++;
			value = match.body.trim();
			match = parseRepeatedExtglob(value);
		}
		return depth;
	};
	const analyzeRepeatedExtglob = (body, options) => {
		if (options.maxExtglobRecursion === false) return { risky: false };
		const max = typeof options.maxExtglobRecursion === "number" ? options.maxExtglobRecursion : constants.DEFAULT_MAX_EXTGLOB_RECURSION;
		const branches = splitTopLevel(body).map((branch) => branch.trim());
		if (branches.length > 1) {
			if (branches.some((branch) => branch === "") || branches.some((branch) => /^[*?]+$/.test(branch)) || hasRepeatedCharPrefixOverlap(branches)) return { risky: true };
		}
		for (const branch of branches) {
			const safeOutput = getStarExtglobSequenceOutput(branch);
			if (safeOutput) return {
				risky: true,
				safeOutput
			};
			if (repeatedExtglobRecursion(branch) > max) return { risky: true };
		}
		return { risky: false };
	};
	/**
	* Parse the given input string.
	* @param {String} input
	* @param {Object} options
	* @return {Object}
	*/
	const parse = (input, options) => {
		if (typeof input !== "string") throw new TypeError("Expected a string");
		input = REPLACEMENTS[input] || input;
		const opts = { ...options };
		const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
		let len = input.length;
		if (len > max) throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
		const bos = {
			type: "bos",
			value: "",
			output: opts.prepend || ""
		};
		const tokens = [bos];
		const capture = opts.capture ? "" : "?:";
		const win32 = utils.isWindows(options);
		const PLATFORM_CHARS = constants.globChars(win32);
		const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
		const { DOT_LITERAL, PLUS_LITERAL, SLASH_LITERAL, ONE_CHAR, DOTS_SLASH, NO_DOT, NO_DOT_SLASH, NO_DOTS_SLASH, QMARK, QMARK_NO_DOT, STAR, START_ANCHOR } = PLATFORM_CHARS;
		const globstar = (opts) => {
			return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
		};
		const nodot = opts.dot ? "" : NO_DOT;
		const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
		let star = opts.bash === true ? globstar(opts) : STAR;
		if (opts.capture) star = `(${star})`;
		if (typeof opts.noext === "boolean") opts.noextglob = opts.noext;
		const state = {
			input,
			index: -1,
			start: 0,
			dot: opts.dot === true,
			consumed: "",
			output: "",
			prefix: "",
			backtrack: false,
			negated: false,
			brackets: 0,
			braces: 0,
			parens: 0,
			quotes: 0,
			globstar: false,
			tokens
		};
		input = utils.removePrefix(input, state);
		len = input.length;
		const extglobs = [];
		const braces = [];
		const stack = [];
		let prev = bos;
		let value;
		/**
		* Tokenizing helpers
		*/
		const eos = () => state.index === len - 1;
		const peek = state.peek = (n = 1) => input[state.index + n];
		const advance = state.advance = () => input[++state.index] || "";
		const remaining = () => input.slice(state.index + 1);
		const consume = (value = "", num = 0) => {
			state.consumed += value;
			state.index += num;
		};
		const append = (token) => {
			state.output += token.output != null ? token.output : token.value;
			consume(token.value);
		};
		const negate = () => {
			let count = 1;
			while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
				advance();
				state.start++;
				count++;
			}
			if (count % 2 === 0) return false;
			state.negated = true;
			state.start++;
			return true;
		};
		const increment = (type) => {
			state[type]++;
			stack.push(type);
		};
		const decrement = (type) => {
			state[type]--;
			stack.pop();
		};
		/**
		* Push tokens onto the tokens array. This helper speeds up
		* tokenizing by 1) helping us avoid backtracking as much as possible,
		* and 2) helping us avoid creating extra tokens when consecutive
		* characters are plain text. This improves performance and simplifies
		* lookbehinds.
		*/
		const push = (tok) => {
			if (prev.type === "globstar") {
				const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
				const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
				if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
					state.output = state.output.slice(0, -prev.output.length);
					prev.type = "star";
					prev.value = "*";
					prev.output = star;
					state.output += prev.output;
				}
			}
			if (extglobs.length && tok.type !== "paren") extglobs[extglobs.length - 1].inner += tok.value;
			if (tok.value || tok.output) append(tok);
			if (prev && prev.type === "text" && tok.type === "text") {
				prev.value += tok.value;
				prev.output = (prev.output || "") + tok.value;
				return;
			}
			tok.prev = prev;
			tokens.push(tok);
			prev = tok;
		};
		const extglobOpen = (type, value) => {
			const token = {
				...EXTGLOB_CHARS[value],
				conditions: 1,
				inner: ""
			};
			token.prev = prev;
			token.parens = state.parens;
			token.output = state.output;
			token.startIndex = state.index;
			token.tokensIndex = tokens.length;
			const output = (opts.capture ? "(" : "") + token.open;
			increment("parens");
			push({
				type,
				value,
				output: state.output ? "" : ONE_CHAR
			});
			push({
				type: "paren",
				extglob: true,
				value: advance(),
				output
			});
			extglobs.push(token);
		};
		const extglobClose = (token) => {
			const literal = input.slice(token.startIndex, state.index + 1);
			const body = input.slice(token.startIndex + 2, state.index);
			const analysis = analyzeRepeatedExtglob(body, opts);
			if ((token.type === "plus" || token.type === "star") && analysis.risky) {
				const safeOutput = analysis.safeOutput ? (token.output ? "" : ONE_CHAR) + (opts.capture ? `(${analysis.safeOutput})` : analysis.safeOutput) : void 0;
				const open = tokens[token.tokensIndex];
				open.type = "text";
				open.value = literal;
				open.output = safeOutput || utils.escapeRegex(literal);
				for (let i = token.tokensIndex + 1; i < tokens.length; i++) {
					tokens[i].value = "";
					tokens[i].output = "";
					delete tokens[i].suffix;
				}
				state.output = token.output + open.output;
				state.backtrack = true;
				push({
					type: "paren",
					extglob: true,
					value,
					output: ""
				});
				decrement("parens");
				return;
			}
			let output = token.close + (opts.capture ? ")" : "");
			let rest;
			if (token.type === "negate") {
				let extglobStar = star;
				if (token.inner && token.inner.length > 1 && token.inner.includes("/")) extglobStar = globstar(opts);
				if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) output = token.close = `)$))${extglobStar}`;
				if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) output = token.close = `)${parse(rest, {
					...options,
					fastpaths: false
				}).output})${extglobStar})`;
				if (token.prev.type === "bos") state.negatedExtglob = true;
			}
			push({
				type: "paren",
				extglob: true,
				value,
				output
			});
			decrement("parens");
		};
		/**
		* Fast paths
		*/
		if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
			let backslashes = false;
			let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
				if (first === "\\") {
					backslashes = true;
					return m;
				}
				if (first === "?") {
					if (esc) return esc + first + (rest ? QMARK.repeat(rest.length) : "");
					if (index === 0) return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
					return QMARK.repeat(chars.length);
				}
				if (first === ".") return DOT_LITERAL.repeat(chars.length);
				if (first === "*") {
					if (esc) return esc + first + (rest ? star : "");
					return star;
				}
				return esc ? m : `\\${m}`;
			});
			if (backslashes === true) {
				if (opts.unescape === true) output = output.replace(/\\/g, "");
				else output = output.replace(/\\+/g, (m) => {
					return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
				});
			}
			if (output === input && opts.contains === true) {
				state.output = input;
				return state;
			}
			state.output = utils.wrapOutput(output, state, options);
			return state;
		}
		/**
		* Tokenize input until we reach end-of-string
		*/
		while (!eos()) {
			value = advance();
			if (value === "\0") continue;
			/**
			* Escaped characters
			*/
			if (value === "\\") {
				const next = peek();
				if (next === "/" && opts.bash !== true) continue;
				if (next === "." || next === ";") continue;
				if (!next) {
					value += "\\";
					push({
						type: "text",
						value
					});
					continue;
				}
				const match = /^\\+/.exec(remaining());
				let slashes = 0;
				if (match && match[0].length > 2) {
					slashes = match[0].length;
					state.index += slashes;
					if (slashes % 2 !== 0) value += "\\";
				}
				if (opts.unescape === true) value = advance();
				else value += advance();
				if (state.brackets === 0) {
					push({
						type: "text",
						value
					});
					continue;
				}
			}
			/**
			* If we're inside a regex character class, continue
			* until we reach the closing bracket.
			*/
			if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
				if (opts.posix !== false && value === ":") {
					const inner = prev.value.slice(1);
					if (inner.includes("[")) {
						prev.posix = true;
						if (inner.includes(":")) {
							const idx = prev.value.lastIndexOf("[");
							const pre = prev.value.slice(0, idx);
							const rest = prev.value.slice(idx + 2);
							const posix = POSIX_REGEX_SOURCE[rest];
							if (posix) {
								prev.value = pre + posix;
								state.backtrack = true;
								advance();
								if (!bos.output && tokens.indexOf(prev) === 1) bos.output = ONE_CHAR;
								continue;
							}
						}
					}
				}
				if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") value = `\\${value}`;
				if (value === "]" && (prev.value === "[" || prev.value === "[^")) value = `\\${value}`;
				if (opts.posix === true && value === "!" && prev.value === "[") value = "^";
				prev.value += value;
				append({ value });
				continue;
			}
			/**
			* If we're inside a quoted string, continue
			* until we reach the closing double quote.
			*/
			if (state.quotes === 1 && value !== "\"") {
				value = utils.escapeRegex(value);
				prev.value += value;
				append({ value });
				continue;
			}
			/**
			* Double quotes
			*/
			if (value === "\"") {
				state.quotes = state.quotes === 1 ? 0 : 1;
				if (opts.keepQuotes === true) push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Parentheses
			*/
			if (value === "(") {
				increment("parens");
				push({
					type: "paren",
					value
				});
				continue;
			}
			if (value === ")") {
				if (state.parens === 0 && opts.strictBrackets === true) throw new SyntaxError(syntaxError("opening", "("));
				const extglob = extglobs[extglobs.length - 1];
				if (extglob && state.parens === extglob.parens + 1) {
					extglobClose(extglobs.pop());
					continue;
				}
				push({
					type: "paren",
					value,
					output: state.parens ? ")" : "\\)"
				});
				decrement("parens");
				continue;
			}
			/**
			* Square brackets
			*/
			if (value === "[") {
				if (opts.nobracket === true || !remaining().includes("]")) {
					if (opts.nobracket !== true && opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
					value = `\\${value}`;
				} else increment("brackets");
				push({
					type: "bracket",
					value
				});
				continue;
			}
			if (value === "]") {
				if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
					push({
						type: "text",
						value,
						output: `\\${value}`
					});
					continue;
				}
				if (state.brackets === 0) {
					if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("opening", "["));
					push({
						type: "text",
						value,
						output: `\\${value}`
					});
					continue;
				}
				decrement("brackets");
				const prevValue = prev.value.slice(1);
				if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) value = `/${value}`;
				prev.value += value;
				append({ value });
				if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) continue;
				const escaped = utils.escapeRegex(prev.value);
				state.output = state.output.slice(0, -prev.value.length);
				if (opts.literalBrackets === true) {
					state.output += escaped;
					prev.value = escaped;
					continue;
				}
				prev.value = `(${capture}${escaped}|${prev.value})`;
				state.output += prev.value;
				continue;
			}
			/**
			* Braces
			*/
			if (value === "{" && opts.nobrace !== true) {
				increment("braces");
				const open = {
					type: "brace",
					value,
					output: "(",
					outputIndex: state.output.length,
					tokensIndex: state.tokens.length
				};
				braces.push(open);
				push(open);
				continue;
			}
			if (value === "}") {
				const brace = braces[braces.length - 1];
				if (opts.nobrace === true || !brace) {
					push({
						type: "text",
						value,
						output: value
					});
					continue;
				}
				let output = ")";
				if (brace.dots === true) {
					const arr = tokens.slice();
					const range = [];
					for (let i = arr.length - 1; i >= 0; i--) {
						tokens.pop();
						if (arr[i].type === "brace") break;
						if (arr[i].type !== "dots") range.unshift(arr[i].value);
					}
					output = expandRange(range, opts);
					state.backtrack = true;
				}
				if (brace.comma !== true && brace.dots !== true) {
					const out = state.output.slice(0, brace.outputIndex);
					const toks = state.tokens.slice(brace.tokensIndex);
					brace.value = brace.output = "\\{";
					value = output = "\\}";
					state.output = out;
					for (const t of toks) state.output += t.output || t.value;
				}
				push({
					type: "brace",
					value,
					output
				});
				decrement("braces");
				braces.pop();
				continue;
			}
			/**
			* Pipes
			*/
			if (value === "|") {
				if (extglobs.length > 0) extglobs[extglobs.length - 1].conditions++;
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Commas
			*/
			if (value === ",") {
				let output = value;
				const brace = braces[braces.length - 1];
				if (brace && stack[stack.length - 1] === "braces") {
					brace.comma = true;
					output = "|";
				}
				push({
					type: "comma",
					value,
					output
				});
				continue;
			}
			/**
			* Slashes
			*/
			if (value === "/") {
				if (prev.type === "dot" && state.index === state.start + 1) {
					state.start = state.index + 1;
					state.consumed = "";
					state.output = "";
					tokens.pop();
					prev = bos;
					continue;
				}
				push({
					type: "slash",
					value,
					output: SLASH_LITERAL
				});
				continue;
			}
			/**
			* Dots
			*/
			if (value === ".") {
				if (state.braces > 0 && prev.type === "dot") {
					if (prev.value === ".") prev.output = DOT_LITERAL;
					const brace = braces[braces.length - 1];
					prev.type = "dots";
					prev.output += value;
					prev.value += value;
					brace.dots = true;
					continue;
				}
				if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
					push({
						type: "text",
						value,
						output: DOT_LITERAL
					});
					continue;
				}
				push({
					type: "dot",
					value,
					output: DOT_LITERAL
				});
				continue;
			}
			/**
			* Question marks
			*/
			if (value === "?") {
				if (!(prev && prev.value === "(") && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
					extglobOpen("qmark", value);
					continue;
				}
				if (prev && prev.type === "paren") {
					const next = peek();
					let output = value;
					if (next === "<" && !utils.supportsLookbehinds()) throw new Error("Node.js v10 or higher is required for regex lookbehinds");
					if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) output = `\\${value}`;
					push({
						type: "text",
						value,
						output
					});
					continue;
				}
				if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
					push({
						type: "qmark",
						value,
						output: QMARK_NO_DOT
					});
					continue;
				}
				push({
					type: "qmark",
					value,
					output: QMARK
				});
				continue;
			}
			/**
			* Exclamation
			*/
			if (value === "!") {
				if (opts.noextglob !== true && peek() === "(") {
					if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
						extglobOpen("negate", value);
						continue;
					}
				}
				if (opts.nonegate !== true && state.index === 0) {
					negate();
					continue;
				}
			}
			/**
			* Plus
			*/
			if (value === "+") {
				if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
					extglobOpen("plus", value);
					continue;
				}
				if (prev && prev.value === "(" || opts.regex === false) {
					push({
						type: "plus",
						value,
						output: PLUS_LITERAL
					});
					continue;
				}
				if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
					push({
						type: "plus",
						value
					});
					continue;
				}
				push({
					type: "plus",
					value: PLUS_LITERAL
				});
				continue;
			}
			/**
			* Plain text
			*/
			if (value === "@") {
				if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
					push({
						type: "at",
						extglob: true,
						value,
						output: ""
					});
					continue;
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Plain text
			*/
			if (value !== "*") {
				if (value === "$" || value === "^") value = `\\${value}`;
				const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
				if (match) {
					value += match[0];
					state.index += match[0].length;
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Stars
			*/
			if (prev && (prev.type === "globstar" || prev.star === true)) {
				prev.type = "star";
				prev.star = true;
				prev.value += value;
				prev.output = star;
				state.backtrack = true;
				state.globstar = true;
				consume(value);
				continue;
			}
			let rest = remaining();
			if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
				extglobOpen("star", value);
				continue;
			}
			if (prev.type === "star") {
				if (opts.noglobstar === true) {
					consume(value);
					continue;
				}
				const prior = prev.prev;
				const before = prior.prev;
				const isStart = prior.type === "slash" || prior.type === "bos";
				const afterStar = before && (before.type === "star" || before.type === "globstar");
				if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
					push({
						type: "star",
						value,
						output: ""
					});
					continue;
				}
				const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
				const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
				if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
					push({
						type: "star",
						value,
						output: ""
					});
					continue;
				}
				while (rest.slice(0, 3) === "/**") {
					const after = input[state.index + 4];
					if (after && after !== "/") break;
					rest = rest.slice(3);
					consume("/**", 3);
				}
				if (prior.type === "bos" && eos()) {
					prev.type = "globstar";
					prev.value += value;
					prev.output = globstar(opts);
					state.output = prev.output;
					state.globstar = true;
					consume(value);
					continue;
				}
				if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
					state.output = state.output.slice(0, -(prior.output + prev.output).length);
					prior.output = `(?:${prior.output}`;
					prev.type = "globstar";
					prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
					prev.value += value;
					state.globstar = true;
					state.output += prior.output + prev.output;
					consume(value);
					continue;
				}
				if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
					const end = rest[1] !== void 0 ? "|$" : "";
					state.output = state.output.slice(0, -(prior.output + prev.output).length);
					prior.output = `(?:${prior.output}`;
					prev.type = "globstar";
					prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
					prev.value += value;
					state.output += prior.output + prev.output;
					state.globstar = true;
					consume(value + advance());
					push({
						type: "slash",
						value: "/",
						output: ""
					});
					continue;
				}
				if (prior.type === "bos" && rest[0] === "/") {
					prev.type = "globstar";
					prev.value += value;
					prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
					state.output = prev.output;
					state.globstar = true;
					consume(value + advance());
					push({
						type: "slash",
						value: "/",
						output: ""
					});
					continue;
				}
				state.output = state.output.slice(0, -prev.output.length);
				prev.type = "globstar";
				prev.output = globstar(opts);
				prev.value += value;
				state.output += prev.output;
				state.globstar = true;
				consume(value);
				continue;
			}
			const token = {
				type: "star",
				value,
				output: star
			};
			if (opts.bash === true) {
				token.output = ".*?";
				if (prev.type === "bos" || prev.type === "slash") token.output = nodot + token.output;
				push(token);
				continue;
			}
			if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
				token.output = value;
				push(token);
				continue;
			}
			if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
				if (prev.type === "dot") {
					state.output += NO_DOT_SLASH;
					prev.output += NO_DOT_SLASH;
				} else if (opts.dot === true) {
					state.output += NO_DOTS_SLASH;
					prev.output += NO_DOTS_SLASH;
				} else {
					state.output += nodot;
					prev.output += nodot;
				}
				if (peek() !== "*") {
					state.output += ONE_CHAR;
					prev.output += ONE_CHAR;
				}
			}
			push(token);
		}
		while (state.brackets > 0) {
			if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
			state.output = utils.escapeLast(state.output, "[");
			decrement("brackets");
		}
		while (state.parens > 0) {
			if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
			state.output = utils.escapeLast(state.output, "(");
			decrement("parens");
		}
		while (state.braces > 0) {
			if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
			state.output = utils.escapeLast(state.output, "{");
			decrement("braces");
		}
		if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) push({
			type: "maybe_slash",
			value: "",
			output: `${SLASH_LITERAL}?`
		});
		if (state.backtrack === true) {
			state.output = "";
			for (const token of state.tokens) {
				state.output += token.output != null ? token.output : token.value;
				if (token.suffix) state.output += token.suffix;
			}
		}
		return state;
	};
	/**
	* Fast paths for creating regular expressions for common glob patterns.
	* This can significantly speed up processing and has very little downside
	* impact when none of the fast paths match.
	*/
	parse.fastpaths = (input, options) => {
		const opts = { ...options };
		const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
		const len = input.length;
		if (len > max) throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
		input = REPLACEMENTS[input] || input;
		const win32 = utils.isWindows(options);
		const { DOT_LITERAL, SLASH_LITERAL, ONE_CHAR, DOTS_SLASH, NO_DOT, NO_DOTS, NO_DOTS_SLASH, STAR, START_ANCHOR } = constants.globChars(win32);
		const nodot = opts.dot ? NO_DOTS : NO_DOT;
		const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
		const capture = opts.capture ? "" : "?:";
		const state = {
			negated: false,
			prefix: ""
		};
		let star = opts.bash === true ? ".*?" : STAR;
		if (opts.capture) star = `(${star})`;
		const globstar = (opts) => {
			if (opts.noglobstar === true) return star;
			return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
		};
		const create = (str) => {
			switch (str) {
				case "*": return `${nodot}${ONE_CHAR}${star}`;
				case ".*": return `${DOT_LITERAL}${ONE_CHAR}${star}`;
				case "*.*": return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
				case "*/*": return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
				case "**": return nodot + globstar(opts);
				case "**/*": return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
				case "**/*.*": return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
				case "**/.*": return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
				default: {
					const match = /^(.*?)\.(\w+)$/.exec(str);
					if (!match) return;
					const source = create(match[1]);
					if (!source) return;
					return source + DOT_LITERAL + match[2];
				}
			}
		};
		let source = create(utils.removePrefix(input, state));
		if (source && opts.strictSlashes !== true) source += `${SLASH_LITERAL}?`;
		return source;
	};
	module.exports = parse;
}));
//#endregion
//#region node_modules/picomatch/lib/picomatch.js
var require_picomatch$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const path = require_path$1();
	const scan = require_scan();
	const parse = require_parse();
	const utils = require_utils$2();
	const constants = require_constants$1();
	const isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
	/**
	* Creates a matcher function from one or more glob patterns. The
	* returned function takes a string to match as its first argument,
	* and returns true if the string is a match. The returned matcher
	* function also takes a boolean as the second argument that, when true,
	* returns an object with additional information.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch(glob[, options]);
	*
	* const isMatch = picomatch('*.!(*a)');
	* console.log(isMatch('a.a')); //=> false
	* console.log(isMatch('a.b')); //=> true
	* ```
	* @name picomatch
	* @param {String|Array} `globs` One or more glob patterns.
	* @param {Object=} `options`
	* @return {Function=} Returns a matcher function.
	* @api public
	*/
	const picomatch = (glob, options, returnState = false) => {
		if (Array.isArray(glob)) {
			const fns = glob.map((input) => picomatch(input, options, returnState));
			const arrayMatcher = (str) => {
				for (const isMatch of fns) {
					const state = isMatch(str);
					if (state) return state;
				}
				return false;
			};
			return arrayMatcher;
		}
		const isState = isObject(glob) && glob.tokens && glob.input;
		if (glob === "" || typeof glob !== "string" && !isState) throw new TypeError("Expected pattern to be a non-empty string");
		const opts = options || {};
		const posix = utils.isWindows(options);
		const regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, false, true);
		const state = regex.state;
		delete regex.state;
		let isIgnored = () => false;
		if (opts.ignore) {
			const ignoreOpts = {
				...options,
				ignore: null,
				onMatch: null,
				onResult: null
			};
			isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
		}
		const matcher = (input, returnObject = false) => {
			const { isMatch, match, output } = picomatch.test(input, regex, options, {
				glob,
				posix
			});
			const result = {
				glob,
				state,
				regex,
				posix,
				input,
				output,
				match,
				isMatch
			};
			if (typeof opts.onResult === "function") opts.onResult(result);
			if (isMatch === false) {
				result.isMatch = false;
				return returnObject ? result : false;
			}
			if (isIgnored(input)) {
				if (typeof opts.onIgnore === "function") opts.onIgnore(result);
				result.isMatch = false;
				return returnObject ? result : false;
			}
			if (typeof opts.onMatch === "function") opts.onMatch(result);
			return returnObject ? result : true;
		};
		if (returnState) matcher.state = state;
		return matcher;
	};
	/**
	* Test `input` with the given `regex`. This is used by the main
	* `picomatch()` function to test the input string.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.test(input, regex[, options]);
	*
	* console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
	* // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
	* ```
	* @param {String} `input` String to test.
	* @param {RegExp} `regex`
	* @return {Object} Returns an object with matching info.
	* @api public
	*/
	picomatch.test = (input, regex, options, { glob, posix } = {}) => {
		if (typeof input !== "string") throw new TypeError("Expected input to be a string");
		if (input === "") return {
			isMatch: false,
			output: ""
		};
		const opts = options || {};
		const format = opts.format || (posix ? utils.toPosixSlashes : null);
		let match = input === glob;
		let output = match && format ? format(input) : input;
		if (match === false) {
			output = format ? format(input) : input;
			match = output === glob;
		}
		if (match === false || opts.capture === true) {
			if (opts.matchBase === true || opts.basename === true) match = picomatch.matchBase(input, regex, options, posix);
			else match = regex.exec(output);
		}
		return {
			isMatch: Boolean(match),
			match,
			output
		};
	};
	/**
	* Match the basename of a filepath.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.matchBase(input, glob[, options]);
	* console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
	* ```
	* @param {String} `input` String to test.
	* @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
	* @return {Boolean}
	* @api public
	*/
	picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
		return (glob instanceof RegExp ? glob : picomatch.makeRe(glob, options)).test(path.basename(input));
	};
	/**
	* Returns true if **any** of the given glob `patterns` match the specified `string`.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.isMatch(string, patterns[, options]);
	*
	* console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
	* console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
	* ```
	* @param {String|Array} str The string to test.
	* @param {String|Array} patterns One or more glob patterns to use for matching.
	* @param {Object} [options] See available [options](#options).
	* @return {Boolean} Returns true if any patterns match `str`
	* @api public
	*/
	picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
	/**
	* Parse a glob pattern to create the source string for a regular
	* expression.
	*
	* ```js
	* const picomatch = require('picomatch');
	* const result = picomatch.parse(pattern[, options]);
	* ```
	* @param {String} `pattern`
	* @param {Object} `options`
	* @return {Object} Returns an object with useful properties and output to be used as a regex source string.
	* @api public
	*/
	picomatch.parse = (pattern, options) => {
		if (Array.isArray(pattern)) return pattern.map((p) => picomatch.parse(p, options));
		return parse(pattern, {
			...options,
			fastpaths: false
		});
	};
	/**
	* Scan a glob pattern to separate the pattern into segments.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.scan(input[, options]);
	*
	* const result = picomatch.scan('!./foo/*.js');
	* console.log(result);
	* { prefix: '!./',
	*   input: '!./foo/*.js',
	*   start: 3,
	*   base: 'foo',
	*   glob: '*.js',
	*   isBrace: false,
	*   isBracket: false,
	*   isGlob: true,
	*   isExtglob: false,
	*   isGlobstar: false,
	*   negated: true }
	* ```
	* @param {String} `input` Glob pattern to scan.
	* @param {Object} `options`
	* @return {Object} Returns an object with
	* @api public
	*/
	picomatch.scan = (input, options) => scan(input, options);
	/**
	* Compile a regular expression from the `state` object returned by the
	* [parse()](#parse) method.
	*
	* @param {Object} `state`
	* @param {Object} `options`
	* @param {Boolean} `returnOutput` Intended for implementors, this argument allows you to return the raw output from the parser.
	* @param {Boolean} `returnState` Adds the state to a `state` property on the returned regex. Useful for implementors and debugging.
	* @return {RegExp}
	* @api public
	*/
	picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
		if (returnOutput === true) return state.output;
		const opts = options || {};
		const prepend = opts.contains ? "" : "^";
		const append = opts.contains ? "" : "$";
		let source = `${prepend}(?:${state.output})${append}`;
		if (state && state.negated === true) source = `^(?!${source}).*$`;
		const regex = picomatch.toRegex(source, options);
		if (returnState === true) regex.state = state;
		return regex;
	};
	/**
	* Create a regular expression from a parsed glob pattern.
	*
	* ```js
	* const picomatch = require('picomatch');
	* const state = picomatch.parse('*.js');
	* // picomatch.compileRe(state[, options]);
	*
	* console.log(picomatch.compileRe(state));
	* //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	* ```
	* @param {String} `state` The object returned from the `.parse` method.
	* @param {Object} `options`
	* @param {Boolean} `returnOutput` Implementors may use this argument to return the compiled output, instead of a regular expression. This is not exposed on the options to prevent end-users from mutating the result.
	* @param {Boolean} `returnState` Implementors may use this argument to return the state from the parsed glob with the returned regular expression.
	* @return {RegExp} Returns a regex created from the given pattern.
	* @api public
	*/
	picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
		if (!input || typeof input !== "string") throw new TypeError("Expected a non-empty string");
		let parsed = {
			negated: false,
			fastpaths: true
		};
		if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) parsed.output = parse.fastpaths(input, options);
		if (!parsed.output) parsed = parse(input, options);
		return picomatch.compileRe(parsed, options, returnOutput, returnState);
	};
	/**
	* Create a regular expression from the given regex source string.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.toRegex(source[, options]);
	*
	* const { output } = picomatch.parse('*.js');
	* console.log(picomatch.toRegex(output));
	* //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	* ```
	* @param {String} `source` Regular expression source string.
	* @param {Object} `options`
	* @return {RegExp}
	* @api public
	*/
	picomatch.toRegex = (source, options) => {
		try {
			const opts = options || {};
			return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
		} catch (err) {
			if (options && options.debug === true) throw err;
			return /$^/;
		}
	};
	/**
	* Picomatch constants.
	* @return {Object}
	*/
	picomatch.constants = constants;
	/**
	* Expose "picomatch"
	*/
	module.exports = picomatch;
}));
//#endregion
//#region node_modules/picomatch/index.js
var require_picomatch = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_picomatch$1();
}));
//#endregion
//#region node_modules/micromatch/index.js
var require_micromatch = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const util = require_util();
	const braces = require_braces();
	const picomatch = require_picomatch();
	const utils = require_utils$2();
	const isEmptyString = (v) => v === "" || v === "./";
	const hasBraces = (v) => {
		const index = v.indexOf("{");
		return index > -1 && v.indexOf("}", index) > -1;
	};
	/**
	* Returns an array of strings that match one or more glob patterns.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm(list, patterns[, options]);
	*
	* console.log(mm(['a.js', 'a.txt'], ['*.js']));
	* //=> [ 'a.js' ]
	* ```
	* @param {String|Array<string>} `list` List of strings to match.
	* @param {String|Array<string>} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `options` See available [options](#options)
	* @return {Array} Returns an array of matches
	* @summary false
	* @api public
	*/
	const micromatch = (list, patterns, options) => {
		patterns = [].concat(patterns);
		list = [].concat(list);
		let omit = /* @__PURE__ */ new Set();
		let keep = /* @__PURE__ */ new Set();
		let items = /* @__PURE__ */ new Set();
		let negatives = 0;
		let onResult = (state) => {
			items.add(state.output);
			if (options && options.onResult) options.onResult(state);
		};
		for (let i = 0; i < patterns.length; i++) {
			let isMatch = picomatch(String(patterns[i]), {
				...options,
				onResult
			}, true);
			let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
			if (negated) negatives++;
			for (let item of list) {
				let matched = isMatch(item, true);
				if (!(negated ? !matched.isMatch : matched.isMatch)) continue;
				if (negated) omit.add(matched.output);
				else {
					omit.delete(matched.output);
					keep.add(matched.output);
				}
			}
		}
		let matches = (negatives === patterns.length ? [...items] : [...keep]).filter((item) => !omit.has(item));
		if (options && matches.length === 0) {
			if (options.failglob === true) throw new Error(`No matches found for "${patterns.join(", ")}"`);
			if (options.nonull === true || options.nullglob === true) return options.unescape ? patterns.map((p) => p.replace(/\\/g, "")) : patterns;
		}
		return matches;
	};
	/**
	* Backwards compatibility
	*/
	micromatch.match = micromatch;
	/**
	* Returns a matcher function from the given glob `pattern` and `options`.
	* The returned function takes a string to match as its only argument and returns
	* true if the string is a match.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.matcher(pattern[, options]);
	*
	* const isMatch = mm.matcher('*.!(*a)');
	* console.log(isMatch('a.a')); //=> false
	* console.log(isMatch('a.b')); //=> true
	* ```
	* @param {String} `pattern` Glob pattern
	* @param {Object} `options`
	* @return {Function} Returns a matcher function.
	* @api public
	*/
	micromatch.matcher = (pattern, options) => picomatch(pattern, options);
	/**
	* Returns true if **any** of the given glob `patterns` match the specified `string`.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.isMatch(string, patterns[, options]);
	*
	* console.log(mm.isMatch('a.a', ['b.*', '*.a'])); //=> true
	* console.log(mm.isMatch('a.a', 'b.*')); //=> false
	* ```
	* @param {String} `str` The string to test.
	* @param {String|Array} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `[options]` See available [options](#options).
	* @return {Boolean} Returns true if any patterns match `str`
	* @api public
	*/
	micromatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
	/**
	* Backwards compatibility
	*/
	micromatch.any = micromatch.isMatch;
	/**
	* Returns a list of strings that _**do not match any**_ of the given `patterns`.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.not(list, patterns[, options]);
	*
	* console.log(mm.not(['a.a', 'b.b', 'c.c'], '*.a'));
	* //=> ['b.b', 'c.c']
	* ```
	* @param {Array} `list` Array of strings to match.
	* @param {String|Array} `patterns` One or more glob pattern to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Array} Returns an array of strings that **do not match** the given patterns.
	* @api public
	*/
	micromatch.not = (list, patterns, options = {}) => {
		patterns = [].concat(patterns).map(String);
		let result = /* @__PURE__ */ new Set();
		let items = [];
		let onResult = (state) => {
			if (options.onResult) options.onResult(state);
			items.push(state.output);
		};
		let matches = new Set(micromatch(list, patterns, {
			...options,
			onResult
		}));
		for (let item of items) if (!matches.has(item)) result.add(item);
		return [...result];
	};
	/**
	* Returns true if the given `string` contains the given pattern. Similar
	* to [.isMatch](#isMatch) but the pattern can match any part of the string.
	*
	* ```js
	* var mm = require('micromatch');
	* // mm.contains(string, pattern[, options]);
	*
	* console.log(mm.contains('aa/bb/cc', '*b'));
	* //=> true
	* console.log(mm.contains('aa/bb/cc', '*d'));
	* //=> false
	* ```
	* @param {String} `str` The string to match.
	* @param {String|Array} `patterns` Glob pattern to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Boolean} Returns true if any of the patterns matches any part of `str`.
	* @api public
	*/
	micromatch.contains = (str, pattern, options) => {
		if (typeof str !== "string") throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
		if (Array.isArray(pattern)) return pattern.some((p) => micromatch.contains(str, p, options));
		if (typeof pattern === "string") {
			if (isEmptyString(str) || isEmptyString(pattern)) return false;
			if (str.includes(pattern) || str.startsWith("./") && str.slice(2).includes(pattern)) return true;
		}
		return micromatch.isMatch(str, pattern, {
			...options,
			contains: true
		});
	};
	/**
	* Filter the keys of the given object with the given `glob` pattern
	* and `options`. Does not attempt to match nested keys. If you need this feature,
	* use [glob-object][] instead.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.matchKeys(object, patterns[, options]);
	*
	* const obj = { aa: 'a', ab: 'b', ac: 'c' };
	* console.log(mm.matchKeys(obj, '*b'));
	* //=> { ab: 'b' }
	* ```
	* @param {Object} `object` The object with keys to filter.
	* @param {String|Array} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Object} Returns an object with only keys that match the given patterns.
	* @api public
	*/
	micromatch.matchKeys = (obj, patterns, options) => {
		if (!utils.isObject(obj)) throw new TypeError("Expected the first argument to be an object");
		let keys = micromatch(Object.keys(obj), patterns, options);
		let res = {};
		for (let key of keys) res[key] = obj[key];
		return res;
	};
	/**
	* Returns true if some of the strings in the given `list` match any of the given glob `patterns`.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.some(list, patterns[, options]);
	*
	* console.log(mm.some(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
	* // true
	* console.log(mm.some(['foo.js'], ['*.js', '!foo.js']));
	* // false
	* ```
	* @param {String|Array} `list` The string or array of strings to test. Returns as soon as the first match is found.
	* @param {String|Array} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Boolean} Returns true if any `patterns` matches any of the strings in `list`
	* @api public
	*/
	micromatch.some = (list, patterns, options) => {
		let items = [].concat(list);
		for (let pattern of [].concat(patterns)) {
			let isMatch = picomatch(String(pattern), options);
			if (items.some((item) => isMatch(item))) return true;
		}
		return false;
	};
	/**
	* Returns true if every string in the given `list` matches
	* any of the given glob `patterns`.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.every(list, patterns[, options]);
	*
	* console.log(mm.every('foo.js', ['foo.js']));
	* // true
	* console.log(mm.every(['foo.js', 'bar.js'], ['*.js']));
	* // true
	* console.log(mm.every(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
	* // false
	* console.log(mm.every(['foo.js'], ['*.js', '!foo.js']));
	* // false
	* ```
	* @param {String|Array} `list` The string or array of strings to test.
	* @param {String|Array} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Boolean} Returns true if all `patterns` matches all of the strings in `list`
	* @api public
	*/
	micromatch.every = (list, patterns, options) => {
		let items = [].concat(list);
		for (let pattern of [].concat(patterns)) {
			let isMatch = picomatch(String(pattern), options);
			if (!items.every((item) => isMatch(item))) return false;
		}
		return true;
	};
	/**
	* Returns true if **all** of the given `patterns` match
	* the specified string.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.all(string, patterns[, options]);
	*
	* console.log(mm.all('foo.js', ['foo.js']));
	* // true
	*
	* console.log(mm.all('foo.js', ['*.js', '!foo.js']));
	* // false
	*
	* console.log(mm.all('foo.js', ['*.js', 'foo.js']));
	* // true
	*
	* console.log(mm.all('foo.js', ['*.js', 'f*', '*o*', '*o.js']));
	* // true
	* ```
	* @param {String|Array} `str` The string to test.
	* @param {String|Array} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Boolean} Returns true if any patterns match `str`
	* @api public
	*/
	micromatch.all = (str, patterns, options) => {
		if (typeof str !== "string") throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
		return [].concat(patterns).every((p) => picomatch(p, options)(str));
	};
	/**
	* Returns an array of matches captured by `pattern` in `string, or `null` if the pattern did not match.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.capture(pattern, string[, options]);
	*
	* console.log(mm.capture('test/*.js', 'test/foo.js'));
	* //=> ['foo']
	* console.log(mm.capture('test/*.js', 'foo/bar.css'));
	* //=> null
	* ```
	* @param {String} `glob` Glob pattern to use for matching.
	* @param {String} `input` String to match
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Array|null} Returns an array of captures if the input matches the glob pattern, otherwise `null`.
	* @api public
	*/
	micromatch.capture = (glob, input, options) => {
		let posix = utils.isWindows(options);
		let match = picomatch.makeRe(String(glob), {
			...options,
			capture: true
		}).exec(posix ? utils.toPosixSlashes(input) : input);
		if (match) return match.slice(1).map((v) => v === void 0 ? "" : v);
	};
	/**
	* Create a regular expression from the given glob `pattern`.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.makeRe(pattern[, options]);
	*
	* console.log(mm.makeRe('*.js'));
	* //=> /^(?:(\.[\\\/])?(?!\.)(?=.)[^\/]*?\.js)$/
	* ```
	* @param {String} `pattern` A glob pattern to convert to regex.
	* @param {Object} `options`
	* @return {RegExp} Returns a regex created from the given pattern.
	* @api public
	*/
	micromatch.makeRe = (...args) => picomatch.makeRe(...args);
	/**
	* Scan a glob pattern to separate the pattern into segments. Used
	* by the [split](#split) method.
	*
	* ```js
	* const mm = require('micromatch');
	* const state = mm.scan(pattern[, options]);
	* ```
	* @param {String} `pattern`
	* @param {Object} `options`
	* @return {Object} Returns an object with
	* @api public
	*/
	micromatch.scan = (...args) => picomatch.scan(...args);
	/**
	* Parse a glob pattern to create the source string for a regular
	* expression.
	*
	* ```js
	* const mm = require('micromatch');
	* const state = mm.parse(pattern[, options]);
	* ```
	* @param {String} `glob`
	* @param {Object} `options`
	* @return {Object} Returns an object with useful properties and output to be used as regex source string.
	* @api public
	*/
	micromatch.parse = (patterns, options) => {
		let res = [];
		for (let pattern of [].concat(patterns || [])) for (let str of braces(String(pattern), options)) res.push(picomatch.parse(str, options));
		return res;
	};
	/**
	* Process the given brace `pattern`.
	*
	* ```js
	* const { braces } = require('micromatch');
	* console.log(braces('foo/{a,b,c}/bar'));
	* //=> [ 'foo/(a|b|c)/bar' ]
	*
	* console.log(braces('foo/{a,b,c}/bar', { expand: true }));
	* //=> [ 'foo/a/bar', 'foo/b/bar', 'foo/c/bar' ]
	* ```
	* @param {String} `pattern` String with brace pattern to process.
	* @param {Object} `options` Any [options](#options) to change how expansion is performed. See the [braces][] library for all available options.
	* @return {Array}
	* @api public
	*/
	micromatch.braces = (pattern, options) => {
		if (typeof pattern !== "string") throw new TypeError("Expected a string");
		if (options && options.nobrace === true || !hasBraces(pattern)) return [pattern];
		return braces(pattern, options);
	};
	/**
	* Expand braces
	*/
	micromatch.braceExpand = (pattern, options) => {
		if (typeof pattern !== "string") throw new TypeError("Expected a string");
		return micromatch.braces(pattern, {
			...options,
			expand: true
		});
	};
	/**
	* Expose micromatch
	*/
	micromatch.hasBraces = hasBraces;
	module.exports = micromatch;
}));
//#endregion
//#region node_modules/fast-glob/out/utils/pattern.js
var require_pattern = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isAbsolute = exports.partitionAbsoluteAndRelative = exports.removeDuplicateSlashes = exports.matchAny = exports.convertPatternsToRe = exports.makeRe = exports.getPatternParts = exports.expandBraceExpansion = exports.expandPatternsWithBraceExpansion = exports.isAffectDepthOfReadingPattern = exports.endsWithSlashGlobStar = exports.hasGlobStar = exports.getBaseDirectory = exports.isPatternRelatedToParentDirectory = exports.getPatternsOutsideCurrentDirectory = exports.getPatternsInsideCurrentDirectory = exports.getPositivePatterns = exports.getNegativePatterns = exports.isPositivePattern = exports.isNegativePattern = exports.convertToNegativePattern = exports.convertToPositivePattern = exports.isDynamicPattern = exports.isStaticPattern = void 0;
	const path = require_path$1();
	const globParent = require_glob_parent();
	const micromatch = require_micromatch();
	const GLOBSTAR = "**";
	const ESCAPE_SYMBOL = "\\";
	const COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/;
	const REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[[^[]*]/;
	const REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\([^(]*\|[^|]*\)/;
	const GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\([^(]*\)/;
	const BRACE_EXPANSION_SEPARATORS_RE = /,|\.\./;
	/**
	* Matches a sequence of two or more consecutive slashes, excluding the first two slashes at the beginning of the string.
	* The latter is due to the presence of the device path at the beginning of the UNC path.
	*/
	const DOUBLE_SLASH_RE = /(?!^)\/{2,}/g;
	function isStaticPattern(pattern, options = {}) {
		return !isDynamicPattern(pattern, options);
	}
	exports.isStaticPattern = isStaticPattern;
	function isDynamicPattern(pattern, options = {}) {
		/**
		* A special case with an empty string is necessary for matching patterns that start with a forward slash.
		* An empty string cannot be a dynamic pattern.
		* For example, the pattern `/lib/*` will be spread into parts: '', 'lib', '*'.
		*/
		if (pattern === "") return false;
		/**
		* When the `caseSensitiveMatch` option is disabled, all patterns must be marked as dynamic, because we cannot check
		* filepath directly (without read directory).
		*/
		if (options.caseSensitiveMatch === false || pattern.includes(ESCAPE_SYMBOL)) return true;
		if (COMMON_GLOB_SYMBOLS_RE.test(pattern) || REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) || REGEX_GROUP_SYMBOLS_RE.test(pattern)) return true;
		if (options.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern)) return true;
		if (options.braceExpansion !== false && hasBraceExpansion(pattern)) return true;
		return false;
	}
	exports.isDynamicPattern = isDynamicPattern;
	function hasBraceExpansion(pattern) {
		const openingBraceIndex = pattern.indexOf("{");
		if (openingBraceIndex === -1) return false;
		const closingBraceIndex = pattern.indexOf("}", openingBraceIndex + 1);
		if (closingBraceIndex === -1) return false;
		const braceContent = pattern.slice(openingBraceIndex, closingBraceIndex);
		return BRACE_EXPANSION_SEPARATORS_RE.test(braceContent);
	}
	function convertToPositivePattern(pattern) {
		return isNegativePattern(pattern) ? pattern.slice(1) : pattern;
	}
	exports.convertToPositivePattern = convertToPositivePattern;
	function convertToNegativePattern(pattern) {
		return "!" + pattern;
	}
	exports.convertToNegativePattern = convertToNegativePattern;
	function isNegativePattern(pattern) {
		return pattern.startsWith("!") && pattern[1] !== "(";
	}
	exports.isNegativePattern = isNegativePattern;
	function isPositivePattern(pattern) {
		return !isNegativePattern(pattern);
	}
	exports.isPositivePattern = isPositivePattern;
	function getNegativePatterns(patterns) {
		return patterns.filter(isNegativePattern);
	}
	exports.getNegativePatterns = getNegativePatterns;
	function getPositivePatterns(patterns) {
		return patterns.filter(isPositivePattern);
	}
	exports.getPositivePatterns = getPositivePatterns;
	/**
	* Returns patterns that can be applied inside the current directory.
	*
	* @example
	* // ['./*', '*', 'a/*']
	* getPatternsInsideCurrentDirectory(['./*', '*', 'a/*', '../*', './../*'])
	*/
	function getPatternsInsideCurrentDirectory(patterns) {
		return patterns.filter((pattern) => !isPatternRelatedToParentDirectory(pattern));
	}
	exports.getPatternsInsideCurrentDirectory = getPatternsInsideCurrentDirectory;
	/**
	* Returns patterns to be expanded relative to (outside) the current directory.
	*
	* @example
	* // ['../*', './../*']
	* getPatternsInsideCurrentDirectory(['./*', '*', 'a/*', '../*', './../*'])
	*/
	function getPatternsOutsideCurrentDirectory(patterns) {
		return patterns.filter(isPatternRelatedToParentDirectory);
	}
	exports.getPatternsOutsideCurrentDirectory = getPatternsOutsideCurrentDirectory;
	function isPatternRelatedToParentDirectory(pattern) {
		return pattern.startsWith("..") || pattern.startsWith("./..");
	}
	exports.isPatternRelatedToParentDirectory = isPatternRelatedToParentDirectory;
	function getBaseDirectory(pattern) {
		return globParent(pattern, { flipBackslashes: false });
	}
	exports.getBaseDirectory = getBaseDirectory;
	function hasGlobStar(pattern) {
		return pattern.includes(GLOBSTAR);
	}
	exports.hasGlobStar = hasGlobStar;
	function endsWithSlashGlobStar(pattern) {
		return pattern.endsWith("/**");
	}
	exports.endsWithSlashGlobStar = endsWithSlashGlobStar;
	function isAffectDepthOfReadingPattern(pattern) {
		const basename = path.basename(pattern);
		return endsWithSlashGlobStar(pattern) || isStaticPattern(basename);
	}
	exports.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern;
	function expandPatternsWithBraceExpansion(patterns) {
		return patterns.reduce((collection, pattern) => {
			return collection.concat(expandBraceExpansion(pattern));
		}, []);
	}
	exports.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion;
	function expandBraceExpansion(pattern) {
		const patterns = micromatch.braces(pattern, {
			expand: true,
			nodupes: true,
			keepEscaping: true
		});
		/**
		* Sort the patterns by length so that the same depth patterns are processed side by side.
		* `a/{b,}/{c,}/*` – `['a///*', 'a/b//*', 'a//c/*', 'a/b/c/*']`
		*/
		patterns.sort((a, b) => a.length - b.length);
		/**
		* Micromatch can return an empty string in the case of patterns like `{a,}`.
		*/
		return patterns.filter((pattern) => pattern !== "");
	}
	exports.expandBraceExpansion = expandBraceExpansion;
	function getPatternParts(pattern, options) {
		let { parts } = micromatch.scan(pattern, Object.assign(Object.assign({}, options), { parts: true }));
		/**
		* The scan method returns an empty array in some cases.
		* See micromatch/picomatch#58 for more details.
		*/
		if (parts.length === 0) parts = [pattern];
		/**
		* The scan method does not return an empty part for the pattern with a forward slash.
		* This is another part of micromatch/picomatch#58.
		*/
		if (parts[0].startsWith("/")) {
			parts[0] = parts[0].slice(1);
			parts.unshift("");
		}
		return parts;
	}
	exports.getPatternParts = getPatternParts;
	function makeRe(pattern, options) {
		return micromatch.makeRe(pattern, options);
	}
	exports.makeRe = makeRe;
	function convertPatternsToRe(patterns, options) {
		return patterns.map((pattern) => makeRe(pattern, options));
	}
	exports.convertPatternsToRe = convertPatternsToRe;
	function matchAny(entry, patternsRe) {
		return patternsRe.some((patternRe) => patternRe.test(entry));
	}
	exports.matchAny = matchAny;
	/**
	* This package only works with forward slashes as a path separator.
	* Because of this, we cannot use the standard `path.normalize` method, because on Windows platform it will use of backslashes.
	*/
	function removeDuplicateSlashes(pattern) {
		return pattern.replace(DOUBLE_SLASH_RE, "/");
	}
	exports.removeDuplicateSlashes = removeDuplicateSlashes;
	function partitionAbsoluteAndRelative(patterns) {
		const absolute = [];
		const relative = [];
		for (const pattern of patterns) if (isAbsolute(pattern)) absolute.push(pattern);
		else relative.push(pattern);
		return [absolute, relative];
	}
	exports.partitionAbsoluteAndRelative = partitionAbsoluteAndRelative;
	function isAbsolute(pattern) {
		return path.isAbsolute(pattern);
	}
	exports.isAbsolute = isAbsolute;
}));
//#endregion
//#region node_modules/merge2/index.js
var require_merge2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const PassThrough = __require("stream").PassThrough;
	const slice = Array.prototype.slice;
	module.exports = merge2;
	function merge2() {
		const streamsQueue = [];
		const args = slice.call(arguments);
		let merging = false;
		let options = args[args.length - 1];
		if (options && !Array.isArray(options) && options.pipe == null) args.pop();
		else options = {};
		const doEnd = options.end !== false;
		const doPipeError = options.pipeError === true;
		if (options.objectMode == null) options.objectMode = true;
		if (options.highWaterMark == null) options.highWaterMark = 65536;
		const mergedStream = PassThrough(options);
		function addStream() {
			for (let i = 0, len = arguments.length; i < len; i++) streamsQueue.push(pauseStreams(arguments[i], options));
			mergeStream();
			return this;
		}
		function mergeStream() {
			if (merging) return;
			merging = true;
			let streams = streamsQueue.shift();
			if (!streams) {
				process.nextTick(endStream);
				return;
			}
			if (!Array.isArray(streams)) streams = [streams];
			let pipesCount = streams.length + 1;
			function next() {
				if (--pipesCount > 0) return;
				merging = false;
				mergeStream();
			}
			function pipe(stream) {
				function onend() {
					stream.removeListener("merge2UnpipeEnd", onend);
					stream.removeListener("end", onend);
					if (doPipeError) stream.removeListener("error", onerror);
					next();
				}
				function onerror(err) {
					mergedStream.emit("error", err);
				}
				if (stream._readableState.endEmitted) return next();
				stream.on("merge2UnpipeEnd", onend);
				stream.on("end", onend);
				if (doPipeError) stream.on("error", onerror);
				stream.pipe(mergedStream, { end: false });
				stream.resume();
			}
			for (let i = 0; i < streams.length; i++) pipe(streams[i]);
			next();
		}
		function endStream() {
			merging = false;
			mergedStream.emit("queueDrain");
			if (doEnd) mergedStream.end();
		}
		mergedStream.setMaxListeners(0);
		mergedStream.add = addStream;
		mergedStream.on("unpipe", function(stream) {
			stream.emit("merge2UnpipeEnd");
		});
		if (args.length) addStream.apply(null, args);
		return mergedStream;
	}
	function pauseStreams(streams, options) {
		if (!Array.isArray(streams)) {
			if (!streams._readableState && streams.pipe) streams = streams.pipe(PassThrough(options));
			if (!streams._readableState || !streams.pause || !streams.pipe) throw new Error("Only readable stream can be merged.");
			streams.pause();
		} else for (let i = 0, len = streams.length; i < len; i++) streams[i] = pauseStreams(streams[i], options);
		return streams;
	}
}));
//#endregion
//#region node_modules/fast-glob/out/utils/stream.js
var require_stream$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.merge = void 0;
	const merge2 = require_merge2();
	function merge(streams) {
		const mergedStream = merge2(streams);
		streams.forEach((stream) => {
			stream.once("error", (error) => mergedStream.emit("error", error));
		});
		mergedStream.once("close", () => propagateCloseEventToSources(streams));
		mergedStream.once("end", () => propagateCloseEventToSources(streams));
		return mergedStream;
	}
	exports.merge = merge;
	function propagateCloseEventToSources(streams) {
		streams.forEach((stream) => stream.emit("close"));
	}
}));
//#endregion
//#region node_modules/fast-glob/out/utils/string.js
var require_string = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isEmpty = exports.isString = void 0;
	function isString(input) {
		return typeof input === "string";
	}
	exports.isString = isString;
	function isEmpty(input) {
		return input === "";
	}
	exports.isEmpty = isEmpty;
}));
//#endregion
//#region node_modules/fast-glob/out/utils/index.js
var require_utils$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.string = exports.stream = exports.pattern = exports.path = exports.fs = exports.errno = exports.array = void 0;
	exports.array = require_array();
	exports.errno = require_errno();
	exports.fs = require_fs$3();
	exports.path = require_path();
	exports.pattern = require_pattern();
	exports.stream = require_stream$3();
	exports.string = require_string();
}));
//#endregion
//#region node_modules/fast-glob/out/managers/tasks.js
var require_tasks = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.convertPatternGroupToTask = exports.convertPatternGroupsToTasks = exports.groupPatternsByBaseDirectory = exports.getNegativePatternsAsPositive = exports.getPositivePatterns = exports.convertPatternsToTasks = exports.generate = void 0;
	const utils = require_utils$1();
	function generate(input, settings) {
		const patterns = processPatterns(input, settings);
		const ignore = processPatterns(settings.ignore, settings);
		const positivePatterns = getPositivePatterns(patterns);
		const negativePatterns = getNegativePatternsAsPositive(patterns, ignore);
		const staticPatterns = positivePatterns.filter((pattern) => utils.pattern.isStaticPattern(pattern, settings));
		const dynamicPatterns = positivePatterns.filter((pattern) => utils.pattern.isDynamicPattern(pattern, settings));
		const staticTasks = convertPatternsToTasks(staticPatterns, negativePatterns, false);
		const dynamicTasks = convertPatternsToTasks(dynamicPatterns, negativePatterns, true);
		return staticTasks.concat(dynamicTasks);
	}
	exports.generate = generate;
	function processPatterns(input, settings) {
		let patterns = input;
		/**
		* The original pattern like `{,*,**,a/*}` can lead to problems checking the depth when matching entry
		* and some problems with the micromatch package (see fast-glob issues: #365, #394).
		*
		* To solve this problem, we expand all patterns containing brace expansion. This can lead to a slight slowdown
		* in matching in the case of a large set of patterns after expansion.
		*/
		if (settings.braceExpansion) patterns = utils.pattern.expandPatternsWithBraceExpansion(patterns);
		/**
		* If the `baseNameMatch` option is enabled, we must add globstar to patterns, so that they can be used
		* at any nesting level.
		*
		* We do this here, because otherwise we have to complicate the filtering logic. For example, we need to change
		* the pattern in the filter before creating a regular expression. There is no need to change the patterns
		* in the application. Only on the input.
		*/
		if (settings.baseNameMatch) patterns = patterns.map((pattern) => pattern.includes("/") ? pattern : `**/${pattern}`);
		/**
		* This method also removes duplicate slashes that may have been in the pattern or formed as a result of expansion.
		*/
		return patterns.map((pattern) => utils.pattern.removeDuplicateSlashes(pattern));
	}
	/**
	* Returns tasks grouped by basic pattern directories.
	*
	* Patterns that can be found inside (`./`) and outside (`../`) the current directory are handled separately.
	* This is necessary because directory traversal starts at the base directory and goes deeper.
	*/
	function convertPatternsToTasks(positive, negative, dynamic) {
		const tasks = [];
		const patternsOutsideCurrentDirectory = utils.pattern.getPatternsOutsideCurrentDirectory(positive);
		const patternsInsideCurrentDirectory = utils.pattern.getPatternsInsideCurrentDirectory(positive);
		const outsideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsOutsideCurrentDirectory);
		const insideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsInsideCurrentDirectory);
		tasks.push(...convertPatternGroupsToTasks(outsideCurrentDirectoryGroup, negative, dynamic));
		if ("." in insideCurrentDirectoryGroup) tasks.push(convertPatternGroupToTask(".", patternsInsideCurrentDirectory, negative, dynamic));
		else tasks.push(...convertPatternGroupsToTasks(insideCurrentDirectoryGroup, negative, dynamic));
		return tasks;
	}
	exports.convertPatternsToTasks = convertPatternsToTasks;
	function getPositivePatterns(patterns) {
		return utils.pattern.getPositivePatterns(patterns);
	}
	exports.getPositivePatterns = getPositivePatterns;
	function getNegativePatternsAsPositive(patterns, ignore) {
		return utils.pattern.getNegativePatterns(patterns).concat(ignore).map(utils.pattern.convertToPositivePattern);
	}
	exports.getNegativePatternsAsPositive = getNegativePatternsAsPositive;
	function groupPatternsByBaseDirectory(patterns) {
		return patterns.reduce((collection, pattern) => {
			const base = utils.pattern.getBaseDirectory(pattern);
			if (base in collection) collection[base].push(pattern);
			else collection[base] = [pattern];
			return collection;
		}, {});
	}
	exports.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory;
	function convertPatternGroupsToTasks(positive, negative, dynamic) {
		return Object.keys(positive).map((base) => {
			return convertPatternGroupToTask(base, positive[base], negative, dynamic);
		});
	}
	exports.convertPatternGroupsToTasks = convertPatternGroupsToTasks;
	function convertPatternGroupToTask(base, positive, negative, dynamic) {
		return {
			dynamic,
			positive,
			negative,
			base,
			patterns: [].concat(positive, negative.map(utils.pattern.convertToNegativePattern))
		};
	}
	exports.convertPatternGroupToTask = convertPatternGroupToTask;
}));
//#endregion
//#region node_modules/@nodelib/fs.stat/out/providers/async.js
var require_async$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.read = void 0;
	function read(path, settings, callback) {
		settings.fs.lstat(path, (lstatError, lstat) => {
			if (lstatError !== null) {
				callFailureCallback(callback, lstatError);
				return;
			}
			if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
				callSuccessCallback(callback, lstat);
				return;
			}
			settings.fs.stat(path, (statError, stat) => {
				if (statError !== null) {
					if (settings.throwErrorOnBrokenSymbolicLink) {
						callFailureCallback(callback, statError);
						return;
					}
					callSuccessCallback(callback, lstat);
					return;
				}
				if (settings.markSymbolicLink) stat.isSymbolicLink = () => true;
				callSuccessCallback(callback, stat);
			});
		});
	}
	exports.read = read;
	function callFailureCallback(callback, error) {
		callback(error);
	}
	function callSuccessCallback(callback, result) {
		callback(null, result);
	}
}));
//#endregion
//#region node_modules/@nodelib/fs.stat/out/providers/sync.js
var require_sync$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.read = void 0;
	function read(path, settings) {
		const lstat = settings.fs.lstatSync(path);
		if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) return lstat;
		try {
			const stat = settings.fs.statSync(path);
			if (settings.markSymbolicLink) stat.isSymbolicLink = () => true;
			return stat;
		} catch (error) {
			if (!settings.throwErrorOnBrokenSymbolicLink) return lstat;
			throw error;
		}
	}
	exports.read = read;
}));
//#endregion
//#region node_modules/@nodelib/fs.stat/out/adapters/fs.js
var require_fs$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
	const fs$3 = __require("fs");
	exports.FILE_SYSTEM_ADAPTER = {
		lstat: fs$3.lstat,
		stat: fs$3.stat,
		lstatSync: fs$3.lstatSync,
		statSync: fs$3.statSync
	};
	function createFileSystemAdapter(fsMethods) {
		if (fsMethods === void 0) return exports.FILE_SYSTEM_ADAPTER;
		return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
	}
	exports.createFileSystemAdapter = createFileSystemAdapter;
}));
//#endregion
//#region node_modules/@nodelib/fs.stat/out/settings.js
var require_settings$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const fs = require_fs$2();
	var Settings = class {
		constructor(_options = {}) {
			this._options = _options;
			this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, true);
			this.fs = fs.createFileSystemAdapter(this._options.fs);
			this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, false);
			this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
		}
		_getValue(option, value) {
			return option !== null && option !== void 0 ? option : value;
		}
	};
	exports.default = Settings;
}));
//#endregion
//#region node_modules/@nodelib/fs.stat/out/index.js
var require_out$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.statSync = exports.stat = exports.Settings = void 0;
	const async = require_async$5();
	const sync = require_sync$5();
	const settings_1 = require_settings$3();
	exports.Settings = settings_1.default;
	function stat(path, optionsOrSettingsOrCallback, callback) {
		if (typeof optionsOrSettingsOrCallback === "function") {
			async.read(path, getSettings(), optionsOrSettingsOrCallback);
			return;
		}
		async.read(path, getSettings(optionsOrSettingsOrCallback), callback);
	}
	exports.stat = stat;
	function statSync(path, optionsOrSettings) {
		const settings = getSettings(optionsOrSettings);
		return sync.read(path, settings);
	}
	exports.statSync = statSync;
	function getSettings(settingsOrOptions = {}) {
		if (settingsOrOptions instanceof settings_1.default) return settingsOrOptions;
		return new settings_1.default(settingsOrOptions);
	}
}));
//#endregion
//#region node_modules/queue-microtask/index.js
var require_queue_microtask = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
	let promise;
	module.exports = typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : global) : (cb) => (promise || (promise = Promise.resolve())).then(cb).catch((err) => setTimeout(() => {
		throw err;
	}, 0));
}));
//#endregion
//#region node_modules/run-parallel/index.js
var require_run_parallel = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
	module.exports = runParallel;
	const queueMicrotask = require_queue_microtask();
	function runParallel(tasks, cb) {
		let results, pending, keys;
		let isSync = true;
		if (Array.isArray(tasks)) {
			results = [];
			pending = tasks.length;
		} else {
			keys = Object.keys(tasks);
			results = {};
			pending = keys.length;
		}
		function done(err) {
			function end() {
				if (cb) cb(err, results);
				cb = null;
			}
			if (isSync) queueMicrotask(end);
			else end();
		}
		function each(i, err, result) {
			results[i] = result;
			if (--pending === 0 || err) done(err);
		}
		if (!pending) done(null);
		else if (keys) keys.forEach(function(key) {
			tasks[key](function(err, result) {
				each(key, err, result);
			});
		});
		else tasks.forEach(function(task, i) {
			task(function(err, result) {
				each(i, err, result);
			});
		});
		isSync = false;
	}
}));
//#endregion
//#region node_modules/@nodelib/fs.scandir/out/constants.js
var require_constants = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0;
	const NODE_PROCESS_VERSION_PARTS = process.versions.node.split(".");
	if (NODE_PROCESS_VERSION_PARTS[0] === void 0 || NODE_PROCESS_VERSION_PARTS[1] === void 0) throw new Error(`Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`);
	const MAJOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[0], 10);
	const MINOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[1], 10);
	const SUPPORTED_MAJOR_VERSION = 10;
	/**
	* IS `true` for Node.js 10.10 and greater.
	*/
	exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION || MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= 10;
}));
//#endregion
//#region node_modules/@nodelib/fs.scandir/out/utils/fs.js
var require_fs$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createDirentFromStats = void 0;
	var DirentFromStats = class {
		constructor(name, stats) {
			this.name = name;
			this.isBlockDevice = stats.isBlockDevice.bind(stats);
			this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
			this.isDirectory = stats.isDirectory.bind(stats);
			this.isFIFO = stats.isFIFO.bind(stats);
			this.isFile = stats.isFile.bind(stats);
			this.isSocket = stats.isSocket.bind(stats);
			this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
		}
	};
	function createDirentFromStats(name, stats) {
		return new DirentFromStats(name, stats);
	}
	exports.createDirentFromStats = createDirentFromStats;
}));
//#endregion
//#region node_modules/@nodelib/fs.scandir/out/utils/index.js
var require_utils = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.fs = void 0;
	exports.fs = require_fs$1();
}));
//#endregion
//#region node_modules/@nodelib/fs.scandir/out/providers/common.js
var require_common$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.joinPathSegments = void 0;
	function joinPathSegments(a, b, separator) {
		/**
		* The correct handling of cases when the first segment is a root (`/`, `C:/`) or UNC path (`//?/C:/`).
		*/
		if (a.endsWith(separator)) return a + b;
		return a + separator + b;
	}
	exports.joinPathSegments = joinPathSegments;
}));
//#endregion
//#region node_modules/@nodelib/fs.scandir/out/providers/async.js
var require_async$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.readdir = exports.readdirWithFileTypes = exports.read = void 0;
	const fsStat = require_out$3();
	const rpl = require_run_parallel();
	const constants_1 = require_constants();
	const utils = require_utils();
	const common = require_common$1();
	function read(directory, settings, callback) {
		if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
			readdirWithFileTypes(directory, settings, callback);
			return;
		}
		readdir(directory, settings, callback);
	}
	exports.read = read;
	function readdirWithFileTypes(directory, settings, callback) {
		settings.fs.readdir(directory, { withFileTypes: true }, (readdirError, dirents) => {
			if (readdirError !== null) {
				callFailureCallback(callback, readdirError);
				return;
			}
			const entries = dirents.map((dirent) => ({
				dirent,
				name: dirent.name,
				path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
			}));
			if (!settings.followSymbolicLinks) {
				callSuccessCallback(callback, entries);
				return;
			}
			const tasks = entries.map((entry) => makeRplTaskEntry(entry, settings));
			rpl(tasks, (rplError, rplEntries) => {
				if (rplError !== null) {
					callFailureCallback(callback, rplError);
					return;
				}
				callSuccessCallback(callback, rplEntries);
			});
		});
	}
	exports.readdirWithFileTypes = readdirWithFileTypes;
	function makeRplTaskEntry(entry, settings) {
		return (done) => {
			if (!entry.dirent.isSymbolicLink()) {
				done(null, entry);
				return;
			}
			settings.fs.stat(entry.path, (statError, stats) => {
				if (statError !== null) {
					if (settings.throwErrorOnBrokenSymbolicLink) {
						done(statError);
						return;
					}
					done(null, entry);
					return;
				}
				entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
				done(null, entry);
			});
		};
	}
	function readdir(directory, settings, callback) {
		settings.fs.readdir(directory, (readdirError, names) => {
			if (readdirError !== null) {
				callFailureCallback(callback, readdirError);
				return;
			}
			const tasks = names.map((name) => {
				const path = common.joinPathSegments(directory, name, settings.pathSegmentSeparator);
				return (done) => {
					fsStat.stat(path, settings.fsStatSettings, (error, stats) => {
						if (error !== null) {
							done(error);
							return;
						}
						const entry = {
							name,
							path,
							dirent: utils.fs.createDirentFromStats(name, stats)
						};
						if (settings.stats) entry.stats = stats;
						done(null, entry);
					});
				};
			});
			rpl(tasks, (rplError, entries) => {
				if (rplError !== null) {
					callFailureCallback(callback, rplError);
					return;
				}
				callSuccessCallback(callback, entries);
			});
		});
	}
	exports.readdir = readdir;
	function callFailureCallback(callback, error) {
		callback(error);
	}
	function callSuccessCallback(callback, result) {
		callback(null, result);
	}
}));
//#endregion
//#region node_modules/@nodelib/fs.scandir/out/providers/sync.js
var require_sync$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.readdir = exports.readdirWithFileTypes = exports.read = void 0;
	const fsStat = require_out$3();
	const constants_1 = require_constants();
	const utils = require_utils();
	const common = require_common$1();
	function read(directory, settings) {
		if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) return readdirWithFileTypes(directory, settings);
		return readdir(directory, settings);
	}
	exports.read = read;
	function readdirWithFileTypes(directory, settings) {
		return settings.fs.readdirSync(directory, { withFileTypes: true }).map((dirent) => {
			const entry = {
				dirent,
				name: dirent.name,
				path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
			};
			if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) try {
				const stats = settings.fs.statSync(entry.path);
				entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
			} catch (error) {
				if (settings.throwErrorOnBrokenSymbolicLink) throw error;
			}
			return entry;
		});
	}
	exports.readdirWithFileTypes = readdirWithFileTypes;
	function readdir(directory, settings) {
		return settings.fs.readdirSync(directory).map((name) => {
			const entryPath = common.joinPathSegments(directory, name, settings.pathSegmentSeparator);
			const stats = fsStat.statSync(entryPath, settings.fsStatSettings);
			const entry = {
				name,
				path: entryPath,
				dirent: utils.fs.createDirentFromStats(name, stats)
			};
			if (settings.stats) entry.stats = stats;
			return entry;
		});
	}
	exports.readdir = readdir;
}));
//#endregion
//#region node_modules/@nodelib/fs.scandir/out/adapters/fs.js
var require_fs = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
	const fs$2 = __require("fs");
	exports.FILE_SYSTEM_ADAPTER = {
		lstat: fs$2.lstat,
		stat: fs$2.stat,
		lstatSync: fs$2.lstatSync,
		statSync: fs$2.statSync,
		readdir: fs$2.readdir,
		readdirSync: fs$2.readdirSync
	};
	function createFileSystemAdapter(fsMethods) {
		if (fsMethods === void 0) return exports.FILE_SYSTEM_ADAPTER;
		return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
	}
	exports.createFileSystemAdapter = createFileSystemAdapter;
}));
//#endregion
//#region node_modules/@nodelib/fs.scandir/out/settings.js
var require_settings$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const path = require_path$1();
	const fsStat = require_out$3();
	const fs = require_fs();
	var Settings = class {
		constructor(_options = {}) {
			this._options = _options;
			this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, false);
			this.fs = fs.createFileSystemAdapter(this._options.fs);
			this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep);
			this.stats = this._getValue(this._options.stats, false);
			this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
			this.fsStatSettings = new fsStat.Settings({
				followSymbolicLink: this.followSymbolicLinks,
				fs: this.fs,
				throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink
			});
		}
		_getValue(option, value) {
			return option !== null && option !== void 0 ? option : value;
		}
	};
	exports.default = Settings;
}));
//#endregion
//#region node_modules/@nodelib/fs.scandir/out/index.js
var require_out$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Settings = exports.scandirSync = exports.scandir = void 0;
	const async = require_async$4();
	const sync = require_sync$4();
	const settings_1 = require_settings$2();
	exports.Settings = settings_1.default;
	function scandir(path, optionsOrSettingsOrCallback, callback) {
		if (typeof optionsOrSettingsOrCallback === "function") {
			async.read(path, getSettings(), optionsOrSettingsOrCallback);
			return;
		}
		async.read(path, getSettings(optionsOrSettingsOrCallback), callback);
	}
	exports.scandir = scandir;
	function scandirSync(path, optionsOrSettings) {
		const settings = getSettings(optionsOrSettings);
		return sync.read(path, settings);
	}
	exports.scandirSync = scandirSync;
	function getSettings(settingsOrOptions = {}) {
		if (settingsOrOptions instanceof settings_1.default) return settingsOrOptions;
		return new settings_1.default(settingsOrOptions);
	}
}));
//#endregion
//#region node_modules/reusify/reusify.js
var require_reusify = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function reusify(Constructor) {
		var head = new Constructor();
		var tail = head;
		function get() {
			var current = head;
			if (current.next) head = current.next;
			else {
				head = new Constructor();
				tail = head;
			}
			current.next = null;
			return current;
		}
		function release(obj) {
			tail.next = obj;
			tail = obj;
		}
		return {
			get,
			release
		};
	}
	module.exports = reusify;
}));
//#endregion
//#region node_modules/fastq/queue.js
var require_queue = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var reusify = require_reusify();
	function fastqueue(context, worker, _concurrency) {
		if (typeof context === "function") {
			_concurrency = worker;
			worker = context;
			context = null;
		}
		if (!(_concurrency >= 1)) throw new Error("fastqueue concurrency must be equal to or greater than 1");
		var cache = reusify(Task);
		var queueHead = null;
		var queueTail = null;
		var _running = 0;
		var errorHandler = null;
		var self = {
			push,
			drain: noop,
			saturated: noop,
			pause,
			paused: false,
			get concurrency() {
				return _concurrency;
			},
			set concurrency(value) {
				if (!(value >= 1)) throw new Error("fastqueue concurrency must be equal to or greater than 1");
				_concurrency = value;
				if (self.paused) return;
				for (; queueHead && _running < _concurrency;) {
					_running++;
					release();
				}
			},
			running,
			resume,
			idle,
			length,
			getQueue,
			unshift,
			empty: noop,
			kill,
			killAndDrain,
			error,
			abort
		};
		return self;
		function running() {
			return _running;
		}
		function pause() {
			self.paused = true;
		}
		function length() {
			var current = queueHead;
			var counter = 0;
			while (current) {
				current = current.next;
				counter++;
			}
			return counter;
		}
		function getQueue() {
			var current = queueHead;
			var tasks = [];
			while (current) {
				tasks.push(current.value);
				current = current.next;
			}
			return tasks;
		}
		function resume() {
			if (!self.paused) return;
			self.paused = false;
			if (queueHead === null) {
				_running++;
				release();
				return;
			}
			for (; queueHead && _running < _concurrency;) {
				_running++;
				release();
			}
		}
		function idle() {
			return _running === 0 && self.length() === 0;
		}
		function push(value, done) {
			var current = cache.get();
			current.context = context;
			current.release = release;
			current.value = value;
			current.callback = done || noop;
			current.errorHandler = errorHandler;
			if (_running >= _concurrency || self.paused) {
				if (queueTail) {
					queueTail.next = current;
					queueTail = current;
				} else {
					queueHead = current;
					queueTail = current;
					self.saturated();
				}
			} else {
				_running++;
				worker.call(context, current.value, current.worked);
			}
		}
		function unshift(value, done) {
			var current = cache.get();
			current.context = context;
			current.release = release;
			current.value = value;
			current.callback = done || noop;
			current.errorHandler = errorHandler;
			if (_running >= _concurrency || self.paused) {
				if (queueHead) {
					current.next = queueHead;
					queueHead = current;
				} else {
					queueHead = current;
					queueTail = current;
					self.saturated();
				}
			} else {
				_running++;
				worker.call(context, current.value, current.worked);
			}
		}
		function release(holder) {
			if (holder) cache.release(holder);
			var next = queueHead;
			if (next && _running <= _concurrency) {
				if (!self.paused) {
					if (queueTail === queueHead) queueTail = null;
					queueHead = next.next;
					next.next = null;
					worker.call(context, next.value, next.worked);
					if (queueTail === null) self.empty();
				} else _running--;
			} else if (--_running === 0) self.drain();
		}
		function kill() {
			queueHead = null;
			queueTail = null;
			self.drain = noop;
		}
		function killAndDrain() {
			queueHead = null;
			queueTail = null;
			self.drain();
			self.drain = noop;
		}
		function abort() {
			var current = queueHead;
			queueHead = null;
			queueTail = null;
			while (current) {
				var next = current.next;
				var callback = current.callback;
				var errorHandler = current.errorHandler;
				var val = current.value;
				var context = current.context;
				current.value = null;
				current.callback = noop;
				current.errorHandler = null;
				if (errorHandler) errorHandler(/* @__PURE__ */ new Error("abort"), val);
				callback.call(context, /* @__PURE__ */ new Error("abort"));
				current.release(current);
				current = next;
			}
			self.drain = noop;
		}
		function error(handler) {
			errorHandler = handler;
		}
	}
	function noop() {}
	function Task() {
		this.value = null;
		this.callback = noop;
		this.next = null;
		this.release = noop;
		this.context = null;
		this.errorHandler = null;
		var self = this;
		this.worked = function worked(err, result) {
			var callback = self.callback;
			var errorHandler = self.errorHandler;
			var val = self.value;
			self.value = null;
			self.callback = noop;
			if (self.errorHandler) errorHandler(err, val);
			callback.call(self.context, err, result);
			self.release(self);
		};
	}
	function queueAsPromised(context, worker, _concurrency) {
		if (typeof context === "function") {
			_concurrency = worker;
			worker = context;
			context = null;
		}
		function asyncWrapper(arg, cb) {
			worker.call(this, arg).then(function(res) {
				cb(null, res);
			}, cb);
		}
		var queue = fastqueue(context, asyncWrapper, _concurrency);
		var pushCb = queue.push;
		var unshiftCb = queue.unshift;
		queue.push = push;
		queue.unshift = unshift;
		queue.drained = drained;
		return queue;
		function push(value) {
			var p = new Promise(function(resolve, reject) {
				pushCb(value, function(err, result) {
					if (err) {
						reject(err);
						return;
					}
					resolve(result);
				});
			});
			p.catch(noop);
			return p;
		}
		function unshift(value) {
			var p = new Promise(function(resolve, reject) {
				unshiftCb(value, function(err, result) {
					if (err) {
						reject(err);
						return;
					}
					resolve(result);
				});
			});
			p.catch(noop);
			return p;
		}
		function drained() {
			return new Promise(function(resolve) {
				process.nextTick(function() {
					if (queue.idle()) resolve();
					else {
						var previousDrain = queue.drain;
						queue.drain = function() {
							if (typeof previousDrain === "function") previousDrain();
							resolve();
							queue.drain = previousDrain;
						};
					}
				});
			});
		}
	}
	module.exports = fastqueue;
	module.exports.promise = queueAsPromised;
}));
//#endregion
//#region node_modules/@nodelib/fs.walk/out/readers/common.js
var require_common = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.joinPathSegments = exports.replacePathSegmentSeparator = exports.isAppliedFilter = exports.isFatalError = void 0;
	function isFatalError(settings, error) {
		if (settings.errorFilter === null) return true;
		return !settings.errorFilter(error);
	}
	exports.isFatalError = isFatalError;
	function isAppliedFilter(filter, value) {
		return filter === null || filter(value);
	}
	exports.isAppliedFilter = isAppliedFilter;
	function replacePathSegmentSeparator(filepath, separator) {
		return filepath.split(/[/\\]/).join(separator);
	}
	exports.replacePathSegmentSeparator = replacePathSegmentSeparator;
	function joinPathSegments(a, b, separator) {
		if (a === "") return b;
		/**
		* The correct handling of cases when the first segment is a root (`/`, `C:/`) or UNC path (`//?/C:/`).
		*/
		if (a.endsWith(separator)) return a + b;
		return a + separator + b;
	}
	exports.joinPathSegments = joinPathSegments;
}));
//#endregion
//#region node_modules/@nodelib/fs.walk/out/readers/reader.js
var require_reader$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const common = require_common();
	var Reader = class {
		constructor(_root, _settings) {
			this._root = _root;
			this._settings = _settings;
			this._root = common.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator);
		}
	};
	exports.default = Reader;
}));
//#endregion
//#region node_modules/@nodelib/fs.walk/out/readers/async.js
var require_async$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const events_1 = __require("events");
	const fsScandir = require_out$2();
	const fastq = require_queue();
	const common = require_common();
	const reader_1 = require_reader$1();
	var AsyncReader = class extends reader_1.default {
		constructor(_root, _settings) {
			super(_root, _settings);
			this._settings = _settings;
			this._scandir = fsScandir.scandir;
			this._emitter = new events_1.EventEmitter();
			this._queue = fastq(this._worker.bind(this), this._settings.concurrency);
			this._isFatalError = false;
			this._isDestroyed = false;
			this._queue.drain = () => {
				if (!this._isFatalError) this._emitter.emit("end");
			};
		}
		read() {
			this._isFatalError = false;
			this._isDestroyed = false;
			setImmediate(() => {
				this._pushToQueue(this._root, this._settings.basePath);
			});
			return this._emitter;
		}
		get isDestroyed() {
			return this._isDestroyed;
		}
		destroy() {
			if (this._isDestroyed) throw new Error("The reader is already destroyed");
			this._isDestroyed = true;
			this._queue.killAndDrain();
		}
		onEntry(callback) {
			this._emitter.on("entry", callback);
		}
		onError(callback) {
			this._emitter.once("error", callback);
		}
		onEnd(callback) {
			this._emitter.once("end", callback);
		}
		_pushToQueue(directory, base) {
			const queueItem = {
				directory,
				base
			};
			this._queue.push(queueItem, (error) => {
				if (error !== null) this._handleError(error);
			});
		}
		_worker(item, done) {
			this._scandir(item.directory, this._settings.fsScandirSettings, (error, entries) => {
				if (error !== null) {
					done(error, void 0);
					return;
				}
				for (const entry of entries) this._handleEntry(entry, item.base);
				done(null, void 0);
			});
		}
		_handleError(error) {
			if (this._isDestroyed || !common.isFatalError(this._settings, error)) return;
			this._isFatalError = true;
			this._isDestroyed = true;
			this._emitter.emit("error", error);
		}
		_handleEntry(entry, base) {
			if (this._isDestroyed || this._isFatalError) return;
			const fullpath = entry.path;
			if (base !== void 0) entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
			if (common.isAppliedFilter(this._settings.entryFilter, entry)) this._emitEntry(entry);
			if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path);
		}
		_emitEntry(entry) {
			this._emitter.emit("entry", entry);
		}
	};
	exports.default = AsyncReader;
}));
//#endregion
//#region node_modules/@nodelib/fs.walk/out/providers/async.js
var require_async$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const async_1 = require_async$3();
	var AsyncProvider = class {
		constructor(_root, _settings) {
			this._root = _root;
			this._settings = _settings;
			this._reader = new async_1.default(this._root, this._settings);
			this._storage = [];
		}
		read(callback) {
			this._reader.onError((error) => {
				callFailureCallback(callback, error);
			});
			this._reader.onEntry((entry) => {
				this._storage.push(entry);
			});
			this._reader.onEnd(() => {
				callSuccessCallback(callback, this._storage);
			});
			this._reader.read();
		}
	};
	exports.default = AsyncProvider;
	function callFailureCallback(callback, error) {
		callback(error);
	}
	function callSuccessCallback(callback, entries) {
		callback(null, entries);
	}
}));
//#endregion
//#region node_modules/@nodelib/fs.walk/out/providers/stream.js
var require_stream$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const stream_1$2 = __require("stream");
	const async_1 = require_async$3();
	var StreamProvider = class {
		constructor(_root, _settings) {
			this._root = _root;
			this._settings = _settings;
			this._reader = new async_1.default(this._root, this._settings);
			this._stream = new stream_1$2.Readable({
				objectMode: true,
				read: () => {},
				destroy: () => {
					if (!this._reader.isDestroyed) this._reader.destroy();
				}
			});
		}
		read() {
			this._reader.onError((error) => {
				this._stream.emit("error", error);
			});
			this._reader.onEntry((entry) => {
				this._stream.push(entry);
			});
			this._reader.onEnd(() => {
				this._stream.push(null);
			});
			this._reader.read();
			return this._stream;
		}
	};
	exports.default = StreamProvider;
}));
//#endregion
//#region node_modules/@nodelib/fs.walk/out/readers/sync.js
var require_sync$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const fsScandir = require_out$2();
	const common = require_common();
	const reader_1 = require_reader$1();
	var SyncReader = class extends reader_1.default {
		constructor() {
			super(...arguments);
			this._scandir = fsScandir.scandirSync;
			this._storage = [];
			this._queue = /* @__PURE__ */ new Set();
		}
		read() {
			this._pushToQueue(this._root, this._settings.basePath);
			this._handleQueue();
			return this._storage;
		}
		_pushToQueue(directory, base) {
			this._queue.add({
				directory,
				base
			});
		}
		_handleQueue() {
			for (const item of this._queue.values()) this._handleDirectory(item.directory, item.base);
		}
		_handleDirectory(directory, base) {
			try {
				const entries = this._scandir(directory, this._settings.fsScandirSettings);
				for (const entry of entries) this._handleEntry(entry, base);
			} catch (error) {
				this._handleError(error);
			}
		}
		_handleError(error) {
			if (!common.isFatalError(this._settings, error)) return;
			throw error;
		}
		_handleEntry(entry, base) {
			const fullpath = entry.path;
			if (base !== void 0) entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
			if (common.isAppliedFilter(this._settings.entryFilter, entry)) this._pushToStorage(entry);
			if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path);
		}
		_pushToStorage(entry) {
			this._storage.push(entry);
		}
	};
	exports.default = SyncReader;
}));
//#endregion
//#region node_modules/@nodelib/fs.walk/out/providers/sync.js
var require_sync$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const sync_1 = require_sync$3();
	var SyncProvider = class {
		constructor(_root, _settings) {
			this._root = _root;
			this._settings = _settings;
			this._reader = new sync_1.default(this._root, this._settings);
		}
		read() {
			return this._reader.read();
		}
	};
	exports.default = SyncProvider;
}));
//#endregion
//#region node_modules/@nodelib/fs.walk/out/settings.js
var require_settings$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const path = require_path$1();
	const fsScandir = require_out$2();
	var Settings = class {
		constructor(_options = {}) {
			this._options = _options;
			this.basePath = this._getValue(this._options.basePath, void 0);
			this.concurrency = this._getValue(this._options.concurrency, Number.POSITIVE_INFINITY);
			this.deepFilter = this._getValue(this._options.deepFilter, null);
			this.entryFilter = this._getValue(this._options.entryFilter, null);
			this.errorFilter = this._getValue(this._options.errorFilter, null);
			this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep);
			this.fsScandirSettings = new fsScandir.Settings({
				followSymbolicLinks: this._options.followSymbolicLinks,
				fs: this._options.fs,
				pathSegmentSeparator: this._options.pathSegmentSeparator,
				stats: this._options.stats,
				throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink
			});
		}
		_getValue(option, value) {
			return option !== null && option !== void 0 ? option : value;
		}
	};
	exports.default = Settings;
}));
//#endregion
//#region node_modules/@nodelib/fs.walk/out/index.js
var require_out$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Settings = exports.walkStream = exports.walkSync = exports.walk = void 0;
	const async_1 = require_async$2();
	const stream_1 = require_stream$2();
	const sync_1 = require_sync$2();
	const settings_1 = require_settings$1();
	exports.Settings = settings_1.default;
	function walk(directory, optionsOrSettingsOrCallback, callback) {
		if (typeof optionsOrSettingsOrCallback === "function") {
			new async_1.default(directory, getSettings()).read(optionsOrSettingsOrCallback);
			return;
		}
		new async_1.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback);
	}
	exports.walk = walk;
	function walkSync(directory, optionsOrSettings) {
		const settings = getSettings(optionsOrSettings);
		return new sync_1.default(directory, settings).read();
	}
	exports.walkSync = walkSync;
	function walkStream(directory, optionsOrSettings) {
		const settings = getSettings(optionsOrSettings);
		return new stream_1.default(directory, settings).read();
	}
	exports.walkStream = walkStream;
	function getSettings(settingsOrOptions = {}) {
		if (settingsOrOptions instanceof settings_1.default) return settingsOrOptions;
		return new settings_1.default(settingsOrOptions);
	}
}));
//#endregion
//#region node_modules/fast-glob/out/readers/reader.js
var require_reader = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const path = require_path$1();
	const fsStat = require_out$3();
	const utils = require_utils$1();
	var Reader = class {
		constructor(_settings) {
			this._settings = _settings;
			this._fsStatSettings = new fsStat.Settings({
				followSymbolicLink: this._settings.followSymbolicLinks,
				fs: this._settings.fs,
				throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks
			});
		}
		_getFullEntryPath(filepath) {
			return path.resolve(this._settings.cwd, filepath);
		}
		_makeEntry(stats, pattern) {
			const entry = {
				name: pattern,
				path: pattern,
				dirent: utils.fs.createDirentFromStats(pattern, stats)
			};
			if (this._settings.stats) entry.stats = stats;
			return entry;
		}
		_isFatalError(error) {
			return !utils.errno.isEnoentCodeError(error) && !this._settings.suppressErrors;
		}
	};
	exports.default = Reader;
}));
//#endregion
//#region node_modules/fast-glob/out/readers/stream.js
var require_stream$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const stream_1$1 = __require("stream");
	const fsStat = require_out$3();
	const fsWalk = require_out$1();
	const reader_1 = require_reader();
	var ReaderStream = class extends reader_1.default {
		constructor() {
			super(...arguments);
			this._walkStream = fsWalk.walkStream;
			this._stat = fsStat.stat;
		}
		dynamic(root, options) {
			return this._walkStream(root, options);
		}
		static(patterns, options) {
			const filepaths = patterns.map(this._getFullEntryPath, this);
			const stream = new stream_1$1.PassThrough({ objectMode: true });
			stream._write = (index, _enc, done) => {
				return this._getEntry(filepaths[index], patterns[index], options).then((entry) => {
					if (entry !== null && options.entryFilter(entry)) stream.push(entry);
					if (index === filepaths.length - 1) stream.end();
					done();
				}).catch(done);
			};
			for (let i = 0; i < filepaths.length; i++) stream.write(i);
			return stream;
		}
		_getEntry(filepath, pattern, options) {
			return this._getStat(filepath).then((stats) => this._makeEntry(stats, pattern)).catch((error) => {
				if (options.errorFilter(error)) return null;
				throw error;
			});
		}
		_getStat(filepath) {
			return new Promise((resolve, reject) => {
				this._stat(filepath, this._fsStatSettings, (error, stats) => {
					return error === null ? resolve(stats) : reject(error);
				});
			});
		}
	};
	exports.default = ReaderStream;
}));
//#endregion
//#region node_modules/fast-glob/out/readers/async.js
var require_async$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const fsWalk = require_out$1();
	const reader_1 = require_reader();
	const stream_1 = require_stream$1();
	var ReaderAsync = class extends reader_1.default {
		constructor() {
			super(...arguments);
			this._walkAsync = fsWalk.walk;
			this._readerStream = new stream_1.default(this._settings);
		}
		dynamic(root, options) {
			return new Promise((resolve, reject) => {
				this._walkAsync(root, options, (error, entries) => {
					if (error === null) resolve(entries);
					else reject(error);
				});
			});
		}
		async static(patterns, options) {
			const entries = [];
			const stream = this._readerStream.static(patterns, options);
			return new Promise((resolve, reject) => {
				stream.once("error", reject);
				stream.on("data", (entry) => entries.push(entry));
				stream.once("end", () => resolve(entries));
			});
		}
	};
	exports.default = ReaderAsync;
}));
//#endregion
//#region node_modules/fast-glob/out/providers/matchers/matcher.js
var require_matcher = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const utils = require_utils$1();
	var Matcher = class {
		constructor(_patterns, _settings, _micromatchOptions) {
			this._patterns = _patterns;
			this._settings = _settings;
			this._micromatchOptions = _micromatchOptions;
			this._storage = [];
			this._fillStorage();
		}
		_fillStorage() {
			for (const pattern of this._patterns) {
				const segments = this._getPatternSegments(pattern);
				const sections = this._splitSegmentsIntoSections(segments);
				this._storage.push({
					complete: sections.length <= 1,
					pattern,
					segments,
					sections
				});
			}
		}
		_getPatternSegments(pattern) {
			return utils.pattern.getPatternParts(pattern, this._micromatchOptions).map((part) => {
				if (!utils.pattern.isDynamicPattern(part, this._settings)) return {
					dynamic: false,
					pattern: part
				};
				return {
					dynamic: true,
					pattern: part,
					patternRe: utils.pattern.makeRe(part, this._micromatchOptions)
				};
			});
		}
		_splitSegmentsIntoSections(segments) {
			return utils.array.splitWhen(segments, (segment) => segment.dynamic && utils.pattern.hasGlobStar(segment.pattern));
		}
	};
	exports.default = Matcher;
}));
//#endregion
//#region node_modules/fast-glob/out/providers/matchers/partial.js
var require_partial = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const matcher_1 = require_matcher();
	var PartialMatcher = class extends matcher_1.default {
		match(filepath) {
			const parts = filepath.split("/");
			const levels = parts.length;
			const patterns = this._storage.filter((info) => !info.complete || info.segments.length > levels);
			for (const pattern of patterns) {
				const section = pattern.sections[0];
				/**
				* In this case, the pattern has a globstar and we must read all directories unconditionally,
				* but only if the level has reached the end of the first group.
				*
				* fixtures/{a,b}/**
				*  ^ true/false  ^ always true
				*/
				if (!pattern.complete && levels > section.length) return true;
				if (parts.every((part, index) => {
					const segment = pattern.segments[index];
					if (segment.dynamic && segment.patternRe.test(part)) return true;
					if (!segment.dynamic && segment.pattern === part) return true;
					return false;
				})) return true;
			}
			return false;
		}
	};
	exports.default = PartialMatcher;
}));
//#endregion
//#region node_modules/fast-glob/out/providers/filters/deep.js
var require_deep = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const utils = require_utils$1();
	const partial_1 = require_partial();
	var DeepFilter = class {
		constructor(_settings, _micromatchOptions) {
			this._settings = _settings;
			this._micromatchOptions = _micromatchOptions;
		}
		getFilter(basePath, positive, negative) {
			const matcher = this._getMatcher(positive);
			const negativeRe = this._getNegativePatternsRe(negative);
			return (entry) => this._filter(basePath, entry, matcher, negativeRe);
		}
		_getMatcher(patterns) {
			return new partial_1.default(patterns, this._settings, this._micromatchOptions);
		}
		_getNegativePatternsRe(patterns) {
			const affectDepthOfReadingPatterns = patterns.filter(utils.pattern.isAffectDepthOfReadingPattern);
			return utils.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this._micromatchOptions);
		}
		_filter(basePath, entry, matcher, negativeRe) {
			if (this._isSkippedByDeep(basePath, entry.path)) return false;
			if (this._isSkippedSymbolicLink(entry)) return false;
			const filepath = utils.path.removeLeadingDotSegment(entry.path);
			if (this._isSkippedByPositivePatterns(filepath, matcher)) return false;
			return this._isSkippedByNegativePatterns(filepath, negativeRe);
		}
		_isSkippedByDeep(basePath, entryPath) {
			/**
			* Avoid unnecessary depth calculations when it doesn't matter.
			*/
			if (this._settings.deep === Infinity) return false;
			return this._getEntryLevel(basePath, entryPath) >= this._settings.deep;
		}
		_getEntryLevel(basePath, entryPath) {
			const entryPathDepth = entryPath.split("/").length;
			if (basePath === "") return entryPathDepth;
			return entryPathDepth - basePath.split("/").length;
		}
		_isSkippedSymbolicLink(entry) {
			return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink();
		}
		_isSkippedByPositivePatterns(entryPath, matcher) {
			return !this._settings.baseNameMatch && !matcher.match(entryPath);
		}
		_isSkippedByNegativePatterns(entryPath, patternsRe) {
			return !utils.pattern.matchAny(entryPath, patternsRe);
		}
	};
	exports.default = DeepFilter;
}));
//#endregion
//#region node_modules/fast-glob/out/providers/filters/entry.js
var require_entry$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const utils = require_utils$1();
	var EntryFilter = class {
		constructor(_settings, _micromatchOptions) {
			this._settings = _settings;
			this._micromatchOptions = _micromatchOptions;
			this.index = /* @__PURE__ */ new Map();
		}
		getFilter(positive, negative) {
			const [absoluteNegative, relativeNegative] = utils.pattern.partitionAbsoluteAndRelative(negative);
			const patterns = {
				positive: { all: utils.pattern.convertPatternsToRe(positive, this._micromatchOptions) },
				negative: {
					absolute: utils.pattern.convertPatternsToRe(absoluteNegative, Object.assign(Object.assign({}, this._micromatchOptions), { dot: true })),
					relative: utils.pattern.convertPatternsToRe(relativeNegative, Object.assign(Object.assign({}, this._micromatchOptions), { dot: true }))
				}
			};
			return (entry) => this._filter(entry, patterns);
		}
		_filter(entry, patterns) {
			const filepath = utils.path.removeLeadingDotSegment(entry.path);
			if (this._settings.unique && this._isDuplicateEntry(filepath)) return false;
			if (this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry)) return false;
			const isMatched = this._isMatchToPatternsSet(filepath, patterns, entry.dirent.isDirectory());
			if (this._settings.unique && isMatched) this._createIndexRecord(filepath);
			return isMatched;
		}
		_isDuplicateEntry(filepath) {
			return this.index.has(filepath);
		}
		_createIndexRecord(filepath) {
			this.index.set(filepath, void 0);
		}
		_onlyFileFilter(entry) {
			return this._settings.onlyFiles && !entry.dirent.isFile();
		}
		_onlyDirectoryFilter(entry) {
			return this._settings.onlyDirectories && !entry.dirent.isDirectory();
		}
		_isMatchToPatternsSet(filepath, patterns, isDirectory) {
			if (!this._isMatchToPatterns(filepath, patterns.positive.all, isDirectory)) return false;
			if (this._isMatchToPatterns(filepath, patterns.negative.relative, isDirectory)) return false;
			if (this._isMatchToAbsoluteNegative(filepath, patterns.negative.absolute, isDirectory)) return false;
			return true;
		}
		_isMatchToAbsoluteNegative(filepath, patternsRe, isDirectory) {
			if (patternsRe.length === 0) return false;
			const fullpath = utils.path.makeAbsolute(this._settings.cwd, filepath);
			return this._isMatchToPatterns(fullpath, patternsRe, isDirectory);
		}
		_isMatchToPatterns(filepath, patternsRe, isDirectory) {
			if (patternsRe.length === 0) return false;
			const isMatched = utils.pattern.matchAny(filepath, patternsRe);
			if (!isMatched && isDirectory) return utils.pattern.matchAny(filepath + "/", patternsRe);
			return isMatched;
		}
	};
	exports.default = EntryFilter;
}));
//#endregion
//#region node_modules/fast-glob/out/providers/filters/error.js
var require_error = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const utils = require_utils$1();
	var ErrorFilter = class {
		constructor(_settings) {
			this._settings = _settings;
		}
		getFilter() {
			return (error) => this._isNonFatalError(error);
		}
		_isNonFatalError(error) {
			return utils.errno.isEnoentCodeError(error) || this._settings.suppressErrors;
		}
	};
	exports.default = ErrorFilter;
}));
//#endregion
//#region node_modules/fast-glob/out/providers/transformers/entry.js
var require_entry = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const utils = require_utils$1();
	var EntryTransformer = class {
		constructor(_settings) {
			this._settings = _settings;
		}
		getTransformer() {
			return (entry) => this._transform(entry);
		}
		_transform(entry) {
			let filepath = entry.path;
			if (this._settings.absolute) {
				filepath = utils.path.makeAbsolute(this._settings.cwd, filepath);
				filepath = utils.path.unixify(filepath);
			}
			if (this._settings.markDirectories && entry.dirent.isDirectory()) filepath += "/";
			if (!this._settings.objectMode) return filepath;
			return Object.assign(Object.assign({}, entry), { path: filepath });
		}
	};
	exports.default = EntryTransformer;
}));
//#endregion
//#region node_modules/fast-glob/out/providers/provider.js
var require_provider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const path = require_path$1();
	const deep_1 = require_deep();
	const entry_1 = require_entry$1();
	const error_1 = require_error();
	const entry_2 = require_entry();
	var Provider = class {
		constructor(_settings) {
			this._settings = _settings;
			this.errorFilter = new error_1.default(this._settings);
			this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions());
			this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions());
			this.entryTransformer = new entry_2.default(this._settings);
		}
		_getRootDirectory(task) {
			return path.resolve(this._settings.cwd, task.base);
		}
		_getReaderOptions(task) {
			const basePath = task.base === "." ? "" : task.base;
			return {
				basePath,
				pathSegmentSeparator: "/",
				concurrency: this._settings.concurrency,
				deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
				entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
				errorFilter: this.errorFilter.getFilter(),
				followSymbolicLinks: this._settings.followSymbolicLinks,
				fs: this._settings.fs,
				stats: this._settings.stats,
				throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
				transform: this.entryTransformer.getTransformer()
			};
		}
		_getMicromatchOptions() {
			return {
				dot: this._settings.dot,
				matchBase: this._settings.baseNameMatch,
				nobrace: !this._settings.braceExpansion,
				nocase: !this._settings.caseSensitiveMatch,
				noext: !this._settings.extglob,
				noglobstar: !this._settings.globstar,
				posix: true,
				strictSlashes: false
			};
		}
	};
	exports.default = Provider;
}));
//#endregion
//#region node_modules/fast-glob/out/providers/async.js
var require_async = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const async_1 = require_async$1();
	const provider_1 = require_provider();
	var ProviderAsync = class extends provider_1.default {
		constructor() {
			super(...arguments);
			this._reader = new async_1.default(this._settings);
		}
		async read(task) {
			const root = this._getRootDirectory(task);
			const options = this._getReaderOptions(task);
			return (await this.api(root, task, options)).map((entry) => options.transform(entry));
		}
		api(root, task, options) {
			if (task.dynamic) return this._reader.dynamic(root, options);
			return this._reader.static(task.patterns, options);
		}
	};
	exports.default = ProviderAsync;
}));
//#endregion
//#region node_modules/fast-glob/out/providers/stream.js
var require_stream = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const stream_1 = __require("stream");
	const stream_2 = require_stream$1();
	const provider_1 = require_provider();
	var ProviderStream = class extends provider_1.default {
		constructor() {
			super(...arguments);
			this._reader = new stream_2.default(this._settings);
		}
		read(task) {
			const root = this._getRootDirectory(task);
			const options = this._getReaderOptions(task);
			const source = this.api(root, task, options);
			const destination = new stream_1.Readable({
				objectMode: true,
				read: () => {}
			});
			source.once("error", (error) => destination.emit("error", error)).on("data", (entry) => destination.emit("data", options.transform(entry))).once("end", () => destination.emit("end"));
			destination.once("close", () => source.destroy());
			return destination;
		}
		api(root, task, options) {
			if (task.dynamic) return this._reader.dynamic(root, options);
			return this._reader.static(task.patterns, options);
		}
	};
	exports.default = ProviderStream;
}));
//#endregion
//#region node_modules/fast-glob/out/readers/sync.js
var require_sync$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const fsStat = require_out$3();
	const fsWalk = require_out$1();
	const reader_1 = require_reader();
	var ReaderSync = class extends reader_1.default {
		constructor() {
			super(...arguments);
			this._walkSync = fsWalk.walkSync;
			this._statSync = fsStat.statSync;
		}
		dynamic(root, options) {
			return this._walkSync(root, options);
		}
		static(patterns, options) {
			const entries = [];
			for (const pattern of patterns) {
				const filepath = this._getFullEntryPath(pattern);
				const entry = this._getEntry(filepath, pattern, options);
				if (entry === null || !options.entryFilter(entry)) continue;
				entries.push(entry);
			}
			return entries;
		}
		_getEntry(filepath, pattern, options) {
			try {
				const stats = this._getStat(filepath);
				return this._makeEntry(stats, pattern);
			} catch (error) {
				if (options.errorFilter(error)) return null;
				throw error;
			}
		}
		_getStat(filepath) {
			return this._statSync(filepath, this._fsStatSettings);
		}
	};
	exports.default = ReaderSync;
}));
//#endregion
//#region node_modules/fast-glob/out/providers/sync.js
var require_sync = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const sync_1 = require_sync$1();
	const provider_1 = require_provider();
	var ProviderSync = class extends provider_1.default {
		constructor() {
			super(...arguments);
			this._reader = new sync_1.default(this._settings);
		}
		read(task) {
			const root = this._getRootDirectory(task);
			const options = this._getReaderOptions(task);
			return this.api(root, task, options).map(options.transform);
		}
		api(root, task, options) {
			if (task.dynamic) return this._reader.dynamic(root, options);
			return this._reader.static(task.patterns, options);
		}
	};
	exports.default = ProviderSync;
}));
//#endregion
//#region node_modules/fast-glob/out/settings.js
var require_settings = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DEFAULT_FILE_SYSTEM_ADAPTER = void 0;
	const fs$1 = __require("fs");
	const os = __require("os");
	/**
	* The `os.cpus` method can return zero. We expect the number of cores to be greater than zero.
	* https://github.com/nodejs/node/blob/7faeddf23a98c53896f8b574a6e66589e8fb1eb8/lib/os.js#L106-L107
	*/
	const CPU_COUNT = Math.max(os.cpus().length, 1);
	exports.DEFAULT_FILE_SYSTEM_ADAPTER = {
		lstat: fs$1.lstat,
		lstatSync: fs$1.lstatSync,
		stat: fs$1.stat,
		statSync: fs$1.statSync,
		readdir: fs$1.readdir,
		readdirSync: fs$1.readdirSync
	};
	var Settings = class {
		constructor(_options = {}) {
			this._options = _options;
			this.absolute = this._getValue(this._options.absolute, false);
			this.baseNameMatch = this._getValue(this._options.baseNameMatch, false);
			this.braceExpansion = this._getValue(this._options.braceExpansion, true);
			this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, true);
			this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT);
			this.cwd = this._getValue(this._options.cwd, process.cwd());
			this.deep = this._getValue(this._options.deep, Infinity);
			this.dot = this._getValue(this._options.dot, false);
			this.extglob = this._getValue(this._options.extglob, true);
			this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, true);
			this.fs = this._getFileSystemMethods(this._options.fs);
			this.globstar = this._getValue(this._options.globstar, true);
			this.ignore = this._getValue(this._options.ignore, []);
			this.markDirectories = this._getValue(this._options.markDirectories, false);
			this.objectMode = this._getValue(this._options.objectMode, false);
			this.onlyDirectories = this._getValue(this._options.onlyDirectories, false);
			this.onlyFiles = this._getValue(this._options.onlyFiles, true);
			this.stats = this._getValue(this._options.stats, false);
			this.suppressErrors = this._getValue(this._options.suppressErrors, false);
			this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, false);
			this.unique = this._getValue(this._options.unique, true);
			if (this.onlyDirectories) this.onlyFiles = false;
			if (this.stats) this.objectMode = true;
			this.ignore = [].concat(this.ignore);
		}
		_getValue(option, value) {
			return option === void 0 ? value : option;
		}
		_getFileSystemMethods(methods = {}) {
			return Object.assign(Object.assign({}, exports.DEFAULT_FILE_SYSTEM_ADAPTER), methods);
		}
	};
	exports.default = Settings;
}));
//#endregion
//#region src/index.ts
var import_out = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	const taskManager = require_tasks();
	const async_1 = require_async();
	const stream_1 = require_stream();
	const sync_1 = require_sync();
	const settings_1 = require_settings();
	const utils = require_utils$1();
	async function FastGlob(source, options) {
		assertPatternsInput(source);
		const works = getWorks(source, async_1.default, options);
		const result = await Promise.all(works);
		return utils.array.flatten(result);
	}
	(function(FastGlob) {
		FastGlob.glob = FastGlob;
		FastGlob.globSync = sync;
		FastGlob.globStream = stream;
		FastGlob.async = FastGlob;
		function sync(source, options) {
			assertPatternsInput(source);
			const works = getWorks(source, sync_1.default, options);
			return utils.array.flatten(works);
		}
		FastGlob.sync = sync;
		function stream(source, options) {
			assertPatternsInput(source);
			const works = getWorks(source, stream_1.default, options);
			/**
			* The stream returned by the provider cannot work with an asynchronous iterator.
			* To support asynchronous iterators, regardless of the number of tasks, we always multiplex streams.
			* This affects performance (+25%). I don't see best solution right now.
			*/
			return utils.stream.merge(works);
		}
		FastGlob.stream = stream;
		function generateTasks(source, options) {
			assertPatternsInput(source);
			const patterns = [].concat(source);
			const settings = new settings_1.default(options);
			return taskManager.generate(patterns, settings);
		}
		FastGlob.generateTasks = generateTasks;
		function isDynamicPattern(source, options) {
			assertPatternsInput(source);
			const settings = new settings_1.default(options);
			return utils.pattern.isDynamicPattern(source, settings);
		}
		FastGlob.isDynamicPattern = isDynamicPattern;
		function escapePath(source) {
			assertPatternsInput(source);
			return utils.path.escape(source);
		}
		FastGlob.escapePath = escapePath;
		function convertPathToPattern(source) {
			assertPatternsInput(source);
			return utils.path.convertPathToPattern(source);
		}
		FastGlob.convertPathToPattern = convertPathToPattern;
		(function(posix) {
			function escapePath(source) {
				assertPatternsInput(source);
				return utils.path.escapePosixPath(source);
			}
			posix.escapePath = escapePath;
			function convertPathToPattern(source) {
				assertPatternsInput(source);
				return utils.path.convertPosixPathToPattern(source);
			}
			posix.convertPathToPattern = convertPathToPattern;
		})(FastGlob.posix || (FastGlob.posix = {}));
		(function(win32) {
			function escapePath(source) {
				assertPatternsInput(source);
				return utils.path.escapeWindowsPath(source);
			}
			win32.escapePath = escapePath;
			function convertPathToPattern(source) {
				assertPatternsInput(source);
				return utils.path.convertWindowsPathToPattern(source);
			}
			win32.convertPathToPattern = convertPathToPattern;
		})(FastGlob.win32 || (FastGlob.win32 = {}));
	})(FastGlob || (FastGlob = {}));
	function getWorks(source, _Provider, options) {
		const patterns = [].concat(source);
		const settings = new settings_1.default(options);
		const tasks = taskManager.generate(patterns, settings);
		const provider = new _Provider(settings);
		return tasks.map(provider.read, provider);
	}
	function assertPatternsInput(input) {
		if (![].concat(input).every((item) => utils.string.isString(item) && !utils.string.isEmpty(item))) throw new TypeError("Patterns must be a string (non empty) or an array of strings");
	}
	module.exports = FastGlob;
})))(), 1);
console.log(maxTokenLength);
const paths = import_out.default.globSync(process$1.argv[2]);
for (const path of paths) {
	if (!path.endsWith(prefix)) continue;
	console.log(chalk.bgBlue("file detected"), path);
	main_default(fs.readFileSync(path).toString());
}
//#endregion
