using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json;
using System;
using Xunit;

namespace Amazon.JSII.Runtime.UnitTests.JsonModel
{
    public class CollectionKindTests
    {
        const string RootPrefix = nameof(JsonModel) + "." + nameof(CollectionKind) + ".";

        public class Serialization
        {
            const string Prefix = RootPrefix + "Serialization.";

            [Theory(DisplayName = Prefix + nameof(ShouldSerialize))]
            [InlineData(CollectionKind.Array, @"""array""")]
            [InlineData(CollectionKind.Map, @"""map""")]
            public void ShouldSerialize(CollectionKind kind, string expected)
            {
                string actual = JsonConvert.SerializeObject(kind);

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }
        }

        public class Deserialization
        {
            const string Prefix = RootPrefix + "Deserialization.";

            [Theory(DisplayName = Prefix + nameof(ShouldDeserialize))]
            [InlineData(@"""array""", CollectionKind.Array)]
            [InlineData(@"""map""", CollectionKind.Map)]
            public void ShouldDeserialize(string kind, CollectionKind expected)
            {
                CollectionKind actual = JsonConvert.DeserializeObject<CollectionKind>(kind);

                Assert.Equal(expected, actual);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnNull))]
            public void ShouldThrowOnNull()
            {
#pragma warning disable CS8625
                Assert.Throws<ArgumentNullException>(() => JsonConvert.DeserializeObject<CollectionKind>(null));
#pragma warning restore CS8625
            }
        }
    }

}
