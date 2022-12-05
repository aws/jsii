using Microsoft.Extensions.Logging;
using System;
using Xunit.Abstractions;

namespace Amazon.JSII.Runtime.IntegrationTests
{
    internal sealed class XUnitLoggerFactory : ILoggerFactory
    {
        private readonly ITestOutputHelper _output;

        public XUnitLoggerFactory(ITestOutputHelper output)
        {
            _output = output ?? throw new ArgumentNullException(nameof(output));
        }

        void ILoggerFactory.AddProvider(ILoggerProvider provider)
        {
        }

        ILogger ILoggerFactory.CreateLogger(string categoryName)
        {
            return new XUnitLogger(_output, categoryName);
        }

        void IDisposable.Dispose()
        {
        }
    }

    internal sealed class XUnitLogger : ILogger, IDisposable
    {
        private readonly ITestOutputHelper _output;
        private readonly string _categoryName;

        public XUnitLogger(ITestOutputHelper output, string categoryName)
        {
            _output = output ?? throw new ArgumentNullException(nameof(output));
            _categoryName = categoryName ?? throw new ArgumentNullException(nameof(categoryName));
        }

        void ILogger.Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception, string> formatter)
        {
            var str = state?.ToString() ?? "";
            // Only log lines starting with > or < (kernel traces)
            if (str.StartsWith(">") || str.StartsWith("<"))
            {
                _output.WriteLine(str);
            }
        }

        IDisposable ILogger.BeginScope<TState>(TState state)
        {
            return this;
        }

        bool ILogger.IsEnabled(LogLevel logLevel)
        {
            return true;
        }

        void IDisposable.Dispose()
        {
        }
    }
}
