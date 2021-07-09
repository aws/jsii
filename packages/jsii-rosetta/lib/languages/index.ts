import { AstHandler } from '../renderer';
import { CSharpVisitor } from './csharp';
import { JavaVisitor } from './java';
import { PythonVisitor } from './python';
import { TargetLanguage } from './target-language';

export { TargetLanguage };

export type VisitorFactory = () => AstHandler<any>;

export const TARGET_LANGUAGES: { [key in TargetLanguage]: VisitorFactory } = {
  python: () => new PythonVisitor(),
  csharp: () => new CSharpVisitor(),
  java: () => new JavaVisitor(),
};
