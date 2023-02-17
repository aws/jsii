from typing import Any, Dict, Generic, List, Optional, Mapping, TypeVar, Union
from typing_extensions import Protocol

import attr


@attr.s(auto_attribs=True, frozen=True, slots=True)
class ObjRef:
    ref: str
    interfaces: Optional[List[str]] = None


@attr.s(auto_attribs=True, frozen=True, slots=True)
class EnumRef:
    ref: ObjRef
    member: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class Override:
    method: Optional[str] = None
    property: Optional[str] = None
    cookie: Optional[str] = None


@attr.s(auto_attribs=True, frozen=True, slots=True)
class LoadRequest:
    name: str
    version: str
    tarball: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class LoadResponse:
    assembly: str
    types: int


@attr.s(auto_attribs=True, frozen=True, slots=True)
class GetScriptCommandRequest:
    assembly: str
    script: str
    args: List[Any] = attr.Factory(list)


@attr.s(auto_attribs=True, frozen=True, slots=True)
class GetScriptCommandResponse:
    command: str
    args: List[str] = attr.Factory(list)
    env: Dict[str, str] = attr.Factory(dict)


@attr.s(auto_attribs=True, frozen=True, slots=True)
class InvokeScriptRequest:
    assembly: str
    script: str
    args: List[Any] = attr.Factory(list)


@attr.s(auto_attribs=True, frozen=True, slots=True)
class InvokeScriptResponse:
    status: int
    stdout: str
    stderr: str
    signal: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class CreateRequest:
    fqn: str
    args: List[Any] = attr.Factory(list)
    overrides: List[Override] = attr.Factory(list)
    interfaces: Optional[List[str]] = None


@attr.s(auto_attribs=True, frozen=True, slots=True)
class CreateResponse(ObjRef):
    ...


@attr.s(auto_attribs=True, frozen=True, slots=True)
class DeleteRequest:
    objref: ObjRef


@attr.s(auto_attribs=True, frozen=True, slots=True)
class DeleteResponse:
    ...


@attr.s(auto_attribs=True, frozen=True, slots=True)
class GetRequest:
    objref: ObjRef
    property: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class StaticGetRequest:
    fqn: str
    property: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class GetResponse:
    value: Any = None


@attr.s(auto_attribs=True, frozen=True, slots=True)
class StaticSetRequest:
    fqn: str
    property: str
    value: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class SetRequest:
    objref: ObjRef
    property: str
    value: Any


@attr.s(auto_attribs=True, frozen=True, slots=True)
class SetResponse:
    ...


@attr.s(auto_attribs=True, frozen=True, slots=True)
class StaticInvokeRequest:
    fqn: str
    method: str
    args: Optional[List[Any]] = attr.Factory(list)


@attr.s(auto_attribs=True, frozen=True, slots=True)
class InvokeRequest:
    objref: ObjRef
    method: str
    args: Optional[List[Any]] = attr.Factory(list)


@attr.s(auto_attribs=True, frozen=True, slots=True)
class InvokeResponse:
    result: Any = None


@attr.s(auto_attribs=True, frozen=True, slots=True)
class BeginRequest:
    objref: ObjRef
    method: str
    args: Optional[List[Any]] = attr.Factory(list)


@attr.s(auto_attribs=True, frozen=True, slots=True)
class BeginResponse:
    promiseid: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class EndRequest:
    promiseid: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class EndResponse:
    result: Optional[Any] = None


@attr.s(auto_attribs=True, frozen=True, slots=True)
class Callback:
    cbid: str
    cookie: str
    invoke: Optional[InvokeRequest] = None
    get: Optional[GetRequest] = None
    set: Optional[SetRequest] = None


@attr.s(auto_attribs=True, frozen=True, slots=True)
class CallbacksRequest:
    ...


@attr.s(auto_attribs=True, frozen=True, slots=True)
class CallbacksResponse:
    callbacks: List[Callback]


@attr.s(auto_attribs=True, frozen=True, slots=True)
class CompleteRequest:
    cbid: str
    err: Optional[str] = None
    result: Optional[Any] = None


@attr.s(auto_attribs=True, frozen=True, slots=True)
class CompleteResponse:
    cbid: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class NamingRequest:
    assembly: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class NamingResponse:
    naming: Mapping[str, Mapping[str, Optional[Any]]]


@attr.s(auto_attribs=True, frozen=True, slots=True)
class StatsRequest:
    ...


@attr.s(auto_attribs=True, frozen=True, slots=True)
class StatsResponse:
    objectCount: int


KernelRequest = Union[
    LoadRequest,
    CreateRequest,
    DeleteRequest,
    GetRequest,
    SetRequest,
    StaticGetRequest,
    InvokeRequest,
    InvokeScriptRequest,
    StaticInvokeRequest,
    StatsRequest,
]

KernelResponse = Union[
    BeginResponse,
    LoadResponse,
    CreateResponse,
    DeleteResponse,
    GetResponse,
    InvokeResponse,
    InvokeScriptResponse,
    SetResponse,
    StatsResponse,
    Callback,
]
