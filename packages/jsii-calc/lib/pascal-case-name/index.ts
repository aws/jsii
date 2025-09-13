/**
 * This module ensures that language code is generated in correct topological order.
 *
 * We deliberately name classes & interfaces so that the ones that must come first in code,
 * are last in alphabetical order.
 *
 * Previously, the generated Python code would miss certain dependencies
 * and effectively render classes alphabetically. Which then obviously fails.
 */

export class Superclass {}
export class Subclass extends Superclass {}
export class SubSubclass extends Subclass {}
