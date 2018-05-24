# rectangly

Custom Angulare renderer

## Installation

Make sure to have yarn globally installed (`npm install yarn -g`). Now run:

```sh
yarn install
```

This will resolve and install all (development) dependencies.

## Usage

Here is a quick example to get you started. All you need is to run:

```sh
yarn start
```

As a result this will start the development server, which runs locally and can be reached via [localhost:9000](http://localhost:9000). The port can be changed from the command line options. The used configuration is displayed in the line starting with "Project is running at".

## Examples

The boilerplate comes with an example HTML page (src/index.html) and an example component (src/components/Hello) that is exposed in the example application (src/index.tsx). Make sure to remove or adjust the parts you don't use.

An example unit test can be found in src/components/Hello/Hello.test.tsx. Running the tests is as simple as typing:

```sh
yarn test
```

This will also run the linter. The standalone unit tests are available via `test:unit`. Likewise, we can also easily report the code coverage:

```sh
yarn test:unit --coverage
```

## Versioning

Incrementing the version can be done via `yarn` as well.

```sh
yarn version
```

This will show the current version and ask for a new version. As a result the information in the package.json is updated. Additionally, a git tag is created with the information (automatically prefixed using a "v"). The process could also be automated, e.g., by specifying the new version directly. So, for instance if our new version is "1.2.3" we just use the following command:

```sh
yarn version --new-version 1.2.3
```

## Documentation

(tbd)

## Contributing

Contributions are welcome and happily reviewed / accepted via pull requests. For more details read [CONTRIBUTING.md](CONTRIBUTING.md).

## Changelog

A changelog exists, which should be rather complete from a high-level point of view. See [CHANGELOG.md](CHANGELOG.md).

## License

MIT © [DCC SIP Team](developer.zeiss.com)
[LICENSE](LICENSE.md)

