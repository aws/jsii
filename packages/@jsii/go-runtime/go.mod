module github.com/aws/jsii

go 1.15

require (
	github.com/aws/jsii-runtime-go v0.0.0
	github.com/aws/jsii/jsii-calc/go/jsiicalc/v3 v3.20.120
	github.com/aws/jsii/jsii-calc/go/scopejsiicalclib v0.0.0
	github.com/aws/jsii-runtime-go/api v0.0.0 // indirect
	github.com/aws/jsii-runtime-go/kernel v0.0.0 // indirect
	github.com/aws/jsii-runtime-go/typeregistry v0.0.0 // indirect
)

replace (
	github.com/aws/jsii-runtime-go => ./jsii-runtime-go
	github.com/aws/jsii-runtime-go/api => ./jsii-runtime-go/api
	github.com/aws/jsii-runtime-go/kernel => ./jsii-runtime-go/kernel
	github.com/aws/jsii-runtime-go/typeregistry => ./jsii-runtime-go/typeregistry
	github.com/aws/jsii/jsii-calc/go/jsiicalc/v3 => ./jsii-calc/go/jsiicalc
	github.com/aws/jsii/jsii-calc/go/scopejsiicalcbase => ./jsii-calc/go/scopejsiicalcbase
	github.com/aws/jsii/jsii-calc/go/scopejsiicalcbaseofbase/v2 => ./jsii-calc/go/scopejsiicalcbaseofbase
	github.com/aws/jsii/jsii-calc/go/scopejsiicalclib => ./jsii-calc/go/scopejsiicalclib
)
