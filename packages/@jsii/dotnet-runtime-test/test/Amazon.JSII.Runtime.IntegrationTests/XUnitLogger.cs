using Microsoft.Extensions.Logging;
using System;
using Xunit.Abstractions;

namespace Amazon.JSII.Runtime.IntegrationTests
{
    public sealed class XUnitLoggerFactory : ILoggerFactory
    {
        readonly ITestOutputHelper _output;

        public XUnitLoggerFactory(ITestOutputHelper output)
        {
            _output = output ?? throw new ArgumentNullException(nameof(output));
        }

        public void AddProvider(ILoggerProvider provider)
        {
        }

        public ILogger CreateLogger(string categoryName)
        {
            return new XUnitLogger(_output, categoryName);
        }

        public void Dispose()
        {
        }
    }

    public sealed class XUnitLogger : ILogger, IDisposable
    {
        readonly ITestOutputHelper _output;
        readonly string _categoryName;

        public XUnitLogger(ITestOutputHelper output, string categoryName)
        {
            _output = output ?? throw new ArgumentNullException(nameof(output));
            _categoryName = categoryName ?? throw new ArgumentNullException(nameof(categoryName));
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            var str = state?.ToString() ?? "";
            // Only log lines starting with > or < (kernel traces)
            if (str.StartsWith(">") || str.StartsWith("<"))
            {
                _output.WriteLine(str);
            }
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return this;
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return true;
        }

        public void Dispose()
        {
        }
    }
}
