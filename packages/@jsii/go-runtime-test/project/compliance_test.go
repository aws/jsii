package tests

import (
	"encoding/json"
	"io/ioutil"
	"strings"
	"testing"

	calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
	calclib "github.com/aws/jsii/jsii-calc/go/scopejsiicalclib"
	"github.com/stretchr/testify/suite"
)

type ComplianceSuite struct {
	suite.Suite
	report map[string]interface{}
}

func (suite *ComplianceSuite) SetupSuite() {
	suite.report = map[string]interface{}{}
}

func (suite *ComplianceSuite) TearDownSuite() {
	report, err := json.MarshalIndent(suite.report, "", "  ")

	if err != nil {
		suite.FailNowf("Failed marshalling report: %s", err.Error())
	}
	err = ioutil.WriteFile("./compliance-report.json", report, 0644)
	if err != nil {
		suite.FailNowf("Failed writing report: %s", err.Error())
	}
}

func (suite *ComplianceSuite) AfterTest(suiteName, testName string) {

	status := "success"
	if suite.T().Failed() {
		status = "failure"
	}
	if suite.T().Skipped() {
		status = "skipped"
	}

	// remove the 'Test' prefix to make it more comparable with other languages who don't require it.
	suite.report[strings.Replace(testName, "Test", "", 1)] = map[string]interface{}{"status": status}
}

func (suite *ComplianceSuite) TestMaps() {

	t := suite.T()

	allTypes := calc.NewAllTypes()
	actual := allTypes.MapProperty()
	if len(actual) != 0 {
		t.Errorf("Expected length of empty map to be 0. Got: %d", len(actual))
	}

	question := "The answer to the ultimate question of life, the universe, and everything"
	answer := calclib.NewNumber(42)
	allTypes.SetMapProperty(map[string]calclib.Number{
		question: answer,
	})
	actual = allTypes.MapProperty()
	if len(actual) != 1 {
		t.Errorf("Expected length of empty map to be 1. Got: %d", len(actual))
	}
	if actual[question].Value() != answer.Value() {
		t.Errorf("Expected to have the value %v in there, got: %v", answer, actual[question])
	}
}

func TestComplianceSuite(t *testing.T) {
	suite.Run(t, new(ComplianceSuite))
}
