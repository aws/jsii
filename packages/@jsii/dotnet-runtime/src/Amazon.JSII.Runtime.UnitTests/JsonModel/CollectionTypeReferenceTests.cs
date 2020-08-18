using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json;
using System;
using Xunit;

namespace Amazon.JSII.Runtime.UnitTests.JsonModel
{
    public class CollectionTypeReferenceTests
    {
        const string RootPrefix = nameof(JsonModel) + "." + nameof(CollectionTypeReference) + ".";

        public class Serialization
        {
            const string Prefix = RootPrefix + "Serialization.";

            [Fact(DisplayName = Prefix + nameof(ShouldSerializeAllMembers))]
            public void ShouldSerializeAllMembers()
            {
                CollectionTypeReference classType = new CollectionTypeReference
                (
                    kind: CollectionKind.Array,
                    elementType: new TypeReference("myElementFqn")
                );

                string actual = JsonConvert.SerializeObject(classType, Formatting.Indented);
                const string expected = @"{
  ""kind"": ""array"",
  ""elementtype"": {
    ""fqn"": ""myElementFqn""
  }
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingElementType))]
            public void ShouldThrowOnMissingElementType()
            {
#pragma warning disable CS8625
                Assert.Throws<ArgumentNullException>(() => new CollectionTypeReference(CollectionKind.Array, null));
#pragma warning restore CS8625
            }
        }

        public class Deserialization
        {
            const string Prefix = RootPrefix + "Deserialization.";

            [Fact(DisplayName = Prefix + nameof(ShouldDeserializeAllMembers))]
            public void ShouldDeserializeAllMembers()
            {
                const string json = @"{
  ""kind"": ""array"",
  ""elementtype"": {
    ""type"": {
      ""fqn"": ""myElementFqn""
    }
  }
}";

                CollectionTypeReference actual = JsonConvert.DeserializeObject<CollectionTypeReference>(json);

                Assert.Equal(CollectionKind.Array, actual.Kind);
                Assert.NotNull(actual.ElementType);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingElementType))]
            public void ShouldThrowOnMissingElementType()
            {
                const string json = @"{
  ""kind"": ""array""
}";

                Assert.Throws<ArgumentNullException>(() => JsonConvert.DeserializeObject<CollectionTypeReference>(json));
            }
        }
    }
}
