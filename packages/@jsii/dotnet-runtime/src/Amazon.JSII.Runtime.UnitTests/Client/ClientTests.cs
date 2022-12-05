using System;
using Amazon.JSII.JsonModel.Api;
using Amazon.JSII.JsonModel.Api.Request;
using Amazon.JSII.JsonModel.Api.Response;
using Amazon.JSII.JsonModel.FileSystem;
using Amazon.JSII.JsonModel.Spec;
using Amazon.JSII.Runtime.Services;
using Amazon.JSII.Runtime.Services.Converters;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using NSubstitute;
using System.Collections.Generic;
using Xunit;
using Xunit.Sdk;
using Callback = Amazon.JSII.JsonModel.Api.Callback;
using Type = Amazon.JSII.JsonModel.Spec.Type;

namespace Amazon.JSII.Runtime.UnitTests.Client
{
    public sealed class ClientTests
    {
        const string Prefix = "Runtime.Client.";

        public abstract class ClientTestBase
        {
            private readonly IFileSystem _fileSystem;

            internal readonly IRuntime _runtime;
            private readonly IReferenceMap _referenceMap;
            private readonly IFrameworkToJsiiConverter _frameworkToJsiiConverter;
            internal readonly ILoadedPackageSet _loadedPackages;
            private readonly ILoggerFactory _loggerFactory;

            protected ClientTestBase()
            {
                _fileSystem = Substitute.For<IFileSystem>();
                _runtime = Substitute.For<IRuntime>();
                _referenceMap = Substitute.For<IReferenceMap>();
                _frameworkToJsiiConverter = Substitute.For<IFrameworkToJsiiConverter>();
                _loadedPackages = Substitute.For<ILoadedPackageSet>();
                _loggerFactory = Substitute.For<ILoggerFactory>();

                var file = Substitute.For<IFile>();
                var directory = Substitute.For<IDirectory>();
                _fileSystem.File.Returns(file);
                _fileSystem.Directory.Returns(directory);
            }

            internal static string GetOkResponse<TResponse>(TResponse response)
                where TResponse : class, IKernelResponse
            {
                IDictionary<string, object> okResponse = new Dictionary<string, object>
                {
                    { "ok", response }
                };

                return JsonConvert.SerializeObject(okResponse);
            }

            internal IClient CreateClient()
            {
                return new Services.Client
                (
                    _fileSystem,
                    _runtime,
                    _referenceMap,
                    _frameworkToJsiiConverter,
                    _loadedPackages,
                    _loggerFactory
                );
            }

            internal static bool PlatformIndependentEqual(string expected, string actual)
            {
                try
                {
                    Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
                }
                catch (EqualException)
                {
                    return false;
                }

                return true;
            }
        }

        public sealed class LoadPackageTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.LoadPackage) + ".";

            [Fact(DisplayName = _Prefix + nameof(LoadsBasicPackage))]
            public void LoadsBasicPackage()
            {
                IClient client = CreateClient();

                Assembly assembly = new Assembly
                (
                    name: "myName",
                    description: "",
                    homepage: "",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person(name: "", roles: Array.Empty<string>()),
                    fingerprint: "",
                    license: "",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "Dot.Net.Namespace",
                        packageId: "Dot.Net.PackageId"
                    )),
                    version: "myVersion",
                    types: new Dictionary<string, Type>()
                );

                _loadedPackages.Contains(Arg.Any<string>()).Returns(false);

                string response = GetOkResponse(new LoadResponse("myName", 0));
                _runtime.ReadResponse().Returns(response);
                client.LoadPackage(assembly.Name, assembly.Version, "myTarball");

                string expectedRequestJson = JsonConvert.SerializeObject(new LoadRequest("myName", "myVersion", "myTarball"));
                _runtime.Received().WriteRequest(Arg.Is<string>(actual => PlatformIndependentEqual(expectedRequestJson, actual)));
                _loadedPackages.Received().Add(assembly.Name);
            }

            [Fact(DisplayName = _Prefix + nameof(DoesNotLoadPackageMultipleTimes))]
            public void DoesNotLoadPackageMultipleTimes()
            {
                IClient client = CreateClient();

                Assembly assembly = new Assembly
                (
                    name: "myName",
                    description: "",
                    homepage: "",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person(name: "", roles: Array.Empty<string>()),
                    fingerprint: "",
                    license: "",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "Dot.Net.Namespace",
                        packageId: "Dot.Net.PackageId"
                    )),
                    version: "myVersion",
                    types: new Dictionary<string, Type>()
                );

                _loadedPackages.Contains(assembly.Name).Returns(true);

                client.LoadPackage(assembly.Name, assembly.Version, "mytarball");

                _runtime.DidNotReceive().WriteRequest(Arg.Any<string>());
                _loadedPackages.DidNotReceive().Add(Arg.Any<string>());
            }
        }

        public sealed class HelloTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.Hello) + ".";

            [Fact(DisplayName = _Prefix + nameof(Receives))]
            public void Receives()
            {
                IClient client = CreateClient();

                HelloResponse response = new HelloResponse("hello");
                _runtime.ReadResponse().Returns(JsonConvert.SerializeObject(response));

                client.Hello();

                _runtime.Received().ReadResponse();
            }
        }

        public sealed class LoadTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.Load) + ".";

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceives))]
            public void SendsAndReceives()
            {
                IClient client = CreateClient();

                Assembly assembly = new Assembly
                (
                    name: "myName",
                    description: "",
                    homepage: "",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person(name: "", roles: Array.Empty<string>()),
                    fingerprint: "",
                    license: "",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "Dot.Net.Namespace",
                        packageId: "Dot.Net.PackageId"
                    )),
                    version: "myVersion",
                    types: new Dictionary<string, Type>()
                );

                _runtime.ReadResponse().Returns(GetOkResponse(new LoadResponse(assembly.Name, 0)));

                client.Load(assembly.Name, assembly.Version, "tgz");

                LoadRequest expectedRequest = new LoadRequest(assembly.Name, assembly.Version, "tgz");
                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(expectedRequest), actual)
                ));

                _runtime.Received().ReadResponse();
            }
        }

        public sealed class CreateTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.Create) + ".";

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceives))]
            public void SendsAndReceives()
            {
                IClient client = CreateClient();

                _runtime.ReadResponse().Returns(GetOkResponse(new CreateResponse()));

                CreateRequest request = new CreateRequest
                (
                    fullyQualifiedName: "myFqn",
                    arguments: new object[] { "arg1", "arg2" },
                    overrides: new Override[]
                    {
                        new Override(method: "method1"),
                        new Override(method: "method2"),
                    }
                );
                client.Create(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }
        }

        public sealed class DeleteTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.Delete) + ".";

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceives))]
            public void SendsAndReceives()
            {
                IClient client = CreateClient();

                _runtime.ReadResponse().Returns(GetOkResponse(new DeleteResponse()));

                DeleteRequest request = new DeleteRequest
                (
                    new ObjectReference { { "$jsii.byref", "myRef" } }
                );
                client.Delete(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }
        }

        public sealed class GetTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.Get) + ".";

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceives))]
            public void SendsAndReceives()
            {
                IClient client = CreateClient();

                _runtime.ReadResponse().Returns(GetOkResponse(new GetResponse("myValue")));

                GetRequest request = new GetRequest
                (
                    objectReference: new ObjectReference { { "$jsii.byref", "myRef" } },
                    property: "myProp"
                );
                client.Get(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceivesNull))]
            public void SendsAndReceivesNull()
            {
                IClient client = CreateClient();

                _runtime.ReadResponse().Returns(GetOkResponse(new GetResponse(null)));

                GetRequest request = new GetRequest
                (
                    objectReference: new ObjectReference { { "$jsii.byref", "myRef" } },
                    property: "myProp"
                );
                client.Get(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }
        }

        public sealed class SetTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.Set) + ".";

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceives))]
            public void SendsAndReceives()
            {
                IClient client = CreateClient();

                _runtime.ReadResponse().Returns(GetOkResponse(new SetResponse()));

                SetRequest request = new SetRequest
                (
                    objectReference: new ObjectReference { { "$jsii.byref", "myRef" } },
                    property: "myProp",
                    value: "myValue"
                );
                client.Set(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceivesNull))]
            public void SendsAndReceivesNull()
            {
                IClient client = CreateClient();

                _runtime.ReadResponse().Returns(GetOkResponse(new SetResponse()));

                SetRequest request = new SetRequest
                (
                    objectReference: new ObjectReference { { "$jsii.byref", "myRef" } },
                    property: "myProp",
                    value: null
                );
                client.Set(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }
        }

        public sealed class InvokeTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.Invoke) + ".";

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceives))]
            public void SendsAndReceives()
            {
                IClient client = CreateClient();

                _runtime.ReadResponse().Returns(GetOkResponse(new InvokeResponse("myResult")));

                InvokeRequest request = new InvokeRequest
                (
                    objectReference: new ObjectReference { { "$jsii.byref", "myRef" } },
                    method: "myMethod",
                    arguments: new object[] { "arg1", "arg2" }
                );
                client.Invoke(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceivesNull))]
            public void SendsAndReceivesNull()
            {
                IClient client = CreateClient();

                _runtime.ReadResponse().Returns(GetOkResponse(new InvokeResponse()));

                InvokeRequest request = new InvokeRequest
                (
                    objectReference: new ObjectReference { { "$jsii.byref", "myRef" } },
                    method:  "myMethod",
                    arguments:  new object[] { "arg1", "arg2" }
                );
                client.Invoke(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }
        }

        public sealed class BeginTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.Begin) + ".";

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceives))]
            public void SendsAndReceives()
            {
                IClient client = CreateClient();

                _runtime.ReadResponse().Returns(GetOkResponse(new BeginResponse("myPromiseId")));

                BeginRequest request = new BeginRequest
                (
                    objectReference: new ObjectReference { { "$jsii.byref", "myRef" } },
                    method: "myMethod",
                    arguments: new object[] { "arg1", "arg2" }
                );
                client.Begin(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }
        }

        public sealed class EndTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.End) + ".";

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceives))]
            public void SendsAndReceives()
            {
                IClient client = CreateClient();

                _runtime.ReadResponse().Returns(GetOkResponse(new EndResponse("myResult")));

                EndRequest request = new EndRequest("myPromiseId");
                client.End(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }
        }

        public sealed class CallbacksTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.Callbacks) + ".";

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceives))]
            public void SendsAndReceives()
            {
                IClient client = CreateClient();

                _runtime.ReadResponse().Returns(GetOkResponse(new CallbacksResponse(
                    new[]
                    {
                        new Callback
                        (
                            callbackId: "myCallbackId",
                            invoke: new InvokeRequest(
                                objectReference: new ObjectReference { { "$jsii.byref", "myRef" } },
                                method: "myMethod",
                                arguments: new object[] { "arg1", "arg2" }
                            )
                        )
                    }
                )));

                CallbacksRequest request = new CallbacksRequest();
                client.Callbacks(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }
        }

        public sealed class CompleteTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.Complete) + ".";

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceives))]
            public void SendsAndReceives()
            {
                IClient client = CreateClient();

                _runtime.ReadResponse().Returns(GetOkResponse(new CompleteResponse("myCallbackId")));

                CompleteRequest request = new CompleteRequest
                (
                    callbackId: "myCallbackId",
                    error: new NamedError("myError", null),
                    result: "myResult"
                );
                client.Complete(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }
        }

        public sealed class NamingTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.Naming) + ".";

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceives))]
            public void SendsAndReceives()
            {
                IClient client = CreateClient();

                _runtime.ReadResponse().Returns(GetOkResponse(new NamingResponse(
                    new NamingResponse.NamingData(dotnet: "DotNet.Name")
                )));

                NamingRequest request = new NamingRequest("myAssembly");
                client.Naming(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }
        }

        public sealed class StatsTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.Stats) + ".";

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceives))]
            public void SendsAndReceives()
            {
                IClient client = CreateClient();

                _runtime.ReadResponse().Returns(GetOkResponse(new StatsResponse(42)));

                StatsRequest request = new StatsRequest();
                client.Stats(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }
        }
    }
}
