import { PackageInfo, sourceToAssemblyHelper } from 'jsii';
import * as reflect from '../lib';

test('get full github source location for a class or method', async () => {
  // WHEN
  const assembly = await loadSource(
    `
    export class Foo {
      public bar() {
        // Nothing to do
      }
    }
  `.trim(),
    (obj) => (obj.repository.directory = 'some/sub/dir'),
  );

  // THEN
  const klass = assembly.findType('testpkg.Foo');
  expect(klass.isClassType).toBeTruthy();

  expect(reflect.repositoryUrl(klass)).toBe(
    'https://github.com/aws/jsii/blob/master/some/sub/dir/index.ts#L1',
  );
});

async function loadSource(
  source: string,
  cb: (obj: PackageInfo) => void,
): Promise<reflect.Assembly> {
  const ass = await sourceToAssemblyHelper(source, cb);
  const ts = new reflect.TypeSystem();
  return ts.addAssembly(new reflect.Assembly(ts, ass));
}
