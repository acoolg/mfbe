# MFBE Macro

## what is this about
it's a macro for .mcfunction

## what des MFBE stand for
McFunction Bedrock Edition

## config
this is a typescript interface of what the config file `mfbe.json` should be
```ts
interface configFile {
    maxToken: number,
    commandList: string,
    extraList: string[],
    prefix: string
}
```

the `commandList` should be one of these
* `"mcbe2026Default"`
* `"empty"`

this is the default config for example
```json
{
    "maxToken": 4096,
    "commandList": "mcbe2026Default",
    "extraList": [],
    "prefix": ".mfbe"
}
```

## how to use
to install it globally
```bash
npm install -g mcbe-macro
```

to use it
```bash
cd path/to/folder
mfbe <pattern: glob pattern to file> <path: path to export folder>
```

or use the [regolith](example.com) [filter](example.com)

```bash
regolith install mfbe
```

full filter use manual is in my [filter repo](example.com)


## important file tree
```tree
mfbe/
├─ src/
│  ├─ lexer/
│  │  ├─ lexer.ts
│  │  └─ main.ts
│  ├─ parser/
│  │  └─ parser.ts
│  ├─ config.ts
│  ├─ type.ts
│  └─ util.ts
└─ index.ts
```

* ### `src/util.ts` - tools and utils
like `getKeyContent(CharSet, context)` or `token(type, content, line, pointer)` and more

* ### `src/lexer.ts` and `src/main.ts` - the whole lexer logic
nothing more

* ### `src/type.ts` - every type

the full explanation would be in [contrubute helper](https://google.com)

