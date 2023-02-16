import datetime
import inspect
import itertools
from types import FunctionType, MethodType, BuiltinFunctionType, LambdaType

from typing import Callable, cast, Any, List, Optional, Sequence, Type

import functools

import attr
import enum

from ..errors import JSIIError
from .. import _reference_map
from .._utils import Singleton
from .providers import BaseProvider, ProcessProvider
from .types import (
    EnumRef,
    LoadRequest,
    BeginRequest,
    BeginResponse,
    Callback,
    CallbacksRequest,
    CompleteRequest,
    CompleteRequest,
    CompleteResponse,
    CreateRequest,
    CreateResponse,
    DeleteRequest,
    EndRequest,
    EnumRef,
    GetRequest,
    GetResponse,
    InvokeRequest,
    InvokeResponse,
    GetScriptCommandRequest,
    GetScriptCommandResponse,
    InvokeScriptRequest,
    InvokeScriptResponse,
    KernelResponse,
    LoadRequest,
    ObjRef,
    Override,
    SetRequest,
    SetResponse,
    StaticGetRequest,
    StaticInvokeRequest,
    StaticSetRequest,
    StatsRequest,
)
from .._utils import Singleton


_nothing = object()


class Object:
    __jsii_type__ = "Object"


def _get_overides(klass: Type, obj: Any) -> List[Override]:
    overrides: List[Override] = []

    # We need to inspect each item in the MRO, until we get to our Type, at that
    # point we'll bail, because those methods are not the overriden methods, but the
    # "real" methods.
    jsii_name = getattr(klass, "__jsii_type__", "Object")
    jsii_classes = [
        next(
            (
                m
                for m in type(obj).mro()
                if getattr(m, "__jsii_declared_type__", None) == jsii_name
            ),
            Object,
        )
    ] + list(
        itertools.chain.from_iterable(
            (getattr(m, "__jsii_ifaces__", []) for m in type(obj).mro())
        )
    )
    for mro_klass in type(obj).mro():
        if getattr(mro_klass, "__jsii_declared_type__", None) is not None:
            # There is a jsii declared type, so we reached a "well known" object,
            # and nothing from now on is an override.
            break
        if mro_klass is Object or mro_klass is object:
            break

        for name, item in mro_klass.__dict__.items():
            # Ignore all "special" members (name starting with __)...
            if name.startswith("__"):
                continue

            # We're only interested in things that also exist on the JSII class or
            # interfaces, and which are themselves, jsii members.
            for jsii_class in jsii_classes:
                original = getattr(jsii_class, name, _nothing)
                if original is not _nothing:
                    if inspect.isfunction(item) and hasattr(original, "__jsii_name__"):
                        if any(
                            entry.method == cast(Any, original).__jsii_name__
                            for entry in overrides
                        ):
                            # Don't re-register an override we already discovered through a previous type
                            continue
                        overrides.append(
                            Override(
                                method=cast(Any, original).__jsii_name__, cookie=name
                            )
                        )
                        break
                    elif inspect.isdatadescriptor(item) and hasattr(
                        getattr(original, "fget", None), "__jsii_name__"
                    ):
                        if any(
                            entry.property == cast(Any, original).fget.__jsii_name__
                            for entry in overrides
                        ):
                            # Don't re-register an override we already discovered through a previous type
                            continue
                        overrides.append(
                            Override(
                                property=cast(Any, original).fget.__jsii_name__,
                                cookie=name,
                            )
                        )
                        break

    return overrides


def _recursize_dereference(kernel: "Kernel", d: Any) -> Any:
    if isinstance(d, dict):
        return {k: _recursize_dereference(kernel, v) for k, v in d.items()}
    elif isinstance(d, list):
        return [_recursize_dereference(kernel, i) for i in d]
    elif isinstance(d, ObjRef):
        return _reference_map.resolve_reference(kernel, d)
    elif isinstance(d, EnumRef):
        return _recursize_dereference(kernel, d.ref)(d.member)
    else:
        return d


def _dereferenced(fn: Callable) -> Callable:
    @functools.wraps(fn)
    def wrapped(kernel: "Kernel", *args: Any, **kwargs: Any):
        return _recursize_dereference(kernel, fn(kernel, *args, **kwargs))

    return wrapped


# We need to recurse through our data structure and look for anything that the JSII
# doesn't natively handle. These items will be created as "Object" types in the JSII.
def _make_reference_for_native(kernel: "Kernel", d: Any) -> Any:
    if isinstance(d, dict):
        return {
            "$jsii.map": {
                k: _make_reference_for_native(kernel, v) for k, v in d.items()
            }
        }

    elif isinstance(d, list):
        return [_make_reference_for_native(kernel, i) for i in d]

    if getattr(d, "__jsii_type__", None) is not None:
        typeFqn = getattr(d, "__jsii_type__")

        if isinstance(d, enum.Enum):
            return {"$jsii.enum": f"{typeFqn}/{d.value}"}

        # Ugly delayed import here because I can't solve the cyclic
        # package dependency right now :(.
        from .._runtime import python_jsii_mapping

        mapping = python_jsii_mapping(d)
        if mapping is not None:  # This means we are handling a data_type (aka Struct)
            return {
                "$jsii.struct": {
                    "fqn": typeFqn,
                    "data": {
                        jsii_name: _make_reference_for_native(
                            kernel, getattr(d, python_name)
                        )
                        for python_name, jsii_name in mapping.items()
                    },
                }
            }
        return d

    elif isinstance(d, (int, type(None), str, float, bool, datetime.datetime)):
        return d

    elif isinstance(d, (FunctionType, MethodType, BuiltinFunctionType, LambdaType)):
        # Whether a given object is a function-like object.
        # We won't use iscallable() since objects may implement __call__()
        # but we still want to serialize them as normal.
        raise JSIIError(
            "Cannot pass function as argument here (did you mean to call this function?): %r"
            % d
        )

    else:
        kernel.create(d.__class__, d)
        _reference_map.register_reference(d)
        return d


def _handle_callback(kernel: "Kernel", callback: Callback) -> Any:
    # need to handle get, set requests here as well as invoke requests
    if callback.invoke:
        obj = _reference_map.resolve_id(callback.invoke.objref.ref)
        method = getattr(obj, callback.cookie)
        hydrated_args = [
            _recursize_dereference(kernel, a) for a in callback.invoke.args or []
        ]

        # If keyword arguments are accepted, we may need to turn a struct into keywords...
        kwargs = {}  # No keyword arguments by default
        params = inspect.signature(method).parameters
        params_kwargs = [
            name
            for (name, param) in params.items()
            if param.kind == inspect.Parameter.KEYWORD_ONLY
        ]
        if len(params_kwargs) > 0:
            params_pos_count = len(
                [
                    param
                    for param in params.values()
                    if param.kind == inspect.Parameter.POSITIONAL_OR_KEYWORD
                    or param.kind == inspect.Parameter.POSITIONAL_ONLY
                ]
            )
            if len(hydrated_args) > params_pos_count:
                struct = hydrated_args.pop()
                kwargs = {
                    name: getattr(struct, name)
                    for name in params_kwargs
                    if hasattr(struct, name)
                }

        return method(*hydrated_args, **kwargs)
    elif callback.get:
        obj = _reference_map.resolve_id(callback.get.objref.ref)
        return getattr(obj, callback.cookie)
    elif callback.set:
        obj = _reference_map.resolve_id(callback.set.objref.ref)
        hydrated_value = _recursize_dereference(kernel, callback.set.value)
        return setattr(obj, callback.cookie, hydrated_value)
    else:
        raise JSIIError("Callback does not contain invoke|get|set")


def _callback_till_result(
    kernel: "Kernel", response: Callback, response_type: Type[KernelResponse]
) -> Any:
    while isinstance(response, Callback):
        try:
            result = _handle_callback(kernel, response)
        except Exception as exc:
            response = kernel.sync_complete(
                response.cbid, str(exc), None, response_type
            )
        else:
            response = kernel.sync_complete(response.cbid, None, result, response_type)

    if isinstance(response, InvokeResponse):
        return response.result
    elif isinstance(response, GetResponse):
        return response.value
    else:
        return response


@attr.s(auto_attribs=True, frozen=True, slots=True)
class Statistics:
    object_count: int


class Kernel(metaclass=Singleton):
    # This class translates between the Pythonic interface for the kernel, and the
    # Kernel Provider interface that maps more directly to the JSII Kernel interface.
    # It currently only supports the idea of a process kernel provider, however it
    # should be possible to move to other providers in the future.

    # TODO: We don't currently have any error handling, but we need to. This should
    #       probably live at the provider layer though, maybe with something catching
    #       them at this layer to translate it to something more Pythonic, depending
    #       on what the provider layer looks like.

    def __init__(self, provider_class: Type[BaseProvider] = ProcessProvider) -> None:
        self.provider = provider_class()

    # TODO: Do we want to return anything from this method? Is the return value useful
    #       to anyone?
    def load(self, name: str, version: str, tarball: str) -> None:
        self.provider.load(LoadRequest(name=name, version=version, tarball=tarball))

    def getBinScriptCommand(
        self, pkgname: str, script: str, args: Optional[Sequence[str]] = None
    ) -> GetScriptCommandResponse:
        if args is None:
            args = []

        return self.provider.getScriptCommand(
            GetScriptCommandRequest(
                assembly=pkgname,
                script=script,
                args=_make_reference_for_native(self, args),
            )
        )

    def invokeBinScript(
        self, pkgname: str, script: str, args: Optional[Sequence[str]] = None
    ) -> InvokeScriptResponse:
        if args is None:
            args = []

        return self.provider.invokeBinScript(
            InvokeScriptRequest(
                assembly=pkgname,
                script=script,
                args=_make_reference_for_native(self, args),
            )
        )

    # TODO: Is there a way to say that obj has to be an instance of klass?
    def create(self, klass: Type, obj: Any, args: Optional[List[Any]] = None) -> ObjRef:
        if args is None:
            args = []

        response = self.provider.create(
            CreateRequest(
                fqn=klass.__jsii_type__ or "Object",
                args=_make_reference_for_native(self, args),
                overrides=_get_overides(klass, obj),
                interfaces=[
                    iface.__jsii_type__
                    for iface in getattr(klass, "__jsii_ifaces__", [])
                ],
            )
        )
        if isinstance(response, Callback):
            obj.__jsii_ref__ = _callback_till_result(self, response, CreateResponse)
        else:
            obj.__jsii_ref__ = response

        # Register this to the reference map already (so it's available within the rest of the __init__)
        _reference_map.register_reference(obj)

        return obj.__jsii_ref__

    def delete(self, ref: ObjRef) -> None:
        self.provider.delete(DeleteRequest(objref=ref))

    @_dereferenced
    def get(self, obj: Any, property: str) -> Any:
        response = self.provider.get(
            GetRequest(objref=obj.__jsii_ref__, property=property)
        )
        if isinstance(response, Callback):
            return _callback_till_result(self, response, GetResponse)
        else:
            return response.value

    def set(self, obj: Any, property: str, value: Any) -> None:
        response = self.provider.set(
            SetRequest(
                objref=obj.__jsii_ref__,
                property=property,
                value=_make_reference_for_native(self, value),
            )
        )
        if isinstance(response, Callback):
            _callback_till_result(self, response, SetResponse)

    @_dereferenced
    def sget(self, klass: Type, property: str) -> Any:
        return self.provider.sget(
            StaticGetRequest(fqn=klass.__jsii_type__, property=property)
        ).value

    def sset(self, klass: Type, property: str, value: Any) -> None:
        self.provider.sset(
            StaticSetRequest(
                fqn=klass.__jsii_type__,
                property=property,
                value=_make_reference_for_native(self, value),
            )
        )

    @_dereferenced
    def invoke(self, obj: Any, method: str, args: Optional[List[Any]] = None) -> Any:
        if args is None:
            args = []

        response = self.provider.invoke(
            InvokeRequest(
                objref=obj.__jsii_ref__,
                method=method,
                args=_make_reference_for_native(self, args),
            )
        )
        if isinstance(response, Callback):
            return _callback_till_result(self, response, InvokeResponse)
        else:
            return response.result

    @_dereferenced
    def sinvoke(
        self, klass: Type, method: str, args: Optional[List[Any]] = None
    ) -> Any:
        if args is None:
            args = []

        response = self.provider.sinvoke(
            StaticInvokeRequest(
                fqn=klass.__jsii_type__,
                method=method,
                args=_make_reference_for_native(self, args),
            )
        )
        if isinstance(response, Callback):
            return _callback_till_result(self, response, InvokeResponse)
        else:
            return response.result

    @_dereferenced
    def complete(self, cbid: str, err: Optional[str], result: Any) -> Any:
        return self.provider.complete(
            CompleteRequest(
                cbid=cbid, err=err, result=_make_reference_for_native(self, result)
            )
        )

    def sync_complete(
        self,
        cbid: str,
        err: Optional[str],
        result: Any,
        response_type: Type[KernelResponse],
    ) -> Any:
        return self.provider.sync_complete(
            CompleteRequest(
                cbid=cbid, err=err, result=_make_reference_for_native(self, result)
            ),
            response_type=response_type,
        )

    @_dereferenced
    def ainvoke(self, obj: Any, method: str, args: Optional[List[Any]] = None) -> Any:
        if args is None:
            args = []

        promise = self.provider.begin(
            BeginRequest(
                objref=obj.__jsii_ref__,
                method=method,
                args=_make_reference_for_native(self, args),
            )
        )
        if isinstance(promise, Callback):
            promise = _callback_till_result(self, promise, BeginResponse)

        callbacks = self.provider.callbacks(CallbacksRequest()).callbacks
        while callbacks:
            for callback in callbacks:
                try:
                    result = _handle_callback(self, callback)
                except Exception as exc:
                    # TODO: Maybe we want to print the whole traceback here?
                    complete = self.provider.complete(
                        CompleteRequest(cbid=callback.cbid, err=str(exc))
                    )
                else:
                    complete = self.provider.complete(
                        CompleteRequest(cbid=callback.cbid, result=result)
                    )

                assert complete.cbid == callback.cbid

            callbacks = self.provider.callbacks(CallbacksRequest()).callbacks

        return self.provider.end(EndRequest(promiseid=promise.promiseid)).result

    def stats(self):
        resp = self.provider.stats(StatsRequest())

        return Statistics(object_count=resp.objectCount)
