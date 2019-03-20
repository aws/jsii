import abc

from typing import Optional

from jsii._kernel.types import (
    LoadRequest,
    LoadResponse,
    CreateRequest,
    CreateResponse,
    GetRequest,
    GetResponse,
    InvokeRequest,
    InvokeResponse,
    DeleteRequest,
    DeleteResponse,
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


class BaseProvider(metaclass=abc.ABCMeta):

    # The API provided by this Provider is not very pythonic, however it is done to map
    # this API as closely to the JSII runtime as possible. Higher level abstractions
    # that layer ontop of the Provider will provide a translation layer that make this
    # much more Pythonic.

    @abc.abstractmethod
    def load(self, request: LoadRequest) -> LoadResponse:
        ...

    @abc.abstractmethod
    def create(self, request: CreateRequest) -> CreateResponse:
        ...

    @abc.abstractmethod
    def get(self, request: GetRequest) -> GetResponse:
        ...

    @abc.abstractmethod
    def set(self, request: SetRequest) -> SetResponse:
        ...

    @abc.abstractmethod
    def sget(self, request: StaticGetRequest) -> GetResponse:
        ...

    @abc.abstractmethod
    def sset(self, request: StaticSetRequest) -> SetResponse:
        ...

    @abc.abstractmethod
    def invoke(self, request: InvokeRequest) -> InvokeResponse:
        ...

    @abc.abstractmethod
    def sinvoke(self, request: StaticInvokeRequest) -> InvokeResponse:
        ...

    @abc.abstractmethod
    def delete(self, request: DeleteRequest) -> DeleteResponse:
        ...

    @abc.abstractmethod
    def begin(self, request: BeginRequest) -> BeginResponse:
        ...

    @abc.abstractmethod
    def end(self, request: EndRequest) -> EndResponse:
        ...

    @abc.abstractmethod
    def callbacks(self, request: CallbacksRequest) -> CallbacksResponse:
        ...

    @abc.abstractmethod
    def complete(self, request: CompleteRequest) -> CompleteResponse:
        ...

    @abc.abstractmethod
    def stats(self, request: Optional[StatsRequest] = None) -> StatsResponse:
        ...
