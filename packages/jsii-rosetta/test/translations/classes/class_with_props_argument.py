class MyClass(cdk.SomeOtherClass):
    def __init__(self, scope, id, *, prop1, prop2):
        super().__init__(scope, id, prop1=prop1, prop2=prop2)

        print(prop1)