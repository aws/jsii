from typing import Union, List, Any, Optional, Mapping

import attr

from jsii.compat import Protocol


# TODO:
# - HelloResponse
# - OkayResponse
# - ErrorResponse


@attr.s(auto_attribs=True, frozen=True, slots=True)
class ObjRef:

    ref: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class EnumRef:

    ref: ObjRef
    member: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class Override:

    method: Optional[str] = None
    property_: Optional[str] = None
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
class CreateRequest:

    fqn: str
    args: List[Any] = attr.Factory(list)
    overrides: List[Override] = attr.Factory(list)


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
    property_: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class StaticGetRequest:

    fqn: str
    property_: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class GetResponse:

    value: Any = None


@attr.s(auto_attribs=True, frozen=True, slots=True)
class StaticSetRequest:

    fqn: str
    property_: str
    value: str


@attr.s(auto_attribs=True, frozen=True, slots=True)
class SetRequest:

    objref: ObjRef
    property_: str
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

    result: Any


@attr.s(auto_attribs=True, frozen=True, slots=True)
class Callback:

    cbid: str
    cookie: Optional[str] = None
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
    StaticGetRequest,
    InvokeRequest,
    StaticInvokeRequest,
    StatsRequest,
]

KernelResponse = Union[
    LoadResponse,
    CreateResponse,
    DeleteResponse,
    GetResponse,
    InvokeResponse,
    StatsResponse,
]


class JSClass(Protocol):
    @property
    def __jsii_type__(self) -> str:
        """
        Returns a str that points to this class inside of the Javascript runtime.
        """


class Referenceable(Protocol):
    @property
    def __jsii_ref__(self) -> ObjRef:
        """
        Returns an ObjRef that points to this object on the JS side.
        """
