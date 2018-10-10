import contextlib
import importlib.machinery
import json
import os.path
import subprocess
import tempfile

from typing import Type, Union, Mapping, Any, Optional

import attr
import cattr  # type: ignore

import jsii._embedded.jsii

from jsii._compat import importlib_resources
from jsii._utils import memoized_property
from jsii._kernel.providers.base import BaseKernel
from jsii._kernel.types import (
    ObjRef,
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
    StatsRequest,
    StatsResponse,
)


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


def ohook(d):
    if d.keys() == {"$jsii.byref"}:
        return ObjRef(ref=d["$jsii.byref"])
    return d


def jdefault(obj):
    if hasattr(obj, "__jsii_ref__"):
        return _unstructure_ref(obj.__jsii_ref__)
    raise TypeError


class _NodeProcess:
    def __init__(self):
        self._serializer = cattr.Converter()
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
            StatsRequest,
            _with_api_key("stats", self._serializer.unstructure_attrs_asdict),
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
        self._process = subprocess.Popen(
            ["node", self._jsii_runtime()],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
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
        resp: _HelloResponse = self._serializer.structure(
            self._next_message(), _HelloResponse
        )

        # TODO: Replace with proper error.
        assert (
            resp.hello == "jsii-runtime@0.7.6"
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
            self._next_message(), _ProcessResponse
        )

        if isinstance(resp, _OkayResponse):
            return self._serializer.structure(resp.ok, response_type)
        else:
            raise NotImplementedError


class ProcessKernel(BaseKernel):
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

    def stats(self, request: Optional[StatsRequest] = None) -> StatsResponse:
        if request is None:
            request = StatsRequest()
        return self._process.send(request, StatsResponse)
