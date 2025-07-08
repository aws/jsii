import { NodeRelease } from './constants';

// Fail the build when our current Node version has been EOL too long.
//
// Right now CDK is still on an EOL version of Node (18), and we can't
// fail the build yet. So the deadline is just over half a year now.
const DAYS_THAT_NODEJS_CAN_BE_EOL = 200;

// This test is there to ensure house-keeping happens when it should. If we are
// testing a given node release, it must be registered in constants.ts, and it
// must not be a "known broken" release.
test('tested node releases are correctly registered & supported', () => {
  const { nodeRelease, knownBroken } = NodeRelease.forThisRuntime();
  expect(nodeRelease).toBeDefined();
  expect(knownBroken).toBeFalsy();
});

// This test is there to ensure house-keeping happens when it should. If we are
// testing a given node release, it must not have been EOL for over 60 days.
test(`tested node release (${process.version}) has not been EOL for more than ${DAYS_THAT_NODEJS_CAN_BE_EOL} days`, () => {
  const { nodeRelease } = NodeRelease.forThisRuntime();
  expect(nodeRelease?.endOfLifeDate?.getTime()).toBeGreaterThan(
    Date.now() - DAYS_THAT_NODEJS_CAN_BE_EOL * 86_400_000,
  );
});
