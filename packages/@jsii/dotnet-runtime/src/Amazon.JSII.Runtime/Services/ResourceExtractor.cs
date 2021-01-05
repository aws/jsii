using Amazon.JSII.JsonModel.FileSystem;
using System;
using System.IO;
using System.Reflection;
using System.Collections.Generic;

namespace Amazon.JSII.Runtime.Services
{
    internal sealed class ResourceExtractor : IResourceExtractor
    {
        private readonly IDictionary<string, string> _bags = new Dictionary<string, string>();
        private readonly IFileSystem _fileSystem;

        public ResourceExtractor(IFileSystem fileSystem)
        {
            _fileSystem = fileSystem;
        }

        public string ExtractResource(Assembly assembly, string resourceName, string bag, string? fileName)
        {
            if (!_bags.TryGetValue(bag, out var workingDirectory))
            {
                workingDirectory = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
                _fileSystem.Directory.CreateDirectory(workingDirectory);
                _bags[bag] = workingDirectory;
            }

            var outputPath = Path.Combine(workingDirectory, fileName ?? resourceName);

            // In case the fileName included path delimiters...
            var outputDir = Path.GetDirectoryName(outputPath);
            if (outputDir != null && !_fileSystem.Directory.Exists(outputDir))
            {
                _fileSystem.Directory.CreateDirectory(outputDir);
            }
            using (var output = _fileSystem.File.Create(outputPath))
            {
                using var stream = assembly.GetManifestResourceStream(resourceName);
                if (stream == null)
                {
                    throw new JsiiException($"Cannot find embedded resource: {resourceName} in {String.Join(", ", assembly.GetManifestResourceNames())}", null);
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
