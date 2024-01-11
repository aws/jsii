using Amazon.JSII.JsonModel.Spec;
using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Runtime.Services;
using Amazon.JSII.Runtime.Services.Converters;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Newtonsoft.Json.Converters;
using Xunit;

namespace Amazon.JSII.Runtime.UnitTests.Deputy.Converters
{
    public sealed class FrameworkToJsiiConverterTests
    {
        const string Prefix = "Runtime.Deputy.Converters." + nameof(FrameworkToJsiiConverter) + ".";

        public abstract class TestBase
        {
            internal readonly ITypeCache _typeCache;
            internal readonly IReferenceMap _referenceMap;
            internal readonly FrameworkToJsiiConverter _converter;

            protected TestBase()
            {
                _typeCache = Substitute.For<ITypeCache>();
                _referenceMap = Substitute.For<IReferenceMap>();
                _converter = new FrameworkToJsiiConverter(_typeCache);

                IServiceCollection serviceCollection = new ServiceCollection();
                serviceCollection.AddSingleton<ITypeCache>(_typeCache);
                serviceCollection.AddSingleton<IReferenceMap>(_referenceMap);
                serviceCollection.AddSingleton<IFrameworkToJsiiConverter>(_converter);
                serviceCollection.AddSingleton<IClient>(Substitute.For<IClient>());
                serviceCollection.AddTransient<IClient>(sp => Substitute.For<IClient>());

                IServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();
                ServiceContainer.ServiceProviderOverride = serviceProvider;

                _typeCache.TryGetClassType("myClassFqn").Returns(typeof(TestClass));
                _typeCache.TryGetEnumType("myEnumFqn").Returns(typeof(TestEnum));
            }
        }

        public sealed class Void : TestBase
        {
            const string _Prefix = Prefix + nameof(Void) + ".";

            [Fact(DisplayName = _Prefix + nameof(DoesNotConvert))]
            public void DoesNotConvert()
            {
                bool success = _converter.TryConvert(null, _referenceMap, null, out object? actual);

                Assert.True(success);
                Assert.Null(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsIfValueIsNotNull))]
            public void ThrowsIfValueIsNotNull()
            {
                Assert.Throws<ArgumentException>("value", () => _converter.TryConvert(null, _referenceMap, "", out object? actual));
            }
        }

        public sealed class Primitive : TestBase
        {
            const string _Prefix = Prefix + nameof(Primitive) + ".";

            [Theory(DisplayName = _Prefix + nameof(ConvertsPrimitiveValues))]
            [InlineData(PrimitiveType.Boolean, false, false, false)]
            [InlineData(PrimitiveType.Boolean, true, true, false)]
            [InlineData(PrimitiveType.Boolean, false, false, true)]
            [InlineData(PrimitiveType.Boolean, true, true, true)]
            [InlineData(PrimitiveType.Boolean, null, null, true)]
            [InlineData(PrimitiveType.Number, (ushort)42, (double)42, false)]
            [InlineData(PrimitiveType.Number, (short)42, (double)42, false)]
            [InlineData(PrimitiveType.Number, (uint)42, (double)42, false)]
            [InlineData(PrimitiveType.Number, 42, (double)42, false)]
            [InlineData(PrimitiveType.Number, (ulong)42, (double)42, false)]
            [InlineData(PrimitiveType.Number, (long)42, (double)42, false)]
            [InlineData(PrimitiveType.Number, (float)42, (double)42, false)]
            [InlineData(PrimitiveType.Number, (double)42, (double)42, false)]
            [InlineData(PrimitiveType.Number, (ushort)42, (double)42, true)]
            [InlineData(PrimitiveType.Number, (short)42, (double)42, true)]
            [InlineData(PrimitiveType.Number, (uint)42, (double)42, true)]
            [InlineData(PrimitiveType.Number, 42, (double)42, true)]
            [InlineData(PrimitiveType.Number, (ulong)42, (double)42, true)]
            [InlineData(PrimitiveType.Number, (long)42, (double)42, true)]
            [InlineData(PrimitiveType.Number, (float)42, (double)42, true)]
            [InlineData(PrimitiveType.Number, (double)42, (double)42, true)]
            [InlineData(PrimitiveType.Number, null, null, true)]
            [InlineData(PrimitiveType.String, "", "", false)]
            [InlineData(PrimitiveType.String, "a", "a", false)]
            [InlineData(PrimitiveType.String, "abc", "abc", false)]
            [InlineData(PrimitiveType.String, null, null, false)]
            [InlineData(PrimitiveType.String, "", "", true)]
            [InlineData(PrimitiveType.String, "a", "a", true)]
            [InlineData(PrimitiveType.String, "abc", "abc", true)]
            [InlineData(PrimitiveType.String, null, null, true)]
            public void ConvertsPrimitiveValues(PrimitiveType primitive, object? value, object? expected, bool isOptional)
            {
                var instance = new OptionalValue(new TypeReference(primitive: primitive), isOptional: isOptional);

                bool success = _converter.TryConvert(instance, _referenceMap, value, out object? actual);

                Assert.True(success);
                Assert.Equal(expected, actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsDateValues))]
            public void ConvertsDateValues()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Date));

                DateTime now = DateTime.Now;
                bool success = _converter.TryConvert(instance, _referenceMap, now, out object? actual);

                Assert.True(success);
                Assert.IsType<JObject>(actual);

                var expected = new JObject
                {
                    new JProperty("$jsii.date", now.ToString("yyyy-MM-ddTHH\\:mm\\:ss.fffffffzzz", CultureInfo.InvariantCulture))
                };

                Assert.Equal(expected, actual);

                success = _converter.TryConvert(instance, _referenceMap, null, out actual);

                Assert.False(success);
                Assert.Null(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsOptionalDateValues))]
            public void ConvertsOptionalDateValues()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Date), isOptional: true);

                DateTime now = DateTime.Now;
                bool success = _converter.TryConvert(instance, _referenceMap, now, out object? actual);
                Assert.True(success);
                Assert.IsType<JObject>(actual);
                var expected = new JObject
                {
                    new JProperty("$jsii.date", now.ToString("yyyy-MM-ddTHH\\:mm\\:ss.fffffffzzz", CultureInfo.InvariantCulture))
                };
                Assert.Equal(expected, actual);

                success = _converter.TryConvert(instance, _referenceMap, null, out actual);
                Assert.True(success);
                Assert.Null(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsJsonValues))]
            public void ConvertsJsonValues()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Json));

                JObject jObject = new JObject(
                    new JProperty("myArray", new JArray(
                        new JValue(42),
                        new JValue("myString"),
                        new JValue(false),
                        new JObject(),
                        new JArray(),
                        new JObject(
                            new JProperty("nested1", "value1"),
                            new JProperty("nested2", "value2")
                        )
                    ))
                );

                bool success = _converter.TryConvert(instance, _referenceMap, jObject, out object? actual);

                Assert.True(success);
                Assert.Same(jObject, actual);
            }

            [Fact(DisplayName = _Prefix + nameof(FailsOnNullBoolean))]
            public void FailsOnNullBoolean()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Boolean));

                bool success = _converter.TryConvert(instance, _referenceMap, null, out object? actual);

                Assert.False(success);
            }

            [Fact(DisplayName = _Prefix + nameof(FailsOnNullNumber))]
            public void FailsOnNullNumber()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Number));

                bool success = _converter.TryConvert(instance, _referenceMap, null, out object? actual);

                Assert.False(success);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsNullJson))]
            public void ConvertsNullJson()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Json));

                bool success = _converter.TryConvert(instance, _referenceMap, null, out object? actual);

                Assert.True(success);
                Assert.Null(actual);
            }
        }

        public sealed class FullyQualifiedName : TestBase
        {
            const string _Prefix = Prefix + nameof(FullyQualifiedName) + ".";

            [Fact(DisplayName = _Prefix + nameof(ConvertsClassReference))]
            public void ConvertsClassReference()
            {
                var instance = new OptionalValue(new TypeReference("myClassFqn"));

                ByRefValue byRef = new ByRefValue("myClassFqn", "0001");
                TestClass myClass = new TestClass(byRef);

                bool success = _converter.TryConvert(instance, _referenceMap, myClass, out object? actual);
                
                Assert.True(success);
                Assert.Equal(JObject.FromObject(byRef), actual);
                _referenceMap.Received().AddNativeReference(byRef, myClass);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsEnumValue))]
            public void ConvertsEnumValue()
            {
                var instance = new OptionalValue(new TypeReference("myEnumFqn"));

                TestEnum myEnum = TestEnum.MyMember2;

                bool success = _converter.TryConvert(instance, _referenceMap, myEnum, out object? actual);

                Assert.True(success);
                Assert.IsType<JObject>(actual);
                
                var expected = new JObject {
                    new JProperty("$jsii.enum", "myEnumFqn/MyMember2")
                };
                Assert.Equal(expected, actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsNullClassReference))]
            public void ConvertsNullClassReference()
            {
                var instance = new OptionalValue(new TypeReference("myClassFqn"));

                bool success = _converter.TryConvert(instance, _referenceMap, null, out object? actual);

                Assert.True(success);
                Assert.Null(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(DoesNotConvertNullNonOptionalEnumValue))]
            public void DoesNotConvertNullNonOptionalEnumValue()
            {
                var instance = new OptionalValue(new TypeReference("myEnumFqn"));

                bool success =_converter.TryConvert(instance, _referenceMap, null, out object? actual);

                Assert.False(success);
                Assert.Null(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsNullOptionalEnumValue))]
            public void ConvertsNullOptionalEnumValue()
            {
                var instance = new OptionalValue(new TypeReference("myEnumFqn"), isOptional: true);

                bool success = _converter.TryConvert(instance, _referenceMap, null, out object? actual);

                Assert.True(success);
                Assert.Null(actual);
            }
        }

        public sealed class Collection : TestBase
        {
            const string _Prefix = Prefix + nameof(Collection) + ".";

            [Fact(DisplayName = _Prefix + nameof(ConvertsMap))]
            public void ConvertsMap()
            {
                var instance = new OptionalValue(new TypeReference(
                    collection: new CollectionTypeReference(CollectionKind.Map,
                        new TypeReference(primitive: PrimitiveType.String)
                    )
                ));

                IDictionary<string, object> frameworkMap = new Dictionary<string, object>
                {
                    { "myKey1", "myValue1" },
                    { "myKey2", "myValue2" }
                };

                bool success = _converter.TryConvert(instance, _referenceMap, frameworkMap, out object? actual);

                Assert.True(success);
                Assert.IsType<JObject>(actual);

                var expected = JObject.Parse(@"{
                    ""$jsii.map"": {
                        ""myKey1"": ""myValue1"",
                        ""myKey2"": ""myValue2""
                    }
                }");
                
                Assert.True(JToken.DeepEquals(expected, actual as JObject),
                    $"Expected: {expected}\nActual:   {actual}");
            }

            [Fact(DisplayName = _Prefix + nameof(RecursivelyConvertsMapElements))]
            public void RecursivelyConvertsMapElements()
            {
                var instance = new OptionalValue(new TypeReference(
                    collection: new CollectionTypeReference(CollectionKind.Map,
                        new TypeReference(
                            collection: new CollectionTypeReference(CollectionKind.Map,
                                new TypeReference(primitive: PrimitiveType.String)
                            )
                        )
                    )
                ));

                var frameworkMap = new Dictionary<string, IDictionary<string, string>>
                {
                    { "myKey1", new Dictionary<string, string> { { "mySubKey1", "myValue1" } } },
                    { "myKey2", new Dictionary<string, string> { { "mySubKey2", "myValue2" } } },
                };

                bool success = _converter.TryConvert(instance, _referenceMap, frameworkMap, out object? actual);

                Assert.True(success);
                Assert.IsType<JObject>(actual);
                var expected = JObject.Parse(@"{
                    ""$jsii.map"": {
                        ""myKey1"": { ""$jsii.map"": { ""mySubKey1"": ""myValue1"" } },
                        ""myKey2"": { ""$jsii.map"": { ""mySubKey2"": ""myValue2"" } }
                    }
                }");
                Assert.True(JToken.DeepEquals(expected, actual as JObject),
                    $"Expected: {expected}\nActual:   {actual}");
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsArray))]
            public void ConvertsArray()
            {
                var instance = new OptionalValue(new TypeReference
                (
                    collection: new CollectionTypeReference(CollectionKind.Array,
                        new TypeReference(primitive: PrimitiveType.String)
                    )
                ));

                string[] frameworkArray = new string[]
                {
                "myValue1",
                "myValue2",
                };

                bool success = _converter.TryConvert(instance, _referenceMap, frameworkArray, out object? actual);

                Assert.True(success);
                Assert.IsType<JArray>(actual);
                Assert.Collection
                (
                    (JArray)actual!,
                    value => Assert.Equal("myValue1", value),
                    value => Assert.Equal("myValue2", value)
                );
            }

            [Fact(DisplayName = _Prefix + nameof(RecursivelyConvertsArrayElements))]
            public void RecursivelyConvertsArrayElements()
            {
                var instance = new OptionalValue(new TypeReference
                (
                    collection: new CollectionTypeReference(CollectionKind.Array,
                        new TypeReference
                        (
                            collection: new CollectionTypeReference(CollectionKind.Array,
                                new TypeReference(primitive: PrimitiveType.String)
                            )
                        )
                    )
                ));

                var frameworkArray = new string[][]
                {
                    new [] { "myValue1" },
                    new [] { "myValue2" },
                };

                bool success = _converter.TryConvert(instance, _referenceMap, frameworkArray, out object? actual);

                Assert.True(success);
                Assert.IsType<JArray>(actual);
                Assert.Collection(
                    (JArray)actual!,
                    value =>
                    {
                        Assert.IsType<JArray>(value);
                        Assert.Collection
                        (
                            (JArray)value,
                            subValue => Assert.Equal("myValue1", subValue)
                        );
                    },
                    value =>
                    {
                        Assert.IsType<JArray>(value);
                        Assert.Collection(
                            (JArray)value,
                            subValue => Assert.Equal("myValue2", subValue)
                        );
                    }
                );
            }
            
            [Fact(DisplayName = _Prefix + nameof(RecursivelyConvertsMapElementsWithMapOfAny))]
            public void RecursivelyConvertsMapElementsWithMapOfAny()
            {
                var instance = new OptionalValue(new TypeReference(
                    collection: new CollectionTypeReference(CollectionKind.Map,
                        new TypeReference(
                            collection: new CollectionTypeReference(CollectionKind.Map,
                                new TypeReference(primitive: PrimitiveType.Any)
                            )
                        )
                    )
                ));

                var frameworkMap = new Dictionary<string, IDictionary<string, object>>
                {
                    { "myKey1", new Dictionary<string, object> { { "mySubKey1", "myValue1" } } },
                    { "myKey2", new Dictionary<string, object> { { "mySubKey2", "myValue2" } } },
                };

                // This will test the call to FrameworkToJsiiConverter.TryConvertCollectionElement()
                // In the case of a of a Map of Map of Any
                bool success = _converter.TryConvert(instance, _referenceMap, frameworkMap, out object? actual);

                Assert.True(success);
                Assert.IsType<JObject>(actual);

                var expected = JObject.Parse(@"{
                  ""$jsii.map"": {
                    ""myKey1"": {
                      ""$jsii.map"": {
                        ""mySubKey1"": ""myValue1""
                      }
                    },
                    ""myKey2"": {
                      ""$jsii.map"": {
                        ""mySubKey2"": ""myValue2""
                      }
                    }
                  }
                }");

                Assert.True(JToken.DeepEquals(expected, actual as JObject),
                    $"Expected: {expected}\nActual:   {actual}");
            }
            
            [Fact(DisplayName = _Prefix + nameof(RecursivelyConvertsMapElementsWithArrayOfAny))]
            public void RecursivelyConvertsMapElementsWithArrayOfAny()
            {
                var instance = new OptionalValue(new TypeReference
                (
                    collection: new CollectionTypeReference(CollectionKind.Map,
                        new TypeReference
                        (
                            collection: new CollectionTypeReference(CollectionKind.Array,
                                new TypeReference(primitive: PrimitiveType.Any)
                            )
                        )
                    )
                ));

                var frameworkArray = new Dictionary<string, object>()
                {
                    {"key", new [] { "true" }},
                    {"key2", new [] { false }},
                };

                // This will test the call to FrameworkToJsiiConverter.TryConvertCollectionElement()
                // In the case of a of a Map of Array of Any
                bool success = _converter.TryConvert(instance, _referenceMap, frameworkArray, out object? actual);

                Assert.True(success);
                Assert.IsType<JObject>(actual);

                var expected = JObject.Parse(@"{
                    ""$jsii.map"": {
                        ""key"": [""true""],
                        ""key2"": [false]
                    }
                }");
                
                Assert.True(JToken.DeepEquals(expected, actual as JObject),
                    $"Expected: {expected}\nActual:   {actual}");
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsNullMap))]
            public void ConvertsNullMap()
            {
                var instance = new OptionalValue(new TypeReference
                (
                    collection: new CollectionTypeReference(CollectionKind.Map,
                        new TypeReference(primitive: PrimitiveType.String)
                    )
                ));

                bool success = _converter.TryConvert(instance, _referenceMap, null, out object? actual);

                Assert.True(success);
                Assert.Null(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsNullArray))]
            public void ConvertsNullArray()
            {
                var instance = new OptionalValue(new TypeReference
                (
                    collection: new CollectionTypeReference(CollectionKind.Array,
                        new TypeReference(primitive: PrimitiveType.String)
                    )
                ));

                bool success = _converter.TryConvert(instance, _referenceMap, null, out object? actual);

                Assert.True(success);
                Assert.Null(actual);
            }
        }

        public sealed class Union : TestBase
        {
            const string _Prefix = Prefix + nameof(Union) + ".";

            [Fact(DisplayName = _Prefix + nameof(FailsIfNoTypeMatches))]
            public void FailsIfNoTypeMatches()
            {
                var instance = new OptionalValue(new TypeReference(
                    union: new UnionTypeReference(new[] {
                        new TypeReference(primitive: PrimitiveType.String),
                        new TypeReference(primitive: PrimitiveType.Number)
                    })
                ));

                bool success = _converter.TryConvert(instance, _referenceMap, true, out object? actual);

                Assert.False(success);
                Assert.Null(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsSimpleUnion))]
            public void ConvertsSimpleUnion()
            {
                var instance = new OptionalValue(new TypeReference(
                    union: new UnionTypeReference(new[] {
                        new TypeReference(primitive: PrimitiveType.String)
                    })
                ));

                bool success = _converter.TryConvert(instance, _referenceMap, "abc", out object? actual);

                Assert.True(success);
                Assert.IsType<string>(actual);
                Assert.Equal("abc", actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsAsFirstMatchingType))]
            public void ConvertsAsFirstMatchingType()
            {
                var instance = new OptionalValue(new TypeReference(
                    union: new UnionTypeReference(new[] {
                        new TypeReference(primitive: PrimitiveType.String),
                        new TypeReference(primitive: PrimitiveType.Number)
                    })
                ));

                bool success = _converter.TryConvert(instance, _referenceMap, (ushort)7, out object? actual);

                Assert.True(success);
                Assert.IsType<double>(actual);
                Assert.Equal((double)7, actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsNull))]
            public void ConvertsNull()
            {
                var instance = new OptionalValue(new TypeReference(
                    union: new UnionTypeReference(new[] {
                        new TypeReference(primitive: PrimitiveType.String)
                    })
                ));

                bool success = _converter.TryConvert(instance, _referenceMap, null, out object? actual);

                Assert.True(success);
                Assert.Null(actual);
            }
        }

        public sealed class Any : TestBase
        {
            const string _Prefix = Prefix + nameof(Any) + ".";

            [Fact(DisplayName = _Prefix + nameof(ConvertsNull))]
            public void ConvertsNull()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Any));

                bool success = _converter.TryConvert(instance, _referenceMap, null, out object? actual);

                Assert.True(success);
                Assert.Null(actual);
            }

            [Theory(DisplayName = _Prefix + nameof(ConvertsPrimitive))]
            [InlineData("myString", "myString")]
            [InlineData((ushort)5, (double)5)]
            [InlineData(true, true)]
            public void ConvertsPrimitive(object value, object expected)
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Any));

                bool success = _converter.TryConvert(instance, _referenceMap, value, out object? actual);

                Assert.True(success);
                Assert.Equal(expected, actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsDate))]
            public void ConvertsDate()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Any));

                DateTime now = DateTime.Now;
                bool success = _converter.TryConvert(instance, _referenceMap, now, out object? actual);

                Assert.True(success);
                Assert.IsType<JObject>(actual);

                var expected = new JObject
                {
                    new JProperty("$jsii.date", now.ToString("yyyy-MM-ddTHH\\:mm\\:ss.fffffffzzz", CultureInfo.InvariantCulture))
                };
                Assert.Equal(expected, actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsJson))]
            public void ConvertsJson()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Any));

                JObject value = new JObject(new JProperty("myKey", "myValue"));
                bool success = _converter.TryConvert(instance, _referenceMap, value, out object? actual);

                Assert.True(success);
                Assert.Same(value, actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsMap))]
            public void ConvertsMap()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Any));

                IDictionary<string, string> value = new Dictionary<string, string>
                {
                    { "myKey", "myValue" }
                };
                bool success = _converter.TryConvert(instance, _referenceMap, value, out object? actual);

                Assert.True(success);
                Assert.IsType<JObject>(actual);
                Assert.Collection((IEnumerable<KeyValuePair<string, JToken>>)actual!,
                    kvp =>
                    {
                        Assert.IsType<JObject>(kvp.Value);
                        Assert.Equal("$jsii.map", kvp.Key, ignoreLineEndingDifferences: true);
                        Assert.Collection((IEnumerable<KeyValuePair<string, JToken>>)kvp.Value,
                            nkvp =>
                            {
                                Assert.IsType<JValue>(nkvp.Value);
                                Assert.Equal("myKey", nkvp.Key, ignoreLineEndingDifferences: true);
                                Assert.Equal("myValue", nkvp.Value.Value<string>(), ignoreLineEndingDifferences: true);
                            });
                    }
                );
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsArray))]
            public void ConvertsArray()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Any));

                string[] value = new[] { "myValue" };
                bool success = _converter.TryConvert(instance, _referenceMap, value, out object? actual);

                Assert.True(success);
                Assert.IsType<JArray>(actual);
                Assert.Collection((IEnumerable<JToken>)actual!,
                    element => Assert.Equal("myValue", element.Value<string>(), ignoreLineEndingDifferences: true)
                );
            }
        }
    }
}
