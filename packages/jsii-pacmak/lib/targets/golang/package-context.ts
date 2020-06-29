import { CodeMaker } from 'codemaker';
import { GoType } from './types';
import { Submodule } from './module';

export interface PackageTypes {
  [fqn: string]: GoType;
}

export interface PackageSubmodules {
  [name: string]: Submodule;
}

export interface PackageContext {
  code: CodeMaker;
  submodules: PackageSubmodules;
  types: PackageTypes;
}
