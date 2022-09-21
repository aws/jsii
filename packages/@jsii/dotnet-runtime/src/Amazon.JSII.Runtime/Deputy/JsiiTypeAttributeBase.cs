using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Reflection;
using Amazon.JSII.Runtime.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Amazon.JSII.Runtime.Deputy
{
    public abstract class JsiiTypeAttributeBase : Attribute
    {
        // It's possible that a user is creating types in a multithreaded application.
        // This is not explicity supported, but making the list thread-safe to protect
        // against this possibility.
        private static readonly ConcurrentBag<string> ProcessedAssemblies =
            new ConcurrentBag<string>();

        protected JsiiTypeAttributeBase(Type nativeType, string fullyQualifiedName)
        {
            nativeType = nativeType ?? throw new ArgumentNullException(nameof(nativeType));
            FullyQualifiedName = fullyQualifiedName ?? throw new ArgumentNullException(nameof(fullyQualifiedName));

            Load(nativeType.Assembly);
        }

        internal static void Load(Assembly assembly)
        {
            if (ProcessedAssemblies.Contains(GetAssemblyKey(assembly)))
            {
                return;
            }

            var attribute = assembly.GetCustomAttribute<JsiiAssemblyAttribute>();
            if (attribute == null)
            {
                ProcessedAssemblies.Add(GetAssemblyKey(assembly));
                return;
            }

            foreach (var referencedAssembly in assembly.GetReferencedAssemblies())
            {
                var loadedReference = Assembly.Load(referencedAssembly);
                Load(loadedReference);
            }

            // find the .tgz resource
            var tarballResourceName = assembly.GetManifestResourceNames()
                .FirstOrDefault(name => name.EndsWith(".tgz", StringComparison.InvariantCultureIgnoreCase));
            if (tarballResourceName == null)
            {
                throw new JsiiError("Cannot find embedded tarball resource in assembly " + assembly.GetName(), null);
            }

            IServiceProvider serviceProvider = ServiceContainer.ServiceProvider;
            IResourceExtractor extractor = serviceProvider.GetRequiredService<IResourceExtractor>();
            var tarballPath = extractor.ExtractResource(assembly, tarballResourceName);

            IClient client = serviceProvider.GetRequiredService<IClient>();
            client.LoadPackage(attribute.Name, attribute.Version, tarballPath);

            ProcessedAssemblies.Add(GetAssemblyKey(assembly));

            string GetAssemblyKey(Assembly assemblyReference) => assemblyReference.GetName().FullName;
        }

        /// <summary>
        /// This method is here for the test harness to be able to fully reset the execution engine, and trigger a
        /// reload of all assemblies. This should not be called by anything other than compliance tests.
        /// </summary>
        internal static void Reset()
        {
            ProcessedAssemblies.Clear();
        }

        public string FullyQualifiedName { get; }
    }
}
