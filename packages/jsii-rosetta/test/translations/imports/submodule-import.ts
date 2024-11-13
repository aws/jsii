import * as calc from 'jsii-calc';
import { homonymousForwardReferences as ns } from 'jsii-calc';
import * as aws from './.gen/providers/aws';

// Access without existing type information
const awsKmsKeyExamplekms = new aws.kms.KmsKey(this, 'examplekms', {
  deletionWindowInDays: 7,
  description: 'KMS key 1',
});

// Accesses two distinct points of the submodule hierarchy
const myClass = new calc.submodule.MyClass({ prop: calc.submodule.child.SomeEnum.SOME, nestedStruct: { stringProperty: "hello" } });

// Access via a renamed import
ns.foo.Consumer.consume({ homonymous: { stringProperty: 'yes' } });
