package tests

import (
	"encoding/json"
	"github.com/stretchr/testify/suite"
	"io/ioutil"
	"strings"
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

func (suite* ComplianceSuite) reportForTest() map[string]string {
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

// FailTest will report this test as failing with the URL of the github issue that
// reports the bug or missing feature
func (suite *ComplianceSuite) FailTest(reason string, issueUrl string) {
	suite.skipWithStatus("failure", reason, issueUrl)
}

// NotApplicableTest will report this compliance test as N/A for this language
func (suite *ComplianceSuite) NotApplicableTest(reason string) {
	suite.skipWithStatus("n/a", reason, "")
}
