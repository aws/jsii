using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Runtime.UnitTests.Deputy.Converters
{
    [JsiiClass(null, "myClassFqn", "[]")]
    public class TestClass : DeputyBase
    {
        public TestClass(ByRefValue reference) : base(reference)
        {
        }
    }

    [JsiiEnum(null, "myEnumFqn")]
    public enum TestEnum
    {
        [JsiiEnumMember("MyMember1")]
        MyMember1,

        [JsiiEnumMember("MyMember2")]
        MyMember2,
    }
}
