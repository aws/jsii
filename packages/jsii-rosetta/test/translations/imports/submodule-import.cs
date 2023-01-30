using Amazon.JSII.Tests.CalculatorNamespace;
using Amazon.JSII.Tests.CalculatorNamespace.HomonymousForwardReferences;
using Gen.Providers.Aws;

// Access without existing type information
var awsKmsKeyExamplekms = new Kms.KmsKey(this, "examplekms", new Struct {
    DeletionWindowInDays = 7,
    Description = "KMS key 1"
});

// Accesses two distinct points of the submodule hierarchy
var myClass = new Submodule.MyClass(new SomeStruct { Prop = Submodule.Child.SomeEnum.SOME });

// Access via a renamed import
Foo.Consumer.Consume(new ConsumerProps { Homonymous = new Homonymous { StringProperty = "yes" } });
