import datetime
import inspect
import itertools

from typing import Any, List, Optional, Type, Union

import functools

import attr

from jsii.errors import JSIIError
from jsii import _reference_map
from jsii._utils import Singleton
from jsii._kernel.providers import BaseProvider, ProcessProvider
from jsii._kernel.types import JSClass, Referenceable
from jsii._kernel.types import Callback
from jsii._kernel.types import (
    EnumRef,
    LoadRequest,
    BeginRequest,
    CallbacksRequest,
    CreateRequest,
    CreateResponse,
    CompleteRequest,
    DeleteRequest,
    EndRequest,
    GetRequest,
    InvokeRequest,
    SetRequest,
    StaticGetRequest,
    StaticInvokeRequest,
    StaticSetRequest,
    StatsRequest,
    ObjRef,
    Override,
    CompleteRequest,
    CompleteResponse,
    GetResponse,
    SetResponse,
    InvokeResponse,
    KernelResponse,
    BeginResponse
)


_nothing = object()


class Object:
    __jsii_type__ = "Object"


def _get_overides(klass: JSClass, obj: Any) -> List[Override]:
    overrides = []

    # We need to inspect each item in the MRO, until we get to our JSClass, at that
    # point we'll bail, because those methods are not the overriden methods, but the
    # "real" methods.
    jsii_classes = [klass] + list(
        itertools.chain.from_iterable(
            (getattr(m, "__jsii_ifaces__", []) for m in type(obj).mro())
        )
    )
    for mro_klass in type(obj).mro():
        if mro_klass is klass:
            break

        for name, item in mro_klass.__dict__.items():
            # We're only interested in things that also exist on the JSII class or
            # interfaces, and which are themselves, jsii members.
            for jsii_class in jsii_classes:
                original = getattr(jsii_class, name, _nothing)
                if original is not _nothing:
                    if inspect.isfunction(item) and hasattr(original, "__jsii_name__"):
                        overrides.append(
                            Override(method=original.__jsii_name__, cookie=name)
                        )
                    elif inspect.isdatadescriptor(item) and hasattr(
                        getattr(original, "fget", None), "__jsii_name__"
                    ):
                        overrides.append(
                            Override(property=original.fget.__jsii_name__, cookie=name)
                        )

    return overrides


def _recursize_dereference(kernel, d):
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


def _dereferenced(fn):
    @functools.wraps(fn)
    def wrapped(kernel, *args, **kwargs):
        return _recursize_dereference(kernel, fn(kernel, *args, **kwargs))

    return wrapped


# We need to recurse through our data structure and look for anything that the JSII
# doesn't natively handle. These items will be created as "Object" types in the JSII.
def _make_reference_for_native(kernel, d):
    if isinstance(d, dict):
        return {k: _make_reference_for_native(kernel, v) for k, v in d.items()}
    elif isinstance(d, list):
        return [_make_reference_for_native(kernel, i) for i in d]
    elif hasattr(d, "__jsii_type__"):
        return d
    elif isinstance(d, (int, type(None), str, float, bool, datetime.datetime)):
        return d
    else:
        d.__jsii__type__ = "Object"
        kernel.create(Object, d)
        _reference_map.register_reference(d)
        return d


def _handle_callback(kernel, callback):
    # need to handle get, set requests here as well as invoke requests
    if callback.invoke:
        obj = _reference_map.resolve_id(callback.invoke.objref.ref)
        method = getattr(obj, callback.cookie)
        return method(*callback.invoke.args)
    elif callback.get:
        obj = _reference_map.resolve_id(callback.get.objref.ref)
        return getattr(obj, callback.cookie)
    elif callback.set:
        obj = _reference_map.resolve_id(callback.set.objref.ref)
        return setattr(obj, callback.cookie, callback.set.value)
    else:
        raise JSIIError("Callback does not contain invoke|get|set")


def _callback_till_result(kernel, response: Callback, response_type: Type[KernelResponse]) -> Any:
    while isinstance(response, Callback):
        try:
            result = _handle_callback(kernel, response)
        except Exception as exc:
            response = kernel.sync_complete(response.cbid, str(exc), None, response_type)
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

    # TODO: Is there a way to say that obj has to be an instance of klass?
    def create(
        self, klass: JSClass, obj: Any, args: Optional[List[Any]] = None
    ) -> ObjRef:
        if args is None:
            args = []

        overrides = _get_overides(klass, obj)

        response = self.provider.create(
            CreateRequest(
                fqn=klass.__jsii_type__,
                args=_make_reference_for_native(self, args),
                overrides=overrides,
            )
        )
        if isinstance(response, Callback):
            obj.__jsii_ref__ =  _callback_till_result(self, response, CreateResponse)
        else:
            obj.__jsii_ref__ = response
        return obj.__jsii_ref__

    def delete(self, ref: ObjRef) -> None:
        self.provider.delete(DeleteRequest(objref=ref))

    @_dereferenced
    def get(self, obj: Referenceable, property: str) -> Any:
        response = self.provider.get(
            GetRequest(objref=obj.__jsii_ref__, property=property)
        )
        if isinstance(response, Callback):
            return _callback_till_result(self, response, GetResponse)
        else:
            return response.value

    def set(self, obj: Referenceable, property: str, value: Any) -> None:
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
    def sget(self, klass: JSClass, property: str) -> Any:
        return self.provider.sget(
            StaticGetRequest(fqn=klass.__jsii_type__, property=property)
        ).value

    def sset(self, klass: JSClass, property: str, value: Any) -> None:
        self.provider.sset(
            StaticSetRequest(
                fqn=klass.__jsii_type__,
                property=property,
                value=_make_reference_for_native(self, value),
            )
        )

    @_dereferenced
    def invoke(
        self, obj: Referenceable, method: str, args: Optional[List[Any]] = None
    ) -> Any:
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
        self, klass: JSClass, method: str, args: Optional[List[Any]] = None
    ) -> Any:
        if args is None:
            args = []

        return self.provider.sinvoke(
            StaticInvokeRequest(
                fqn=klass.__jsii_type__,
                method=method,
                args=_make_reference_for_native(self, args),
            )
        ).result

    @_dereferenced
    def complete(
        self, cbid: str, err: Optional[str], result: Any
    ) -> Any:
        return self.provider.complete(
            CompleteRequest(
                cbid=cbid,
                err=err,
                result=result
            )
        )

    def sync_complete(
        self, cbid: str, err: Optional[str], result: Any, response_type: Type[KernelResponse]
    ) -> Any:
        return self.provider.sync_complete(
            CompleteRequest(
                cbid=cbid,
                err=err,
                result=result),
            response_type=response_type
        )

    def ainvoke(
        self, obj: Referenceable, method: str, args: Optional[List[Any]] = None
    ) -> Any:
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
