
import { expectPython } from "./python";

test('import/require', async () => {
  await expectPython(`
  import mod = require('@scope/some-module');
  `, `
  import scope.some_module as mod
  `);
});

test('import star-as', async () => {
  await expectPython(`
  import * as mod from '@scope/some-module';
  `, `
  import scope.some_module as mod
  `);
});

test('selective import', async () => {
  await expectPython(`
  import { one, Two, someThree, four as renamed } from '@scope/some-module';
  `, `
  from scope.some_module import one, Two, some_three, four as renamed
  `);
});
