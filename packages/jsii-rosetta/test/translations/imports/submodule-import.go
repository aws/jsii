import "github.com/aws/jsii/jsii-calc/go/jsiicalc/submodule"
import "github.com/aws/jsii/jsii-calc/go/jsiicalc/submodule/child"
import "github.com/aws/jsii/jsii-calc/go/jsiicalc"
import "github.com/aws/jsii/jsii-calc/go/jsiicalc/foo"
import "github.com/aws-samples/dummy/gen/providers/aws/kms"

// Access without existing type information
awsKmsKeyExamplekms := kms.NewKmsKey(this, jsii.String("examplekms"), map[string]interface{}{
	"deletionWindowInDays": jsii.Number(7),
	"description": jsii.String("KMS key 1"),
})

// Accesses two distinct points of the submodule hierarchy
myClass := submodule.NewMyClass(&SomeStruct{
	Prop: child.SomeEnum_SOME,
})

// Access via a renamed import
foo.Consumer_Consume(&ConsumerProps{
	Homonymous: &Homonymous{
		StringProperty: jsii.String("yes"),
	},
})
