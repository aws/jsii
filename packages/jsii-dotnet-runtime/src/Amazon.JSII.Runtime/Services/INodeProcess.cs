using System;
using System.IO;

namespace Amazon.JSII.Runtime.Services
{
    public interface INodeProcess : IDisposable
    {
        TextWriter StandardInput { get; }

        TextReader StandardOutput { get; }

        TextReader StandardError { get; }
    }
}