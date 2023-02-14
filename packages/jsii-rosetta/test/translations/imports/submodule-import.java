import software.amazon.jsii.tests.calculator.submodule.*;
import software.amazon.jsii.tests.calculator.submodule.child.*;
import software.amazon.jsii.tests.calculator.homonymousForwardReferences.*;
import software.amazon.jsii.tests.calculator.homonymousForwardReferences.foo.*;
import gen.providers.aws.kms.*;

// Access without existing type information
Object awsKmsKeyExamplekms = KmsKey.Builder.create(this, "examplekms")
        .deletionWindowInDays(7)
        .description("KMS key 1")
        .build();

// Accesses two distinct points of the submodule hierarchy
MyClass myClass = MyClass.Builder.create().prop(SomeEnum.SOME).build();

// Access via a renamed import
Consumer.consume(ConsumerProps.builder().homonymous(Homonymous.builder().stringProperty("yes").build()).build());
