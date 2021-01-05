using Amazon.JSII.JsonModel.FileSystem;
using Amazon.JSII.Runtime.Services.Converters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;

namespace Amazon.JSII.Runtime.Services
{
    public static class ServiceContainer
    {
        private static readonly Lazy<ServiceProvider> _serviceProvider = new Lazy<ServiceProvider>(
            () => BuildServiceProvider(),
            LazyThreadSafetyMode.ExecutionAndPublication
        );

        public static ServiceProvider? ServiceProviderOverride { get; set; }

        internal static ServiceProvider ServiceProvider => ServiceProviderOverride ?? _serviceProvider.Value;

        public static ServiceProvider BuildServiceProvider(ILoggerFactory? loggerFactoryOverride = null, bool disposeOnProcessExit = true)
        {
            IServiceCollection serviceCollection = new ServiceCollection();

            if (loggerFactoryOverride == null)
            {
                serviceCollection.AddLogging(builder => builder.AddConsole());
            }
            else
            {
                serviceCollection.AddSingleton(loggerFactoryOverride);
            }

            serviceCollection.AddSingleton<IFileSystem, FileSystem>();
            serviceCollection.AddSingleton<IJsiiRuntimeProvider, JsiiRuntimeProvider>();
            serviceCollection.AddSingleton<ILoadedPackageSet, LoadedPackageSet>();
            serviceCollection.AddSingleton<ITypeCache, TypeCache>();
            serviceCollection.AddSingleton<IJsiiToFrameworkConverter, JsiiToFrameworkConverter>();
            serviceCollection.AddSingleton<IFrameworkToJsiiConverter, FrameworkToJsiiConverter>();
            serviceCollection.AddSingleton<IReferenceMap, ReferenceMap>();
            serviceCollection.AddSingleton<INodeProcess, NodeProcess>();
            serviceCollection.AddSingleton<IRuntime, Runtime>();
            serviceCollection.AddSingleton<IResourceExtractor, ResourceExtractor>();
            serviceCollection.AddSingleton<IClient, Client>();

            ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();

            if (disposeOnProcessExit)
            {
                // Registering shutdown hook to have JS process gracefully terminate.
                AppDomain.CurrentDomain.ProcessExit += (snd, evt) => {
                    try
                    {
                        serviceProvider.Dispose();
                    }
                    catch (Exception e)
                    {
                        // If this throws, the app would crash ugly!
                        Console.Error.WriteLine($"Error cleaning up {nameof(ServiceProvider)}: {e}");
                    }
                };
            }

            serviceProvider.GetRequiredService<IClient>().Hello();

            return serviceProvider;
        }
    }
}
