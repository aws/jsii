using System;
using System.IO;

namespace Amazon.JSII.Runtime.Services
{
    public interface INodeProcess : IDisposable
    {
        StreamWriter StandardInput { get; }

        StreamReader StandardOutput { get; }
    }
}
