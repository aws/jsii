using System;
using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Runtime.Services;
using Xunit.Abstractions;

namespace Amazon.JSII.Runtime.IntegrationTests
{
    public sealed class ServiceContainerFixture : IDisposable
    {
        public ServiceContainerFixture()
        {
            Environment.SetEnvironmentVariable("JSII_DEBUG", "true");
        }

        public void SetOverride(ITestOutputHelper outputHelper)
        {
            if (ServiceContainer.ServiceProviderOverride == null)
            {
                ServiceContainer.ServiceProviderOverride = ServiceContainer.BuildServiceProvider(
                    new XUnitLoggerFactory(outputHelper)
                );
            }
        }

        void IDisposable.Dispose()
        {
            ServiceContainer.ServiceProviderOverride = null;
            JsiiTypeAttributeBase.Reset();
        }
    }
}
