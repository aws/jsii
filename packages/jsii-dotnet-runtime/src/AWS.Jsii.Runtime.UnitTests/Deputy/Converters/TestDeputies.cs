using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Runtime.UnitTests.Deputy.Converters
{
    [JsiiClass(typeof(TestClass), "myClassFqn", "[]")]
    public class TestClass : DeputyBase
    {
        public TestClass(ByRefValue reference) : base(reference)
        {
        }
    }

    [JsiiEnum(typeof(TestClass), "myEnumFqn")]
    public enum TestEnum
    {
        [JsiiEnumMember("MyMember1")]
        MyMember1,

        [JsiiEnumMember("MyMember2")]
        MyMember2,
    }
}
