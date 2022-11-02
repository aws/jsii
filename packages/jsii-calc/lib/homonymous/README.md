Verifies homonymous forward references don't trip the Python type checker

This has been an issue when stub functions were introduced to create a reliable source for type checking
information, which was reported in https://github.com/aws/jsii/issues/3818.
