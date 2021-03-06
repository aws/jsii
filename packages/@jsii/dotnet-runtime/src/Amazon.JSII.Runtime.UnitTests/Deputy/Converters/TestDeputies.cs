﻿using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Runtime.UnitTests.Deputy.Converters
{
    [JsiiClass(typeof(TestClass), "myClassFqn", "[]")]
    public sealed class TestClass : DeputyBase
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
