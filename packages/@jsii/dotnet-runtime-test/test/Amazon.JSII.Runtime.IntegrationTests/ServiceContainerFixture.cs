using System;
using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Runtime.Services;
using Microsoft.Extensions.DependencyInjection;
using Xunit.Abstractions;

namespace Amazon.JSII.Runtime.IntegrationTests
{
    public sealed class ServiceContainerFixture : IDisposable
  {
        private ServiceProvider? _serviceProvider = null;

        public ServiceContainerFixture()
        {
            Environment.SetEnvironmentVariable("JSII_DEBUG", "true");
        }

        public void SetOverride(ITestOutputHelper outputHelper)
        {
            if (ServiceContainer.ServiceProviderOverride == null)
            {
                ServiceContainer.ServiceProviderOverride = _serviceProvider = ServiceContainer.BuildServiceProvider(
                    new XUnitLoggerFactory(outputHelper)
                );
            }
        }

        void IDisposable.Dispose()
        {
            ServiceContainer.ServiceProviderOverride = null;
            _serviceProvider?.Dispose();
            _serviceProvider = null;
            JsiiTypeAttributeBase.Reset();
        }
    }
}
