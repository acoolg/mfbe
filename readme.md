# MFBE Macro

## important file tree
```
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

* ### `src/type.ts`