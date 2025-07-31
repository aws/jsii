import os
import pytest
import tempfile
from typing import Dict, Optional
import jsii_calc


class TestAutomaticEnvironmentSync:
    """
    Test automatic bidirectional environment variable synchronization
    between Python and Node.js processes in the JSII runtime.
    """

    def setup_method(self):
        """Clean up test environment variables before each test"""
        self.test_vars = [
            "JSII_TEST_VAR",
            "JSII_TEST_VAR2",
            "TEST_DB_URL",
            "TEST_API_KEY",
            "AWS_SECRET_ACCESS_KEY",
            "DATABASE_PASSWORD",
            "JSII_SYNC_TEST",
            "PYTHON_TO_NODE_TEST",
            "NODE_TO_PYTHON_TEST",
        ]

        for var in self.test_vars:
            if var in os.environ:
                del os.environ[var]

    def teardown_method(self):
        """Clean up test environment variables after each test"""
        for var in self.test_vars:
            if var in os.environ:
                del os.environ[var]

    def test_node_to_python_sync(self):
        """Test automatic sync from Node.js to Python"""
        # Node.js sets environment variable
        env_utils = jsii_calc.EnvironmentUtils()
        env_utils.set_environment_variable("JSII_TEST_VAR", "from_node")

        # Should be automatically available in Python
        assert os.environ.get("JSII_TEST_VAR") == "from_node"

        # Test deletion
        env_utils.delete_environment_variable("JSII_TEST_VAR")
        assert "JSII_TEST_VAR" not in os.environ

    def test_python_to_node_sync(self):
        """Test automatic sync from Python to Node.js"""
        # Python sets environment variable
        os.environ["JSII_TEST_VAR2"] = "from_python"

        # Should be automatically available in Node.js
        env_utils = jsii_calc.EnvironmentUtils()
        node_value = env_utils.get_environment_variable("JSII_TEST_VAR2")
        assert node_value == "from_python"

        # Test deletion from Python
        del os.environ["JSII_TEST_VAR2"]
        node_value = env_utils.get_environment_variable("JSII_TEST_VAR2")
        assert node_value is None

    def test_bidirectional_sync(self):
        """Test bidirectional synchronization in both directions"""
        env_utils = jsii_calc.EnvironmentUtils()

        # Python sets first
        os.environ["PYTHON_TO_NODE_TEST"] = "python_value"
        assert (
            env_utils.get_environment_variable("PYTHON_TO_NODE_TEST") == "python_value"
        )

        # Node sets second
        env_utils.set_environment_variable("NODE_TO_PYTHON_TEST", "node_value")
        assert os.environ.get("NODE_TO_PYTHON_TEST") == "node_value"

        # Modify from both sides
        os.environ["PYTHON_TO_NODE_TEST"] = "modified_by_python"
        assert (
            env_utils.get_environment_variable("PYTHON_TO_NODE_TEST")
            == "modified_by_python"
        )

        env_utils.set_environment_variable("NODE_TO_PYTHON_TEST", "modified_by_node")
        assert os.environ.get("NODE_TO_PYTHON_TEST") == "modified_by_node"

    def test_dotenv_like_integration(self):
        """Test automatic sync with dotenv-like loading"""
        env_string = """
# Test environment file
TEST_DB_URL=postgres://test/db
TEST_API_KEY=abc123
# Another comment
LOG_LEVEL=debug
"""

        # Load via Node.js dotenv-like functionality
        env_utils = jsii_calc.EnvironmentUtils()
        env_utils.load_environment_from_string(env_string)

        # Should be automatically available in Python
        assert os.environ.get("TEST_DB_URL") == "postgres://test/db"
        assert os.environ.get("TEST_API_KEY") == "abc123"
        assert os.environ.get("LOG_LEVEL") == "debug"

    def test_sensitive_variables_sync(self):
        """Test that sensitive variables are synced (as per design)"""
        env_utils = jsii_calc.EnvironmentUtils()

        # Set sensitive variable in Node.js
        env_utils.set_environment_variable("AWS_SECRET_ACCESS_KEY", "secret123")

        # Should be automatically available in Python
        assert os.environ.get("AWS_SECRET_ACCESS_KEY") == "secret123"

        # Set sensitive variable in Python
        os.environ["DATABASE_PASSWORD"] = "secret456"

        # Should be automatically available in Node.js
        node_value = env_utils.get_environment_variable("DATABASE_PASSWORD")
        assert node_value == "secret456"

    def test_system_variables_sync(self):
        """Test that system variables can be synced"""
        env_utils = jsii_calc.EnvironmentUtils()
        original_path = os.environ.get("PATH", "")

        try:
            # Modify PATH from Python
            custom_path = "/custom/test/path:" + original_path
            os.environ["PATH"] = custom_path

            # Should be available in Node.js
            node_path = env_utils.get_environment_variable("PATH")
            assert node_path == custom_path

        finally:
            # Restore original PATH
            if original_path:
                os.environ["PATH"] = original_path

    def test_multiple_rapid_changes(self):
        """Test rapid consecutive environment changes"""
        env_utils = jsii_calc.EnvironmentUtils()

        # Rapid changes from Python
        for i in range(5):
            os.environ["RAPID_TEST"] = f"python_value_{i}"
            assert (
                env_utils.get_environment_variable("RAPID_TEST") == f"python_value_{i}"
            )

        # Rapid changes from Node.js
        for i in range(5):
            env_utils.set_environment_variable("RAPID_TEST", f"node_value_{i}")
            assert os.environ.get("RAPID_TEST") == f"node_value_{i}"

    def test_empty_and_whitespace_values(self):
        """Test synchronization of empty and whitespace values"""
        env_utils = jsii_calc.EnvironmentUtils()

        # Empty string
        os.environ["EMPTY_TEST"] = ""
        assert env_utils.get_environment_variable("EMPTY_TEST") == ""

        # Whitespace
        env_utils.set_environment_variable("WHITESPACE_TEST", "   ")
        assert os.environ.get("WHITESPACE_TEST") == "   "

        # Tab and newline
        os.environ["SPECIAL_CHARS"] = "\t\n"
        assert env_utils.get_environment_variable("SPECIAL_CHARS") == "\t\n"

    def test_unicode_values(self):
        """Test synchronization of Unicode values"""
        env_utils = jsii_calc.EnvironmentUtils()

        unicode_value = "Hello 世界 🌍 Ñiño"

        # Python to Node
        os.environ["UNICODE_TEST"] = unicode_value
        assert env_utils.get_environment_variable("UNICODE_TEST") == unicode_value

        # Node to Python
        env_utils.set_environment_variable("UNICODE_TEST2", unicode_value)
        assert os.environ.get("UNICODE_TEST2") == unicode_value

    def test_large_environment_variables(self):
        """Test synchronization of large environment variable values"""
        env_utils = jsii_calc.EnvironmentUtils()

        # Create a large value (1KB)
        large_value = "x" * 1024

        # Python to Node
        os.environ["LARGE_VAR"] = large_value
        assert env_utils.get_environment_variable("LARGE_VAR") == large_value

        # Node to Python
        env_utils.set_environment_variable("LARGE_VAR2", large_value)
        assert os.environ.get("LARGE_VAR2") == large_value

    def test_environment_variable_existence_checks(self):
        """Test environment variable existence synchronization"""
        env_utils = jsii_calc.EnvironmentUtils()

        # Set variable in Python
        os.environ["EXISTENCE_TEST"] = "value"

        # Check existence in Node.js
        assert env_utils.has_environment_variable("EXISTENCE_TEST") == True

        # Delete in Python
        del os.environ["EXISTENCE_TEST"]

        # Check non-existence in Node.js
        assert env_utils.has_environment_variable("EXISTENCE_TEST") == False

        # Set in Node.js
        env_utils.set_environment_variable("NODE_EXISTENCE_TEST", "value")

        # Check existence in Python
        assert "NODE_EXISTENCE_TEST" in os.environ

        # Delete in Node.js
        env_utils.delete_environment_variable("NODE_EXISTENCE_TEST")

        # Check non-existence in Python
        assert "NODE_EXISTENCE_TEST" not in os.environ

    def test_concurrent_modifications(self):
        """Test handling of concurrent modifications from both sides"""
        env_utils = jsii_calc.EnvironmentUtils()

        # Set initial value
        os.environ["CONCURRENT_TEST"] = "initial"
        assert env_utils.get_environment_variable("CONCURRENT_TEST") == "initial"

        # Modify from Python
        os.environ["CONCURRENT_TEST"] = "python_modified"

        # Verify Node.js sees the change
        assert (
            env_utils.get_environment_variable("CONCURRENT_TEST") == "python_modified"
        )

        # Modify from Node.js (should override)
        env_utils.set_environment_variable("CONCURRENT_TEST", "node_override")

        # Verify Python sees the override
        assert os.environ.get("CONCURRENT_TEST") == "node_override"

    def test_all_environment_variables_accessible(self):
        """Test that all environment variables are accessible from both sides"""
        env_utils = jsii_calc.EnvironmentUtils()

        # Set multiple variables from Python
        test_vars = {"VAR1": "value1", "VAR2": "value2", "VAR3": "value3"}

        for key, value in test_vars.items():
            os.environ[key] = value

        # Get all environment variables from Node.js
        all_env = env_utils.list_all_environment_variables()

        # Verify all test variables are present
        for key, value in test_vars.items():
            assert all_env.get(key) == value

        # Cleanup
        for key in test_vars:
            del os.environ[key]
