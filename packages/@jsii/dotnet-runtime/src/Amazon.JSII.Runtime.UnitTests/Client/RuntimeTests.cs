using System.IO;
using Amazon.JSII.Runtime.Services;
using NSubstitute;
using NSubstitute.ReturnsExtensions;
using Xunit;

namespace Amazon.JSII.Runtime.UnitTests.Client
{
    public sealed class RuntimeTests
    {
        private const string Prefix = "Runtime.";

        private INodeProcess _nodeProcessMock;

        private IRuntime _sut;

        public RuntimeTests()
        {
            _nodeProcessMock = Substitute.For<INodeProcess>();
            var standardOutputMock = Substitute.For<TextReader>();

            _nodeProcessMock.StandardOutput.Returns(standardOutputMock);

            _sut = new Services.Runtime(_nodeProcessMock);
        }

        [Fact(DisplayName = Prefix + nameof(ThrowsJsiiErrorWhenResponseNotReceived))]
        public void ThrowsJsiiErrorWhenResponseNotReceived()
        {
            _nodeProcessMock.StandardOutput.ReadLine().ReturnsNull();

            var ex = Assert.Throws<JsiiError>(() => _sut.ReadResponse());
            Assert.Equal("Child process exited unexpectedly!", ex.Message);
        }
    }
}
