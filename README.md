# Integer to Cardinal English

English words from any integer

## Install

```
npm install --save integer-to-cardinal-english
```

## Usage

```node
const cardinal = require("integer-to-cardinal-english");
cardinal(127521);
// => "One Hundred and Twenty-Seven Thousand, Five Hundred and Twenty-One"
```

## Limitations

Vocabulary is currently limited to

    999,999,999,999,999

That is, the library does not currently support one quadrillion or higher.

Higher numbers are easily supported.  If you need it, please don't be shy and
open up a pull request!


## Motivation & Related Work

[Number Reference](http://www.number-reference.com) is an online encyclopedia
of calculations that relies heavily on this and related packages.

## License

Nice and Brief: [BSD-3-Clause](./LICENSE)
