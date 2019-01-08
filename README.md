# PostCSS Plugin Namespace [![Build Status][ci-img]][ci]

[PostCSS] A PostCSS plugin that could add css selector before all selectors,so that the styles will not affect other projects.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/ymrdf/postcss-plugin-namespace.svg
[ci]:      https://travis-ci.org/ymrdf/postcss-plugin-namespace

## Usage
passed a css selector as the first argument;

```js
postcss([ require('postcss-plugin-namespace')('.insert-selector') ])
```

### input
```css
.foo {
    /* Input example */
}
```
### output
```css
.insert-selector .foo {
  /* Output example */
}
```

### Options

Pass an options object as the second argument.

#### options.ignore

Don't prefix specific classes or classes that match a regex.

```js
var css = postcss([namespace('.test', { ignore: [ /body/, ".icon" ] })])
  .process(inputCSS)
  .then(results => {results.toString()});
```

See [PostCSS] docs for examples for your environment.
