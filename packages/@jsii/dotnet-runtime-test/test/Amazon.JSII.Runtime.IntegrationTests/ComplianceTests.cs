using System;
using System.Collections.Generic;
using System.Linq;
using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace;
using Amazon.JSII.Tests.CalculatorNamespace.Cdk16625;
using CompositeOperation = Amazon.JSII.Tests.CalculatorNamespace.Composition.CompositeOperation;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;
using Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace;
using Newtonsoft.Json.Linq;
using Xunit;
using Xunit.Abstractions;

[assembly: CollectionBehavior(DisableTestParallelization = true)]

#pragma warning disable CS0612

namespace Amazon.JSII.Runtime.IntegrationTests
{
    /// <summary>
    /// Ported from packages/jsii-java-runtime/src/test/java/org/jsii/testing/ComplianceTest.java.
    /// </summary>
    public sealed class ComplianceTests : IClassFixture<ServiceContainerFixture>, IDisposable
    {
        class RuntimeException : Exception
        {
            public RuntimeException(string message)
                : base(message)
            {
            }
        }

        const string Prefix = nameof(IntegrationTests) + ".Compliance.";

        private readonly IDisposable _serviceContainerFixture;

        public ComplianceTests(ITestOutputHelper outputHelper, ServiceContainerFixture serviceContainerFixture)
        {
            serviceContainerFixture.SetOverride(outputHelper);
            _serviceContainerFixture = serviceContainerFixture;
        }

        void IDisposable.Dispose()
        {
            _serviceContainerFixture.Dispose();
        }

        [Fact(DisplayName = Prefix + nameof(UseNestedStruct))]
        public void UseNestedStruct()
        {
            StaticConsumer.Consume(
                new Amazon.JSII.Tests.CustomSubmoduleName.NestingClass.NestedStruct { Name = "Bond, James Bond" }
            );
        }

        [Fact(DisplayName = Prefix + nameof(PrimitiveTypes))]
        public void PrimitiveTypes()
        {
            AllTypes types = new AllTypes();

            // boolean
            types.BooleanProperty = true;
            Assert.True(types.BooleanProperty);

            // string
            types.StringProperty = "foo";
            Assert.Equal("foo", types.StringProperty);

            // number
            types.NumberProperty = 1234;
            Assert.Equal(1234d, types.NumberProperty);

            // date
            types.DateProperty = DateTime.UnixEpoch.AddMilliseconds(123);
            Assert.Equal(DateTime.UnixEpoch.AddMilliseconds(123), types.DateProperty);

            // json
            types.JsonProperty = JObject.Parse(@"{ ""Foo"": { ""Bar"": 123 } }");
            Assert.Equal(123d, types.JsonProperty["Foo"]?["Bar"]?.Value<double>());
        }

        [Fact(DisplayName = Prefix + nameof(Dates))]
        public void Dates()
        {
            var types = new AllTypes();

            // strong type
            types.DateProperty = DateTime.UnixEpoch.AddMilliseconds(123);
            Assert.Equal(DateTime.UnixEpoch.AddMilliseconds(123), types.DateProperty);

            // weak type
            types.AnyProperty = DateTime.UnixEpoch.AddSeconds(999);
            Assert.Equal(DateTime.UnixEpoch.AddSeconds(999), types.AnyProperty);
        }

        [Fact(DisplayName = Prefix + nameof(CollectionTypes))]
        public void CollectionTypes()
        {
            AllTypes types = new AllTypes();

            // array
            types.ArrayProperty = new[] {"Hello", "World"};
            Assert.Equal("World", types.ArrayProperty[1]);

            // map
            IDictionary<string, Number> map = new Dictionary<string, Number>();
            map["Foo"] = new Number(123);
            types.MapProperty = map;
            Assert.Equal(123d, types.MapProperty["Foo"].Value);
        }

        [Fact(DisplayName = Prefix + nameof(ComplexCollectionTypes))]
        public void ComplexCollectionTypes()
        {
            // See https://github.com/aws/aws-cdk/issues/2496
            AllTypes types = new AllTypes();
            // complex map
            IDictionary<string, object> map = new Dictionary<string, object>();
            map.Add("Foo", new Dictionary<string, object>() { {"Key", 123d}});
            types.AnyMapProperty = map;
            var dict = (Dictionary<string, object>)types.AnyMapProperty["Foo"];
            Assert.Equal(123d, dict["Key"]);
        }

        [Fact(DisplayName = Prefix + nameof(DynamicTypes))]
        public void DynamicTypes()
        {
            AllTypes types = new AllTypes();

            // boolean
            types.AnyProperty = false;
            Assert.False((bool) types.AnyProperty);

            // string
            types.AnyProperty = "String";
            Assert.Equal("String", types.AnyProperty);

            // number
            types.AnyProperty = 12;
            Assert.Equal(12d, types.AnyProperty);

            // date
            types.AnyProperty = DateTime.UnixEpoch.AddSeconds(1234);
            Assert.Equal(DateTime.UnixEpoch.AddSeconds(1234), types.AnyProperty);

            // json (notice that when deserialized, it is deserialized as a map).
            types.AnyProperty = new Dictionary<string, object>
            {
                { "Goo", new object[]
                    {
                        "Hello",
                        new Dictionary<string, object>
                        {
                            { "World", 123 }
                        }
                    }
                }
            };
            var @object = (IDictionary<string, object>) types.AnyProperty;
            var array = (object[]) @object["Goo"];
            var innerObject = (IDictionary<string, object>) array[1];
            Assert.Equal(123d, innerObject["World"]);

            // array
            types.AnyProperty = new[] {"Hello", "World"};
            Assert.Equal("Hello", ((object[]) types.AnyProperty)[0]);
            Assert.Equal("World", ((object[]) types.AnyProperty)[1]);

            // array of any
            types.AnyArrayProperty = new object[] {"Hybrid", new Number(12), 123, false};
            Assert.Equal(123d, types.AnyArrayProperty[2]);

            // map
            IDictionary<string, object> map = new Dictionary<string, object>();
            map["MapKey"] = "MapValue";
            types.AnyProperty = map;
            Assert.Equal("MapValue", ((IDictionary<string, object>) types.AnyProperty)["MapKey"]);

            // map of any
            map["Goo"] = 19289812;
            types.AnyMapProperty = map;
            Assert.Equal(19289812d, types.AnyMapProperty["Goo"]);

            // classes
            var mult = new Multiply(new Number(10), new Number(20));
            types.AnyProperty = mult;
            Assert.Same(types.AnyProperty, mult);
            Assert.IsType<Multiply>(types.AnyProperty);
            Assert.Equal(200d, ((Multiply) types.AnyProperty).Value);
        }

        [Fact(DisplayName = Prefix + nameof(UnionTypes))]
        public void UnionTypes()
        {
            AllTypes types = new AllTypes();

            // single valued property
            types.UnionProperty = 1234;
            Assert.Equal(1234d, types.UnionProperty);

            types.UnionProperty = "Hello";
            Assert.Equal("Hello", types.UnionProperty);

            types.UnionProperty = new Multiply(new Number(2), new Number(12));
            Assert.Equal(24d, ((Multiply) types.UnionProperty).Value);

            // NOTE: union collections are untyped in C# (System.Object)

            // map
            // TODO: This is ported from the Java test, but it doesn't seem right.
            // UnionMapProperty has type Map<PrimitiveType.String | PrimitiveType.Number>
            // PrimitiveType.Number is not the same as the Number type, so I would expect
            // this to fail (which it does).
            /*
            IDictionary<string, object> map = new Dictionary<string, object>();
            map["Foo"] = new Multiply(new Number(2), new Number(00));
            types.UnionMapProperty = map;


            // array
            types.UnionArrayProperty = new object[] { "Hello", 123, new Number(3) };
            Assert.Equal((double)33, ((Number)types.UnionArrayProperty[2]).Value);
            */
        }

        [Fact(DisplayName = Prefix + nameof(CreateObjectAndCtorOverloads))]
        public void CreateObjectAndCtorOverloads()
        {
            new Calculator();
            var calc = new Calculator(new CalculatorProps() {
                InitialValue = 100
            });
            Assert.Equal(100, calc.Value);
        }

        [Fact(DisplayName = Prefix + nameof(GetSetPrimitiveProperties))]
        public void GetSetPrimitiveProperties()
        {
            var number = new Number(20);
            Assert.Equal(20d, number.Value);
            Assert.Equal(40d, number.DoubleValue);
            Assert.Equal(-30d, new Negate(new Add(new Number(20), new Number(10))).Value);
            Assert.Equal(20d, new Multiply(new Add(new Number(5), new Number(5)), new Number(2)).Value);
            Assert.Equal(3d * 3d * 3d * 3d, new Power(new Number(3), new Number(4)).Value);
            Assert.Equal(999d, new Power(new Number(999), new Number(1)).Value);
            Assert.Equal(1d, new Power(new Number(999), new Number(0)).Value);
        }

        [Fact(DisplayName = Prefix + nameof(CallMethods))]
        public void CallMethods()
        {
            var calc = new Calculator();

            calc.Add(10);
            Assert.Equal(10d, calc.Value);

            calc.Mul(2);
            Assert.Equal(20d, calc.Value);

            calc.Pow(5);
            Assert.Equal(20d * 20d * 20d * 20d * 20d, calc.Value);

            calc.Neg();
            Assert.Equal(-3200000d, calc.Value);
        }

        [Fact(DisplayName = Prefix + nameof(UnmarkshallIntoAbstractType))]
        public void UnmarkshallIntoAbstractType()
        {
            var calc = new Calculator();

            calc.Add(120);
            var value = calc.Curr;
            Assert.Equal(120d, value.Value);
        }

        [Fact(DisplayName = Prefix + nameof(GetAndSetNotPrimitiveProperties))]
        public void GetAndSetNotPrimitiveProperties()
        {
            var calc = new Calculator();

            calc.Add(3200000);
            calc.Neg();
            calc.Curr = new Multiply(new Number(2), calc.Curr);
            Assert.Equal(-6400000d, calc.Value);
        }

        [Fact(DisplayName = Prefix + nameof(GetAndSetEnumValues))]
        public void GetAndSetEnumValues()
        {
            // TODO: Generator should create a parameterless constructor.
            Calculator calc = new Calculator(new CalculatorProps());

            calc.Add(9);
            calc.Pow(3);
            Assert.Equal(CompositeOperation.CompositionStringStyle.NORMAL, calc.StringStyle);
            calc.StringStyle = CompositeOperation.CompositionStringStyle.DECORATED;
            Assert.Equal(CompositeOperation.CompositionStringStyle.DECORATED, calc.StringStyle);
            Assert.Equal("<<[[{{(((1 * (0 + 9)) * (0 + 9)) * (0 + 9))}}]]>>", calc.ToString());
        }

        [Fact(DisplayName = Prefix + nameof(EnumFromScopedModule))]
        public void UseEnumFromScopedModule()
        {
            ReferenceEnumFromScopedPackage obj = new ReferenceEnumFromScopedPackage();
            Assert.Equal(EnumFromScopedModule.VALUE2, obj.Foo);
            obj.Foo = EnumFromScopedModule.VALUE1;
            Assert.Equal(EnumFromScopedModule.VALUE1, obj.LoadFoo());
            obj.SaveFoo(EnumFromScopedModule.VALUE2);
            Assert.Equal(EnumFromScopedModule.VALUE2, obj.Foo);
        }

        [Fact(DisplayName = Prefix + nameof(UndefinedAndNull))]
        public void UndefinedAndNull()
        {
            // TODO: Generator should create a parameterless constructor.
            Calculator calculator = new Calculator(new CalculatorProps());

            Assert.Null(calculator.MaxValue);
            calculator.MaxValue = null;
        }

        [Fact(DisplayName = Prefix + nameof(Arrays))]
        public void Arrays()
        {
            var sum = new Sum
            {
                Parts = new NumericValue[] {new Number(5), new Number(10), new Multiply(new Number(2), new Number(3))}
            };
            Assert.Equal(10d + 5d + 2d * 3d, sum.Value);
            Assert.Equal(5d, sum.Parts[0].Value);
            Assert.Equal(6d, sum.Parts[2].Value);
            Assert.Equal("(((0 + 5) + 10) + (2 * 3))", sum.ToString());
        }

        [Fact(DisplayName = Prefix + nameof(Maps))]
        public void Maps()
        {
            // TODO: Generator should create a parameterless constructor.
            var calc = new Calculator(new CalculatorProps());

            calc.Add(10);
            calc.Add(20);
            calc.Mul(2);
            Assert.Collection(
                calc.OperationsMap["add"],
                val => { },
                val => Assert.Equal(30d, val.Value)
            );
            Assert.Collection(
                calc.OperationsMap["mul"],
                val => { }
            );
        }

        [Fact(DisplayName = Prefix + nameof(FluentApi))]
        public void FluentApi()
        {
            Calculator calc = new Calculator(new CalculatorProps
            {
                InitialValue = 20,
                MaximumValue = 30,
            });
            calc.Add(3);
            Assert.Equal(23, calc.Value);
        }

        [Fact(DisplayName = Prefix + nameof(Exceptions))]
        public void Exceptions()
        {
            var calc = new Calculator(new CalculatorProps
            {
                InitialValue = 20,
                MaximumValue = 30,
            });

            calc.Add(3);
            Assert.Equal(23d, calc.Value);

            Assert.Throws<JsiiError>(() => calc.Add(10));

            calc.MaxValue = 40;
            calc.Add(10);
            Assert.Equal(33d, calc.Value);
        }

        [Fact(DisplayName = Prefix + nameof(UnionProperties))]
        public void UnionProperties()
        {
            var calc = new Calculator();

            calc.UnionProperty = new Multiply(new Number(9), new Number(3));
            Assert.IsType<Multiply>(calc.UnionProperty);
            Assert.Equal(9d * 3, calc.ReadUnionValue());

            calc.UnionProperty = new Power(new Number(10), new Number(3));
            Assert.IsType<Power>(calc.UnionProperty);
        }

        [Fact(DisplayName = Prefix + nameof(SubClassing))]
        public void SubClassing()
        {
            var calc = new Calculator();

            calc.Curr = new AddTen(33);
            calc.Neg();
            Assert.Equal(-43d, calc.Value);
        }

        [Fact(DisplayName = Prefix + nameof(TestJsObjectLiteralToNative))]
        public void TestJsObjectLiteralToNative()
        {
            var obj = new JSObjectLiteralToNative();
            var obj2 = obj.ReturnLiteral();

            Assert.Equal("Hello", obj2.PropA);
            Assert.Equal(102d, obj2.PropB);
        }

        [Fact(DisplayName = Prefix + nameof(CreationOfNativeObjectsFromJavaScriptObjects))]
        public void CreationOfNativeObjectsFromJavaScriptObjects()
        {
            var types = new AllTypes();

            var jsObj = new Number(44);
            types.AnyProperty = jsObj;
            var unmarshalledJSObj = types.AnyProperty;
            Assert.IsType<Number>(unmarshalledJSObj);

            var nativeObj = new AddTen(10);
            types.AnyProperty = nativeObj;

            var result1 = types.AnyProperty;
            Assert.Same(nativeObj, result1);

            var nativeObj2 = new MulTen(20);
            types.AnyProperty = nativeObj2;
            var unmarshalledNativeObj = types.AnyProperty;
            Assert.IsType<MulTen>(unmarshalledNativeObj);
            Assert.Same(nativeObj2, unmarshalledNativeObj);
        }

        class AsyncVirtualMethodsChild : AsyncVirtualMethods
        {
            public override double OverrideMe(double mult)
            {
                throw new RuntimeException("Thrown by native code");
            }
        }

        [Fact(DisplayName = Prefix + nameof(AsyncOverrides_CallAsyncMethod))]
        public void AsyncOverrides_CallAsyncMethod()
        {
            AsyncVirtualMethods obj = new AsyncVirtualMethods();
            Assert.Equal(128d, obj.CallMe());
            Assert.Equal(528d, obj.OverrideMe(44));
        }

        [Fact(DisplayName = Prefix + nameof(AsyncOverrides_OverrideAsyncMethod))]
        public void AsyncOverrides_OverrideAsyncMethod()
        {
            OverrideAsyncMethods obj = new OverrideAsyncMethods();
            Assert.Equal(4452d, obj.CallMe());
        }

        [Fact(DisplayName = Prefix + nameof(AsyncOverrides_OverrideAsyncMethodByParentClass))]
        public void AsyncOverrides_OverrideAsyncMethodByParentClass()
        {
            OverrideAsyncMethodsByBaseClass obj = new OverrideAsyncMethodsByBaseClass();
            Assert.Equal(4452d, obj.CallMe());
        }

        [Fact(DisplayName = Prefix + nameof(AsyncOverrides_OverrideCallsSuper))]
        public void AsyncOverrides_OverrideCallsSuper()
        {
            OverrideCallsSuper obj = new OverrideCallsSuper();
            Assert.Equal(1441d, obj.OverrideMe(12));
            Assert.Equal(1209d, obj.CallMe());
        }

        [Fact(DisplayName = Prefix + nameof(AsyncOverrides_TwoOverrides))]
        public void AsyncOverrides_TwoOverrides()
        {
            TwoOverrides obj = new TwoOverrides();
            Assert.Equal(684d, obj.CallMe());
        }

        [Fact(DisplayName = Prefix + nameof(AsyncOverrides_OverrideThrows))]
        public void AsyncOverrides_OverrideThrows()
        {
            AsyncVirtualMethodsChild obj = new AsyncVirtualMethodsChild();

            JsiiError exception = Assert.Throws<JsiiError>(() => obj.CallMe());
            Assert.Contains("Thrown by native code", exception.Message);
        }

        class SyncVirtualMethodsChild_Set_CallsSuper : SyncVirtualMethods
        {
            public override string TheProperty
            {
                get => base.TheProperty;
                set => base.TheProperty = $"{value}:by override";
            }
        }

        class SyncVirtualMethodsChild_Get_CallsSuper : SyncVirtualMethods
        {
            public override string TheProperty
            {
                get => $"super:{base.TheProperty}";
                set => base.TheProperty = value;
            }
        }

        class SyncVirtualMethodsChild_Throws : SyncVirtualMethods
        {
            public override string TheProperty
            {
                get => throw new RuntimeException("Oh no, this is bad");
                set => throw new RuntimeException("Exception from overloaded setter");
            }
        }

        class InterfaceWithProperties : DeputyBase, IInterfaceWithProperties
        {
            string? _x;

            public string ReadOnlyString => "READ_ONLY_STRING";

            public string ReadWriteString
            {
                get => $"{_x}?";
                set => _x = $"{value}!";
            }
        }

        [Fact(DisplayName = Prefix + nameof(PropertyOverrides_Get_Set))]
        public void PropertyOverrides_Get_Set()
        {
            SyncOverrides so = new SyncOverrides();
            Assert.Equal("I am an override!", so.RetrieveValueOfTheProperty());
            so.ModifyValueOfTheProperty("New Value");
            Assert.Equal("New Value", so.AnotherTheProperty);
        }

        [Fact(DisplayName = Prefix + nameof(PropertyOverrides_Get_CallsSuper))]
        public void PropertyOverrides_Get_CallsSuper()
        {
            SyncVirtualMethodsChild_Get_CallsSuper so = new SyncVirtualMethodsChild_Get_CallsSuper();

            Assert.Equal("super:initial value", so.RetrieveValueOfTheProperty());
            Assert.Equal("super:initial value", so.TheProperty);
        }

        [Fact(DisplayName = Prefix + nameof(PropertyOverrides_Get_Throws))]
        public void PropertyOverrides_Get_Throws()
        {
            SyncVirtualMethodsChild_Throws so = new SyncVirtualMethodsChild_Throws();

            JsiiError exception = Assert.Throws<JsiiError>(() => so.RetrieveValueOfTheProperty());
            Assert.Contains("Oh no, this is bad", exception.Message);
        }

        [Fact(DisplayName = Prefix + nameof(PropertyOverrides_Set_CallsSuper))]
        public void PropertyOverrides_Set_CallsSuper()
        {
            SyncVirtualMethodsChild_Set_CallsSuper so = new SyncVirtualMethodsChild_Set_CallsSuper();

            so.ModifyValueOfTheProperty("New Value");
            Assert.Equal("New Value:by override", so.TheProperty);
        }

        [Fact(DisplayName = Prefix + nameof(PropertyOverrides_Set_Throws))]
        public void PropertyOverrides_Set_Throws()
        {
            SyncVirtualMethodsChild_Throws so = new SyncVirtualMethodsChild_Throws();

            JsiiError exception = Assert.Throws<JsiiError>(() => so.ModifyValueOfTheProperty("Hii"));
            Assert.Contains("Exception from overloaded setter", exception.Message);
        }

        [Fact(DisplayName = Prefix + nameof(PropertyOverrides_Interfaces))]
        public void PropertyOverrides_Interfaces()
        {
            InterfaceWithProperties obj = new InterfaceWithProperties();
            UsesInterfaceWithProperties interact = new UsesInterfaceWithProperties(obj);

            Assert.Equal("READ_ONLY_STRING", interact.JustRead());
            Assert.Equal("Hello!?", interact.WriteAndRead("Hello"));
        }

        [Fact(DisplayName = Prefix + nameof(SyncOverrides_SyncOverrides))]
        public void SyncOverrides_SyncOverrides()
        {
            SyncOverrides obj = new SyncOverrides();
            Assert.Equal(10d * 5, obj.CallerIsMethod());

            // affect the result
            obj.Multiplier = 5;
            Assert.Equal(10d * 5 * 5, obj.CallerIsMethod());

            // verify callbacks are invoked from a property
            Assert.Equal(10d * 5 * 5, obj.CallerIsProperty);

            // and from an async method
            obj.Multiplier = 3;
            Assert.Equal(10d * 5 * 3, obj.CallerIsAsync());
        }

        [Fact(DisplayName = Prefix + nameof(SyncOverrides_CallsSuper))]
        public void SyncOverrides_CallsSuper()
        {
            SyncOverrides obj = new SyncOverrides();
            Assert.Equal(10d * 5, obj.CallerIsProperty);

            obj.ReturnSuper = true; // js code returns n * 2
            Assert.Equal(10d * 2, obj.CallerIsProperty);
        }

        [Fact(DisplayName = Prefix + nameof(SyncOverrides_CallsDoubleAsyncMethodFails))]
        public void SyncOverrides_CallsDoubleAsyncMethodFails()
        {
            SyncOverrides obj = new SyncOverrides();
            obj.CallAsync = true;

            Assert.Throws<JsiiError>(() => obj.CallerIsMethod());
        }

        [Fact(DisplayName = Prefix + nameof(SyncOverrides_CallsDoubleAsyncPropertyGetterFails))]
        public void SyncOverrides_CallsDoubleAsyncPropertyGetterFails()
        {
            SyncOverrides obj = new SyncOverrides();
            obj.CallAsync = true;

            Assert.Throws<JsiiError>(() => obj.CallerIsProperty);
        }

        [Fact(DisplayName = Prefix + nameof(SyncOverrides_CallsDoubleAsyncPropertySetterFails))]
        public void SyncOverrides_CallsDoubleAsyncPropertySetterFails()
        {
            SyncOverrides obj = new SyncOverrides();
            obj.CallAsync = true;

            Assert.Throws<JsiiError>(() => obj.CallerIsProperty = 12);
        }

        [Fact(DisplayName = Prefix + nameof(TestInterfaces))]
        public void TestInterfaces()
        {
            IFriendly friendly;
            IFriendlier friendlier;
            IRandomNumberGenerator randomNumberGenerator;
            IFriendlyRandomGenerator friendlyRandomGenerator;

            Add add = new Add(new Number(10), new Number(20));
            friendly = add;
            // friendlier = add // <-- shouldn't compile since Add implements IFriendly
            Assert.Equal("Hello, I am a binary operation. What's your name?", friendly.Hello());

            Multiply multiply = new Multiply(new Number(10), new Number(30));
            friendly = multiply;
            friendlier = multiply;
            randomNumberGenerator = multiply;
            // friendlyRandomGenerator = multiply; // <-- shouldn't compile
            Assert.Equal("Hello, I am a binary operation. What's your name?", friendly.Hello());
            Assert.Equal("Goodbye from Multiply!", friendlier.Goodbye());
            Assert.Equal(89d, randomNumberGenerator.Next());

            friendlyRandomGenerator = new DoubleTrouble();
            Assert.Equal("world", friendlyRandomGenerator.Hello());
            Assert.Equal(12d, friendlyRandomGenerator.Next());

            Polymorphism poly = new Polymorphism();
            Assert.Equal("oh, Hello, I am a binary operation. What's your name?", poly.SayHello(friendly));
            Assert.Equal("oh, world", poly.SayHello(friendlyRandomGenerator));
            Assert.Equal("oh, SubclassNativeFriendlyRandom", poly.SayHello(new SubclassNativeFriendlyRandom()));
            Assert.Equal("oh, I am a native!", poly.SayHello(new PureNativeFriendlyRandom()));
        }

        /**
         * This test verifies that native objects passed to jsii code as interfaces will remain "stable"
         * across invocation. For native objects that derive from JsiiObject, that's natural, because the objref
         * is stored at the JsiiObject level. But for "pure" native objects, which are not part of the JsiiObject
         * hierarchy, there's some magic going on: when the pure object is first passed to jsii, an empty javascript
         * object is created for it (extends Object.prototype) and any native method overrides are assigned (like any
         * other jsii object). The resulting objref is stored at the engine level (in "objects").
         *
         * We verify two directions:
         * 1. objref => obj: when .getGenerator() is called, we get back an objref and we assert that it is the *same*
         *    as the one we originally passed.
         * 2. obj => objref: when we call .isSameGenerator(x) we pass the pure native object back to jsii and we expect
         *    that a new object is not created again.
         */
        [Fact(DisplayName = Prefix + nameof(TestNativeObjectsWithInterfaces))]
        public void TestNativeObjectsWithInterfaces()
        {
            // create a pure and native object, not part of the jsii hierarchy, only implements a jsii interface
            PureNativeFriendlyRandom pureNative = new PureNativeFriendlyRandom();
            SubclassNativeFriendlyRandom subclassedNative = new SubclassNativeFriendlyRandom();

            NumberGenerator generatorBoundToPSubclassedObject = new NumberGenerator(subclassedNative);
            Assert.Same(subclassedNative, generatorBoundToPSubclassedObject.Generator);
            generatorBoundToPSubclassedObject.IsSameGenerator(subclassedNative);
            Assert.Equal(10000d, generatorBoundToPSubclassedObject.NextTimes100());

            // when we invoke nextTimes100 again, it will use the objref and call into the same object.
            Assert.Equal(20000d, generatorBoundToPSubclassedObject.NextTimes100());

            NumberGenerator generatorBoundToPureNative = new NumberGenerator(pureNative);
            Assert.Same(pureNative, generatorBoundToPureNative.Generator);
            generatorBoundToPureNative.IsSameGenerator(pureNative);
            Assert.Equal(100000d, generatorBoundToPureNative.NextTimes100());
            Assert.Equal(200000d, generatorBoundToPureNative.NextTimes100());
        }

        [Fact(DisplayName = Prefix + nameof(TestLiteralInterface))]
        public void TestLiteralInterface()
        {
            JSObjectLiteralForInterface obj = new JSObjectLiteralForInterface();
            IFriendly friendly = obj.GiveMeFriendly();
            Assert.Equal("I am literally friendly!", friendly.Hello());

            IFriendlyRandomGenerator gen = obj.GiveMeFriendlyGenerator();
            Assert.Equal("giveMeFriendlyGenerator", gen.Hello());
            Assert.Equal(42d, gen.Next());
        }

        [Fact(DisplayName = Prefix + nameof(TestInterfaceParameter))]
        public void TestInterfaceParameter()
        {
            var obj = new JSObjectLiteralForInterface();
            var friendly = obj.GiveMeFriendly();
            Assert.Equal("I am literally friendly!", friendly.Hello());

            var greetingAugmenter = new GreetingAugmenter();
            var betterGreeting = greetingAugmenter.BetterGreeting(friendly);
            Assert.Equal("I am literally friendly! Let me buy you a drink!", betterGreeting);
        }

        [Fact(DisplayName = Prefix + nameof(Structs_SerializeToJsii))]
        public void Structs_SerializeToJsii()
        {
            MyFirstStruct firstStruct = new MyFirstStruct
            {
                Astring = "FirstString",
                Anumber = 999,
                FirstOptional = new[] {"First", "Optional"}
            };

            DoubleTrouble doubleTrouble = new DoubleTrouble();

            DerivedStruct derivedStruct = new DerivedStruct
            {
                NonPrimitive = doubleTrouble,
                Bool = false,
                AnotherRequired = DateTime.Now,
                Astring = "String",
                Anumber = 1234,
                FirstOptional = new[] {"one", "two"}
            };

            GiveMeStructs gms = new GiveMeStructs();
            Assert.Equal(999, gms.ReadFirstNumber(firstStruct));
            Assert.Equal(1234, gms.ReadFirstNumber(derivedStruct)); // since derived inherits from first
            Assert.Same(doubleTrouble, gms.ReadDerivedNonPrimitive(derivedStruct));

            IStructWithOnlyOptionals literal = gms.StructLiteral;
            Assert.Equal("optional1FromStructLiteral", literal.Optional1);
            Assert.False(literal.Optional3);
            Assert.Null(literal.Optional2);
        }

        [Fact(DisplayName = Prefix + nameof(StaticsTest))]
        public void StaticsTest()
        {
            Assert.Equal("hello ,Yoyo!", Statics.StaticMethod("Yoyo"));
            Assert.Equal("default", Statics.Instance.Value);

            Statics newStatics = new Statics("new value");
            Statics.Instance = newStatics;
            Assert.Same(Statics.Instance, newStatics);
            Assert.Equal("new value", Statics.Instance.Value);

            Assert.Equal(100, Statics.NonConstStatic);
        }

        [Fact(DisplayName = Prefix + nameof(Consts))]
        public void Consts()
        {
            Assert.Equal("hello", Statics.Foo);
            DoubleTrouble obj = Statics.ConstObj;
            Assert.Equal("world", obj.Hello());
            Assert.Equal(1234, Statics.BAR);
            Assert.Equal("world", Statics.ZooBar["hello"]);
        }

        [Fact(DisplayName = Prefix + nameof(ReservedKeywordsAreSlugifiedInMethodNames), Skip = "TODO")]
        public void ReservedKeywordsAreSlugifiedInMethodNames()
        {
            throw new NotImplementedException();
        }

        [Fact(DisplayName = Prefix + nameof(NodeStandardLibrary))]
        public void NodeStandardLibrary()
        {
            NodeStandardLibrary obj = new NodeStandardLibrary();
            Assert.Equal("Hello, resource!", obj.FsReadFile());
            Assert.Equal("Hello, resource! SYNC!", obj.FsReadFileSync());
            Assert.True(obj.OsPlatform.Length > 0);
            Assert.Equal("6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50",
                obj.CryptoSha256());
        }

        [Fact(DisplayName = Prefix + nameof(ReturnAbstract))]
        public void ReturnAbstract()
        {
            var obj = new AbstractClassReturner();
            var obj2 = obj.GiveMeAbstract();

            Assert.Equal("Hello, John!!", obj2.AbstractMethod("John"));
            Assert.Equal("propFromInterfaceValue", obj2.PropFromInterface);
            Assert.Equal(42, obj2.NonAbstractMethod());

            var iface = obj.GiveMeInterface();
            Assert.Equal("propFromInterfaceValue", iface.PropFromInterface);

            Assert.Equal("hello-abstract-property", obj.ReturnAbstractFromProperty.AbstractProperty);
        }

        [Fact(DisplayName = Prefix + nameof(TestClassWithPrivateConstructorAndAutomaticProperties))]
        public void TestClassWithPrivateConstructorAndAutomaticProperties()
        {
            var obj = ClassWithPrivateConstructorAndAutomaticProperties.Create("Hello", "Bye");
            Assert.Equal("Bye", obj.ReadWriteString);
            obj.ReadWriteString = "Hello";

            Assert.Equal("Hello", obj.ReadOnlyString);
        }

        [Fact(DisplayName = Prefix + nameof(TestReturnInterfaceFromOverride))]
        public void TestReturnInterfaceFromOverride()
        {
            var n = 1337;
            var obj = new OverrideReturnsObject();
            var arg = new NumberReturner(n);
            Assert.Equal(4 * n, obj.Test(arg));
        }

        [Fact(DisplayName = Prefix + nameof(NullShouldBeTreatedAsUndefined))]
        public void NullShouldBeTreatedAsUndefined()
        {
            // ctor
            var obj = new NullShouldBeTreatedAsUndefined("param1");

            // method argument
            obj.GiveMeUndefined();

            // inside object
            obj.GiveMeUndefinedInsideAnObject(new NullShouldBeTreatedAsUndefinedData
            {
                ThisShouldBeUndefined = null,
#pragma warning disable CS8625
                ArrayWithThreeElementsAndUndefinedAsSecondArgument = new object[] {"hello", null, "world"}
#pragma warning restore CS8625
            });

            // property
            obj.ChangeMeToUndefined = null;
            obj.VerifyPropertyIsUndefined();
        }

        [Fact(DisplayName = Prefix + nameof(OptionalAndVariadicArgumentsTest))]
        public void OptionalAndVariadicArgumentsTest()
        {
            // ctor
            new NullShouldBeTreatedAsUndefined("param1", null);
            var objWithoutOptionalProvided = new NullShouldBeTreatedAsUndefined("param1");

            // method argument called with null value
            objWithoutOptionalProvided.GiveMeUndefined(null);

            // method argument called without null value
            objWithoutOptionalProvided.GiveMeUndefined();

            // Array with no value in constructor params
            var variadicClassNoParams = new VariadicMethod();

            // Array with null value in constructor params
#pragma warning disable CS8625
            new VariadicMethod(null);
#pragma warning restore CS8625

            // Array with one value in constructor params
            new VariadicMethod(1);

            // Array with multiple values in constructor params
            new VariadicMethod(1, 2, 3, 4);

            // Variadic parameter with null passed
#pragma warning disable CS8625
            variadicClassNoParams.AsArray(double.MinValue, null);
#pragma warning restore CS8625

            // Variadic parameter with default value used
            variadicClassNoParams.AsArray(double.MinValue);

            var list = new List<double>();

            // Variadic parameter with array with no value
            variadicClassNoParams.AsArray(double.MinValue, list.ToArray());

            // Variadic parameter with array with one value
            list.Add(1d);
            variadicClassNoParams.AsArray(double.MinValue, list.ToArray());

            // Variadic parameter with array with multiple value
            list.Add(2d);
            list.Add(3d);
            list.Add(4d);
            list.Add(5d);
            list.Add(6d);

            variadicClassNoParams.AsArray(double.MinValue, list.ToArray());
        }

        [Fact(DisplayName = Prefix + nameof(JsiiAgentIsCorrect))]
        public void JsiiAgentIsCorrect()
        {
            Assert.Equal("DotNet/" + Environment.Version + "/.NETCoreApp,Version=v3.1/1.0.0.0", JsiiAgent.Value);
        }

        [Fact(DisplayName = Prefix + nameof(ReceiveInstanceOfPrivateClass))]
        public void ReceiveInstanceOfPrivateClass()
        {
            Assert.True(new ReturnsPrivateImplementationOfInterface().PrivateImplementation.Success);
        }

        [Fact(DisplayName = Prefix + nameof(ObjRefsAreLabelledUsingWithTheMostCorrectType))]
        public void ObjRefsAreLabelledUsingWithTheMostCorrectType()
        {
            var classRef = Constructors.MakeClass();
            var ifaceRef = Constructors.MakeInterface();

            Assert.Equal(typeof(InbetweenClass), classRef.GetType());
            Assert.NotEqual(typeof(InbetweenClass), ifaceRef.GetType());
        }

        [Fact(DisplayName = Prefix + nameof(EraseUnsetDataValues))]
        public void EraseUnsetDataValues()
        {
            var opts = new EraseUndefinedHashValuesOptions {
                Option1 = "option1"
            };

            Assert.True(EraseUndefinedHashValues.DoesKeyExist(opts, "option1"));
            Assert.False(EraseUndefinedHashValues.DoesKeyExist(opts, "option2"));

            Assert.Equal(new Dictionary<string, object> { ["prop2"] = "value2" }, EraseUndefinedHashValues.Prop1IsNull());
            Assert.Equal(new Dictionary<string, object> { [ "prop1"] = "value1" }, EraseUndefinedHashValues.Prop2IsUndefined());
        }

        [Fact(DisplayName = Prefix + nameof(ObjectIdDoesNotGetReallocatedWhenTheConstructorPassesThisOut))]
        public void ObjectIdDoesNotGetReallocatedWhenTheConstructorPassesThisOut()
        {
            var reflector = new PartiallyInitializedThisConsumerImpl();
            var obj = new ConstructorPassesThisOut(reflector);

            Assert.NotNull(obj);
        }

        [Fact(DisplayName = Prefix + nameof(CorrectlyReturnsFromVoidCallback))]
        public void CorrectlyReturnsFromVoidCallback()
        {
            var voidCallback = new VoidCallbackImpl();
            voidCallback.CallMe();

            Assert.True(voidCallback.MethodWasCalled);
        }

        [Fact(DisplayName = Prefix + nameof(CallbacksCorrectlyDeserializeArguments))]
        public void CallbacksCorrectlyDeserializeArguments()
        {
            var obj = new DataRendererSubclass();
            Assert.Equal("{\n  \"anumber\": 42,\n  \"astring\": \"bazinga!\"\n}", obj.Render(null));

            Assert.Equal("{\n  \"Key\": {},\n  \"Baz\": \"Zinga\"\n}", obj.RenderArbitrary(new Dictionary<string, object>()
            {
                { "Key", obj },
                { "Baz", "Zinga" }
            }));
        }

        [Fact(DisplayName = Prefix + nameof(MethodCanReturnArraysOfInterfaces))]
        public void MethodCanReturnArraysOfInterfaces()
        {
            var interfaces = InterfacesMaker.MakeInterfaces(4);
            Assert.Equal(4, interfaces.Length);
        }

        [Fact(DisplayName = Prefix + nameof(CanLeverageIndirectInterfacePolymorphism))]
        public void CanLeverageIndirectInterfacePolymorphism()
        {
            var provider = new AnonymousImplementationProvider();
            Assert.Equal(1337d, provider.ProvideAsClass().Value);
            Assert.Equal(1337d, provider.ProvideAsInterface().Value);
            Assert.Equal("to implement", provider.ProvideAsInterface().Verb());
        }

        [Fact(DisplayName = Prefix + nameof(CorrectlyDeserializesStructUnions))]
        public void CorrectlyDeserializesStructUnions()
        {
            var a0 = new StructA { RequiredString = "Present!", OptionalString = "Bazinga!" };
            var a1 = new StructA { RequiredString = "Present!", OptionalNumber = 1337 };
            var b0 = new StructB { RequiredString = "Present!", OptionalBoolean = true };
            var b1 = new StructB { RequiredString = "Present!", OptionalStructA = a1 };

            Assert.True(StructUnionConsumer.IsStructA(a0));
            Assert.True(StructUnionConsumer.IsStructA(a1));
            Assert.False(StructUnionConsumer.IsStructA(b0));
            Assert.False(StructUnionConsumer.IsStructA(b1));

            Assert.False(StructUnionConsumer.IsStructB(a0));
            Assert.False(StructUnionConsumer.IsStructB(a1));
            Assert.True(StructUnionConsumer.IsStructB(b0));
            Assert.True(StructUnionConsumer.IsStructB(b1));
        }

        [Fact(DisplayName = Prefix + nameof(VariadicCallbacksAreHandledCorrectly))]
        public void VariadicCallbacksAreHandledCorrectly()
        {
            var method = new OverrideVariadicMethod();
            var invoker = new VariadicInvoker(method);
            Assert.Equal(new double[]{2d}, invoker.AsArray(1));
            Assert.Equal(new double[]{2d, 3d}, invoker.AsArray(1, 2));
            Assert.Equal(new double[]{2d, 3d, 4d}, invoker.AsArray(1, 2, 3));
        }

        [Fact(DisplayName = Prefix + nameof(ReturnSubclassThatImplementsInterface976))]
        public void ReturnSubclassThatImplementsInterface976()
        {
            var obj = SomeTypeJsii976.ReturnReturn();
            Assert.Equal(333, obj.Foo);
        }

        private sealed class OverrideVariadicMethod : VariadicMethod
        {
            public override double[] AsArray(double first, params double[] others)
            {
#pragma warning disable CS8604
                return base.AsArray(first + 1, others?.Select(n => n + 1).ToArray());
#pragma warning restore CS8604
            }
        }

        [Fact(DisplayName = Prefix + nameof(OptionalCallbackArgumentsAreHandledCorrectly))]
        public void OptionalCallbackArgumentsAreHandledCorrectly()
        {
            var noOption = new InterfaceWithOptionalMethodArguments();
            new OptionalArgumentInvoker(noOption).InvokeWithoutOptional();
            Assert.True(noOption.Invoked);

            var option = new InterfaceWithOptionalMethodArguments(1337);
            new OptionalArgumentInvoker(option).InvokeWithOptional();
            Assert.True(option.Invoked);
        }

        private sealed class InterfaceWithOptionalMethodArguments : DeputyBase, IInterfaceWithOptionalMethodArguments
        {
            private readonly double? _optionalValue;

            public InterfaceWithOptionalMethodArguments(double? optionalValue = null)
            {
                _optionalValue = optionalValue;
            }

            public Boolean Invoked { get; private set; }

            public void Hello(string arg1, double? arg2 = null)
            {
                Invoked = true;
                Assert.Equal("Howdy", arg1);
                Assert.Equal(_optionalValue, arg2);
            }
        }

        class DataRendererSubclass : DataRenderer
        {
            public override string RenderMap(IDictionary<string, object> map)
            {
                return base.RenderMap(map);
            }
        }

        class VoidCallbackImpl : VoidCallback
        {
            protected override void OverrideMe()
            {
                // Do nothing!
            }
        }

        class PartiallyInitializedThisConsumerImpl : PartiallyInitializedThisConsumer
        {
            public override String ConsumePartiallyInitializedThis(ConstructorPassesThisOut obj, DateTime dt, AllTypesEnum ev)
            {
                Assert.NotNull(obj);
                Assert.Equal(DateTime.UnixEpoch, dt);
                Assert.Equal(AllTypesEnum.THIS_IS_GREAT, ev);

                return "OK";
            }
        }
        class NumberReturner : DeputyBase, IReturnsNumber
        {
            public NumberReturner(double number)
            {
                NumberProp = new Number(number);
            }

            public Number NumberProp { get; }

            public IDoublable ObtainNumber()
            {
                return new Doublable(this.NumberProp);
            }

            class Doublable : DeputyBase, IDoublable
            {
                public Doublable(Number number)
                {
                    this.DoubleValue = number.DoubleValue;
                }

                public Double DoubleValue { get; }
            }
        }

        class MulTen : Multiply
        {
            public MulTen(int value)
                : base(new Number(value), new Number(10))
            {
            }
        }

        class AddTen : Add
        {
            public AddTen(int value)
                : base(new Number(value), new Number(10))
            {
            }
        }

        class OverrideAsyncMethods : AsyncVirtualMethods
        {
            public override double OverrideMe(double mult)
            {
                return Foo() * 2;
            }

            public int Foo()
            {
                return 2222;
            }
        }

        class OverrideAsyncMethodsByBaseClass : OverrideAsyncMethods
        {
        }

        class OverrideCallsSuper : AsyncVirtualMethods
        {
            public override double OverrideMe(double mult)
            {
                double superRet = base.OverrideMe(mult);
                return ((int) superRet) * 10 + 1;
            }
        }

        class TwoOverrides : AsyncVirtualMethods
        {
            public override double OverrideMe(double mult)
            {
                return 666;
            }

            public override double OverrideMeToo()
            {
                return 10;
            }
        }

        class SyncOverrides : SyncVirtualMethods
        {
            public override double VirtualMethod(double n)
            {
                if (ReturnSuper)
                {
                    return base.VirtualMethod(n);
                }

                if (CallAsync)
                {
                    OverrideAsyncMethods obj = new OverrideAsyncMethods();
                    return obj.CallMe();
                }

                return 5 * ((int) n) * Multiplier;
            }

            public int Multiplier { get; set; } = 1;

            public bool ReturnSuper { get; set; }

            public bool CallAsync { get; set; }

            public override string TheProperty
            {
                get => "I am an override!";
                set => AnotherTheProperty = value;
            }

            public string? AnotherTheProperty { get; set; }
        }

        class PureNativeFriendlyRandom : DeputyBase, IFriendlyRandomGenerator
        {
            int _nextNumber = 1000;

            public double Next()
            {
                int n = _nextNumber;
                _nextNumber += 1000;
                return n;
            }

            public string Hello()
            {
                return "I am a native!";
            }
        }

        class SubclassNativeFriendlyRandom : Number, IFriendly, IRandomNumberGenerator
        {
            int _nextNumber;

            public SubclassNativeFriendlyRandom()
                : base(908)
            {
                _nextNumber = 100;
            }

            public string Hello()
            {
                return "SubclassNativeFriendlyRandom";
            }

            public double Next()
            {
                int next = _nextNumber;
                _nextNumber += 100;
                return next;
            }
        }

        [Fact(DisplayName = Prefix + nameof(StructsCanBeDowncastedToParentType))]
        public void StructsCanBeDowncastedToParentType()
        {
            Assert.NotNull(Demonstrate982.TakeThis());
            Assert.NotNull(Demonstrate982.TakeThisToo());
        }

        [Fact(DisplayName = Prefix + nameof(NullIsAValidOptionalList))]
        public void NullIsAValidOptionalList()
        {
            Assert.Null(DisappointingCollectionSource.MaybeList);
        }

        [Fact(DisplayName = Prefix + nameof(NullIsAValidOptionalMap))]
        public void NullIsAValidOptionalMap()
        {
            Assert.Null(DisappointingCollectionSource.MaybeMap);
        }

        [Fact(DisplayName = Prefix + nameof(CanUseInterfaceSetters))]
        public void CanUseInterfaceSetters()
        {
            var obj = ObjectWithPropertyProvider.Provide();
            obj.Property = "New Value";
            Assert.True(obj.WasSet());
        }

        [Fact(DisplayName = Prefix + nameof(StructsAreUndecoratedOntheWayToKernel))]
        public void StructsAreUndecoratedOntheWayToKernel()
        {
            var json = JsonFormatter.Stringify(new StructB {RequiredString = "Bazinga!", OptionalBoolean = false})!;
            var actual = JObject.Parse(json);

            var expected = new JObject();
            expected.Add("RequiredString", "Bazinga!");
            expected.Add("OptionalBoolean", false);

            Assert.Equal(expected, actual);
        }

        [Fact(DisplayName = Prefix + nameof(CanObtainReferenceWithOverloadedSetters))]
        public void CanObtainReferenceWithOverloadedSetters()
        {
            Assert.NotNull(ConfusingToJackson.MakeInstance());
        }

        [Fact(DisplayName = Prefix + nameof(CanObtainStructReferenceWithOverloadedSetters))]
        public void CanObtainStructReferenceWithOverloadedSetters()
        {
            Assert.NotNull(ConfusingToJackson.MakeStructInstance());
        }

        [Fact(DisplayName = Prefix + nameof(PureInterfacesCanBeUsedTransparently))]
        public void PureInterfacesCanBeUsedTransparently()
        {
            var expected = new StructB { RequiredString = "It's Britney b**ch!" };
            var del = new StructReturningDelegate(expected);
            var consumer = new ConsumePureInterface(del);
            Assert.Equal(expected.RequiredString, consumer.WorkItBaby().RequiredString);
        }

        private sealed class StructReturningDelegate: DeputyBase, IStructReturningDelegate
        {
            internal StructReturningDelegate(StructB expected)
            {
                Expected = expected;
            }

            private IStructB Expected { get; }

            public IStructB ReturnStruct()
            {
                return Expected;
            }
        }

        [Fact(DisplayName = Prefix + nameof(PureInterfacesCanBeUsedTransparently_WhenTransitivelyImplemented))]
        public void PureInterfacesCanBeUsedTransparently_WhenTransitivelyImplemented()
        {
            var expected = new StructB { RequiredString = "It's Britney b**ch!" };
            var del = new IndirectlyImplementsStructReturningDelegate(expected);
            var consumer = new ConsumePureInterface(del);
            Assert.Equal(expected.RequiredString, consumer.WorkItBaby().RequiredString);
        }

        private sealed class IndirectlyImplementsStructReturningDelegate : ImplementsStructReturningDelegate
        {
            internal IndirectlyImplementsStructReturningDelegate(StructB @struct) : base(@struct) {}
        }

        private class ImplementsStructReturningDelegate : DeputyBase, IStructReturningDelegate
        {
            private StructB Struct;

            protected ImplementsStructReturningDelegate(StructB @struct)
            {
                this.Struct = @struct;
            }

            public IStructB ReturnStruct()
            {
                return Struct;
            }
        }

        [Fact(DisplayName = Prefix + nameof(PureInterfacesCanBeUsedTransparently_WhenAddedToJsiiType))]
        public void PureInterfacesCanBeUsedTransparently_WhenAddedToJsiiType()
        {
            var expected = new StructB { RequiredString = "It's Britney b**ch!" };
            var del = new ImplementsAdditionalInterface(expected);
            var consumer = new ConsumePureInterface(del);
            Assert.Equal(expected.RequiredString, consumer.WorkItBaby().RequiredString);
        }

        private sealed class ImplementsAdditionalInterface : AllTypes, IStructReturningDelegate
        {
            private StructB Struct;

            internal ImplementsAdditionalInterface(StructB @struct)
            {
                this.Struct = @struct;
            }

            public IStructB ReturnStruct()
            {
                return Struct;
            }
        }

        [Fact(DisplayName = Prefix + nameof(LiftedKwargWithSameNameAsPositionalArg))]
        public void LiftedKwargWithSameNameAsPositionalArg()
        {
            // This is a replication of a test that mostly affects languages with keyword arguments (e.g: Python, Ruby, ...)
            var bell = new Bell();
            var amb = new AmbiguousParameters(bell, new StructParameterType { Scope = "Driiiing!" });

            Assert.Equal(bell, amb.Scope);
            Assert.Equal("Driiiing!", amb.Props.Scope);
        }

        [Fact(DisplayName = Prefix + nameof(AbstractMembersAreCorrectlyHandled))]
        public void AbstractMembersAreCorrectlyHandled()
        {
            var abstractSuite = new AbstractSuiteImpl();
            Assert.Equal("Wrapped<String<Oomf!>>", abstractSuite.WorkItAll("Oomf!"));
        }

        private sealed class AbstractSuiteImpl : AbstractSuite
        {
            private string _property = "";

            public AbstractSuiteImpl() {}

            protected override string SomeMethod(string str)
            {
                return $"Wrapped<{str}>";
            }

            protected override string Property
            {
                get => _property;
                set => _property = $"String<{value}>";
            }
        }

        [Fact(DisplayName = Prefix + nameof(CollectionOfInterfaces_ListOfStructs))]
        public void CollectionOfInterfaces_ListOfStructs()
        {
            foreach (var elt in InterfaceCollections.ListOfStructs())
            {
                Assert.IsAssignableFrom<IStructA>(elt);
            }
        }

        [Fact(DisplayName = Prefix + nameof(CollectionOfInterfaces_ListOfInterfaces))]
        public void CollectionOfInterfaces_ListOfInterfaces()
        {
            foreach (var elt in InterfaceCollections.ListOfInterfaces())
            {
                Assert.IsAssignableFrom<IBell>(elt);
            }
        }

        [Fact(DisplayName = Prefix + nameof(CollectionOfInterfaces_MapOfStructs))]
        public void CollectionOfInterfaces_MapOfStructs()
        {
            foreach (var elt in InterfaceCollections.MapOfStructs().Values)
            {
                Assert.IsAssignableFrom<IStructA>(elt);
            }
        }

        [Fact(DisplayName = Prefix + nameof(CollectionOfInterfaces_MapOfInterfaces))]
        public void CollectionOfInterfaces_MapOfInterfaces()
        {
            foreach (var elt in InterfaceCollections.MapOfInterfaces().Values)
            {
                Assert.IsAssignableFrom<IBell>(elt);
            }
        }

        [Fact(DisplayName = Prefix + nameof(BurriedAnonymousObject))]
        public void BurriedAnonymousObject()
        {
            var subject = new BurriedAnonymousObjectImpl();
            Assert.True(subject.Check());
        }

        private sealed class BurriedAnonymousObjectImpl : BurriedAnonymousObject
        {
            public override object GiveItBack(object value) {
                return value;
            }
        }

        [Fact(DisplayName = Prefix + nameof(Iso8601DoesNotDeserializeToDate))]
        public void Iso8601DoesNotDeserializeToDate()
        {
            var now = $"{DateTime.UtcNow.ToString("s")}Z";
            var wallClock = new WallClock(now);
            var entropy = new MildEntropy(wallClock);

            Assert.Equal(now, entropy.Increase());
        }

        private sealed class WallClock: DeputyBase, IWallClock
        {
            private String _frozenTime;

            public WallClock(String frozenTime)
            {
                _frozenTime = frozenTime;
            }

            public String Iso8601Now()
            {
                return _frozenTime;
            }
        }

        private sealed class MildEntropy: Entropy
        {
            public MildEntropy(IWallClock clock): base(clock)
            {
            }
            public override String Repeat(String word)
            {
                return word;
            }
        }

        [Fact(DisplayName = Prefix + nameof(ArrayOfInterfaces))]
        public void ArrayOfInterfaces()
        {
            var bells = new IBell[1][];
            bells[0] = new IBell[1];
            bells[0][0] = new Bell();

            var allTypes = new AllTypes();
            allTypes.AnyProperty = bells;

            Assert.Equal(bells, allTypes.AnyProperty);
        }

        [Fact(DisplayName = Prefix + nameof(ClassCanBeUsedWhenNotExpressedlyLoaded))]
        public void ClassCanBeUsedWhenNotExpressedlyLoaded()
        {
            new Cdk16625Impl().Test();
        }

        private sealed class Cdk16625Impl: Cdk16625 {
                protected override double Unwrap(IRandomNumberGenerator rng) {
                    return rng.Next();
                }
            }
    }
}
