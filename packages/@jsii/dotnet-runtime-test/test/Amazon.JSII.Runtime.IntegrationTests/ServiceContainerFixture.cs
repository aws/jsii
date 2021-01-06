using Amazon.JSII.Runtime.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using Xunit.Abstractions;

namespace Amazon.JSII.Runtime.IntegrationTests
{
    public sealed class ServiceContainerFixture : IDisposable
    {
        public ServiceContainerFixture()
        {
            Environment.SetEnvironmentVariable("JSII_DEBUG", "true");
        }

        private ServiceProvider? _serviceProvider = null;

        public void SetOverride(ITestOutputHelper outputHelper)
        {
            if (ServiceContainer.ServiceProviderOverride == null)
            {
                _serviceProvider = ServiceContainer.ServiceProviderOverride = ServiceContainer.BuildServiceProvider(
                    new XUnitLoggerFactory(outputHelper),
                    disposeOnProcessExit: false
                );
            }
        }

        void IDisposable.Dispose()
        {
            _serviceProvider?.Dispose();
            ServiceContainer.ServiceProviderOverride = null;
        }
    }
}
