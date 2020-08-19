using System;
using Amazon.JSII.JsonModel.Api.Response;

namespace Amazon.JSII.Runtime
{
    public sealed class JsiiException : Exception
    {
        public ErrorResponse? ErrorResponse { get; }

        internal JsiiException() : base()
        {
        }
        
        internal JsiiException(string message) : base(message)
        {
        }

        internal JsiiException(string message, Exception? innerException)
            : base(message, innerException)
        {
        }

        internal JsiiException(ErrorResponse response, Exception? innerException)
            : base(response.Error, innerException)
        {
            ErrorResponse = response;
        }
    }
}
