# rectangly

[![Build Status](https://travis-ci.org/ZEISS/rectangly.svg?branch=master)](https://travis-ci.org/ZEISS/rectangly)
[![npm](https://img.shields.io/npm/v/rectangly.svg)](https://www.npmjs.com/package/rectangly)
[![node](https://img.shields.io/node/v/rectangly.svg)](https://www.npmjs.com/package/rectangly)
[![GitHub tag](https://img.shields.io/github/tag/ZEISS/rectangly.svg)](https://github.com/ZEISS/rectangly/releases)
[![GitHub issues](https://img.shields.io/github/issues/ZEISS/rectangly.svg)](https://github.com/ZEISS/rectangly/issues)

A custom Angular 4+ renderer to use React for displaying the views. Ever wanted to use (most of) the React ecosystem in your Angular app? *rectangly* is here to help you out.

## Hello World

Using *rectangly* is as simple as importing it via

```sh
npm i rectangly
```

and applying the following changes to your application root module.

```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Rectangly } from 'rectangly';
import { MyPageComponent } from './mypage';

@NgModule({
  imports: [BrowserModule],
  providers: [Rectangly],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [MyPageComponent],
  bootstrap: [MyPageComponent],
})
export class PageModule {}
```

If you want to use some already created React components you should register them first:


```typescript
import { registerComponents } from 'rectangly';
import { Button } from './mycomponents';

registerComponents('my', {
  Button,
});
```

Using the this custom element in Angular templates is as simple as writing

```html
<my-Button [disabled]="true" (onClick)="toggleDisabled()">Toggle me</my-Button>
```

While standard attributes only supply strings to React, computed attributes (using the square brackets) will pass in the evaluated expression. Passing in functions should always be done via the listener attributes (using the round brackets).

## Documentation

(tbd)

## Development

### Installation

For installing the following command is required:

```sh
npm install
```

This will resolve and install all (development) dependencies.

### Tests

Running the tests is as simple as typing:

```sh
npm run test
```

This will also run the linter. The standalone unit tests are available via `test:unit`. Likewise, we can also easily report the code coverage:

```sh
npm run test:unit --coverage
```

## Contributing

Contributions are welcome and happily reviewed / accepted via pull requests. For more details read [CONTRIBUTING.md](CONTRIBUTING.md).

## Changelog

This project adheres to [semantic versioning](https://semver.org).

A changelog exists, which should be rather complete from a high-level point of view. See [CHANGELOG.md](CHANGELOG.md).

## License

MIT © [ZEISS Digital Innovation Partners](https://zeiss.com) see [LICENSE](LICENSE).
