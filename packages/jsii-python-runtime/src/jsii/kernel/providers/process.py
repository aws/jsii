import json
import subprocess

from typing import Type, Union, Mapping, Any, Optional

import attr
import cattr  # type: ignore

from jsii._utils import memoized_property
from jsii.kernel.providers.base import BaseKernel
from jsii.kernel.types import (
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
    return type_(data["$jsii.byref"])


def _unstructure_ref(value):
    return {"$jsii.byref": value.ref}


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

    def __del__(self):
        self.stop()

    def _next_message(self) -> Mapping[Any, Any]:
        return json.loads(self._process.stdout.readline())

    def start(self):
        self._process = subprocess.Popen(
            "jsii-runtime", shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE
        )
        self.handshake()

    def stop(self):
        # TODO: We can write an empty string here instead?
        self._process.terminate()

        try:
            self._process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            self._process.kill()

    def handshake(self):
        resp: _HelloResponse = self._serializer.structure(
            self._next_message(), _HelloResponse
        )

        # TODO: Replace with proper error.
        assert (
            resp.hello == "jsii-runtime@0.7.1"
        ), f"Invalid JSII Runtime Version: {resp.hello!r}"

    def send(
        self, request: KernelRequest, response_type: Type[KernelResponse]
    ) -> KernelResponse:
        req_dict = self._serializer.unstructure(request)
        # TODO: We need a cleaner solution to this, ideally we'll get
        # #python-attrs/attrs#429 fixed.
        if "property_" in req_dict:
            req_dict["property"] = req_dict.pop("property_")
        data = json.dumps(req_dict).encode("utf8")

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
