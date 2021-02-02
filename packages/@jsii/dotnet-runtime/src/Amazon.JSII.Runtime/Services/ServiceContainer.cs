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
        private static readonly Lazy<IServiceProvider> _serviceProvider = new Lazy<IServiceProvider>(
            () => BuildServiceProvider(),
            LazyThreadSafetyMode.ExecutionAndPublication
        );

        public static IServiceProvider? ServiceProviderOverride { get; set; }

        internal static IServiceProvider ServiceProvider => ServiceProviderOverride ?? _serviceProvider.Value;

        public static ServiceProvider BuildServiceProvider(ILoggerFactory? loggerFactoryOverride = null)
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
            serviceCollection.AddTransient<IClient, Client>();

            ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();
            IClient client = serviceProvider.GetRequiredService<IClient>();
            client.Hello();

            return serviceProvider;
        }
    }
}
