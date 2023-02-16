import jsii_calc as calc
from jsii_calc import homonymous_forward_references as ns
import ...gen.providers.aws as aws

# Access without existing type information
aws_kms_key_examplekms = aws.kms.KmsKey(self, "examplekms",
    deletion_window_in_days=7,
    description="KMS key 1"
)

# Accesses two distinct points of the submodule hierarchy
my_class = calc.submodule.MyClass(prop=calc.submodule.child.SomeEnum.SOME)

# Access via a renamed import
ns.foo.Consumer.consume(homonymous=ns.foo.Homonymous(string_property="yes"))
