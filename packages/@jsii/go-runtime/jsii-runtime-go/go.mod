module github.com/aws/jsii-runtime-go

go 1.15

require (
	github.com/aws/jsii-runtime-go/api v0.0.0
	github.com/aws/jsii-runtime-go/kernel v0.0.0
	github.com/aws/jsii-runtime-go/typeregistry v0.0.0 // indirect
)

replace (
	github.com/aws/jsii-runtime-go/api => ./api
	github.com/aws/jsii-runtime-go/kernel => ./kernel
	github.com/aws/jsii-runtime-go/typeregistry => ./typeregistry
)
