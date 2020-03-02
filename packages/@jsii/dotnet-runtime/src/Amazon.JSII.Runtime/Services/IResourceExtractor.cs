using System;
using System.Reflection;

namespace Amazon.JSII.Runtime.Services
{
    internal interface IResourceExtractor : IDisposable
    {
        string ExtractResource(Assembly assembly, string resourceName, string bag = "default", string? fileName = null);
    }
}
