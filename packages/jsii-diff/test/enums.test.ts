// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expectError, expectNoError } from './util';

// Note: an enum with one value behaves weirdly in TypeScript -- it does type analysis to the singleton element.

// ----------------------------------------------------------------------

jest.setTimeout(15_000);

test('okay to add a member to an enum', () =>
  expectNoError(
    `
    export enum Foo {
      BAR,
      BAZ,
    }
  `,
    `
    export enum Foo {
      BAR,
      BAZ,
      QUUX
    }
  `,
  ));

// ----------------------------------------------------------------------

test('not okay to remove a member from an enum', () =>
  expectError(
    /member QUUX has been removed/,
    `
    export enum Foo {
      BAR,
      BAZ,
      QUUX
    }
  `,
    `
    export enum Foo {
      BAR,
      BAZ
    }
  `,
  ));

// ----------------------------------------------------------------------

test('does not crash when removing enum', () =>
  expectError(
    /ENUM testpkg.Foo: has been removed/,
    `
    export enum Foo {
      BAR,
      BAZ,
      QUUX
    }
  `,
    `
  `,
  ));
