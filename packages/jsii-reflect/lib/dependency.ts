// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { TypeSystem } from './type-system';

export class Dependency {
  public constructor(
    public readonly system: TypeSystem,
    private readonly name: string,
    public readonly version: string,
  ) {}

  public get assembly() {
    return this.system.findAssembly(this.name);
  }
}
