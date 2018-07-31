using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json;
using System;
using Xunit;

namespace Amazon.JSII.JsonModel.UnitTests.Spec
{
    public class DocsTests
    {
        const string RootPrefix = nameof(Spec) + "." + nameof(Docs) + ".";

        public class Serialization
        {
            const string Prefix = RootPrefix + "Serialization.";

            [Fact(DisplayName = Prefix + nameof(ShouldSerializeAllMembers))]
            public void ShouldSerializeAllMembers()
            {
                Docs docs = new Docs
                {
                    { "myKey", "myValue" }
                };

                string actual = JsonConvert.SerializeObject(docs, Formatting.Indented);
                const string expected = @"{
  ""myKey"": ""myValue""
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }
        }

        public class Deserialization
        {
            const string Prefix = RootPrefix + "Deserialization.";

            [Fact(DisplayName = Prefix + nameof(ShouldDeserializeAllMembers))]
            public void ShouldDeserializeAllMembers()
            {
                const string json = @"{
  ""myKey"": ""myValue""
}";

                Docs actual = JsonConvert.DeserializeObject<Docs>(json);

                Assert.Equal("myValue", actual["myKey"], ignoreLineEndingDifferences: true);
            }
        }
    }
}
