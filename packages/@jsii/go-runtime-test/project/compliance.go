package tests

import (
	"encoding/json"
	"io/ioutil"
	"strings"

	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
)

type ComplianceSuite struct {
	suite.Suite
	_report map[string]map[string]string
}

func (suite *ComplianceSuite) SetupSuite() {
	suite._report = map[string]map[string]string{}
}

func (suite *ComplianceSuite) TearDownSuite() {
	report, err := json.MarshalIndent(suite._report, "", "  ")

	if err != nil {
		suite.FailNowf("Failed marshalling _report: %s", err.Error())
	}
	err = ioutil.WriteFile("./compliance-report.json", report, 0644)
	if err != nil {
		suite.FailNowf("Failed writing _report: %s", err.Error())
	}
}

func (suite *ComplianceSuite) Require() *require.Assertions {
	return require.New(suite.T())
}

func (suite *ComplianceSuite) reportForTest() map[string]string {
	fullName := suite.T().Name()
	testName := strings.Split(fullName, "/")[1]
	name := strings.Replace(testName, "Test", "", 1)

	if val, ok := suite._report[name]; ok {
		return val
	}

	val := map[string]string{}
	suite._report[name] = val
	return val
}

func (suite *ComplianceSuite) BeforeTest(suiteName, testName string) {
	suite.reportForTest()["status"] = "success"
}

func (suite *ComplianceSuite) skipWithStatus(status string, reason string, url string) {
	t := suite.T()

	report := suite.reportForTest()

	report["status"] = status
	if reason != "" {
		report["reason"] = reason
	}

	if url != "" {
		report["url"] = url
	}

	t.Skipf("%s: %s", status, reason)
}

// NotImplementedTest will report this test as not implemented, with the URL of
// the GitHub issue that tracks the bug or missing feature
func (suite *ComplianceSuite) NotImplementedTest(reason string, issueUrl string) {
	suite.skipWithStatus("not-implemented", reason, issueUrl)
}
