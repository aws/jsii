module github.com/aws/jsii-runtime-go/kernel

go 1.15

require (
	"github.com/aws/jsii-runtime-go/api" v0.0.0
	"github.com/aws/jsii-runtime-go/typeregistry" v0.0.0
)

replace (
	"github.com/aws/jsii-runtime-go/api" => ../api
	"github.com/aws/jsii-runtime-go/typeregistry" => ../typeregistry
)
