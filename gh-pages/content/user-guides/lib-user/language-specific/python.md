# :fontawesome-brands-python: Python

Due to the use of a [custom metaclass][metaclass] as part of the *jsii runtime for Python*, certain **Python** idioms
require unusual syntax when *jsii modules* are involved.

[metaclass]: https://docs.python.org/3/reference/datamodel.html#metaclasses

!!! info
    Our intention is to make working with *jsii modules* from **Python** as idiomatic as possible. Removing the [custom
    metaclass][metaclass] usage without breaking existing code is a challenging task, and the situation may consequently
    remain sub-optional for the near future at least.

## Implementing Interfaces

Traditionally, **Python** developers expect to be able to either *implicitly* implement an interface by declaring all
required members, or *explicitly* implement interfaces by simply adding the interface to their class' or interface's
inheritance chain (and implementing all required members):

!!! bug "Incorrect Use"

    ```py hl_lines="3"
    from jsii_dependency import IJsiiInterface

    class MyNewClass(IJsiiInterface):
        """ Traditional implementation of an interface in Python.

        This will not work with interfaces defined by jsii modules, as this will
        likely cause a metaclass conflict that the user cannot solve.
        """

        # Member implementations...

        ...
    ```

The [jsii type system][jsii-type-system] however does not support *structural typing*, and interfaces must **always** be
*explicitly* implemented. In order to correctly declare implementation of an interface from a *jsii module*, the
following syntax is used:

```py hl_lines="1 4"
import jsii
from jsii_dependency import IJsiiInterface

@jsii.implements(IJsiiInterface)
class MyNewClass():
    """ A jsii-supported implementation of the `IJsiiInterface` interface

    This will correctly register the explicit interface implementation on the
    type's metadata, and ensure instances get correctly serialized to and from
    the jsii kernel.
    """

    # Member implementations...

    ...
```

[jsii-type-system]: ../../../specification/2-type-system.md

## Property Overrides

When extending or implementing types provided by *jsii modules*, properties must always be implemented using a dynamic
accessor, ensuring the *jsii runtime for Python* is able to correctly process access to those by the *jsii kernel*. This
leverages **Python**'s standard `#!py @property` decorator:

```py hl_lines="10 14"
from jsii_greeter import Greeter

class Shouter(Greeter):
    """ Shouter extends Greeter up-cases the greetee's name.

    The replacement is implemented using a dynamic @property implementation so
    it works properly with the jsii kernel.
    """

    @property
    def greetee(self) -> str:
        return super().greetee.upper()

    @greetee.setter
    def greetee(self, value):
        super().greetee = value

    ...
```
