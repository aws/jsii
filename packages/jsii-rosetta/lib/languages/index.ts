import { AstHandler } from '../renderer';
import { CSharpVisitor } from './csharp';
import { GoVisitor } from './go';
import { JavaVisitor } from './java';
import { PythonVisitor } from './python';
import { TargetLanguage } from './target-language';

export { TargetLanguage };

export interface VisitorFactory {
  readonly version: string;
  createVisitor(): AstHandler<any>;
}

export const TARGET_LANGUAGES: { [key in TargetLanguage]: VisitorFactory } = {
  python: {
    version: PythonVisitor.VERSION,
    createVisitor: () => new PythonVisitor(),
  },
  csharp: {
    version: CSharpVisitor.VERSION,
    createVisitor: () => new CSharpVisitor(),
  },
  java: {
    version: JavaVisitor.VERSION,
    createVisitor: () => new JavaVisitor(),
  },
  go: {
    version: GoVisitor.VERSION,
    createVisitor: () => new GoVisitor(),
  },
};
