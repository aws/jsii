using System.Reflection;

namespace Amazon.JSII.Runtime.Services
{
    internal sealed class JsiiRuntimeProvider : IJsiiRuntimeProvider
    {
        private const string ENTRYPOINT = "jsii-runtime.js";

        public JsiiRuntimeProvider(IResourceExtractor resourceExtractor)
        {
            string[] files = { ENTRYPOINT, ENTRYPOINT + ".map" };

            // deploy embedded resources to the temp directory
            var assembly = Assembly.GetExecutingAssembly();
            foreach (var name in files)
            {
                var resourceName = "Amazon.JSII.Runtime.jsii_runtime." + name;
                var path = resourceExtractor.ExtractResource(assembly, resourceName, "jsii-runtime", name);

                if (name == ENTRYPOINT)
                {
                    JsiiRuntimePath = path;
                }
            }
        }

        public string? JsiiRuntimePath { get; }
    }
}
