module github.com/aws/jsii/go-runtime-test

go 1.18

require (
	github.com/aws/jsii-runtime-go v0.0.0
	github.com/aws/jsii/jsii-calc/go/jcb v0.0.0
	github.com/aws/jsii/jsii-calc/go/jsiicalc/v3 v3.20.120
	github.com/aws/jsii/jsii-calc/go/scopejsiicalclib v0.0.0-devpreview
	github.com/stretchr/testify v1.8.4
	golang.org/x/lint v0.0.0-20210508222113-6edffad5e616
	golang.org/x/tools v0.9.3
)

require (
	github.com/Masterminds/semver/v3 v3.2.1 // indirect
	github.com/aws/jsii/jsii-calc/go/scopejsiicalcbaseofbase/v2 v2.1.1 // indirect
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/mattn/go-isatty v0.0.18 // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect
	github.com/yuin/goldmark v1.4.13 // indirect
	golang.org/x/mod v0.10.0 // indirect
	golang.org/x/sys v0.8.0 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)

replace (
	github.com/aws/jsii-runtime-go v0.0.0 => ../../go-runtime/jsii-runtime-go
	github.com/aws/jsii/jsii-calc/go/jcb v0.0.0 => ../jsii-calc/go/jcb
	github.com/aws/jsii/jsii-calc/go/jsiicalc/v3 v3.20.120 => ../jsii-calc/go/jsiicalc
	github.com/aws/jsii/jsii-calc/go/scopejsiicalcbaseofbase/v2 => ../jsii-calc/go/scopejsiicalcbaseofbase
	github.com/aws/jsii/jsii-calc/go/scopejsiicalclib v0.0.0-devpreview => ../jsii-calc/go/scopejsiicalclib
)
