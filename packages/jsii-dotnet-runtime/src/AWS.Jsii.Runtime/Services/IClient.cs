using AWS.Jsii.JsonModel.Api;
using AWS.Jsii.JsonModel.Api.Request;
using AWS.Jsii.JsonModel.Api.Response;
using AWS.Jsii.JsonModel.Spec;
using System;
using System.Collections.Generic;

namespace AWS.Jsii.Runtime.Services
{
    public interface IClient
    {
        void LoadPackage(string package);

        HelloResponse Hello();

        LoadResponse Load(Assembly assembly);

        LoadResponse Load(LoadRequest request);

        CreateResponse Create(string fullyQualifiedName, object[] arguments = null, Override[] overrides = null);

        CreateResponse Create(CreateRequest request);

        DeleteResponse Delete(ObjectReference objectReference);

        DeleteResponse Delete(DeleteRequest request);

        GetResponse Get(ObjectReference objectReference, string property);

        GetResponse Get(GetRequest request);

        SetResponse Set(ObjectReference objectReference, string property, object value);

        SetResponse Set(SetRequest request);

        InvokeResponse Invoke(ObjectReference objectReference, string method, object[] arguments = null);

        InvokeResponse Invoke(InvokeRequest request);

        BeginResponse Begin(ObjectReference objectReference, string method, object[] arguments = null);

        BeginResponse Begin(BeginRequest request);

        EndResponse End(string promiseId);

        EndResponse End(EndRequest request);

        CallbacksResponse Callbacks();

        CallbacksResponse Callbacks(CallbacksRequest request);

        CompleteResponse Complete(string callbackId, string error = null, object result = null);

        CompleteResponse Complete(CompleteRequest request);

        NamingResponse Naming(string assembly);

        NamingResponse Naming(NamingRequest request);

        StatsResponse Stats();

        StatsResponse Stats(StatsRequest request);
    }
}
