using AWS.Jsii.JsonModel.Api.Response;
using System;

namespace AWS.Jsii.Runtime
{
    public class JsiiException : Exception
    {
        public ErrorResponse ErrorResponse { get; }

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
