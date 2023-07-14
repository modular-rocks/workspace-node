# A Workspace for working with virtual codebases

## Installation

`npm install @modular-rocks/workspace-node`

or 

`yarn add @modular-rocks/workspace-node` 


## Usage

Workspace-node is built directly on top of Workspace and adds further functionality for `NodeJS` environments. Additional options for node specific environments are:

| Option | Description | Type
| -------- | -------- | -------- |
| packageContents (optional) | The hash contents of your `package.json` file | Object{} | 
| packagePath (optional) | The path to your `package.json` file | string | 

[File](https://github.com/modular-rocks/workspace-node/blob/main/src/workspace/codebase/file/index.ts) also contains more `node` specific methods for AST parsing.

## Important

Remember, this isn't only the version for NodeJS, its the version for virtualising a NodeJS codebase, in NodeJS. 

Workspace is written in NodeJS, but can work with any codebase by reading files. This is why `workspace-node` uses packages like `BabelJS` to visit the AST, whereas `workspace` can be configured to use other parsers for other languages / environments.

## Examples

Examples coming soon...

## License

Apache 2.0