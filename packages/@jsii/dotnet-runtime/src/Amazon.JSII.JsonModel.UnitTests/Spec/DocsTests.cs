using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
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
                Docs docs = new Docs(
                    "summary",
                    "remarks",
                    custom: new Dictionary<string, string>{ { "custtag",  "custval" } }
                );

                string actual = JsonConvert.SerializeObject(docs, Formatting.Indented);
                const string expected = @"{
  ""custom"": {
    ""custtag"": ""custval""
  },
  ""summary"": ""summary"",
  ""remarks"": ""remarks""
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
  ""summary"": ""summary"",
  ""remarks"": ""remarks"",
  ""default"": ""some default"",
  ""custom"": { ""custtag"": ""custval"" }
}";

                Docs actual = JsonConvert.DeserializeObject<Docs>(json);

                Assert.Equal("summary", actual.Summary);
                Assert.Equal("remarks", actual.Remarks);
                Assert.Equal("some default", actual.Default);
                Assert.Equal("custval", actual.Custom["custtag"]);
            }
        }
    }
}
