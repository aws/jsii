using System;
using Amazon.JSII.JsonModel.Api.Response;

namespace Amazon.JSII.Runtime
{
    public abstract class JsiiException : Exception
    {
        public ErrorResponse? ErrorResponse { get; }
        public Type? ExceptionType { get; }

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

    public sealed class JsiiError : JsiiException
    {
      internal JsiiError() : base()
      {
      }

      internal JsiiError(string message) : base(message)
      {
      }

      internal JsiiError(string message, Exception? innerException)
          : base(message, innerException)
      {
      }

      internal JsiiError(ErrorResponse response, Exception? innerException)
          : base(response, innerException)
      {
      }

    }
}
