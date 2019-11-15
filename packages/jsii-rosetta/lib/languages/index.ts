import { PythonVisitor } from "./python";
import { AstHandler } from "../renderer";
import { CSharpVisitor } from "./csharp";

export type TargetLanguage = 'python' | 'csharp';
export type VisitorFactory = () => AstHandler<any>;

export const TARGET_LANGUAGES: {[key in TargetLanguage]: VisitorFactory} = {
  'python': () => new PythonVisitor(),
  'csharp': () => new CSharpVisitor(),
};