using System;
using Amazon.JSII.JsonModel.Api.Response;

namespace Amazon.JSII.Runtime
{
    public class JsiiException : Exception
    {
        public ErrorResponse ErrorResponse { get; }

        public JsiiException(string message) : base(message)
        {
        }

        public JsiiException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        public JsiiException(ErrorResponse response, Exception innerException)
            : base(response.Error, innerException)
        {
            ErrorResponse = response;
        }
    }
}
