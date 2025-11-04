export type KeyFunc<T> = (x: T) => string;
export type DepFunc<T> = (x: T) => string[];

/**
 * Return a topological sort of all elements of xs, according to the given dependency functions
 *
 * Returns tranches of packages that do not have a dependency on each other.
 *
 * Dependencies outside the referenced set are ignored.
 *
 * Not a stable sort, but in order to keep the order as stable as possible, we'll sort by key
 * among elements of equal precedence.
 *
 * @param xs - The elements to sort
 * @param keyFn - Return an element's identifier
 * @param depFn - Return the identifiers of an element's dependencies
 */
export function topologicalSort<T>(
  xs: Iterable<T>,
  keyFn: KeyFunc<T>,
  depFn: DepFunc<T>,
): Toposorted<T> {
  const remaining = new Map<string, TopoElement<T>>();
  for (const element of xs) {
    const key = keyFn(element);
    remaining.set(key, { key, element, dependencies: depFn(element) });
  }

  const ret = new Array<T[]>();
  while (remaining.size > 0) {
    // All elements with no more deps in the set can be ordered
    const selectable = Array.from(remaining.values()).filter((e) =>
      e.dependencies.every((d) => !remaining.has(d)),
    );

    selectable.sort((a, b) => (a.key < b.key ? -1 : b.key < a.key ? 1 : 0));

    ret.push(selectable.map((s) => s.element));

    for (const selected of selectable) {
      remaining.delete(selected.key);
    }

    // If we didn't make any progress, we got stuck
    if (selectable.length === 0) {
      throw new Error(
        `Could not determine ordering between: ${Array.from(
          remaining.keys(),
        ).join(', ')}`,
      );
    }
  }

  return ret;
}

interface TopoElement<T> {
  key: string;
  dependencies: string[];
  element: T;
}

/**
 * For now, model a toposorted list as a list of tranches.
 *
 * Modeling it like this allows for SOME parallelism between nodes,
 * although not maximum. For example, let's say we have A, B, C with
 * C depends-on A, and we sort to:
 *
 *    [[A, B], [C]]
 *
 * Now, let's say A finishes quickly and B takes a long time: we still have
 * to wait for B to finish before we could start C in this modeling.
 *
 * The better alternative would be to model a class that keeps the dependency
 * graph and unlocks nodes as we go through them. That's a lot of effort
 * for now, so we don't do that yet.
 *
 * We do declare the type `Toposorted<A>` here so that if we ever change
 * the type, we can find all usage sites quickly.
 */
export type Toposorted<A> = A[][];
