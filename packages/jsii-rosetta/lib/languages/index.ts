import { AstHandler } from '../renderer';
import { CSharpVisitor } from './csharp';
import { JavaVisitor } from './java';
import { PythonVisitor } from './python';

export type TargetLanguage = 'python' | 'csharp' | 'java';
export type VisitorFactory = () => AstHandler<any>;

export const TARGET_LANGUAGES: { [key in TargetLanguage]: VisitorFactory } = {
  python: () => new PythonVisitor(),
  csharp: () => new CSharpVisitor(),
  java: () => new JavaVisitor(),
};
