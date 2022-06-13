import * as spec from '@jsii/spec';
import * as ts from 'typescript';

/**
 * This module provides typed method that can be used to access TypeScript Nodes
 * that are externally related to jsii assembly entities. This is backed by a
 * `WeakMap` so that attached metadata can be garbage collected once the note
 * they have been related to is no longer reachable.
 *
 * Methods have distinctive names based on the assembly node type they work with
 * because of how TypeScript does structural - and not nominal - type checking,
 * maling it impossible to use function overrides without having small
 * interfaces excessively match all types (e.g: spec.EnumMember is largely
 * equivalent to "anything that has a name").
 */
const STORAGE = new WeakMap<any, ts.Node>();

//#region Attaching nodes

const setter = <T>(object: T, node: ts.Node): T => {
  STORAGE.set(object, node);
  return object;
};

export function setRelatedNode<T extends ts.Node = ts.Node>(
  object: any,
  node: T,
) {
  return STORAGE.set(object, node);
}

export const setClassRelatedNode: (
  object: spec.ClassType,
  node: ts.ClassDeclaration,
) => spec.ClassType = setter;

export const setEnumRelatedNode: (
  object: spec.EnumType,
  node: ts.EnumDeclaration,
) => spec.EnumType = setter;

export const setInterfaceRelatedNode: (
  object: spec.InterfaceType,
  node: ts.InterfaceDeclaration,
) => spec.InterfaceType = setter;

export const setMethodRelatedNode: <
  T extends ts.MethodDeclaration | ts.MethodSignature,
>(
  object: spec.Method,
  node: T,
) => spec.Method = setter;

export const setParameterRelatedNode: (
  object: spec.Parameter,
  node: ts.ParameterDeclaration,
) => spec.Parameter = setter;

export const setPropertyRelatedNode: (
  object: spec.Property,
  node:
    | ts.AccessorDeclaration
    | ts.ParameterPropertyDeclaration
    | ts.PropertyDeclaration
    | ts.PropertySignature,
) => spec.Parameter = setter;

//#endregion

//#region Inspecting attached nodes

export function getRelatedNode<T extends ts.Node = ts.Node>(
  object: any,
): T | undefined {
  return STORAGE.get(object) as T;
}

export const getClassRelatedNode: (
  object: spec.ClassType,
) => ts.ClassDeclaration | undefined = getRelatedNode;

export const getClassOrInterfaceRelatedNode: (
  object: spec.ClassType | spec.InterfaceType,
) => ts.ClassDeclaration | ts.InterfaceDeclaration | undefined = getRelatedNode;

export const getEnumRelatedNode: (
  object: spec.EnumType,
) => ts.EnumDeclaration | undefined = getRelatedNode;

export const getInterfaceRelatedNode: (
  object: spec.InterfaceType,
) => ts.InterfaceDeclaration | undefined = getRelatedNode;

export const getMethodRelatedNode: (
  object: spec.Method,
) => ts.MethodDeclaration | ts.MethodSignature | undefined = STORAGE.get.bind(
  STORAGE,
) as any;

export const getParameterRelatedNode: (
  object: spec.Parameter,
) =>
  | ts.AccessorDeclaration
  | ts.ParameterPropertyDeclaration
  | ts.PropertyDeclaration
  | ts.PropertySignature
  | undefined = getRelatedNode;

export const getPropertyRelatedNode: (
  object: spec.Parameter,
) =>
  | ts.AccessorDeclaration
  | ts.ParameterPropertyDeclaration
  | ts.PropertyDeclaration
  | ts.PropertySignature
  | undefined = getRelatedNode;

export const getTypeRelatedNode: (
  object: spec.Type,
) =>
  | ts.ClassDeclaration
  | ts.EnumDeclaration
  | ts.InterfaceDeclaration
  | undefined = getRelatedNode;

//#endregion
