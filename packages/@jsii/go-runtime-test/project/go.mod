module github.com/aws/jsii/go-runtime-test

go 1.17

require (
	github.com/aws/jsii-runtime-go v0.0.0
	github.com/aws/jsii/jsii-calc/go/jcb v0.0.0
	github.com/aws/jsii/jsii-calc/go/jsiicalc/v3 v3.20.120
	github.com/aws/jsii/jsii-calc/go/scopejsiicalclib v0.0.0
	github.com/stretchr/testify v1.7.1
	golang.org/x/lint v0.0.0-20201208152925-83fdc39ff7b5
	golang.org/x/tools v0.1.0
)

require (
	github.com/Masterminds/semver/v3 v3.1.1 // indirect
	github.com/aws/jsii/jsii-calc/go/scopejsiicalcbaseofbase/v2 v2.1.1 // indirect
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect
	golang.org/x/mod v0.3.0 // indirect
	golang.org/x/sys v0.0.0-20210119212857-b64e53b001e4 // indirect
	golang.org/x/xerrors v0.0.0-20200804184101-5ec99f83aff1 // indirect
	gopkg.in/yaml.v3 v3.0.0-20210107192922-496545a6307b // indirect
)

replace (
	github.com/aws/jsii-runtime-go => ../../go-runtime/jsii-runtime-go
	github.com/aws/jsii/jsii-calc/go/jcb => ../jsii-calc/go/jcb
	github.com/aws/jsii/jsii-calc/go/jsiicalc/v3 => ../jsii-calc/go/jsiicalc
	github.com/aws/jsii/jsii-calc/go/scopejsiicalcbaseofbase/v2 => ../jsii-calc/go/scopejsiicalcbaseofbase
	github.com/aws/jsii/jsii-calc/go/scopejsiicalclib => ../jsii-calc/go/scopejsiicalclib
)
