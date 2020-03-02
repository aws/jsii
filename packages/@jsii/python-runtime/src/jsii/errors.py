import textwrap


class JSIIError(Exception):
    pass


class JavaScriptError(Exception):

    def __init__(self, stack):
        self.stack = stack

    def __str__(self):
        return "\n" + textwrap.indent(self.stack, "  ", lambda line: bool(line))
