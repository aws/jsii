using System;
using System.IO;

namespace AWS.Jsii.Runtime.Services
{
    public interface INodeProcess : IDisposable
    {
        StreamWriter StandardInput { get; }

        StreamReader StandardOutput { get; }
    }
}
