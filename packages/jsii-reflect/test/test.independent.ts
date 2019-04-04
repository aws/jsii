import { sourceToAssemblyHelper  } from 'jsii';
import reflect = require('../lib');

test('get full github source location for a class or method', async () => {
  // WHEN
  const assembly = await loadSource(`
    class Foo {
      public foo() {
        console.log('foo');
      }
    }
  `, {
    repositoryLocation: 'some/sub/dir',
  });

  // THEN
  const klass = assembly.findType('testpkg.Foo');
  expect(klass.isClassType).toBeTruthy();

  expect(reflect.repositoryUrl(klass)).toBe('https://github.com/aws-cdk/jsii/blob/master/some/sub/dir/index.ts#L1');
});

async function loadSource(source: string, jsiiConfig = {}): Promise<reflect.Assembly> {
  const ass = await sourceToAssemblyHelper(source, jsiiConfig);
  const ts = new reflect.TypeSystem();
  return ts.addAssembly(new reflect.Assembly(ts, ass));
}