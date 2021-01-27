module github.com/aws-cdk/jsii

go 1.15

require (
	github.com/aws-cdk/jsii/jsii-calc/go/jsiicalc v0.0.0
	github.com/aws-cdk/jsii/jsii-calc/go/scopejsiicalclib v0.0.0
	github.com/aws/jsii-runtime-go v0.0.0
)

replace (
	github.com/aws-cdk/jsii/jsii-calc/go/jsiicalc v0.0.0 => ./jsii-calc/go/jsiicalc
	github.com/aws-cdk/jsii/jsii-calc/go/scopejsiicalcbase v0.0.0 => ./jsii-calc/go/scopejsiicalcbase
	github.com/aws-cdk/jsii/jsii-calc/go/scopejsiicalcbaseofbase v0.0.0 => ./jsii-calc/go/scopejsiicalcbaseofbase
	github.com/aws-cdk/jsii/jsii-calc/go/scopejsiicalclib v0.0.0 => ./jsii-calc/go/scopejsiicalclib
	github.com/aws/jsii-runtime-go v0.0.0 => ./jsii-runtime-go
)
