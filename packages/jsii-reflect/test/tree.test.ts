import { Printer } from 'oo-ascii-tree';
import { dirname } from 'path';

import { TEST_FEATURES } from './features';
import { TypeSystemTree } from '../lib/tree';
import { TypeSystem } from '../lib/type-system';

const typeSystem = new TypeSystem();

beforeAll(() =>
  typeSystem.loadModule(dirname(require.resolve('jsii-calc/package.json')), {
    supportedFeatures: TEST_FEATURES,
  }),
);

test('defaults', () => {
  const stream = new StringWriter();
  new TypeSystemTree(typeSystem, { colors: false }).printTree(stream);
  expect(stream.stringContent).toMatchSnapshot();
});

test('showAll', () => {
  const stream = new StringWriter();
  new TypeSystemTree(typeSystem, { colors: false, showAll: true }).printTree(
    stream,
  );
  expect(stream.stringContent).toMatchSnapshot();
});

test('types', () => {
  const stream = new StringWriter();
  new TypeSystemTree(typeSystem, { colors: false, types: true }).printTree(
    stream,
  );
  expect(stream.stringContent).toMatchSnapshot();
});

test('members', () => {
  const stream = new StringWriter();
  new TypeSystemTree(typeSystem, { colors: false, members: true }).printTree(
    stream,
  );
  expect(stream.stringContent).toMatchSnapshot();
});

test('inheritance', () => {
  const stream = new StringWriter();
  new TypeSystemTree(typeSystem, {
    colors: false,
    inheritance: true,
  }).printTree(stream);
  expect(stream.stringContent).toMatchSnapshot();
});

test('signatures', () => {
  const stream = new StringWriter();
  new TypeSystemTree(typeSystem, { colors: false, signatures: true }).printTree(
    stream,
  );
  expect(stream.stringContent).toMatchSnapshot();
});

class StringWriter implements Printer {
  private buffer: Buffer = Buffer.alloc(0);

  public write(buffer: Buffer | string, cb?: () => void): boolean;
  public write(str: string, encoding?: string, cb?: () => void): boolean;
  public write(
    chunk: Buffer | string,
    _encoding?: string | (() => void),
    cb?: () => void,
  ): boolean {
    if (Buffer.isBuffer(chunk)) {
      this.buffer = Buffer.concat([this.buffer, chunk]);
    } else {
      this.buffer = Buffer.concat([this.buffer, Buffer.from(chunk)]);
    }
    if (cb != null) {
      cb();
    }
    return true;
  }

  public get stringContent(): string {
    return this.buffer.toString('utf-8');
  }
}
