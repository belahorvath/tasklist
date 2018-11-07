[![npm Version][npm-image]][npm-url]
[![License][license-image]][license-url]

# skipRegex

Micro parser for detection of literal regexes.

## Install

```bash
npm install skip-regex --save
```

Two formats, both transpiled to ES5:

* CommonJS for node and browserify-like bundlers.
* ES6 module for [Rollup](https://github.com/rollup/rollup) and the like.

## Syntax

```ts
skipRegex(source: string, start: number) => number
```

The `start` position must point to the first slash inside `source`.

From there, `skipRegex` will find with 99% accuracy the end of a regular expression in the given string.

The returned value is the position of the character following the regex, or `start+1` if a regex was not found.

## Example

```js
import skipRegex from 'skip-regex'

const source = ' /.*/ '
const start  = source.indexOf('/')

if (~start) {
  const end = skipRegex(source, start)

  if (end > start + 1) {      // detected as regex?
    const regex = source.slice(start, end)
    console.log(`Found regex ${regex} at position ${start}!`)
  }
}
```

For Rollup use [rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve) to resolve 'skip-regex' as an ES6 module.

For TypeScript change "from skipRegex" to "= require('skip-regex')":

```ts
import skipRegex = require('skip-regex')

//...
```

## Licence

MIT

[npm-image]:      https://img.shields.io/npm/v/skip-regex.svg
[npm-url]:        https://www.npmjs.com/package/skip-regex
[license-image]:  https://img.shields.io/npm/l/express.svg
[license-url]:    https://github.com/aMarCruz/skip-regex/blob/master/LICENSE
