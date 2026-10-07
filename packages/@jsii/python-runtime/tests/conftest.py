import json
from typing import Dict

import pytest

# Results of the compliance tests, written to compliance-report.json for tools/jsii-compliance
_compliance_report: Dict[str, Dict[str, str]] = {}

# Skipped tests whose skip reason starts with this are not applicable to Python:
# @pytest.mark.skip(reason="Not applicable: <reason>")
NOT_APPLICABLE = "Not applicable:"


def pytest_runtest_logreport(report: pytest.TestReport) -> None:
    if not report.nodeid.startswith("tests/test_compliance.py::"):
        return

    # Only test functions are compliance tests (pytest-mypy also adds a "mypy" item per file)
    name = report.nodeid.split("::")[-1]
    if not name.startswith("test_"):
        return

    # Each test reports separately for its setup, call and teardown phases.
    # The first phase that fails or skips decides the result.
    entry = _compliance_report.get(name)
    if entry is not None and entry["status"] != "success":
        return

    if report.failed:
        _compliance_report[name] = {"status": "failure"}
    elif report.skipped:
        reason = (
            report.longrepr[2]
            if isinstance(report.longrepr, tuple)
            else str(report.longrepr)
        )
        reason = reason.removeprefix("Skipped: ")
        if reason.startswith(NOT_APPLICABLE):
            reason = reason[len(NOT_APPLICABLE) :].strip()
            _compliance_report[name] = {"status": "n/a", "reason": reason}
        else:
            # A skipped compliance test is not passing for this language
            _compliance_report[name] = {"status": "failure", "reason": reason}
    elif report.when == "call":
        _compliance_report[name] = {"status": "success"}


def pytest_sessionfinish(session: pytest.Session) -> None:
    if not _compliance_report:
        return

    report_file = session.config.rootpath / "compliance-report.json"
    report_file.write_text(json.dumps(_compliance_report, indent=2, sort_keys=True))
