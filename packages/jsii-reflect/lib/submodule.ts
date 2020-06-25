// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ModuleLike } from './module-like';
import { Type } from './type';
import { TypeSystem } from './type-system';

export class Submodule extends ModuleLike {
  /**
   * The simple name of the submodule (the last segment of the `fullName`).
   */
  public readonly name: string;

  public constructor(
    system: TypeSystem,
    public readonly fqn: string,
    public readonly submodules: readonly Submodule[],
    public readonly types: readonly Type[],
  ) {
    super(system);

    this.name = fqn.split('.').pop()!;
  }
}
