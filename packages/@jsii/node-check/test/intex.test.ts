import {
  DEADLINE_EPOCH_MS,
  SupportLevel,
  VERSION_SUPPORT,
} from '../lib/constants';

// This test is there to ensure house-keeping happens when it should. Deprecated
// node releases should move to `SupportLevel.END_OF_LIFE` once the `DEADLINE`
// has been reached.
test('no deprecated version is past deadline', () => {
  const deprecated = Object.entries(VERSION_SUPPORT).filter(
    ([, supportLevel]) => supportLevel === SupportLevel.DEPRECATED,
  );
  expect(
    // Either there are no deprecated ranges
    deprecated.length === 0 ||
      // Or the deadline is in the future
      DEADLINE_EPOCH_MS > Date.now(),
  ).toBeTruthy();
});
