// javac decodes \u escapes before it sees comments (JLS 3.3), so no "\u" may survive
export function escapeJavadoc(text: string): string {
  return text.replace(/\*\//g, '*\\/').replace(/\\u/g, '&#92;u');
}
