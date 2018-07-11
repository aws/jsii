using AWS.Jsii.Runtime.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace AWS.Jsii.Runtime.Deputy
{
    public abstract class JsiiTypeAttributeBase : Attribute
    {
        protected JsiiTypeAttributeBase(Type nativeType, string fullyQualifiedName)
        {
            nativeType = nativeType ?? throw new ArgumentNullException(nameof(nativeType));
            FullyQualifiedName = fullyQualifiedName ?? throw new ArgumentNullException(nameof(fullyQualifiedName));

            Load(nativeType.Assembly);
        }

        void Load(Assembly assembly)
        {
            IEnumerable<Assembly> dependencies = assembly.GetReferencedAssemblies()
                .Select(assemblyName => Assembly.Load(assemblyName));

            JsiiAssemblyAttribute attribute = assembly.GetCustomAttribute<JsiiAssemblyAttribute>();
            if (attribute == null)
            {
                return;
            }

            foreach (Assembly dependency in dependencies)
            {
                Load(dependency);
            }

            // find the .tgz resource
            var tarballResourceName = assembly.GetManifestResourceNames().FirstOrDefault(name => name.EndsWith(".tgz"));
            if (tarballResourceName == null) {
                throw new JsiiException("Cannot find embedded tarball resource in assembly " + assembly.GetName(), null);
            }

            IServiceProvider serviceProvider = ServiceContainer.ServiceProvider;
            IResourceExtractor extractor = serviceProvider.GetRequiredService<IResourceExtractor>();
            var tarballPath = extractor.ExtractResource(assembly, tarballResourceName);

            IClient client = serviceProvider.GetRequiredService<IClient>();
            client.LoadPackage(attribute.Name, attribute.Version, tarballPath);
        }

        public string FullyQualifiedName { get; }
    }
}
