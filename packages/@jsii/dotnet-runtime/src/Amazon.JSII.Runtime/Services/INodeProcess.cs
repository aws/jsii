using System;
using System.IO;

namespace Amazon.JSII.Runtime.Services
{
    internal interface INodeProcess : IDisposable
    {
        TextWriter StandardInput { get; }

        TextReader StandardOutput { get; }

        TextReader StandardError { get; }
    }
}
