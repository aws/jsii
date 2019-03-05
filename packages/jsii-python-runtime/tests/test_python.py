import jsii
import pytest

from jsii.errors import JSIIError
from jsii_calc import Calculator


class TestErrorHandling:
    def test_jsii_error(self):
        obj = Calculator()

        with pytest.raises(
            JSIIError, match="Class jsii-calc.Calculator doesn't have a method"
        ):
            jsii.kernel.invoke(obj, "nonexistentMethod")
