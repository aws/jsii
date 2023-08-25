import atexit
import base64
import datetime
import contextlib
import enum
import json
import os
import os.path
import pathlib
import platform
import subprocess
import sys
import tempfile
import threading

from typing import TYPE_CHECKING, Type, Union, Mapping, IO, Any, AnyStr, Optional

import attr
import cattr  # type: ignore
import dateutil.parser

import jsii._embedded.jsii

from ...__meta__ import __jsii_runtime_version__
from ..._compat import importlib_resources
from ..._utils import memoized_property
from .base import BaseProvider
from ..types import (
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
    GetScriptCommandRequest,
    GetScriptCommandResponse,
    InvokeScriptRequest,
    InvokeScriptResponse,
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
    Callback,
    CompleteRequest,
    CompleteResponse,
)
from ...errors import ErrorType, JSIIError, JavaScriptError


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
class _ErrorResponse:
    error: str
    stack: str
    name: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class _CallbackResponse:
    callback: Callback


@attr.s(auto_attribs=True, frozen=True, slots=True)
class _CompleteRequest:
    complete: CompleteRequest


_ProcessResponse = Union[_OkayResponse, _ErrorResponse, _CallbackResponse]


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
    if d.keys() == {"$jsii.byref"} or d.keys() == {"$jsii.byref", "$jsii.interfaces"}:
        return ObjRef(ref=d["$jsii.byref"], interfaces=d.get("$jsii.interfaces"))
    if d.keys() == {"$jsii.date"}:
        return dateutil.parser.isoparse(d["$jsii.date"])
    if d.keys() == {"$jsii.enum"}:
        ref, member = d["$jsii.enum"].rsplit("/", 1)
        return EnumRef(ref=ObjRef(ref=ref + "@"), member=member)
    if d.keys() == {"$jsii.map"}:
        return d["$jsii.map"]
    return d


def jdefault(obj):
    if hasattr(obj, "__jsii_ref__"):
        return _unstructure_ref(obj.__jsii_ref__)
    if isinstance(obj, datetime.datetime) and obj.tzinfo is not None:
        return {"$jsii.date": obj.isoformat()}
    elif isinstance(obj, datetime.datetime):
        raise TypeError("Naive datetimes are not supported, please add a timzone.")
    raise TypeError("Don't know how to convert object to JSON: %r" % obj)


class _NodeProcess:
    def __init__(self):
        self._serializer = cattr.Converter()
        self._serializer.register_unstructure_hook(enum.Enum, _unstructure_enum)
        self._serializer.register_unstructure_hook(
            LoadRequest,
            _with_api_key("load", self._serializer.unstructure_attrs_asdict),
        )
        self._serializer.register_unstructure_hook(
            GetScriptCommandRequest,
            _with_api_key(
                "getBinScriptCommand", self._serializer.unstructure_attrs_asdict
            ),
        )
        self._serializer.register_unstructure_hook(
            InvokeScriptRequest,
            _with_api_key("invokeBinScript", self._serializer.unstructure_attrs_asdict),
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
            GetRequest, _with_api_key("get", self._serializer.unstructure_attrs_asdict)
        )
        self._serializer.register_unstructure_hook(
            StaticGetRequest,
            _with_api_key("sget", self._serializer.unstructure_attrs_asdict),
        )
        self._serializer.register_unstructure_hook(
            SetRequest, _with_api_key("set", self._serializer.unstructure_attrs_asdict)
        )
        self._serializer.register_unstructure_hook(
            StaticSetRequest,
            _with_api_key("sset", self._serializer.unstructure_attrs_asdict),
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
            Override, self._serializer.unstructure_attrs_asdict
        )
        self._serializer.register_unstructure_hook(ObjRef, _unstructure_ref)
        self._serializer.register_structure_hook(ObjRef, _with_reference)

        self._ctx_stack = contextlib.ExitStack()

    def __del__(self):
        self.stop()

    def _jsii_runtime(self) -> str:
        tmpdir = self._ctx_stack.enter_context(tempfile.TemporaryDirectory())
        resources = {
            resname: os.path.join(tmpdir, filename.replace("/", os.sep))
            for resname, filename in jsii._embedded.jsii.EMBEDDED_FILES.items()
        }

        for resname, filename in resources.items():
            pathlib.Path(os.path.dirname(filename)).mkdir(exist_ok=True)
            with open(filename, "wb") as fp:
                fp.write(
                    importlib_resources.files(jsii._embedded.jsii)
                    .joinpath(resname)
                    .read_bytes()
                )

        # Return our first path, which should be the path for jsii-runtime.js
        return resources[jsii._embedded.jsii.ENTRYPOINT]

    def _next_message(self) -> Mapping[Any, Any]:
        assert self._process.stdout is not None
        return json.loads(self._process.stdout.readline(), object_hook=ohook)

    def start(self):
        environ = os.environ.copy()
        environ["JSII_AGENT"] = f"Python/{platform.python_version()}"

        jsii_node = environ.get("JSII_NODE", "node")
        jsii_runtime = environ.get("JSII_RUNTIME", self._jsii_runtime())

        self._process = subprocess.Popen(
            [
                jsii_node,
                "--max-old-space-size=4069",
                jsii_runtime,
            ],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=environ,
        )

        self.sink_thread = threading.Thread(
            name="process.stderr_sink",
            target=stderr_sink,
            # Trailing comma here is important (this is a 1-value tuple, not a value between parentheses)
            args=(self._process.stderr,),
            # Thread is a daemon so it does not hold the VM from shutting down
            daemon=True,
        )
        self.sink_thread.start()

        # Clean this process up at exit, so it terminates "gracefully"
        atexit.register(self.stop)

        self.handshake()

    def stop(self) -> None:
        # This process is closing already, un-registering the hook to not fire twice
        atexit.unregister(self.stop)

        assert self._process.stdin is not None
        if not self._process.stdin.closed:
            self._process.stdin.write(b'{"exit":0}\n')
            # Close the process' STDIN, singaling we are done with it
            self._process.stdin.close()

        try:
            self._process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            self._process.terminate()

        if self.sink_thread.is_alive():
            self.sink_thread.join(timeout=5)

        self._ctx_stack.close()

    def handshake(self) -> None:
        # Get the version of the runtime that we're using.
        resp: _HelloResponse = self._serializer.structure(
            self._next_message(), _HelloResponse
        )

        # TODO: Replace with proper error.
        assert (
            resp.hello == f"@jsii/runtime@{__jsii_runtime_version__}"
            # Transparently allow development versions of the runtime to be used.
            or resp.hello == f"@jsii/runtime@0.0.0"
        ), f"Invalid JSII Runtime Version: {resp.hello!r}"

    def send(
        self, request: KernelRequest, response_type: Type[KernelResponse]
    ) -> KernelResponse:
        req_dict = self._serializer.unstructure(request)
        data = json.dumps(req_dict, default=jdefault).encode("utf8")

        # Send our data, ensure that it is framed with a trailing \n
        assert self._process.stdin is not None
        self._process.stdin.write(b"%b\n" % (data,))
        self._process.stdin.flush()

        resp: _ProcessResponse = self._serializer.structure(
            self._next_message(), _ProcessResponse
        )

        if isinstance(resp, _OkayResponse):
            return self._serializer.structure(resp.ok, response_type)
        elif isinstance(resp, _CallbackResponse):
            return resp.callback
        else:
            if resp.name == ErrorType.JSII_FAULT.value:
                raise JSIIError(resp.error) from JavaScriptError(resp.stack)
            raise RuntimeError(resp.error) from JavaScriptError(resp.stack)


class ProcessProvider(BaseProvider):
    @memoized_property
    def _process(self) -> _NodeProcess:
        process = _NodeProcess()
        process.start()

        return process

    def load(self, request: LoadRequest) -> LoadResponse:
        return self._process.send(request, LoadResponse)

    def getScriptCommand(
        self, request: GetScriptCommandRequest
    ) -> GetScriptCommandResponse:
        return self._process.send(request, GetScriptCommandResponse)

    def invokeBinScript(self, request: InvokeScriptRequest) -> InvokeScriptResponse:
        return self._process.send(request, InvokeScriptResponse)

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

    def invoke(self, request: InvokeRequest) -> Union[InvokeResponse, Callback]:
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

    def sync_complete(
        self, request: CompleteRequest, response_type: Type[KernelResponse]
    ) -> Union[InvokeResponse, GetResponse]:
        resp = self._process.send(_CompleteRequest(complete=request), response_type)
        return resp

    def stats(self, request: Optional[StatsRequest] = None) -> StatsResponse:
        if request is None:
            request = StatsRequest()
        return self._process.send(request, StatsResponse)


def stderr_sink(reader: IO[AnyStr]) -> None:
    # An empty string is used to signal EOF...
    for line in iter(reader.readline, b""):
        if line == b"":
            break
        try:
            console = json.loads(line)
            if console.get("stderr") is not None:
                sys.stderr.buffer.write(base64.b64decode(console["stderr"]))
            if console.get("stdout") is not None:
                sys.stdout.buffer.write(base64.b64decode(console["stdout"]))
        except:
            print(line, file=sys.stderr)
