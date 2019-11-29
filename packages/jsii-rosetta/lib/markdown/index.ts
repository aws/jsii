import { transformMarkdown } from './markdown';
import { JavaDocRenderer } from './javadoc-renderer';
import { CSharpXmlCommentRenderer } from './xml-comment-renderer';
import { StructureRenderer } from './structure-renderer';

/**
 * All the visitors in this module expose CommonMark types in their API
 *
 * We want to keep CommonMark as a private dependency (so we don't have to
 * mark it as peerDependency and can keep its @types in devDependencies),
 * so we re-expose the main functionality needed by pacmak as functions
 * that operate on basic types here.
 */

export function markDownToStructure(source: string) {
  return transformMarkdown(source, new StructureRenderer());
}

export function markDownToJavaDoc(source: string) {
  return transformMarkdown(source, new JavaDocRenderer());
}

export function markDownToXmlDoc(source: string) {
  return transformMarkdown(source, new CSharpXmlCommentRenderer());
}
