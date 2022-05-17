import abc
import os
import warnings

import attr

from typing import cast, Any, Callable, List, Mapping, Optional, Type, TypeVar
from typing_extensions import Protocol

from . import _reference_map
from ._compat import importlib_resources
from ._kernel import Kernel
from .python import _ClassPropertyMeta


# Yea, a global here is kind of gross, however, there's not really a better way of
# handling this. Fundamentally this is a global value, since we can only reasonably
# have a single kernel active at any one time in a real program.
kernel = Kernel()


@attr.s(auto_attribs=True, frozen=True, slots=True)
class JSIIAssembly:

    name: str
    version: str
    module: str
    filename: str

    @classmethod
    def load(cls, *args, _kernel=kernel, **kwargs) -> "JSIIAssembly":
        # Our object here really just acts as a record for our JSIIAssembly, it doesn't
        # offer any functionality itself, besides this class method that will trigger
        # the loading of the given assembly in the JSII Kernel.
        assembly = cls(*args, **kwargs)

        # Actually load the assembly into the kernel, we're using the
        # importlib.resources API here isntead of manually constructing the path, in
        # the hopes that this will make JSII modules able to be used with zipimport
        # instead of only on the FS.
        with importlib_resources.path(
            f"{assembly.module}._jsii", assembly.filename
        ) as assembly_path:
            _kernel.load(assembly.name, assembly.version, os.fspath(assembly_path))

        # Give our record of the assembly back to the caller.
        return assembly

    @classmethod
    def invokeBinScript(
        cls, pkgname: str, script: str, *args: str, _kernel=kernel
    ) -> None:
        response = _kernel.invokeBinScript(pkgname, script, *args)
        print(response.stdout)


class JSIIMeta(_ClassPropertyMeta, type):
    def __new__(
        cls: Type["JSIIMeta"],
        name: str,
        bases: tuple,
        attrs: dict,
        *,
        jsii_type: Optional[str] = None,
    ) -> "JSIIMeta":
        # We want to ensure that subclasses of a JSII class do not require setting the
        # jsii_type keyword argument. They should be able to subclass it as normal.
        # Since their parent class will have the __jsii_type__ variable defined, they
        # will as well anyways.
        if jsii_type is not None:
            attrs["__jsii_class__"] = attrs["__jsii_type__"] = jsii_type
        # The declared type should NOT be inherited by subclasses. This way we can identify whether
        # an MRO entry corresponds to a possible overrides contributor or not.
        attrs["__jsii_declared_type__"] = jsii_type

        obj = super().__new__(cls, name, bases, attrs)

        # Now that we've created the class, we'll need to register it with our reference
        # mapper. We only do this for types that are actually jsii types, and not any
        # subclasses of them.
        if jsii_type is not None:
            _reference_map.register_type(obj)

        return cast("JSIIMeta", obj)


class JSIIAbstractClass(abc.ABCMeta, JSIIMeta):
    pass


F = TypeVar("F", bound=Callable[..., Any])
T = TypeVar("T", bound=Type[Any])


def enum(*, jsii_type: str) -> Callable[[T], T]:
    def deco(cls):
        cls.__jsii_type__ = jsii_type
        _reference_map.register_enum(cls)
        return cls

    return deco


def data_type(
    *,
    jsii_type: str,
    jsii_struct_bases: List[Type[Any]],
    name_mapping: Mapping[str, str],
) -> Callable[[T], T]:
    def deco(cls):
        cls.__jsii_type__ = jsii_type
        cls.__jsii_struct_bases__ = jsii_struct_bases
        cls.__jsii_name_mapping__ = name_mapping
        _reference_map.register_data_type(cls)
        return cls

    return deco


def member(*, jsii_name: str) -> Callable[[F], F]:
    def deco(fn):
        fn.__jsii_name__ = jsii_name
        return fn

    return deco


def implements(*interfaces: Type[Any]) -> Callable[[T], T]:
    def deco(cls: T) -> T:
        # In the past, interfaces were rendered as Protocols, so they could not
        # be directly extended. The @jsii.implements annotation was created to
        # register the nominal type relationship. Now, interfaces are rendered
        # as fully abstract base classes, and they should simply be extended. We
        # emit a warning when the legacy usage is detected.
        for interface in interfaces:
            if type(interface) is not type(Protocol):
                warnings.warn(
                    f"{interface.__name__} is no longer a Protocol. Use of @jsii.implements with it is deprecated. Move this interface to the class' inhertiance list of {cls.__name__} instead!",
                    stacklevel=2,
                )

        cls.__jsii_type__ = getattr(cls, "__jsii_type__", None)
        cls.__jsii_ifaces__ = getattr(cls, "__jsii_ifaces__", []) + list(interfaces)
        return cls

    return deco


def interface(*, jsii_type: str) -> Callable[[T], T]:
    def deco(iface):
        # Un-set __jsii_class__ as this is an interface, and not a class.
        iface.__jsii_class__ = None
        iface.__jsii_type__ = jsii_type
        # This interface "implements itself" - this is a trick to ease up implementation discovery.
        iface.__jsii_ifaces__ = [iface] + getattr(iface, "__jsii_ifaces__", [])
        _reference_map.register_interface(iface)
        return iface

    return deco


def proxy_for(abstract_class: T) -> T:
    if not hasattr(abstract_class, "__jsii_proxy_class__"):
        raise TypeError(f"{abstract_class} is not a JSII Abstract class.")

    return abstract_class.__jsii_proxy_class__()


def python_jsii_mapping(cls: Type[Any]) -> Optional[Mapping[str, str]]:
    return getattr(cls, "__jsii_name_mapping__", None)
