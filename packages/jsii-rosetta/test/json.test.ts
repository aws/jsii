import { kStringMaxLength } from 'node:buffer';
import { PassThrough, Readable, Writable } from 'node:stream';

import { parse, stringify } from '../lib/json';

describe(parse, () => {
  test('small value', async () => {
    const value = { foo: 'bar', baz: 123 };
    const jsonText = JSON.stringify(value);

    const readable = new PassThrough();
    readable.end(jsonText);

    expect(await parse(readable)).toEqual(value);
  });

  test('value is too large to fit in a single string', async () => {
    // We'll leverage the fact JSON can contain multiple definitions of the same key multiple times...
    const expected = { foo: 'bar', baz: 123, bool: true, null: null, long: 'X'.repeat(102_400) };

    const readable = Readable.from(
      (function* () {
        const chunks = Object.entries(expected).map(
          ([key, value]) => `  ${JSON.stringify(key)}: ${JSON.stringify(value)}`,
        );

        yield '{\n';
        let counter = 2;
        let emitComma = false;
        while (counter < kStringMaxLength) {
          for (const chunk of chunks) {
            if (emitComma) {
              yield ',\n';
              counter += 2;
            }
            yield chunk;
            counter += chunk.length;
            emitComma = true;
          }
        }
        yield '\n}\n';
      })(),
    );

    const actual = await parse(readable);
    expect(actual).toEqual(expected);
  });

  test('invalid JSON input', () => {
    const readable = new PassThrough();
    readable.end('{"bad": "JSON",');

    return expect(parse(readable)).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Parser cannot parse input: expected an object key"`,
    );
  });
});

describe(stringify, () => {
  test('small value', async () => {
    const value = { foo: 'bar', baz: 123 };
    const jsonText = JSON.stringify(value);

    const chunks = new Array<Buffer>();
    const writable = new Writable({
      write: (chunk, _encoding, callback) => {
        chunks.push(Buffer.from(chunk));
        callback(null);
      },
    });

    await stringify(value, writable);
    expect(Buffer.concat(chunks).toString('utf-8')).toBe(jsonText);
  });

  test('value too large for JSON text to fit in a string', async () => {
    const value = { key: 'X'.repeat(kStringMaxLength) };

    const chunks = new Array<Buffer>();
    const writable = new Writable({
      write: (chunk, _encoding, callback) => {
        chunks.push(Buffer.from(chunk));
        callback(null);
      },
    });

    await stringify(value, writable);

    expect(headBytes(chunks, 10).toString('utf-8')).toBe('{"key":"XX');
    expect(tailBytes(chunks, 10).toString('utf-8')).toBe('XXXXXXXX"}');
  });
});

function headBytes(chunks: readonly Buffer[], count: number): Buffer {
  if (chunks.length === 0) {
    return Buffer.alloc(0);
  }
  const [head, ...tail] = chunks;
  const headSlice = head.slice(0, count);
  if (headSlice.length === count) {
    return headSlice;
  }

  const tailSlice = headBytes(tail, count - headSlice.length);
  return Buffer.concat([headSlice, tailSlice]);
}

function tailBytes(chunks: readonly Buffer[], count: number): Buffer {
  if (chunks.length === 0) {
    return Buffer.alloc(0);
  }

  const tail = chunks[chunks.length - 1];
  const tailSlice = tail.slice(Math.max(0, tail.length - count), tail.length);
  if (tailSlice.length === count) {
    return tailSlice;
  }

  const headSlice = tailBytes(chunks.slice(0, chunks.length - 1), count - tailSlice.length);
  return Buffer.concat([headSlice, tailSlice]);
}
