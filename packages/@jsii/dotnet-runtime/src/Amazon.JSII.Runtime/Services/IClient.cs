using Amazon.JSII.JsonModel.Api;
using Amazon.JSII.JsonModel.Api.Request;
using Amazon.JSII.JsonModel.Api.Response;

namespace Amazon.JSII.Runtime.Services
{
    internal interface IClient
    {
        void LoadPackage(string name, string version, string tarballPath);

        HelloResponse Hello();

        LoadResponse Load(string name, string version, string tarball);

        LoadResponse Load(LoadRequest request);

        CreateResponse Create(string fullyQualifiedName, object?[]? arguments = null, Override[]? overrides = null, string[]? interfaces = null);

        CreateResponse Create(CreateRequest request);

        DeleteResponse Delete(ObjectReference objectReference);

        DeleteResponse Delete(DeleteRequest request);

        GetResponse Get(ObjectReference objectReference, string property);

        GetResponse Get(GetRequest request);

        GetResponse StaticGet(string fullyQualifiedName, string property);

        GetResponse StaticGet(StaticGetRequest request);

        SetResponse Set(ObjectReference objectReference, string property, object? value);

        SetResponse Set(SetRequest request);

        SetResponse StaticSet(string fullyQualifiedName, string property, object? value);

        SetResponse StaticSet(StaticSetRequest request);

        InvokeResponse Invoke(ObjectReference objectReference, string method, object?[]? arguments = null);

        InvokeResponse Invoke(InvokeRequest request);

        InvokeResponse StaticInvoke(string fullyQualifiedName, string method, object?[]? arguments = null);

        InvokeResponse StaticInvoke(StaticInvokeRequest request);

        BeginResponse Begin(ObjectReference objectReference, string method, object?[]? arguments = null);

        BeginResponse Begin(BeginRequest request);

        EndResponse End(string promiseId);

        EndResponse End(EndRequest request);

        CallbacksResponse Callbacks();

        CallbacksResponse Callbacks(CallbacksRequest request);

        CompleteResponse Complete(string callbackId, NamedError? error = null, object? result = null);

        CompleteResponse Complete(CompleteRequest request);

        NamingResponse Naming(string assembly);

        NamingResponse Naming(NamingRequest request);

        StatsResponse Stats();

        StatsResponse Stats(StatsRequest request);
    }
}
