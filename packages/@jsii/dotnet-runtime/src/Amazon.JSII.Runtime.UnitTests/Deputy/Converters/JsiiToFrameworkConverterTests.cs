using Amazon.JSII.JsonModel.Spec;
using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Runtime.Services;
using Amazon.JSII.Runtime.Services.Converters;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;
using NSubstitute;
using System;
using System.Collections.Generic;
using Xunit;

namespace Amazon.JSII.Runtime.UnitTests.Deputy.Converters
{
    public sealed class JsiiToFrameworkConverterTests
    {
        const string Prefix = "Runtime.Deputy.Converters." + nameof(JsiiToFrameworkConverter) + ".";

        public abstract class TestBase
        {
            internal readonly ITypeCache _typeCache;
            internal readonly IReferenceMap _referenceMap;
            internal readonly JsiiToFrameworkConverter _converter;

            protected TestBase()
            {
                _typeCache = Substitute.For<ITypeCache>();
                _referenceMap = Substitute.For<IReferenceMap>();
                _converter = new JsiiToFrameworkConverter(_typeCache);

                IServiceCollection serviceCollection = new ServiceCollection();
                serviceCollection.AddSingleton<ITypeCache>(_typeCache);
                serviceCollection.AddSingleton<IReferenceMap>(_referenceMap);
                serviceCollection.AddSingleton<IJsiiToFrameworkConverter>(_converter);

                IServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();
                ServiceContainer.ServiceProviderOverride = serviceProvider;

                _typeCache.GetFrameworkType(Arg.Is<TypeReference>(r => r.Primitive == PrimitiveType.Any), Arg.Any<Boolean>())
                    .Returns(typeof(object));
                _typeCache.GetFrameworkType(Arg.Is<TypeReference>(r => r.Primitive == PrimitiveType.String), false)
                    .Returns(typeof(string));
            }
        }

        public sealed class Void : TestBase
        {
            const string _Prefix = Prefix + nameof(Void) + ".";

            [Fact(DisplayName = _Prefix + nameof(DoesNotConvert))]
            public void DoesNotConvert()
            {
                bool success = _converter.TryConvert(null, typeof(object), _referenceMap, null, out object? actual);

                Assert.True(success);
                Assert.Null(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsIfValueIsNotNull))]
            public void ThrowsIfValueIsNotNull()
            {
                Assert.Throws<ArgumentException>("value", () => _converter.TryConvert(null, typeof(object), _referenceMap, "", out object? actual));
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

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, value, out object? actual);

                Assert.True(success);
                Assert.Equal(expected, actual);

                success = _converter.TryConvert(instance, typeof(object), _referenceMap, new JValue(value), out actual);

                Assert.True(success);
                Assert.Equal(expected, actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsDateValues))]
            public void ConvertsDateValues()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Date));

                DateTime now = DateTime.Now;
                JObject value = new JObject(new JProperty("$jsii.date", now));

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, value, out object? actual);
                Assert.True(success);
                Assert.Equal(now, actual);

                success = _converter.TryConvert(instance, typeof(object), _referenceMap, null, out actual);
                Assert.False(success);
                Assert.Null(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsOptionalDateValues))]
            public void ConvertsOptionalDateValues()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Date), isOptional: true);

                DateTime now = DateTime.Now;
                JObject value = new JObject(new JProperty("$jsii.date", now));

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, value, out object? actual);
                Assert.True(success);
                Assert.Equal(now, actual);

                success = _converter.TryConvert(instance, typeof(object), _referenceMap, null, out actual);
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

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, jObject, out object? actual);

                Assert.True(success);
                Assert.Same(jObject, actual);
            }

            [Fact(DisplayName = _Prefix + nameof(FailsOnNullBoolean))]
            public void FailsOnNullBoolean()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Boolean));

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, null, out object? actual);

                Assert.False(success);
            }

            [Fact(DisplayName = _Prefix + nameof(FailsOnNullNumber))]
            public void FailsOnNullNumber()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Number));

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, null, out object? actual);

                Assert.False(success);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsNullJson))]
            public void ConvertsNullJson()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Json));

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, null, out object? actual);

                Assert.True(success);
                Assert.Null(actual);
            }
        }

        public sealed class FullyQualifiedName : TestBase
        {
            const string _Prefix = Prefix + nameof(FullyQualifiedName) + ".";

            public FullyQualifiedName()
            {
                _typeCache.TryGetClassType("myClassFqn").Returns(typeof(TestClass));
                _typeCache.GetClassType("myClassFqn").Returns(typeof(TestClass));

                _typeCache.TryGetEnumType("myEnumFqn").Returns(typeof(TestEnum));
                _typeCache.GetEnumType("myEnumFqn").Returns(typeof(TestEnum));
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsClassReference))]
            public void ConvertsClassReference()
            {
                var instance = new OptionalValue(new TypeReference("myClassFqn"));

                JObject byRef = new JObject(new JProperty("$jsii.byref", "myClassFqn@0001"));
                TestClass testClass = new TestClass(new ByRefValue("myClassFqn", "0001"));
                _referenceMap
                    .GetOrCreateNativeReference(Arg.Is<ByRefValue>(v => v.Value == "myClassFqn@0001"))
                    .Returns(testClass);

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, byRef, out object? actual);

                Assert.True(success);
                Assert.Same(actual, testClass);
                _referenceMap.Received()
                    .GetOrCreateNativeReference(Arg.Is<ByRefValue>(v => v.Value == "myClassFqn@0001"));
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsEnumValue))]
            public void ConvertsEnumValue()
            {
                var instance = new OptionalValue(new TypeReference("myEnumFqn"));
                JObject enumValue = new JObject(new JProperty("$jsii.enum", "myEnumFqn/MyMember1"));

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, enumValue, out object? actual);

                Assert.True(success);
                Assert.Equal(TestEnum.MyMember1, actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsNullClassReference))]
            public void ConvertsNullClassReference()
            {
                var instance = new OptionalValue(new TypeReference("myClassFqn"));

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, null, out object? actual);

                Assert.True(success);
                Assert.Null(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(DoesNotConvertNullNonOptionalEnumValue))]
            public void DoesNotConvertNullNonOptionalEnumValue()
            {
                var instance = new OptionalValue(new TypeReference("myEnumFqn"));

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, null, out object? actual);

                Assert.False(success);
                Assert.Null(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsNullOptionalEnumValue))]
            public void ConvertsNullOptionalEnumValue()
            {
                var instance = new OptionalValue(new TypeReference("myEnumFqn"), isOptional: true);

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, null, out object? actual);

                Assert.True(success);
                Assert.Null(actual);
            }
        }

        public sealed class Collection : TestBase
        {
            const string _Prefix = Prefix + nameof(Collection) + ".";

            public Collection()
            {
                _typeCache.GetFrameworkType(Arg.Is<TypeReference>(r =>
                    r.Collection != null &&
                    r.Collection.Kind == CollectionKind.Array &&
                    r.Collection.ElementType.Primitive == PrimitiveType.String
                ), false)
                    .Returns(typeof(string[]));

                _typeCache.GetFrameworkType(Arg.Is<TypeReference>(r =>
                    r.Collection != null &&
                    r.Collection.Kind == CollectionKind.Map &&
                    r.Collection.ElementType.Primitive == PrimitiveType.String
                ), false)
                    .Returns(typeof(IDictionary<string, string>));
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsMap))]
            public void ConvertsMap()
            {
                var instance = new OptionalValue(new TypeReference(
                    collection: new CollectionTypeReference(CollectionKind.Map,
                        new TypeReference(primitive: PrimitiveType.String)
                    )
                ));

                JObject value = new JObject(
                    new JProperty("myKey1", "myValue1"),
                    new JProperty("myKey2", "myValue2")
                );

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, value, out object? actual);

                Assert.True(success);
                Assert.IsAssignableFrom<IDictionary<string, string>>(actual);
                Assert.Collection((IDictionary<string, string>)actual!,
                    kvp =>
                    {
                        Assert.Equal("myKey1", kvp.Key, ignoreLineEndingDifferences: true);
                        Assert.Equal("myValue1", kvp.Value, ignoreLineEndingDifferences: true);
                    },
                    kvp =>
                    {
                        Assert.Equal("myKey2", kvp.Key, ignoreLineEndingDifferences: true);
                        Assert.Equal("myValue2", kvp.Value, ignoreLineEndingDifferences: true);
                    }
                );
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

                JObject value = new JObject(
                    new JProperty("myKey1", new JObject(
                        new JProperty("mySubKey1", "myValue1")
                    )),
                    new JProperty("myKey2", new JObject(
                        new JProperty("mySubKey2", "myValue2")
                    ))
                );

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, value, out object? actual);

                Assert.True(success);
                Assert.IsAssignableFrom<IDictionary<string, IDictionary<string, string>>>(actual);
                Assert.Collection((IDictionary<string, IDictionary<string, string>>)actual!,
                    kvp =>
                    {
                        Assert.Equal("myKey1", kvp.Key, ignoreLineEndingDifferences: true);
                        Assert.Collection(kvp.Value,
                            subKvp =>
                            {
                                Assert.Equal("mySubKey1", subKvp.Key, ignoreLineEndingDifferences: true);
                                Assert.Equal("myValue1", subKvp.Value, ignoreLineEndingDifferences: true);
                            }
                        );
                    },
                    kvp =>
                    {
                        Assert.Equal("myKey2", kvp.Key, ignoreLineEndingDifferences: true);
                        Assert.Collection(kvp.Value,
                            subKvp =>
                            {
                                Assert.Equal("mySubKey2", subKvp.Key, ignoreLineEndingDifferences: true);
                                Assert.Equal("myValue2", subKvp.Value, ignoreLineEndingDifferences: true);
                            }
                        );
                    }
                );
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsArray))]
            public void ConvertsArray()
            {
                var instance = new OptionalValue(new TypeReference(
                    collection: new CollectionTypeReference(CollectionKind.Array,
                        new TypeReference(primitive: PrimitiveType.String)
                    )
                ));

                JArray value = new JArray(
                    new JValue("myValue1"),
                    new JValue("myValue2")
                );

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, value, out object? actual);

                Assert.True(success);
                Assert.IsType<string[]>(actual);
                Assert.Collection((string[])actual!,
                    element => Assert.Equal("myValue1", element, ignoreLineEndingDifferences: true),
                    element => Assert.Equal("myValue2", element, ignoreLineEndingDifferences: true)
                );
            }

            [Fact(DisplayName = _Prefix + nameof(RecursivelyConvertsArrayElements))]
            public void RecursivelyConvertsArrayElements()
            {
                var instance = new OptionalValue(new TypeReference(
                    collection: new CollectionTypeReference(CollectionKind.Array,
                        new TypeReference(
                            collection: new CollectionTypeReference(CollectionKind.Array,
                                new TypeReference(primitive: PrimitiveType.String)
                            )
                        )
                    )
                ));

                JArray value = new JArray(
                    new JArray(new JValue("myValue1")),
                    new JArray(new JValue("myValue2"))
                );

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, value, out object? actual);

                Assert.True(success);
                Assert.IsType<string[][]>(actual);
                Assert.Collection((string[][])actual!,
                    element => Assert.Collection(element,
                        subElement => Assert.Equal("myValue1", subElement, ignoreLineEndingDifferences: true)
                    ),
                    element => Assert.Collection(element,
                        subElement => Assert.Equal("myValue2", subElement, ignoreLineEndingDifferences: true)
                    )
                );
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsNullMap))]
            public void ConvertsNullMap()
            {
                var instance = new OptionalValue(new TypeReference(
                    collection: new CollectionTypeReference(CollectionKind.Map,
                        new TypeReference(primitive: PrimitiveType.String)
                    )
                ));

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, null, out object? actual);

                Assert.True(success);
                Assert.Null(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsNullArray))]
            public void ConvertsNullArray()
            {
                var instance = new OptionalValue(new TypeReference(
                    collection: new CollectionTypeReference(CollectionKind.Array,
                        new TypeReference(primitive: PrimitiveType.String)
                    )
                ));

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, null, out object? actual);

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

                JValue value = new JValue(true);
                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, value, out object? actual);

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

                JValue value = new JValue("abc");
                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, value, out object? actual);

                Assert.True(success);
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

                JValue value = new JValue((ushort)7);
                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, value, out object? actual);

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

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, null, out object? actual);

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

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, null, out object? actual);

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

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, new JValue(value), out object? actual);

                Assert.True(success);
                Assert.Equal(expected, actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsDate))]
            public void ConvertsDate()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Any));

                DateTime now = DateTime.Now;
                JObject value = new JObject(
                    new JProperty("$jsii.date", now)
                );

                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, value, out object? actual);

                Assert.True(success);
                Assert.Equal(now, actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsJson))]
            public void ConvertsJson()
            {
                // We can't distinguish between generic JSON and JSII maps, so we treat
                // all unrecognized JObjects as maps.
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Any));

                JObject value = new JObject(new JProperty("myKey", "myValue"));
                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, value, out object? actual);

                Assert.True(success);
                Assert.IsAssignableFrom<IDictionary<string, object?>>(actual);
                Assert.Collection((IDictionary<string, object?>)actual!,
                    kvp =>
                    {
                        Assert.Equal("myKey", kvp.Key, ignoreLineEndingDifferences: true);
                        Assert.Equal("myValue", kvp.Value);
                    }
                );
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsMap))]
            public void ConvertsMap()
            {
                // We can't distinguish between generic JSON and JSII maps, so we treat
                // all unrecognized JObjects as maps.
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Any));

                JObject value = new JObject(new JProperty("myKey", "myValue"));
                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, value, out object? actual);

                Assert.True(success);
                Assert.IsAssignableFrom<IDictionary<string, object>>(actual);
                Assert.Collection((IDictionary<string, object>)actual!,
                    kvp =>
                    {
                        Assert.Equal("myKey", kvp.Key, ignoreLineEndingDifferences: true);
                        Assert.Equal("myValue", kvp.Value);
                    }
                );
            }

            [Fact(DisplayName = _Prefix + nameof(ConvertsArray))]
            public void ConvertsArray()
            {
                var instance = new OptionalValue(new TypeReference(primitive: PrimitiveType.Any));

                JArray value = new JArray(new JValue("myValue"));
                bool success = _converter.TryConvert(instance, typeof(object), _referenceMap, value, out object? actual);

                Assert.True(success);
                Assert.IsAssignableFrom<object[]>(actual);
                Assert.Collection((object[])actual!,
                    element => Assert.Equal("myValue", element)
                );
            }
        }
    }
}
