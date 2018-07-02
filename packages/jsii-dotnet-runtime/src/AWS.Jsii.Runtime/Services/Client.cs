﻿using AWS.Jsii.JsonModel.Api;
using AWS.Jsii.JsonModel.Api.Request;
using AWS.Jsii.JsonModel.Api.Response;
using AWS.Jsii.JsonModel.FileSystem;
using AWS.Jsii.JsonModel.Spec;
using AWS.Jsii.Runtime.Services.Converters;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Linq;
using System.Reflection;
using Assembly = AWS.Jsii.JsonModel.Spec.Assembly;

namespace AWS.Jsii.Runtime.Services
{
    // TODO: This class is a temporary workaround until this issue is resolved:
    // https://sim.amazon.com/issues/jsii-5
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class SynchronousCompleteRequest : IKernelRequest
    {
        public SynchronousCompleteRequest(CompleteRequest complete)
        {
            Complete = complete ?? throw new ArgumentNullException(nameof(complete));
        }

        [JsonProperty("complete")]
        public CompleteRequest Complete { get; }

        public string Api => throw new NotImplementedException();
    }

    public class Client : IClient
    {
        readonly IFileSystem _fileSystem;
        readonly IJsiiRuntimeProvider _cdkProvider;
        readonly IRuntime _runtime;
        readonly IReferenceMap _referenceMap;
        readonly IFrameworkToJsiiConverter _frameworkToJsiiConverter;
        readonly ILoadedPackageSet _loadedPackages;
        readonly ILogger _logger;

        public Client
        (
            IFileSystem fileSystem,
            IJsiiRuntimeProvider cdkProvider,
            IRuntime runtime,
            IReferenceMap referenceMap,
            IFrameworkToJsiiConverter frameworkToJsiiConverter,
            ILoadedPackageSet loadedPackages,
            ILoggerFactory loggerFactory
        )
        {
            _fileSystem = fileSystem ?? throw new ArgumentNullException(nameof(fileSystem));
            _cdkProvider = cdkProvider ?? throw new ArgumentNullException(nameof(cdkProvider));
            _runtime = runtime ?? throw new ArgumentNullException(nameof(runtime));
            _referenceMap = referenceMap ?? throw new ArgumentNullException(nameof(referenceMap));
            _frameworkToJsiiConverter = frameworkToJsiiConverter ?? throw new ArgumentNullException(nameof(frameworkToJsiiConverter));
            _loadedPackages = loadedPackages ?? throw new ArgumentNullException(nameof(loadedPackages));
            loggerFactory = loggerFactory ?? throw new ArgumentNullException(nameof(loggerFactory));

            _logger = loggerFactory.CreateLogger<Client>();
        }

        #region helpers

        TResponse Send<TRequest, TResponse>(TRequest requestObject)
            where TRequest : class, IKernelRequest
            where TResponse : class, IKernelResponse
        {
            SendRequest(requestObject);

            return ReceiveResponse<TResponse>();
        }

        void SendRequest<TRequest>(TRequest requestObject)
            where TRequest : class, IKernelRequest
        {
            try
            {
                string requestJson = JsonConvert.SerializeObject(requestObject);
                _runtime.WriteRequest(requestJson);

                /*
                if (requestObject is LoadRequest)
                {
                    JObject logEntry = JObject.FromObject(requestObject);
                    logEntry["assembly"]["code"] = "<omitted for brevity>";
                    requestJson = JsonConvert.SerializeObject(logEntry);
                }
                */

                _logger.LogTrace($"> {requestJson}");
            }
            catch (IOException exception)
            {
                throw new JsiiException("Unexpected error communicating with jsii-runtime", exception);
            }
        }

        TResponse ReceiveResponse<TResponse>()
            where TResponse : class, IKernelResponse
        {
            try
            {
                string responseJson = _runtime.ReadResponse();
                _logger.LogTrace($"< {responseJson}");

                return TryDeserialize<TResponse>(responseJson);
            }
            catch (IOException exception)
            {
                throw new JsiiException("Unexpected error communicating with jsii-runtime", exception);
            }
        }

        TResponse TryDeserialize<TResponse>(string responseJson) where TResponse : class, IKernelResponse
        {
            JObject responseObject = (JObject)JsonConvert.DeserializeObject(responseJson);

            if (responseObject.ContainsKey("error"))
            {
                ErrorResponse errorResponse = responseObject.ToObject<ErrorResponse>();

                throw new JsiiException(errorResponse, null);
            }

            if (typeof(TResponse).IsAssignableFrom(typeof(HelloResponse)))
            {
                return responseObject.ToObject<TResponse>();
            }

            if (responseObject.ContainsKey("callback"))
            {
                CallbackResponse callbackResponse = responseObject.ToObject<CallbackResponse>();
                Callback callback = callbackResponse.Callback;

                object result = callback.InvokeCallback(_referenceMap, _frameworkToJsiiConverter, out string error);

                return Send<SynchronousCompleteRequest, TResponse>(new SynchronousCompleteRequest
                (
                    new CompleteRequest(callback.CallbackId, error, result)
                ));
            }

            if (responseObject.ContainsKey("pending"))
            {
                // TODO: What does this mean?
                throw new NotImplementedException();
            }

            if (responseObject.ContainsKey("ok"))
            {
                OkResponse<TResponse> okResponse = responseObject.ToObject<OkResponse<TResponse>>();

                return okResponse.Ok;
            }

            throw new ArgumentException("Unrecognized response format", nameof(responseJson));
        }

        #endregion

        #region IClient implementation

        public void LoadPackage(string package)
        {
            if (_loadedPackages.Contains(package))
            {
                return;
            }

            _logger.LogDebug($"Loading package {package}...");

            _loadedPackages.Add(package);
            Assembly assembly = ReadAssembly();

            if (assembly.Dependencies != null)
            {
                foreach (string dependency in assembly.Dependencies.Values.Select(d => d.Package))
                {
                    LoadPackage(dependency);
                }
            }

            LoadResponse response = Load(assembly);

            Assembly ReadAssembly()
            {
                string path = Path.Combine(_cdkProvider.JsiiRuntimePath, package, "dist");

                string assemblyJson = _fileSystem.File.ReadAllText(Path.Combine(path, Constants.SPEC_FILE_NAME));
                Assembly assemblyObject = JsonConvert.DeserializeObject<Assembly>(assemblyJson);

                return assemblyObject;
            }
        }

        public HelloResponse Hello()
        {
            return ReceiveResponse<HelloResponse>();
        }

        public LoadResponse Load(Assembly assembly)
        {
            return Load(new LoadRequest(assembly));
        }

        public LoadResponse Load(LoadRequest request)
        {
            return Send<LoadRequest, LoadResponse>(request);
        }

        public CreateResponse Create(string fullyQualifiedName, object[] arguments = null, Override[] overrides = null)
        {
            return Create(new CreateRequest(fullyQualifiedName, arguments, overrides));
        }

        public CreateResponse Create(CreateRequest request)
        {
            return Send<CreateRequest, CreateResponse>(request);
        }

        public DeleteResponse Delete(ObjectReference objectReference)
        {
            return Delete(new DeleteRequest(objectReference));
        }

        public DeleteResponse Delete(DeleteRequest request)
        {
            return Send<DeleteRequest, DeleteResponse>(request);
        }

        public GetResponse Get(ObjectReference objectReference, string property)
        {
            return Get(new GetRequest(objectReference, property));
        }

        public GetResponse Get(GetRequest request)
        {
            return Send<GetRequest, GetResponse>(request);
        }

        public SetResponse Set(ObjectReference objectReference, string property, object value)
        {
            return Set(new SetRequest(objectReference, property, value));
        }

        public SetResponse Set(SetRequest request)
        {
            return Send<SetRequest, SetResponse>(request);
        }

        public InvokeResponse Invoke(ObjectReference objectReference, string method, object[] arguments = null)
        {
            return Invoke(new InvokeRequest(objectReference, method, arguments));
        }

        public InvokeResponse Invoke(InvokeRequest request)
        {
            return Send<InvokeRequest, InvokeResponse>(request);
        }

        public BeginResponse Begin(ObjectReference objectReference, string method, object[] arguments = null)
        {
            return Begin(new BeginRequest(objectReference, method, arguments));
        }

        public BeginResponse Begin(BeginRequest request)
        {
            return Send<BeginRequest, BeginResponse>(request);
        }

        public EndResponse End(string promiseId)
        {
            return End(new EndRequest(promiseId));
        }

        public EndResponse End(EndRequest request)
        {
            return Send<EndRequest, EndResponse>(request);
        }

        public CallbacksResponse Callbacks()
        {
            return Callbacks(new CallbacksRequest());
        }

        public CallbacksResponse Callbacks(CallbacksRequest request)
        {
            return Send<CallbacksRequest, CallbacksResponse>(request);
        }

        public CompleteResponse Complete(string callbackId, string error = null, object result = null)
        {
            return Complete(new CompleteRequest(callbackId, error, result));
        }

        public CompleteResponse Complete(CompleteRequest request)
        {
            return Send<CompleteRequest, CompleteResponse>(request);
        }

        public NamingResponse Naming(string assembly)
        {
            return Naming(new NamingRequest(assembly));
        }

        public NamingResponse Naming(NamingRequest request)
        {
            return Send<NamingRequest, NamingResponse>(request);
        }

        public StatsResponse Stats()
        {
            return Stats(new StatsRequest());
        }

        public StatsResponse Stats(StatsRequest request)
        {
            return Send<StatsRequest, StatsResponse>(request);
        }

        #endregion
    }
}
