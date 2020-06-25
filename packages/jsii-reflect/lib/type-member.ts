// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { Documentable } from './docs';
import { Initializer } from './initializer';
import { Method } from './method';
import { Property } from './property';

export interface TypeMember extends Documentable {
  name: string;
  abstract: boolean;

  kind: MemberKind;
  protected?: boolean;
}

export enum MemberKind {
  Initializer = 'initializer',
  Method = 'method',
  Property = 'property',
}

export function isInitializer(x: TypeMember): x is Initializer {
  return x.kind === MemberKind.Initializer;
}

export function isMethod(x: TypeMember): x is Method {
  return x.kind === MemberKind.Method;
}

export function isProperty(x: TypeMember): x is Property {
  return x.kind === MemberKind.Property;
}
