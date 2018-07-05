using AWS.Jsii.JsonModel.Api;
using AWS.Jsii.JsonModel.Api.Request;
using AWS.Jsii.JsonModel.Api.Response;
using AWS.Jsii.JsonModel.FileSystem;
using AWS.Jsii.JsonModel.Spec;
using AWS.Jsii.Runtime.Services;
using AWS.Jsii.Runtime.Services.Converters;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using NSubstitute;
using System.Collections.Generic;
using System.IO;
using Xunit;
using Xunit.Sdk;
using Callback = AWS.Jsii.JsonModel.Api.Callback;
using Type = AWS.Jsii.JsonModel.Spec.Type;

namespace AWS.Jsii.Runtime.UnitTests.Client
{
    public class ClientTests
    {
        const string Prefix = "Runtime.Client.";

        public abstract class ClientTestBase
        {
            protected readonly IFileSystem _fileSystem;
            protected readonly IFile _file;
            protected readonly IDirectory _directory;

            protected readonly IRuntime _runtime;
            protected readonly IReferenceMap _referenceMap;
            protected readonly IFrameworkToJsiiConverter _frameworkToJsiiConverter;
            protected readonly ILoadedPackageSet _loadedPackages;
            protected readonly ILoggerFactory _loggerFactory;

            public ClientTestBase()
            {
                _fileSystem = Substitute.For<IFileSystem>();
                _runtime = Substitute.For<IRuntime>();
                _referenceMap = Substitute.For<IReferenceMap>();
                _frameworkToJsiiConverter = Substitute.For<IFrameworkToJsiiConverter>();
                _loadedPackages = Substitute.For<ILoadedPackageSet>();
                _loggerFactory = Substitute.For<ILoggerFactory>();

                _file = Substitute.For<IFile>();
                _directory = Substitute.For<IDirectory>();
                _fileSystem.File.Returns(_file);
                _fileSystem.Directory.Returns(_directory);
            }

            protected string GetOkResponse<TResponse>(TResponse response)
                where TResponse : IKernelResponse
            {
                IDictionary<string, object> okResponse = new Dictionary<string, object>
                {
                    { "ok", response }
                };

                return JsonConvert.SerializeObject(okResponse);
            }

            protected IClient CreateClient()
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

            protected bool PlatformIndependentEqual(string expected, string actual)
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

        public class LoadPackageTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.LoadPackage) + ".";

            [Fact(DisplayName = _Prefix + nameof(LoadsBasicPackage))]
            public void LoadsBasicPackage()
            {
                IClient client = CreateClient();

                Assembly assembly = new Assembly
                (
                    name: "myName",
                    package: "myPackage",
                    names: new Dictionary<string, string>(),
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
                    version: "myVersion",
                    types: new Dictionary<string, Type>()
                );

                // MapAssemblyToFileSystem(assembly);
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
                    package: "myPackage",
                    names: new Dictionary<string, string>(),
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
                    version: "myVersion",
                    types: new Dictionary<string, Type>()
                );

                // MapAssemblyToFileSystem(assembly);
                _loadedPackages.Contains("myPackage").Returns(true);

                client.LoadPackage(assembly.Package, assembly.Version, "mytarball");

                _runtime.DidNotReceive().WriteRequest(Arg.Any<string>());
                _loadedPackages.DidNotReceive().Add(Arg.Any<string>());
            }

            [Fact(DisplayName = _Prefix + nameof(RecursivelyLoadsDependencies))]

            public void RecursivelyLoadsDependencies()
            {
                return; // skip since this is now happenning at the Assembly level and not in LoadPackage

                IClient client = CreateClient();

                Assembly assembly1 = new Assembly
                (
                    name: "assembly1",
                    package: "assembly1Package",
                    names: new Dictionary<string, string>(),
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
                    version: "myVersion",
                    types: new Dictionary<string, Type>()
                );

                Assembly assembly2 = new Assembly
                (
                    name: "assembly2",
                    package: "assembly2Package",
                    names: new Dictionary<string, string>(),
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
                    version: "myVersion",
                    types: new Dictionary<string, Type>(),
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        { "dependency1Package", new PackageVersion(assembly1.Package, assembly1.Version) }
                    }
                );

                Assembly assembly3 = new Assembly
                (
                    name: "assembly3",
                    package: "assembly13Package",
                    names: new Dictionary<string, string>(),
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
                    version: "myVersion",
                    types: new Dictionary<string, Type>(),
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        { "dependency2Package", new PackageVersion(assembly2.Package, assembly2.Version) }
                    }
                );

                // MapAssemblyToFileSystem(assembly1);
                // MapAssemblyToFileSystem(assembly2);
                // MapAssemblyToFileSystem(assembly3);

                _loadedPackages.Contains(assembly1.Package).Returns(false, true);
                _loadedPackages.Contains(assembly2.Package).Returns(false, true);
                _loadedPackages.Contains(assembly3.Package).Returns(false, true);

                _runtime.ReadResponse().Returns
                (
                    GetOkResponse(new LoadResponse(assembly1.Name, 0)),
                    GetOkResponse(new LoadResponse(assembly2.Name, 0)),
                    GetOkResponse(new LoadResponse(assembly3.Name, 0))
                );

                client.LoadPackage(assembly3.Package, assembly3.Version, "mytarball");

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(new LoadRequest(assembly1.Name, assembly1.Version, "tgz1")), actual)
                ));
                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(new LoadRequest(assembly2.Name, assembly2.Version, "tgz2")), actual)
                ));
                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(new LoadRequest(assembly3.Name, assembly3.Version, "tgz3")), actual)
                ));

                _loadedPackages.Received().Add(assembly1.Package);
                _loadedPackages.Received().Add(assembly2.Package);
                _loadedPackages.Received().Add(assembly3.Package);
            }
        }

        public class HelloTests : ClientTestBase
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

        public class LoadTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.Load) + ".";

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceives))]
            public void SendsAndReceives()
            {
                IClient client = CreateClient();

                Assembly assembly = new Assembly
                (
                    name: "myName",
                    package: "myPackage",
                    names: new Dictionary<string, string>(),
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
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

        public class CreateTests : ClientTestBase
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

        public class DeleteTests : ClientTestBase
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

        public class GetTests : ClientTestBase
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

        public class SetTests : ClientTestBase
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

        public class InvokeTests : ClientTestBase
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

        public class BeginTests : ClientTestBase
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

        public class EndTests : ClientTestBase
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

        public class CallbacksTests : ClientTestBase
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

        public class CompleteTests : ClientTestBase
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
                    error: "myError",
                    result: "myResult"
                );
                client.Complete(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }
        }

        public class NamingTests : ClientTestBase
        {
            const string _Prefix = Prefix + nameof(IClient.Naming) + ".";

            [Fact(DisplayName = _Prefix + nameof(SendsAndReceives))]
            public void SendsAndReceives()
            {
                IClient client = CreateClient();

                _runtime.ReadResponse().Returns(GetOkResponse(new NamingResponse(
                    new Dictionary<string, string> { { "myKey", "myVal" } }
                )));

                NamingRequest request = new NamingRequest("myAssembly");
                client.Naming(request);

                _runtime.Received().WriteRequest(Arg.Is<string>(
                    actual => PlatformIndependentEqual(JsonConvert.SerializeObject(request), actual)
                ));
                _runtime.Received().ReadResponse();
            }
        }

        public class StatsTests : ClientTestBase
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
