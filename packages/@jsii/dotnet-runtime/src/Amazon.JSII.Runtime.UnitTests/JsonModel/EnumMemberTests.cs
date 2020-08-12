using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json;
using System;
using Xunit;

namespace Amazon.JSII.Runtime.UnitTests.JsonModel
{
    public class EnumMemberTests
    {
        const string RootPrefix = nameof(JsonModel) + "." + nameof(EnumMember) + ".";

        public class Serialization
        {
            const string Prefix = RootPrefix + "Serialization.";

            [Fact(DisplayName = Prefix + nameof(ShouldSerializeAllMembers))]
            public void ShouldSerializeAllMembers()
            {
                EnumMember enumMember = new EnumMember("myName", new Docs());

                string actual = JsonConvert.SerializeObject(enumMember, Formatting.Indented);
                const string expected = @"{
  ""name"": ""myName"",
  ""docs"": {}
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingName))]
            public void ShouldThrowOnMissingName()
            {
#pragma warning disable CS8625
                Assert.Throws<ArgumentNullException>(() => new EnumMember(null, new Docs()));
#pragma warning restore CS8625
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotSerializeMissingDocs))]
            public void ShouldNotSerializeMissingDocs()
            {
                EnumMember enumMember = new EnumMember("myName");

                string actual = JsonConvert.SerializeObject(enumMember, Formatting.Indented);
                const string expected = @"{
  ""name"": ""myName""
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
  ""name"": ""myName"",
  ""docs"": { ""summary"": ""hello"" }
}";

                EnumMember actual = JsonConvert.DeserializeObject<EnumMember>(json);

                Assert.Equal("myName", actual?.Name, ignoreLineEndingDifferences: true);
                Assert.Equal("hello", actual?.Docs?.Summary);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingName))]
            public void ShouldThrowOnMissingName()
            {
                const string json = @"{
  ""docs"": {}
}";

                Assert.Throws<ArgumentNullException>(() => JsonConvert.DeserializeObject<EnumMember>(json));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotDeserializeMissingDocs))]
            public void ShouldNotDeserializeMissingDocs()
            {
                const string json = @"{
  ""name"": ""myName""
}";

                EnumMember actual = JsonConvert.DeserializeObject<EnumMember>(json);

                Assert.Null(actual.Docs);
            }
        }
    }
}
