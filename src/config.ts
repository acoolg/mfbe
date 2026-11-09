import * as fs from "node:fs"
import { config as configInterface } from "./type.ts"

const commandPreset = {
    "mcbe2026Default": ["?", "ability", "allowlist", "aimassist", "alwaysday", "camera", "camerashake", "changesetting",
    "clear", "clearspawnpoint", "clone", "connect", "controlscheme", "damage", "daylock", "dedicatedwsserver", "deop", "dialogue",
    "difficulty", "editor-allowlist", "effect", "enchant", "event", "execute", "fill", "fog", "function", "gamemode", "gamerule",
    "gametest", "gametips", "give", "help", "hud", "immutableworld", "inputpermission", "kick", "kill", "list", "locate", "loot",
    "me", "mobevent", "msg", "music", "op", "ops", "particle", "permission", "place", "playanimation", "playsound", "project",
    "recipe", "reload", "reloadconfig", "reloadpacketlimitconfig", "remove", "replaceitem", "ride", "save", "say", "schedule",
    "scoreboard", "script", "scriptevent", "sendshowstoreoffer", "set_movement_authority", "setblock", "setmaxplayers",
    "setworldspawn", "spawnpoint", "spreadplayers", "stop", "stopsound", "structure", "summon", "tag", "teleport", "tell",
    "tellraw", "testfor", "testforblock", "testforblocks", "tickingarea", "time", "title", "titleraw", "toggledownfall", "tp",
    "transfer", "w", "wb", "weather", "whitelist", "worldbuilder", "wsserver", "xp"],
    "empty": []
}


let config: configInterface = {
    commandList: commandPreset["mcbe2026Default"],
    prefix: ".mfbe",
    maxToken: 4096
}

enum configKey {
    maxToken = "maxToken",
    prefix = "prefix",
    extraList = "extraList",
    commandList = "commandList"
}

try {
    const configFile = JSON.parse(fs.readFileSync("mfbe.json").toString())

    if (configFile[configKey.prefix] != undefined) {
        config.prefix = configFile[configKey.prefix]
    }

    if (configFile[configKey.commandList] != undefined) {
        if (configFile[configKey.extraList] != undefined) {
            config.commandList = commandPreset[configFile[configKey.commandList]].concat(configFile[configKey.extraList])
        } else {
            config.commandList = commandPreset[configFile[configKey.commandList]]
        }
        
    }

    if (configFile[configKey.maxToken] != undefined) {
        config.maxToken = configFile[configKey.maxToken]
    }
} catch (_err) {
    console.log("cannnot read the config file, using default config")
}

export const maxTokenLength = config.maxToken
export const prefix = config.prefix
export const commandList = config.commandList