import { importDeclaration, identifier, importDefaultSpecifier, stringLiteral } from '@babel/types';
import Codebase from '..';

const str = JSON.stringify;

describe('FileContainer', () => {
  test('Everything works as expected', async () => {
    const files: [string, string][] = [1, 2, 3].map((x: number) => {
      return [`/home/projects/project/path${x}`, 'export default (x) => x * x'];
    });
    const pipeline: Function[] = [];

    const opts: CodebaseOpts = {
      pipeline,
      files,
      src: '/home/projects/project/',
      extensions: [],
      ignoredFiles: [],
      ignoredImports: [],
      packageContents: {},
    };

    const codebase = new Codebase(opts);
    const filesContainer = codebase.extractFiles();
    const file: FileContainerType = filesContainer[0];

    expect(file.pathname).toBe('/project/path1');
    expect(file.fullPath).toBe('/home/projects/project/path1');
    file.parse();
    expect(file.simple).toBe(true);
    expect(str(file.codeToAST())).toBe(
      '{"type":"File","start":0,"end":27,"loc":{"start":{"line":1,"column":0,"index":0},"end":{"line":1,"column":27,"index":27}},"errors":[],"program":{"type":"Program","start":0,"end":27,"loc":{"start":{"line":1,"column":0,"index":0},"end":{"line":1,"column":27,"index":27}},"sourceType":"module","interpreter":null,"body":[{"type":"ExportDefaultDeclaration","start":0,"end":27,"loc":{"start":{"line":1,"column":0,"index":0},"end":{"line":1,"column":27,"index":27}},"exportKind":"value","declaration":{"type":"ArrowFunctionExpression","start":15,"end":27,"loc":{"start":{"line":1,"column":15,"index":15},"end":{"line":1,"column":27,"index":27}},"id":null,"generator":false,"async":false,"params":[{"type":"Identifier","start":16,"end":17,"loc":{"start":{"line":1,"column":16,"index":16},"end":{"line":1,"column":17,"index":17},"identifierName":"x"},"name":"x"}],"body":{"type":"BinaryExpression","start":22,"end":27,"loc":{"start":{"line":1,"column":22,"index":22},"end":{"line":1,"column":27,"index":27}},"left":{"type":"Identifier","start":22,"end":23,"loc":{"start":{"line":1,"column":22,"index":22},"end":{"line":1,"column":23,"index":23},"identifierName":"x"},"name":"x"},"operator":"*","right":{"type":"Identifier","start":26,"end":27,"loc":{"start":{"line":1,"column":26,"index":26},"end":{"line":1,"column":27,"index":27},"identifierName":"x"},"name":"x"}}}}],"directives":[]},"comments":[]}'
    );
    expect(file.astToCode(file.ast)).toBe('export default x => x * x;');
    expect(file.print()).toBe('export default x => x * x;');

    const declaration = importDeclaration([importDefaultSpecifier(identifier('myModule'))], stringLiteral('my-module'));

    file.addImport(declaration);

    expect(file.print()).toBe('import myModule from "my-module";\nexport default x => x * x;');
  }, 7000);
});
