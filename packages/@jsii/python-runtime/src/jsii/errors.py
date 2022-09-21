import textwrap
from enum import Enum


class JSIIError(Exception):
    pass


class JavaScriptError(Exception):
    def __init__(self, stack):
        self.stack = stack

    def __str__(self):
        return "\n" + textwrap.indent(self.stack, "  ", lambda line: bool(line))


class ErrorType(Enum):
    JSII_FAULT = "@jsii/kernel.Fault"
    RUNTIME_ERROR = "@jsii/kernel.RuntimeError"
