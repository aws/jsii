import * as process from 'process';
import { Range, SemVer } from 'semver';

const ONE_DAY_IN_MILLISECONDS = 86_400_000;

/**
 * The support information for a given node release range.
 *
 * @see https://nodejs.org/en/about/releases/
 */
export class NodeRelease {
  /**
   * How long before enf-of-life do we start warning customers? Expressed in
   * milliseconds to make it easier to deal with JS dates.
   */
  private static readonly DEPRECATION_WINDOW_MS = 30 * ONE_DAY_IN_MILLISECONDS;

  /**
   * All registered node releases.
   */
  public static readonly ALL_RELEASES: readonly NodeRelease[] = [
    // Historical releases (not relevant at time of writing this as they're all EOL now...)
    ...([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const).map(
      (majorVersion) => new NodeRelease(majorVersion, { endOfLife: true }),
    ),

    // Past end-of-life releases
    new NodeRelease(12, {
      endOfLife: new Date('2022-04-30'),
      supportedRange: '^12.7.0',
    }),
    new NodeRelease(13, { endOfLife: new Date('2020-06-01'), untested: true }),
    new NodeRelease(14, {
      endOfLife: new Date('2023-04-30'),
      supportedRange: '^14.17.0',
    }),
    new NodeRelease(15, { endOfLife: new Date('2021-06-01'), untested: true }),
    new NodeRelease(16, {
      endOfLife: new Date('2023-09-11'),
      supportedRange: '^16.3.0',
    }),
    new NodeRelease(17, {
      endOfLife: new Date('2022-06-01'),
      supportedRange: '^17.3.0',
      untested: true,
    }),
    new NodeRelease(19, { endOfLife: new Date('2023-06-01'), untested: true }),

    // Currently active releases (as of last edit to this file...)
    new NodeRelease(18, { endOfLife: new Date('2025-04-30') }),
    new NodeRelease(20, { endOfLife: new Date('2026-04-30') }),
    new NodeRelease(21, { endOfLife: new Date('2024-06-01'), untested: true }),
    new NodeRelease(22, { endOfLife: new Date('2027-04-30') }),

    // Future (planned releases)
  ];

  /**
   * @returns the `NodeRelease` corresponding to the version of the node runtime
   *          executing this code (as provided by `process.version`), and a
   *          boolean indicating whether this version is known to be broken. If
   *          the runtime does not correspond to a known node major, this
   *          returns an `undefined` release object.
   */
  public static forThisRuntime(): {
    nodeRelease: NodeRelease | undefined;
    knownBroken: boolean;
  } {
    const semver = new SemVer(process.version);
    const majorVersion = semver.major;

    for (const nodeRelease of this.ALL_RELEASES) {
      if (nodeRelease.majorVersion === majorVersion) {
        return {
          nodeRelease,
          knownBroken: !nodeRelease.supportedRange.test(semver),
        };
      }
    }

    return { nodeRelease: undefined, knownBroken: false };
  }

  /**
   * The major version of this node release.
   */
  public readonly majorVersion: number;

  /**
   * The date on which this release range starts to be considered end-of-life.
   * May be `undefined` for "ancient" releases (before Node 12).
   */
  public readonly endOfLifeDate: Date | undefined;

  /**
   * Determines whether this release is currently considered end-of-life.
   */
  public readonly endOfLife: boolean;

  /**
   * Determines whether this release is within the deprecation window ahead of
   * it's end-of-life date.
   */
  public readonly deprecated: boolean;

  /**
   * If `true` denotes that this version of node has not been added to the test
   * matrix yet. This is used when adding not-yet-released versions of node that
   * are already planned (typically one or two years out).
   *
   * @default false
   */
  public readonly untested: boolean;

  /**
   * The range of versions from this release line that are supported (early
   * releases in a new line often lack essential features, and some have known
   * bugs).
   */
  public readonly supportedRange: Range;

  /**
   * Determines whether this major version line is currently "in support",
   * meaning it is not end-of-life nor pending.
   */
  public readonly supported: boolean;

  /** @internal visible for testing */
  public constructor(
    majorVersion: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
    opts: { endOfLife: true },
  );
  /** @internal visible for testing */
  public constructor(
    majorVersion: number,
    opts: {
      endOfLife: Date;
      untested?: boolean;
      supportedRange?: string;
    },
  );
  /** @internal visible for testing */
  public constructor(
    majorVersion: number,
    opts: {
      endOfLife: Date | true;
      untested?: boolean;
      supportedRange?: string;
    },
  ) {
    this.majorVersion = majorVersion;
    this.endOfLifeDate = opts.endOfLife === true ? undefined : opts.endOfLife;
    this.untested = opts.untested ?? false;
    this.supportedRange = new Range(
      opts.supportedRange ?? `^${majorVersion}.0.0`,
    );

    this.endOfLife =
      opts.endOfLife === true || opts.endOfLife.getTime() <= Date.now();
    this.deprecated =
      !this.endOfLife &&
      opts.endOfLife !== true &&
      opts.endOfLife.getTime() - NodeRelease.DEPRECATION_WINDOW_MS <=
        Date.now();

    this.supported = !this.untested && !this.endOfLife;
  }

  public toString(): string {
    const eolInfo = this.endOfLifeDate
      ? ` (Planned end-of-life: ${this.endOfLifeDate
          .toISOString()
          .slice(0, 10)})`
      : '';
    return `${this.supportedRange.raw}${eolInfo}`;
  }
}
