using AWS.Jsii.Runtime.Services;
using System;
using System.IO;
using Xunit.Abstractions;

namespace AWS.Jsii.Runtime.IntegrationTests
{
    public abstract class IntegrationTestBase : IDisposable
    {
        public IntegrationTestBase(ITestOutputHelper output)
        {
            Environment.SetEnvironmentVariable("JSII_DEBUG", "true");

            ServiceContainer.ServiceProviderOverride = ServiceContainer.BuildServiceProvider(
                loggerFactoryOverride: new XUnitLoggerFactory(output)
            );
        }

        public void Dispose()
        {
            ServiceContainer.ServiceProviderOverride = null;
        }
    }
}
