import { NodeRelease } from './constants';

// This test is there to ensure house-keeping happens when it should. If we are
// testing a given node release, it must be registered in constants.ts, and it
// must not be a "known broken" release.
test('tested node releases are correctly registered & supported', () => {
  const { nodeRelease, knownBroken } = NodeRelease.forThisRuntime();
  expect(nodeRelease).toBeDefined();
  expect(knownBroken).toBeFalsy();
});

// This test is there to ensure house-keeping happens when it should. If we are
// testing a given node release, it must not have been EOL for over 30 days.
test('tested node release have not ben EOL for more than 30 days', () => {
  const { nodeRelease } = NodeRelease.forThisRuntime();
  expect(nodeRelease?.endOfLifeDate?.getTime()).toBeGreaterThan(
    Date.now() - 30 * 86_400_000,
  );
});
