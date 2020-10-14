import { tmpdir } from 'os';
import { join } from 'path';
import { Callback, traverseDependencyGraph } from '../lib/dependency-graph';

const mockHost = {
  readJson: jest.fn<Promise<any>, [string]>().mockName('fs.readJson'),
  resolveDependencyDirectory: jest
    .fn<string, [string, string]>()
    .mockName('resolveDependencyDirectory'),
};

afterEach((done) => {
  jest.resetAllMocks();
  done();
});

test('de-duplicates package root directories', async () => {
  // GIVEN the following package dependency graph:
  //    A -> B -> C
  //    A -> C
  const packages: Record<string, { root: string; meta: any }> = {
    A: {
      root: join(tmpdir(), 'A'),
      meta: { dependencies: { B: '*' }, peerDependencies: { C: '*' } },
    },
    B: { root: join(tmpdir(), 'B'), meta: { dependencies: { C: '*' } } },
    C: { root: join(tmpdir(), 'C'), meta: {} },
  };

  const cb: Callback = jest
    .fn()
    .mockName('callback')
    .mockImplementation(() => true);

  mockHost.readJson.mockImplementation((file) => {
    const result = Object.values(packages).find(
      ({ root }) => file === join(root, 'package.json'),
    )?.meta;
    return result != null
      ? Promise.resolve(result)
      : Promise.reject(new Error(`Unexpected file access: ${file}`));
  });

  mockHost.resolveDependencyDirectory.mockImplementation((_dir, dep) => {
    const result = packages[dep]?.root;
    if (result == null) {
      throw new Error(`Unknown dependency: ${dep}`);
    }
    return result;
  });

  // WHEN
  await expect(
    traverseDependencyGraph(packages.A.root, cb, mockHost),
  ).resolves.not.toThrow();

  // THEN
  expect(cb).toHaveBeenCalledTimes(3);

  for (const { root, meta } of Object.values(packages)) {
    expect(cb).toHaveBeenCalledWith(root, meta, root === packages.A.root);
  }

  expect(mockHost.readJson).toHaveBeenCalledTimes(3);
  expect(mockHost.resolveDependencyDirectory).toHaveBeenCalledTimes(3);
});

test('stops traversing when callback returns false', async () => {
  // GIVEN the following package dependency graph:
  //    A -> B -> C
  const packages: Record<string, { root: string; meta: any }> = {
    A: { root: join(tmpdir(), 'A'), meta: { dependencies: { B: '*' } } },
    B: { root: join(tmpdir(), 'B'), meta: { peerDependencies: { C: '*' } } },
    C: { root: join(tmpdir(), 'C'), meta: {} },
  };

  // The callback requests aborting once it reached B
  const cb: Callback = jest
    .fn()
    .mockName('callback')
    .mockImplementation((root) => root !== packages.B.root);

  mockHost.readJson.mockImplementation((file) => {
    const result = Object.values(packages).find(
      ({ root }) => file === join(root, 'package.json'),
    )?.meta;
    return result != null
      ? Promise.resolve(result)
      : Promise.reject(new Error(`Unexpected file access: ${file}`));
  });

  mockHost.resolveDependencyDirectory.mockImplementation((_dir, dep) => {
    const result = packages[dep]?.root;
    if (result == null) {
      throw new Error(`Unknown dependency: ${dep}`);
    }
    return result;
  });

  // WHEN
  await expect(
    traverseDependencyGraph(packages.A.root, cb, mockHost),
  ).resolves.not.toThrow();

  // THEN
  expect(cb).toHaveBeenCalledTimes(2);

  expect(cb).toHaveBeenCalledWith(packages.A.root, packages.A.meta, true);
  expect(cb).toHaveBeenCalledWith(packages.B.root, packages.B.meta, false);

  expect(mockHost.readJson).toHaveBeenCalledTimes(2);
  expect(mockHost.resolveDependencyDirectory).toHaveBeenCalledTimes(1);
});
