module github.com/aws/jsii/go-runtime-test

go 1.16

require (
	github.com/aws/jsii-runtime-go v0.0.0
	github.com/aws/jsii/jsii-calc/go/jcb v0.0.0
	github.com/aws/jsii/jsii-calc/go/jsiicalc/v3 v3.20.120
	github.com/aws/jsii/jsii-calc/go/scopejsiicalclib v0.0.0
	github.com/stretchr/testify v1.8.0
	golang.org/x/lint v0.0.0-20210508222113-6edffad5e616
	golang.org/x/tools v0.1.12
)

replace (
	github.com/aws/jsii-runtime-go => ../../go-runtime/jsii-runtime-go
	github.com/aws/jsii/jsii-calc/go/jcb => ../jsii-calc/go/jcb
	github.com/aws/jsii/jsii-calc/go/jsiicalc/v3 => ../jsii-calc/go/jsiicalc
	github.com/aws/jsii/jsii-calc/go/scopejsiicalcbaseofbase/v2 => ../jsii-calc/go/scopejsiicalcbaseofbase
	github.com/aws/jsii/jsii-calc/go/scopejsiicalclib => ../jsii-calc/go/scopejsiicalclib
)
