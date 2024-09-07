# Version Bumpify

![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A Node.js CLI tool to automatically update the version in `package.json`, `package-lock.json`, and the version badge in `README.md.

## Features

- Automatically updates the `version` field in `package.json` and `package-lock.json`.
- Updates the version badge in `README.md` (Shields.io style).
- Simple CLI tool with easy integration into any Node.js project.

## Installation

To install globally:

```bash
npm install -g version-bumpify
```

## Usage

To update the version across `package.json`, `package-lock.json`, and the version badge in `README.md`:

```bash
bumpify <new_version>
```

Example:

```bash
bumpify 2.0.2
```

This command will:

- Update `package.json` and `package-lock.json` to version `2.0.2`.
- Update the Shields.io version badge in `README.md`.

## Example

Before running the command:

```md
![Version](https://img.shields.io/badge/version-vv1.0.4-blue.svg)
```

After running `bump 2.0.2`:

```md
![Version](https://img.shields.io/badge/version-v2.0.2-blue.svg)
```

## Running Tests

To run the test suite:

```bash
npm test
```

This will execute the test cases to ensure the functionality of the bumpify.

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Bugs and Issues

If you find any bugs or have issues, please report them via [GitHub Issues](https://github.com/AmJaradat01/version-bumpify/issues).
