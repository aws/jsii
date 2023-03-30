import { Readable, Writable, pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { parser } from 'stream-json';
import * as Assembler from 'stream-json/Assembler';
import { disassembler } from 'stream-json/Disassembler';
import { stringer } from 'stream-json/Stringer';

// NB: In node 15+, there is a node:stream.promises object that has this built-in.
const asyncPipeline = promisify(pipeline);

/**
 * Asynchronously parses a single JSON value from the provided reader. The JSON
 * text might be longer than what could fit in a single string value, since the
 * processing is done in a streaming manner.
 *
 * Prefer using JSON.parse if you know the entire JSON text is always small
 * enough to fit in a string value, as this would have better performance.
 *
 * @param reader the reader from which to consume JSON text.
 *
 * @returns the parse JSON value as a Javascript value.
 */
export async function parse(reader: Readable): Promise<any> {
  const assembler = new Assembler();
  const jsonParser = parser();
  assembler.connectTo(jsonParser);
  return asyncPipeline(reader, jsonParser).then(() => assembler.current);
}

/**
 * Serializes a possibly large object into the provided writer. The object may
 * be large enough that the JSON text cannot fit in a single string value.
 *
 * Prefer using JSON.stringify if you know the object is always small enough
 * that the JSON text can fit in a single string value, as this would have
 * better performance.
 *
 * @param value the value to be serialized.
 * @param writer the write in which to write the JSON text.
 */
export async function stringify(value: any, writer: Writable): Promise<void> {
  const reader = new Readable({ objectMode: true });
  reader.push(value);
  reader.push(null);

  return asyncPipeline(reader, disassembler(), stringer(), writer);
}
