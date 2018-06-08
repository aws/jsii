using AWS.Jsii.Runtime.Services;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace AWS.Jsii.Runtime.Deputy
{
    public abstract class JsiiTypeAttributeBase : Attribute
    {
        protected JsiiTypeAttributeBase(string package, string fullyQualifiedName)
        {
            package = package ?? throw new ArgumentNullException(nameof(package));
            FullyQualifiedName = fullyQualifiedName ?? throw new ArgumentNullException(nameof(fullyQualifiedName));

            IServiceProvider serviceProvider = ServiceContainer.ServiceProvider;
            IClient client = serviceProvider.GetRequiredService<IClient>();
            client.LoadPackage(package);
        }

        public string FullyQualifiedName { get; }
    }
}
