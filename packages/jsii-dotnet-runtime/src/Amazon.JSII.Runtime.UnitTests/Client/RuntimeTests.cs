using System.IO;
using Amazon.JSII.Runtime.Services;
using NSubstitute;
using NSubstitute.ReturnsExtensions;
using Xunit;

namespace Amazon.JSII.Runtime.UnitTests.Client
{
    public class RuntimeTests
    {
        private const string Prefix = "Runtime.";

        private INodeProcess _nodeProcessMock;
        private TextReader _standardOutputMock;
        private TextReader _standardErrorMock;

        private IRuntime _sut;

        public RuntimeTests()
        {
            _nodeProcessMock = Substitute.For<INodeProcess>();
            _standardOutputMock = Substitute.For<TextReader>();
            _standardErrorMock = Substitute.For<TextReader>();

            _nodeProcessMock.StandardOutput.Returns(_standardOutputMock);
            _nodeProcessMock.StandardError.Returns(_standardErrorMock);

            _sut = new Services.Runtime(_nodeProcessMock);
        }

        [Fact(DisplayName = Prefix + nameof(ThrowsJsiiExceptionWhenResponseNotReceived))]
        public void ThrowsJsiiExceptionWhenResponseNotReceived()
        {
            _nodeProcessMock.StandardOutput.ReadLine().ReturnsNull();
            _nodeProcessMock.StandardError.ReadToEnd().Returns("This is a test.");

            var ex = Assert.Throws<JsiiException>(() => _sut.ReadResponse());
            Assert.Equal("Child process exited unexpectedly: This is a test.", ex.Message);
        }
    }
}