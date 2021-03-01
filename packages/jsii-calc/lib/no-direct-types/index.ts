// THIS MODULE ONLY EXPORTS SUBMODULES: it tests the case in which a module does not export direct
// types but rather only exports submodules (see https://github.com/aws/jsii/issues/2619)
export * as sub1 from './sub1';
export * as sub2 from './sub2';
