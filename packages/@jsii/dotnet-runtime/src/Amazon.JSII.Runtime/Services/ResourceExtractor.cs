using Amazon.JSII.JsonModel.FileSystem;
using System;
using System.IO;
using System.Reflection;
using System.Collections.Generic;

namespace Amazon.JSII.Runtime.Services
{
    internal sealed class ResourceExtractor : IResourceExtractor
    {
        readonly IDictionary<string, string> _bags = new Dictionary<string, string>();
        readonly IFileSystem _fileSystem;

        public ResourceExtractor(IFileSystem fileSystem) 
        {
            _fileSystem = fileSystem;
        }

        public string ExtractResource(Assembly assembly, string resourceName, string bag, string fileName)
        {
            string workingDirectory = null;
            if (!_bags.TryGetValue(bag, out workingDirectory))
            {
                workingDirectory = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
                _fileSystem.Directory.CreateDirectory(workingDirectory);
                _bags[bag] = workingDirectory;
            }

            var outputPath = Path.Combine(workingDirectory, fileName ?? resourceName);
            using (var output = _fileSystem.File.Create(outputPath))
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                if (stream == null)
                {
                    throw new JsiiException("Cannot find embedded resource: " + resourceName + " in assembly " + assembly.GetName(), null);
                }

                stream.CopyTo(output);
            }

            return outputPath;
        }

        void IDisposable.Dispose()
        {
            foreach (var workdir in _bags.Values)
            {
                Directory.Delete(workdir, true);
            }
        }
    }
}
