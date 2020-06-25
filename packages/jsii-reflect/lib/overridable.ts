// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { Type } from './type';

export interface Overridable {
  /**
   * The name of the parent type (class or interface) that this entity overrides or implements. If undefined, then
   * this entity is the first in it's hierarchy to declare this entity.
   *
   * @default undefined
   */
  overrides?: Type;
}
