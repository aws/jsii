import datetime
import contextlib
import enum
import importlib.machinery
import json
import os
import os.path
import platform
import subprocess
import tempfile

from typing import TYPE_CHECKING, Type, Union, Mapping, Any, Optional

import attr
import cattr  # type: ignore
import dateutil.parser

import jsii._embedded.jsii

from jsii.__meta__ import __jsii_runtime_version__
from jsii._compat import importlib_resources
from jsii._utils import memoized_property
from jsii._kernel.providers.base import BaseProvider
from jsii._kernel.types import (
    ObjRef,
    EnumRef,
    Override,
    KernelRequest,
    KernelResponse,
    LoadRequest,
    LoadResponse,
    CreateRequest,
    CreateResponse,
    DeleteRequest,
    DeleteResponse,
    GetRequest,
    GetResponse,
    InvokeRequest,
    InvokeResponse,
    SetRequest,
    SetResponse,
    StaticGetRequest,
    StaticInvokeRequest,
    StaticSetRequest,
    BeginRequest,
    BeginResponse,
    EndRequest,
    EndResponse,
    CallbacksRequest,
    CallbacksResponse,
    CompleteRequest,
    CompleteResponse,
    StatsRequest,
    StatsResponse,
)
from jsii.errors import JSIIError, JavaScriptError


@attr.s(auto_attribs=True, frozen=True, slots=True)
class _HelloResponse:

    hello: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class _OkayResponse:

    # We could technically mark this as KernelResponse, because we know that
    # it is going to be one of those. However, we can't disambiguate the different
    # types because some of them have the same keys as each other, so the only way
    # to know what type the result is expected to be, is to know what method is
    # being called. Thus we'll expect Any here, and structure this value separately.
    ok: Any


@attr.s(auto_attribs=True, frozen=True, slots=True)
class _ErrorRespose:

    error: str
    stack: str


_ProcessResponse = Union[_OkayResponse, _ErrorRespose]
# Workaround for mypy#5354
_ProcessResponse_R: Type[Any]
if not TYPE_CHECKING:
    _ProcessResponse_R = _ProcessResponse


def _property_fix(asdict):
    def unstructurer(value):
        unstructured = asdict(value)
        if "property_" in unstructured:
            unstructured["property"] = unstructured.pop("property_")

        return unstructured

    return unstructurer


def _with_api_key(api_name, asdict):
    def unstructurer(value):
        unstructured = asdict(value)
        unstructured["api"] = api_name

        return unstructured

    return unstructurer


def _with_reference(data, type_):
    if not isinstance(data, type_):
        return type_(ref=data.ref)
    return data


def _unstructure_ref(value):
    return {"$jsii.byref": value.ref}


def _unstructure_enum(member):
    return {"$jsii.enum": f"{member.__class__.__jsii_type__}/{member.value}"}


def ohook(d):
    if d.keys() == {"$jsii.byref"}:
        return ObjRef(ref=d["$jsii.byref"])
    if d.keys() == {"$jsii.date"}:
        return dateutil.parser.isoparse(d["$jsii.date"])
    if d.keys() == {"$jsii.enum"}:
        ref, member = d["$jsii.enum"].rsplit("/", 1)
        return EnumRef(ref=ObjRef(ref=ref + "@"), member=member)
    return d


def jdefault(obj):
    if hasattr(obj, "__jsii_ref__"):
        return _unstructure_ref(obj.__jsii_ref__)
    if isinstance(obj, datetime.datetime) and obj.tzinfo is not None:
        return {"$jsii.date": obj.isoformat()}
    elif isinstance(obj, datetime.datetime):
        raise TypeError("Naive datetimes are not supported, please add a timzone.")
    raise TypeError


class _NodeProcess:
    def __init__(self):
        self._serializer = cattr.Converter()
        self._serializer.register_unstructure_hook(enum.Enum, _unstructure_enum)
        self._serializer.register_unstructure_hook(
            LoadRequest,
            _with_api_key("load", self._serializer.unstructure_attrs_asdict),
        )
        self._serializer.register_unstructure_hook(
            CreateRequest,
            _with_api_key("create", self._serializer.unstructure_attrs_asdict),
        )
        self._serializer.register_unstructure_hook(
            DeleteRequest,
            _with_api_key("del", self._serializer.unstructure_attrs_asdict),
        )
        self._serializer.register_unstructure_hook(
            GetRequest,
            _with_api_key(
                "get", _property_fix(self._serializer.unstructure_attrs_asdict)
            ),
        )
        self._serializer.register_unstructure_hook(
            StaticGetRequest,
            _with_api_key(
                "sget", _property_fix(self._serializer.unstructure_attrs_asdict)
            ),
        )
        self._serializer.register_unstructure_hook(
            SetRequest,
            _with_api_key(
                "set", _property_fix(self._serializer.unstructure_attrs_asdict)
            ),
        )
        self._serializer.register_unstructure_hook(
            StaticSetRequest,
            _with_api_key(
                "sset", _property_fix(self._serializer.unstructure_attrs_asdict)
            ),
        )
        self._serializer.register_unstructure_hook(
            InvokeRequest,
            _with_api_key("invoke", self._serializer.unstructure_attrs_asdict),
        )
        self._serializer.register_unstructure_hook(
            StaticInvokeRequest,
            _with_api_key("sinvoke", self._serializer.unstructure_attrs_asdict),
        )
        self._serializer.register_unstructure_hook(
            BeginRequest,
            _with_api_key("begin", self._serializer.unstructure_attrs_asdict),
        )
        self._serializer.register_unstructure_hook(
            EndRequest, _with_api_key("end", self._serializer.unstructure_attrs_asdict)
        )
        self._serializer.register_unstructure_hook(
            CallbacksRequest,
            _with_api_key("callbacks", self._serializer.unstructure_attrs_asdict),
        )
        self._serializer.register_unstructure_hook(
            CompleteRequest,
            _with_api_key("complete", self._serializer.unstructure_attrs_asdict),
        )
        self._serializer.register_unstructure_hook(
            StatsRequest,
            _with_api_key("stats", self._serializer.unstructure_attrs_asdict),
        )
        self._serializer.register_unstructure_hook(
            Override, _property_fix(self._serializer.unstructure_attrs_asdict)
        )
        self._serializer.register_unstructure_hook(ObjRef, _unstructure_ref)
        self._serializer.register_structure_hook(ObjRef, _with_reference)

        self._ctx_stack = contextlib.ExitStack()

    def __del__(self):
        self.stop()

    def _jsii_runtime(self):
        # We have the JSII Runtime bundled with our package and we want to extract it,
        # however if we just blindly use importlib.resources for this, we're going to
        # have our jsii-runtime.js existing in a *different* temporary directory from
        # the jsii-runtime.js.map, which we don't want. We can manually set up a
        # temporary directory and extract our resources to there, but we don't want to
        # pay the case of setting up a a temporary directory and shuffling bytes around
        # in the common case where these files already exist on disk side by side. So
        # we will check what loader the embedded package used, if it's a
        # SourceFileLoader then we'll assume it's going to be on the filesystem and
        # just use importlib.resources.path.

        # jsii-runtime.js MUST be the first item in this list.
        filenames = ["jsii-runtime.js", "jsii-runtime.js.map", "mappings.wasm"]

        if isinstance(
            jsii._embedded.jsii.__loader__, importlib.machinery.SourceFileLoader
        ):
            paths = [
                self._ctx_stack.enter_context(
                    importlib_resources.path(jsii._embedded.jsii, f)
                )
                for f in filenames
            ]
        else:
            tmpdir = self._ctx_stack.enter_context(tempfile.TemporaryDirectory())
            paths = [os.path.join(tmpdir, filename) for filename in filenames]

            for path, filename in zip(paths, filenames):
                with open(path, "wb") as fp:
                    fp.write(
                        importlib_resources.read_binary(jsii._embedded.jsii, filename)
                    )

        # Ensure that our jsii-runtime.js is the first entry in our paths, and that all
        # of our paths, are in a commmon directory, and we didn't get them split into
        # multiple directories somehow.
        assert os.path.basename(paths[0]) == filenames[0]
        assert os.path.commonpath(paths) == os.path.dirname(paths[0])

        # Return our first path, which should be the path for jsii-runtime.js
        return paths[0]

    def _next_message(self) -> Mapping[Any, Any]:
        return json.loads(self._process.stdout.readline(), object_hook=ohook)

    def start(self):
        environ = os.environ.copy()
        environ["JSII_AGENT"] = f"Python/{platform.python_version()}"

        self._process = subprocess.Popen(
            ["node", self._jsii_runtime()],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            env=environ,
        )
        self.handshake()

    def stop(self):
        # TODO: We can write an empty string here instead?
        self._process.terminate()

        try:
            self._process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            self._process.kill()

        self._ctx_stack.close()

    def handshake(self):
        # Get the version of the runtime that we're using.
        resp: _HelloResponse = self._serializer.structure(
            self._next_message(), _HelloResponse
        )

        # TODO: Replace with proper error.
        assert (
            resp.hello == f"jsii-runtime@{__jsii_runtime_version__}"
        ), f"Invalid JSII Runtime Version: {resp.hello!r}"

    def send(
        self, request: KernelRequest, response_type: Type[KernelResponse]
    ) -> KernelResponse:
        req_dict = self._serializer.unstructure(request)
        # TODO: We need a cleaner solution to this, ideally we'll get
        # #python-attrs/attrs#429 fixed.
        if "property_" in req_dict:
            req_dict["property"] = req_dict.pop("property_")
        data = json.dumps(req_dict, default=jdefault).encode("utf8")

        # Send our data, ensure that it is framed with a trailing \n
        self._process.stdin.write(b"%b\n" % (data,))
        self._process.stdin.flush()

        resp: _ProcessResponse = self._serializer.structure(
            self._next_message(), _ProcessResponse_R
        )

        if isinstance(resp, _OkayResponse):
            return self._serializer.structure(resp.ok, response_type)
        else:
            raise JSIIError(resp.error) from JavaScriptError(resp.stack)


class ProcessProvider(BaseProvider):
    @memoized_property
    def _process(self) -> _NodeProcess:
        process = _NodeProcess()
        process.start()

        return process

    def load(self, request: LoadRequest) -> LoadResponse:
        return self._process.send(request, LoadResponse)

    def create(self, request: CreateRequest) -> CreateResponse:
        return self._process.send(request, CreateResponse)

    def get(self, request: GetRequest) -> GetResponse:
        return self._process.send(request, GetResponse)

    def set(self, request: SetRequest) -> SetResponse:
        return self._process.send(request, SetResponse)

    def sget(self, request: StaticGetRequest) -> GetResponse:
        return self._process.send(request, GetResponse)

    def sset(self, request: StaticSetRequest) -> SetResponse:
        return self._process.send(request, SetResponse)

    def invoke(self, request: InvokeRequest) -> InvokeResponse:
        return self._process.send(request, InvokeResponse)

    def sinvoke(self, request: StaticInvokeRequest) -> InvokeResponse:
        return self._process.send(request, InvokeResponse)

    def delete(self, request: DeleteRequest) -> DeleteResponse:
        return self._process.send(request, DeleteResponse)

    def begin(self, request: BeginRequest) -> BeginResponse:
        return self._process.send(request, BeginResponse)

    def end(self, request: EndRequest) -> EndResponse:
        return self._process.send(request, EndResponse)

    def callbacks(self, request: CallbacksRequest) -> CallbacksResponse:
        return self._process.send(request, CallbacksResponse)

    def complete(self, request: CompleteRequest) -> CompleteResponse:
        return self._process.send(request, CompleteResponse)

    def stats(self, request: Optional[StatsRequest] = None) -> StatsResponse:
        if request is None:
            request = StatsRequest()
        return self._process.send(request, StatsResponse)
