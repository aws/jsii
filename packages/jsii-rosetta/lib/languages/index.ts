import { PythonVisitor } from "./python";
import { AstHandler } from "../renderer";

export type TargetLanguage = 'python';
export type VisitorFactory = () => AstHandler<any>;

export const TARGET_LANGUAGES: {[key in TargetLanguage]: VisitorFactory} = {
  'python': () => new PythonVisitor()
};