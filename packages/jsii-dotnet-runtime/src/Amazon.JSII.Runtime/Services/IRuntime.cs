using System;
using System.Collections.Generic;
using System.Text;

namespace Amazon.JSII.Runtime.Services
{
    internal interface IRuntime
    {
        string ReadResponse();

        void WriteRequest(string request);
    }
}
