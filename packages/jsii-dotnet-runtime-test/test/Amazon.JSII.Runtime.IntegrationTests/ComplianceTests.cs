using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Runtime.Services;
using Amazon.JSII.Tests.CalculatorNamespace;
using Amazon.JSII.Tests.CalculatorNamespace.composition;
using Amazon.JSII.Tests.CalculatorNamespace.composition.CompositeOperation;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using Xunit;
using Xunit.Abstractions;

namespace Amazon.JSII.Runtime.IntegrationTests
{
    /// <summary>
    /// Ported from packages/jsii-java-runtime/src/test/java/org/jsii/testing/ComplianceTest.java.
    /// </summary>
    public class ComplianceTests : IntegrationTestBase
    {
        class RuntimeException : Exception
        {
            public RuntimeException(string message)
                : base(message)
            {
            }
        }

        // DateTime.UnixEpoch was added in .NET Core 2.1, but our build container only supports 2.0.
        static readonly DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        const string Prefix = nameof(IntegrationTests) + ".Compliance.";

        public ComplianceTests(ITestOutputHelper output) : base(output)
        {
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
            Assert.Equal((double)1234, types.NumberProperty);

            // date
            types.DateProperty = UnixEpoch.AddMilliseconds(123);
            Assert.Equal(UnixEpoch.AddMilliseconds(123), types.DateProperty);

            // json
            types.JsonProperty = JObject.Parse(@"{ ""Foo"": 123 }");
            Assert.Equal((double)123, types.JsonProperty["Foo"].Value<double>());
        }

        [Fact(DisplayName = Prefix + nameof(Dates))]
        public void Dates()
        {
            AllTypes types = new AllTypes();

            // strong type
            types.DateProperty = UnixEpoch.AddMilliseconds(123);
            Assert.Equal(UnixEpoch.AddMilliseconds(123), types.DateProperty);

            // weak type
            types.AnyProperty = UnixEpoch.AddSeconds(999);
            Assert.Equal(UnixEpoch.AddSeconds(999), types.AnyProperty);
        }

        [Fact(DisplayName = Prefix + nameof(CollectionTypes))]
        public void CollectionTypes()
        {
            AllTypes types = new AllTypes();

            // array
            types.ArrayProperty = new[] { "Hello", "World" };
            Assert.Equal("World", types.ArrayProperty[1]);

            // map
            IDictionary<string, double> map = new Dictionary<string, double>();
            map["Foo"] = 123;
            types.MapProperty = map;
            Assert.Equal((double)123, types.MapProperty["Foo"]);
        }

        [Fact(DisplayName = Prefix + nameof(DynamicTypes))]
        public void DynamicTypes()
        {
            AllTypes types = new AllTypes();

            // boolean
            types.AnyProperty = false;
            Assert.False((bool)types.AnyProperty);

            // string
            types.AnyProperty = "String";
            Assert.Equal("String", types.AnyProperty);

            // number
            types.AnyProperty = 12;
            Assert.Equal((double)12, types.AnyProperty);

            // date
            types.AnyProperty = UnixEpoch.AddSeconds(1234);
            Assert.Equal(UnixEpoch.AddSeconds(1234), types.AnyProperty);

            // json (notice that when deserialized, it is deserialized as a map).
            types.AnyProperty = new JObject(new JProperty("Goo",
                new JArray(
                    "Hello",
                    new JObject(new JProperty("World", 123))
                )
            ));
            var @object = (IDictionary<string, object>)types.AnyProperty;
            var array = (object[])@object["Goo"];
            var innerObject = (IDictionary<string, object>)array[1];
            Assert.Equal((double)123, innerObject["World"]);

            // array
            types.AnyProperty = new[] { "Hello", "World" };
            Assert.Equal("Hello", ((object[])types.AnyProperty)[0]);
            Assert.Equal("World", ((object[])types.AnyProperty)[1]);

            // array of any
            types.AnyArrayProperty = new object[] { "Hybrid", new Number(12), 123, false };
            Assert.Equal((double)123, types.AnyArrayProperty[2]);

            // map
            IDictionary<string, object> map = new Dictionary<string, object>();
            map["MapKey"] = "MapValue";
            types.AnyProperty = map;
            Assert.Equal("MapValue", ((IDictionary<string, object>)types.AnyProperty)["MapKey"]);

            // map of any
            map["Goo"] = 19289812;
            types.AnyMapProperty = map;
            Assert.Equal((double)19289812, types.AnyMapProperty["Goo"]);

            // classes
            Multiply mult = new Multiply(new Number(10), new Number(20));
            types.AnyProperty = mult;
            Assert.Same(types.AnyProperty, mult);
            Assert.IsType<Multiply>(types.AnyProperty);
            Assert.Equal((double)200, ((Multiply)types.AnyProperty).Value);
        }

        [Fact(DisplayName = Prefix + nameof(UnionTypes))]
        public void UnionTypes()
        {
            AllTypes types = new AllTypes();

            // single valued property
            types.UnionProperty = 1234;
            Assert.Equal((double)1234, types.UnionProperty);

            types.UnionProperty = "Hello";
            Assert.Equal("Hello", types.UnionProperty);

            types.UnionProperty = new Multiply(new Number(2), new Number(12));
            Assert.Equal((double)24, ((Multiply)types.UnionProperty).Value);

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
            // TODO: Generator should create a parameterless constructor.
            new Calculator(new CalculatorProps());

            new Calculator(new CalculatorProps
            {
                MaximumValue = 10
            });
        }

        [Fact(DisplayName = Prefix + nameof(GetSetPrimitiveProperties))]
        public void GetSetPrimitiveProperties()
        {
            Number number = new Number(20);
            Assert.Equal((double)20, number.Value);
            Assert.Equal((double)40, number.DoubleValue);
            Assert.Equal((double)-30, new Negate(new Add(new Number(20), new Number(10))).Value);
            Assert.Equal((double)20, new Multiply(new Add(new Number(5), new Number(5)), new Number(2)).Value);
            Assert.Equal((double)3 * 3 * 3 * 3, new Power(new Number(3), new Number(4)).Value);
            Assert.Equal((double)999, new Power(new Number(999), new Number(1)).Value);
            Assert.Equal((double)1, new Power(new Number(999), new Number(0)).Value);
        }

        [Fact(DisplayName = Prefix + nameof(CallMethods))]
        public void CallMethods()
        {
            // TODO: Generator should create a parameterless constructor.
            Calculator calc = new Calculator(new CalculatorProps());

            calc.Add(10);
            Assert.Equal((double)10, calc.Value);

            calc.Mul(2);
            Assert.Equal((double)20, calc.Value);

            calc.Pow(5);
            Assert.Equal((double)20 * 20 * 20 * 20 * 20, calc.Value);

            calc.Neg();
            Assert.Equal((double)-3200000, calc.Value);
        }

        [Fact(DisplayName = Prefix + nameof(UnmarkshallIntoAbstractType))]
        public void UnmarkshallIntoAbstractType()
        {
            // TODO: Generator should create a parameterless constructor.
            Calculator calc = new Calculator(new CalculatorProps());

            calc.Add(120);
            Value_ value = calc.Curr;
            Assert.Equal((double)120, value.Value);
        }

        [Fact(DisplayName = Prefix + nameof(GetAndSetNotPrimitiveProperties))]
        public void GetAndSetNotPrimitiveProperties()
        {
            // TODO: Generator should create a parameterless constructor.
            Calculator calc = new Calculator(new CalculatorProps());

            calc.Add(3200000);
            calc.Neg();
            calc.Curr = new Multiply(new Number(2), calc.Curr);
            Assert.Equal((double)-6400000, calc.Value);
        }

        [Fact(DisplayName = Prefix + nameof(GetAndSetEnumValues))]
        public void GetAndSetEnumValues()
        {
            // TODO: Generator should create a parameterless constructor.
            Calculator calc = new Calculator(new CalculatorProps());

            calc.Add(9);
            calc.Pow(3);
            Assert.Equal(CompositionStringStyle.Normal, calc.StringStyle);
            calc.StringStyle = CompositionStringStyle.Decorated;
            Assert.Equal(CompositionStringStyle.Decorated, calc.StringStyle);
            Assert.Equal("<<[[{{(((1 * (0 + 9)) * (0 + 9)) * (0 + 9))}}]]>>", calc.ToString());
        }

        [Fact(DisplayName = Prefix + nameof(EnumFromScopedModule))]
        public void UseEnumFromScopedModule()
        {
            ReferenceEnumFromScopedPackage obj = new ReferenceEnumFromScopedPackage();
            Assert.Equal(EnumFromScopedModule.Value2, obj.Foo);
            obj.Foo = EnumFromScopedModule.Value1;
            Assert.Equal(EnumFromScopedModule.Value1, obj.LoadFoo());
            obj.SaveFoo(EnumFromScopedModule.Value2);
            Assert.Equal(EnumFromScopedModule.Value2, obj.Foo);
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
            Sum sum = new Sum();
            sum.Parts = new Value_[] { new Number(5), new Number(10), new Multiply(new Number(2), new Number(3)) };
            Assert.Equal((double)10 + 5 + (2 * 3), sum.Value);
            Assert.Equal((double)5, sum.Parts[0].Value);
            Assert.Equal((double)6, sum.Parts[2].Value);
            Assert.Equal("(((0 + 5) + 10) + (2 * 3))", sum.ToString());
        }

        [Fact(DisplayName = Prefix + nameof(Maps))]
        public void Maps()
        {
            // TODO: Generator should create a parameterless constructor.
            Calculator calc = new Calculator(new CalculatorProps());

            calc.Add(10);
            calc.Add(20);
            calc.Mul(2);
            Assert.Collection(
                calc.OperationsMap["add"],
                val => { },
                val => Assert.Equal((double)30, val.Value)
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
            Calculator calc = new Calculator(new CalculatorProps
            {
                InitialValue = 20,
                MaximumValue = 30,
            });

            calc.Add(3);
            Assert.Equal((double)23, calc.Value);

            Assert.Throws<JsiiException>(() => calc.Add(10));

            calc.MaxValue = 40;
            calc.Add(10);
            Assert.Equal((double)33, calc.Value);
        }

        [Fact(DisplayName = Prefix + nameof(UnionProperties))]
        public void UnionProperties()
        {
            // TODO: Generator should create a parameterless constructor.
            Calculator calc = new Calculator(new CalculatorProps());

            calc.UnionProperty = new Multiply(new Number(9), new Number(3));
            Assert.IsType<Multiply>(calc.UnionProperty);
            Assert.Equal((double)9 * 3, calc.ReadUnionValue());

            calc.UnionProperty = new Power(new Number(10), new Number(3));
            Assert.IsType<Power>(calc.UnionProperty);
        }

        [Fact(DisplayName = Prefix + nameof(SubClassing))]
        public void SubClassing()
        {
            // TODO: Generator should create a parameterless constructor.
            Calculator calc = new Calculator(new CalculatorProps());

            calc.Curr = new AddTen(33);
            calc.Neg();
            Assert.Equal((double)-43, calc.Value);
        }

        [Fact(DisplayName = Prefix + nameof(TestJSObjectLiteralToNative))]
        public void TestJSObjectLiteralToNative()
        {
            JSObjectLiteralToNative obj = new JSObjectLiteralToNative();
            JSObjectLiteralToNativeClass obj2 = obj.ReturnLiteral();

            Assert.Equal("Hello", obj2.PropA);
            Assert.Equal((double)102, obj2.PropB);
        }

        [Fact(DisplayName = Prefix + nameof(TestFluentApiWithDerivedClasses), Skip = "There is no fluent API for C#")]
        public void TestFluentApiWithDerivedClasses()
        {
            throw new NotImplementedException();
        }

        [Fact(DisplayName = Prefix + nameof(CreationOfNativeObjectsFromJavaScriptObjects))]
        public void CreationOfNativeObjectsFromJavaScriptObjects()
        {
            AllTypes types = new AllTypes();

            Number jsObj = new Number(44);
            types.AnyProperty = jsObj;
            object unmarshalledJSObj = types.AnyProperty;
            Assert.IsType<Number>(unmarshalledJSObj);

            AddTen nativeObj = new AddTen(10);
            types.AnyProperty = nativeObj;

            object result1 = types.AnyProperty;
            Assert.Same(nativeObj, result1);

            MulTen nativeObj2 = new MulTen(20);
            types.AnyProperty = nativeObj2;
            object unmarshalledNativeObj = types.AnyProperty;
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
            Assert.Equal((double)128, obj.CallMe());
            Assert.Equal((double)528, obj.OverrideMe(44));
        }

        [Fact(DisplayName = Prefix + nameof(AsyncOverrides_OverrideAsyncMethod))]
        public void AsyncOverrides_OverrideAsyncMethod()
        {
            OverrideAsyncMethods obj = new OverrideAsyncMethods();
            Assert.Equal((double)4452, obj.CallMe());
        }

        [Fact(DisplayName = Prefix + nameof(AsyncOverrides_OverrideAsyncMethodByParentClass))]
        public void AsyncOverrides_OverrideAsyncMethodByParentClass()
        {
            OverrideAsyncMethodsByBaseClass obj = new OverrideAsyncMethodsByBaseClass();
            Assert.Equal((double)4452, obj.CallMe());
        }

        [Fact(DisplayName = Prefix + nameof(AsyncOverrides_OverrideCallsSuper))]
        public void AsyncOverrides_OverrideCallsSuper()
        {
            OverrideCallsSuper obj = new OverrideCallsSuper();
            Assert.Equal((double)1441, obj.OverrideMe(12));
            Assert.Equal((double)1209, obj.CallMe());
        }

        [Fact(DisplayName = Prefix + nameof(AsyncOverrides_TwoOverrides))]
        public void AsyncOverrides_TwoOverrides()
        {
            TwoOverrides obj = new TwoOverrides();
            Assert.Equal((double)684, obj.CallMe());
        }

        [Fact(DisplayName = Prefix + nameof(AsyncOverrides_OverrideThrows))]
        public void AsyncOverrides_OverrideThrows()
        {
            AsyncVirtualMethodsChild obj = new AsyncVirtualMethodsChild();

            RuntimeException exception = Assert.Throws<RuntimeException>(() => obj.CallMe());
            Assert.Equal("Thrown by native code", exception.Message);
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

        class InterfaceWithProperties : DeputyBase, IIInterfaceWithProperties
        {
            string _x;

            [JsiiProperty("readOnlyString", "{\"primitive\":\"string\"}", true)]
            public string ReadOnlyString => "READ_ONLY_STRING";

            [JsiiProperty("readWriteString", "{\"primitive\":\"string\"}", true)]
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

            RuntimeException exception = Assert.Throws<RuntimeException>(() => so.RetrieveValueOfTheProperty());
            Assert.Equal("Oh no, this is bad", exception.Message);
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

            RuntimeException exception = Assert.Throws<RuntimeException>(() => so.ModifyValueOfTheProperty("Hii"));
            Assert.Equal("Exception from overloaded setter", exception.Message);
        }

        [Fact(DisplayName = Prefix + nameof(PropertyOverrides_Interfaces))]
        public void PropertyOverrides_Interfaces()
        {
            InterfaceWithProperties obj = new InterfaceWithProperties();
            UsesInterfaceWithProperties interact = new UsesInterfaceWithProperties(obj);

            Assert.Equal("READ_ONLY_STRING", interact.JustRead());
            Assert.Equal("Hello!?", interact.WriteAndRead("Hello"));
        }

        [Fact(DisplayName = Prefix + nameof(InterfaceBuilder), Skip = "There is no fluent API for C#")]
        public void InterfaceBuilder()
        {
            throw new NotImplementedException();
        }


        [Fact(DisplayName = Prefix + nameof(SyncOverrides_SyncOverrides))]
        public void SyncOverrides_SyncOverrides()
        {
            SyncOverrides obj = new SyncOverrides();
            Assert.Equal((double)10 * 5, obj.CallerIsMethod());

            // affect the result
            obj.Multiplier = 5;
            Assert.Equal((double)10 * 5 * 5, obj.CallerIsMethod());

            // verify callbacks are invoked from a property
            Assert.Equal((double)10 * 5 * 5, obj.CallerIsProperty);

            // and from an async method
            obj.Multiplier = 3;
            Assert.Equal((double)10 * 5 * 3, obj.CallerIsAsync());
        }

        [Fact(DisplayName = Prefix + nameof(SyncOverrides_CallsSuper))]
        public void SyncOverrides_CallsSuper()
        {
            SyncOverrides obj = new SyncOverrides();
            Assert.Equal((double)10 * 5, obj.CallerIsProperty);

            obj.ReturnSuper = true; // js code returns n * 2
            Assert.Equal((double)10 * 2, obj.CallerIsProperty);
        }

        [Fact(DisplayName = Prefix + nameof(SyncOverrides_CallsDoubleAsyncMethodFails))]
        public void SyncOverrides_CallsDoubleAsyncMethodFails()
        {
            SyncOverrides obj = new SyncOverrides();
            obj.CallAsync = true;

            Assert.Throws<JsiiException>(() => obj.CallerIsMethod());
        }

        [Fact(DisplayName = Prefix + nameof(SyncOverrides_CallsDoubleAsyncPropertyGetterFails))]
        public void SyncOverrides_CallsDoubleAsyncPropertyGetterFails()
        {
            SyncOverrides obj = new SyncOverrides();
            obj.CallAsync = true;

            Assert.Throws<JsiiException>(() => obj.CallerIsProperty);
        }

        [Fact(DisplayName = Prefix + nameof(SyncOverrides_CallsDoubleAsyncPropertySetterFails))]
        public void SyncOverrides_CallsDoubleAsyncPropertySetterFails()
        {
            SyncOverrides obj = new SyncOverrides();
            obj.CallAsync = true;

            Assert.Throws<JsiiException>(() => obj.CallerIsProperty = 12);
        }

        [Fact(DisplayName = Prefix + nameof(TestInterfaces))]
        public void TestInterfaces()
        {
            IIFriendly friendly;
            IIFriendlier friendlier;
            IIRandomNumberGenerator randomNumberGenerator;
            IIFriendlyRandomGenerator friendlyRandomGenerator;

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
            Assert.Equal((double)89, randomNumberGenerator.Next());

            friendlyRandomGenerator = new DoubleTrouble();
            Assert.Equal("world", friendlyRandomGenerator.Hello());
            Assert.Equal((double)12, friendlyRandomGenerator.Next());

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
            Assert.Equal((double)10000, generatorBoundToPSubclassedObject.NextTimes100());

            // when we invoke nextTimes100 again, it will use the objref and call into the same object.
            Assert.Equal((double)20000, generatorBoundToPSubclassedObject.NextTimes100());

            NumberGenerator generatorBoundToPureNative = new NumberGenerator(pureNative);
            Assert.Same(pureNative, generatorBoundToPureNative.Generator);
            generatorBoundToPureNative.IsSameGenerator(pureNative);
            Assert.Equal((double)100000, generatorBoundToPureNative.NextTimes100());
            Assert.Equal((double)200000, generatorBoundToPureNative.NextTimes100());
        }

        [Fact(DisplayName = Prefix + nameof(TestLiteralInterface))]
        public void TestLiteralInterface()
        {
            JSObjectLiteralForInterface obj = new JSObjectLiteralForInterface();
            IIFriendly friendly = obj.GiveMeFriendly();
            Assert.Equal("I am literally friendly!", friendly.Hello());

            IIFriendlyRandomGenerator gen = obj.GiveMeFriendlyGenerator();
            Assert.Equal("giveMeFriendlyGenerator", gen.Hello());
            Assert.Equal((double)42, gen.Next());
        }

        [Fact(DisplayName = Prefix + nameof(Structs_StepBuilders), Skip = "There is no fluent API for C#")]
        public void Structs_StepBuilders()
        {
            throw new NotImplementedException();
        }

        [Fact(DisplayName = Prefix + nameof(Structs_BuildersContainNullChecks), Skip = "There is no fluent API for C#")]
        public void Structs_BuildersContainNullChecks()
        {
            throw new NotImplementedException();
        }

        [Fact(DisplayName = Prefix + nameof(Structs_SerializeToJsii))]
        public void Structs_SerializeToJsii()
        {
            MyFirstStruct firstStruct = new MyFirstStruct
            {
                Astring = "FirstString",
                Anumber = 999,
                FirstOptional = new[] { "First", "Optional" }
            };

            DoubleTrouble doubleTrouble = new DoubleTrouble();

            DerivedStruct derivedStruct = new DerivedStruct
            {
                NonPrimitive = doubleTrouble,
                Bool = false,
                AnotherRequired = DateTime.Now,
                Astring = "String",
                Anumber = 1234,
                FirstOptional = new[] { "one", "two" }
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
        public void NodeStandardLibrary() {
            NodeStandardLibrary obj = new NodeStandardLibrary();
            Assert.Equal("Hello, resource!", obj.FsReadFile());
            Assert.Equal("Hello, resource! SYNC!", obj.FsReadFileSync());
            Assert.True(obj.OsPlatform.Length > 0);
            Assert.Equal("6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50",
                obj.CryptoSha256());
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

        class DerivedFromAllTypes : AllTypes
        {
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
                return ((int)superRet) * 10 + 1;
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

                return 5 * ((int)n) * Multiplier;
            }

            public int Multiplier { get; set; } = 1;

            public bool ReturnSuper { get; set; } = false;

            public bool CallAsync { get; set; } = false;

            public override string TheProperty {
                get => "I am an override!";
                set => AnotherTheProperty = value;
            }

            public string AnotherTheProperty { get; set; }
        }

        class PureNativeFriendlyRandom : DeputyBase, IIFriendlyRandomGenerator
        {
            int _nextNumber = 1000;

            [JsiiMethod("next", "{\"primitive\":\"number\"}", "[]", true)]
            public double Next()
            {
                int n = _nextNumber;
                _nextNumber += 1000;
                return n;
            }

            [JsiiMethod("hello", "{\"primitive\":\"string\"}", "[]", true)]
            public string Hello()
            {
                return "I am a native!";
            }
        }

        class SubclassNativeFriendlyRandom : Number, IIFriendly, IIRandomNumberGenerator
        {
            int _nextNumber;

            public SubclassNativeFriendlyRandom()
                : base(908)
            {
                _nextNumber = 100;
            }

            [JsiiMethod("hello", "{\"primitive\":\"string\"}", "[]", true)]
            public string Hello()
            {
                return "SubclassNativeFriendlyRandom";
            }

            [JsiiMethod("next", "{\"primitive\":\"number\"}", "[]", true)]
            public double Next()
            {
                int next = _nextNumber;
                _nextNumber += 100;
                return next;
            }
        }
    }
}
