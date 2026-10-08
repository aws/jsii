using System;
using System.Collections.Generic;
using System.Linq;
using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace;
using Amazon.JSII.Tests.CalculatorNamespace.Cdk16625;
using Amazon.JSII.Tests.CalculatorNamespace.Cdk22369;
using CompositeOperation = Amazon.JSII.Tests.CalculatorNamespace.Composition.CompositeOperation;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;
using Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.DeprecationRemoval;
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

        [Fact(DisplayName = Prefix + nameof(SubmoduleStructCanBePassed))]
        public void SubmoduleStructCanBePassed()
        {
            StaticConsumer.Consume(
                new Amazon.JSII.Tests.CustomSubmoduleName.NestingClass.NestedStruct { Name = "Bond, James Bond" }
            );
        }

        [Fact(DisplayName = Prefix + nameof(PrimitivesRoundTrip))]
        public void PrimitivesRoundTrip()
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

        [Fact(DisplayName = Prefix + nameof(DatesRoundTrip))]
        public void DatesRoundTrip()
        {
            var types = new AllTypes();

            // strong type
            types.DateProperty = DateTime.UnixEpoch.AddMilliseconds(123);
            Assert.Equal(DateTime.UnixEpoch.AddMilliseconds(123), types.DateProperty);

            // weak type
            types.AnyProperty = DateTime.UnixEpoch.AddSeconds(999);
            Assert.Equal(DateTime.UnixEpoch.AddSeconds(999), types.AnyProperty);
        }

        [Fact(DisplayName = Prefix + nameof(CollectionPropertiesCanBeSetAndRead))]
        public void CollectionPropertiesCanBeSetAndRead()
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

        [Fact(DisplayName = Prefix + nameof(AnyValuesKeepTheirType))]
        public void AnyValuesKeepTheirType()
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

        [Fact(DisplayName = Prefix + nameof(UnionPropertyAcceptsEachMemberType))]
        public void UnionPropertyAcceptsEachMemberType()
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

        [Fact(DisplayName = Prefix + nameof(OptionalConstructorParametersCanBeOmitted))]
        public void OptionalConstructorParametersCanBeOmitted()
        {
            new Calculator();
            var calc = new Calculator(new CalculatorProps() {
                InitialValue = 100
            });
            Assert.Equal(100, calc.Value);
        }

        [Fact(DisplayName = Prefix + nameof(PrimitivePropertiesCanBeRead))]
        public void PrimitivePropertiesCanBeRead()
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

        [Fact(DisplayName = Prefix + nameof(InstanceMethodsCanBeCalled))]
        public void InstanceMethodsCanBeCalled()
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

        [Fact(DisplayName = Prefix + nameof(AbstractTypedValueReceivedAsReference))]
        public void AbstractTypedValueReceivedAsReference()
        {
            var calc = new Calculator();

            calc.Add(120);
            var value = calc.Curr;
            Assert.Equal(120d, value.Value);
        }

        [Fact(DisplayName = Prefix + nameof(ObjectPropertiesCanBeReadAndAssigned))]
        public void ObjectPropertiesCanBeReadAndAssigned()
        {
            var calc = new Calculator();

            calc.Add(3200000);
            calc.Neg();
            calc.Curr = new Multiply(new Number(2), calc.Curr);
            Assert.Equal(-6400000d, calc.Value);
        }

        [Fact(DisplayName = Prefix + nameof(EnumPropertiesCanBeReadAndWritten))]
        public void EnumPropertiesCanBeReadAndWritten()
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

        [Fact(DisplayName = Prefix + nameof(EnumsFromDependenciesCrossTheBoundary))]
        public void EnumsFromDependenciesCrossTheBoundary()
        {
            ReferenceEnumFromScopedPackage obj = new ReferenceEnumFromScopedPackage();
            Assert.Equal(EnumFromScopedModule.VALUE2, obj.Foo);
            obj.Foo = EnumFromScopedModule.VALUE1;
            Assert.Equal(EnumFromScopedModule.VALUE1, obj.LoadFoo());
            obj.SaveFoo(EnumFromScopedModule.VALUE2);
            Assert.Equal(EnumFromScopedModule.VALUE2, obj.Foo);
        }

        [Fact(DisplayName = Prefix + nameof(UnsetOptionalPropertyReadsAsAbsent))]
        public void UnsetOptionalPropertyReadsAsAbsent()
        {
            // TODO: Generator should create a parameterless constructor.
            Calculator calculator = new Calculator(new CalculatorProps());

            Assert.Null(calculator.MaxValue);
            calculator.MaxValue = null;
        }

        [Fact(DisplayName = Prefix + nameof(ArraysOfObjectsPreserveOrderAndType))]
        public void ArraysOfObjectsPreserveOrderAndType()
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

        [Fact(DisplayName = Prefix + nameof(MapsOfObjectsCanBeRead))]
        public void MapsOfObjectsCanBeRead()
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

        [Fact(DisplayName = Prefix + nameof(KernelErrorsReachTheHost))]
        public void KernelErrorsReachTheHost()
        {
            var calc = new Calculator(new CalculatorProps
            {
                InitialValue = 20,
                MaximumValue = 30,
            });

            calc.Add(3);
            Assert.Equal(23d, calc.Value);

            Assert.Throws<Exception>(() => calc.Add(10));

            calc.MaxValue = 40;
            calc.Add(10);
            Assert.Equal(33d, calc.Value);
        }

        [Fact(DisplayName = Prefix + nameof(KernelErrorMessageReachesTheHost))]
        public void KernelErrorMessageReachesTheHost()
        {
            var e = Assert.Throws<Exception>(() =>
                new AcceptsPath(new AcceptsPathProps { SourcePath = "A Bad Path" })
            );
            Assert.Equal("Cannot find asset", e.Message);
        }

        [Fact(DisplayName = Prefix + nameof(UnionPropertyReturnsConcreteType))]
        public void UnionPropertyReturnsConcreteType()
        {
            var calc = new Calculator();

            calc.UnionProperty = new Multiply(new Number(9), new Number(3));
            Assert.IsType<Multiply>(calc.UnionProperty);
            Assert.Equal(9d * 3, calc.ReadUnionValue());

            calc.UnionProperty = new Power(new Number(10), new Number(3));
            Assert.IsType<Power>(calc.UnionProperty);
        }

        [Fact(DisplayName = Prefix + nameof(HostSubclassCanBeUsed))]
        public void HostSubclassCanBeUsed()
        {
            var calc = new Calculator();

            calc.Curr = new AddTen(33);
            calc.Neg();
            Assert.Equal(-43d, calc.Value);
        }

        [Fact(DisplayName = Prefix + nameof(ObjectLiteralReturnedAsClassIsUsable))]
        public void ObjectLiteralReturnedAsClassIsUsable()
        {
            var obj = new JSObjectLiteralToNative();
            var obj2 = obj.ReturnLiteral();

            Assert.Equal("Hello", obj2.PropA);
            Assert.Equal(102d, obj2.PropB);
        }

        [Fact(DisplayName = Prefix + nameof(ObjectReferencesRoundTripThroughAny))]
        public void ObjectReferencesRoundTripThroughAny()
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

        [Fact(DisplayName = Prefix + nameof(AsyncMethodsCanBeCalled))]
        public void AsyncMethodsCanBeCalled()
        {
            AsyncVirtualMethods obj = new AsyncVirtualMethods();
            Assert.Equal(128d, obj.CallMe());
            Assert.Equal(528d, obj.OverrideMe(44));
        }

        [Fact(DisplayName = Prefix + nameof(AsyncMethodCanBeOverridden))]
        public void AsyncMethodCanBeOverridden()
        {
            OverrideAsyncMethods obj = new OverrideAsyncMethods();
            Assert.Equal(4452d, obj.CallMe());
        }

        [Fact(DisplayName = Prefix + nameof(AsyncOverrideCanBeInherited))]
        public void AsyncOverrideCanBeInherited()
        {
            OverrideAsyncMethodsByBaseClass obj = new OverrideAsyncMethodsByBaseClass();
            Assert.Equal(4452d, obj.CallMe());
        }

        [Fact(DisplayName = Prefix + nameof(AsyncOverrideCanCallSuper))]
        public void AsyncOverrideCanCallSuper()
        {
            OverrideCallsSuper obj = new OverrideCallsSuper();
            Assert.Equal(1441d, obj.OverrideMe(12));
            Assert.Equal(1209d, obj.CallMe());
        }

        [Fact(DisplayName = Prefix + nameof(MultipleAsyncMethodsCanBeOverridden))]
        public void MultipleAsyncMethodsCanBeOverridden()
        {
            TwoOverrides obj = new TwoOverrides();
            Assert.Equal(684d, obj.CallMe());
        }

        [Fact(DisplayName = Prefix + nameof(AsyncOverrideErrorPropagates))]
        public void AsyncOverrideErrorPropagates()
        {
            AsyncVirtualMethodsChild obj = new AsyncVirtualMethodsChild();

            var exception = Assert.Throws<Exception>(() => obj.CallMe());
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

        [Fact(DisplayName = Prefix + nameof(PropertyAccessesUseHostOverrides))]
        public void PropertyAccessesUseHostOverrides()
        {
            SyncOverrides so = new SyncOverrides();
            Assert.Equal("I am an override!", so.RetrieveValueOfTheProperty());
            so.ModifyValueOfTheProperty("New Value");
            Assert.Equal("New Value", so.AnotherTheProperty);
        }

        [Fact(DisplayName = Prefix + nameof(GetterOverrideCanCallSuper))]
        public void GetterOverrideCanCallSuper()
        {
            SyncVirtualMethodsChild_Get_CallsSuper so = new SyncVirtualMethodsChild_Get_CallsSuper();

            Assert.Equal("super:initial value", so.RetrieveValueOfTheProperty());
            Assert.Equal("super:initial value", so.TheProperty);
        }

        [Fact(DisplayName = Prefix + nameof(GetterOverrideErrorPropagates))]
        public void GetterOverrideErrorPropagates()
        {
            SyncVirtualMethodsChild_Throws so = new SyncVirtualMethodsChild_Throws();

            var exception = Assert.Throws<Exception>(() => so.RetrieveValueOfTheProperty());
            Assert.Contains("Oh no, this is bad", exception.Message);
        }

        [Fact(DisplayName = Prefix + nameof(SetterOverrideCanCallSuper))]
        public void SetterOverrideCanCallSuper()
        {
            SyncVirtualMethodsChild_Set_CallsSuper so = new SyncVirtualMethodsChild_Set_CallsSuper();

            so.ModifyValueOfTheProperty("New Value");
            Assert.Equal("New Value:by override", so.TheProperty);
        }

        [Fact(DisplayName = Prefix + nameof(SetterOverrideErrorPropagates))]
        public void SetterOverrideErrorPropagates()
        {
            SyncVirtualMethodsChild_Throws so = new SyncVirtualMethodsChild_Throws();

            var exception = Assert.Throws<Exception>(() => so.ModifyValueOfTheProperty("Hii"));
            Assert.Contains("Exception from overloaded setter", exception.Message);
        }

        [Fact(DisplayName = Prefix + nameof(KernelUsesHostInterfaceAccessors))]
        public void KernelUsesHostInterfaceAccessors()
        {
            InterfaceWithProperties obj = new InterfaceWithProperties();
            UsesInterfaceWithProperties interact = new UsesInterfaceWithProperties(obj);

            Assert.Equal("READ_ONLY_STRING", interact.JustRead());
            Assert.Equal("Hello!?", interact.WriteAndRead("Hello"));
        }

        [Fact(DisplayName = Prefix + nameof(MethodCallsUseHostOverride))]
        public void MethodCallsUseHostOverride()
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

        [Fact(DisplayName = Prefix + nameof(MethodOverrideCanCallSuper))]
        public void MethodOverrideCanCallSuper()
        {
            SyncOverrides obj = new SyncOverrides();
            Assert.Equal(10d * 5, obj.CallerIsProperty);

            obj.ReturnSuper = true; // js code returns n * 2
            Assert.Equal(10d * 2, obj.CallerIsProperty);
        }

        [Fact(DisplayName = Prefix + nameof(SyncMethodOverrideCallingAsyncFails))]
        public void SyncMethodOverrideCallingAsyncFails()
        {
            SyncOverrides obj = new SyncOverrides();
            obj.CallAsync = true;

            Assert.Throws<JsiiError>(() => obj.CallerIsMethod());
        }

        [Fact(DisplayName = Prefix + nameof(SyncGetterOverrideCallingAsyncFails))]
        public void SyncGetterOverrideCallingAsyncFails()
        {
            SyncOverrides obj = new SyncOverrides();
            obj.CallAsync = true;

            Assert.Throws<JsiiError>(() => obj.CallerIsProperty);
        }

        [Fact(DisplayName = Prefix + nameof(SyncSetterOverrideCallingAsyncFails))]
        public void SyncSetterOverrideCallingAsyncFails()
        {
            SyncOverrides obj = new SyncOverrides();
            obj.CallAsync = true;

            Assert.Throws<JsiiError>(() => obj.CallerIsProperty = 12);
        }

        [Fact(DisplayName = Prefix + nameof(ObjectsUsableThroughEveryInterface))]
        public void ObjectsUsableThroughEveryInterface()
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
        [Fact(DisplayName = Prefix + nameof(HostObjectsKeepIdentityAcrossTheBoundary))]
        public void HostObjectsKeepIdentityAcrossTheBoundary()
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

        [Fact(DisplayName = Prefix + nameof(ObjectLiteralReturnedAsInterfaceIsUsable))]
        public void ObjectLiteralReturnedAsInterfaceIsUsable()
        {
            JSObjectLiteralForInterface obj = new JSObjectLiteralForInterface();
            IFriendly friendly = obj.GiveMeFriendly();
            Assert.Equal("I am literally friendly!", friendly.Hello());

            IFriendlyRandomGenerator gen = obj.GiveMeFriendlyGenerator();
            Assert.Equal("giveMeFriendlyGenerator", gen.Hello());
            Assert.Equal(42d, gen.Next());
        }

        [Fact(DisplayName = Prefix + nameof(InterfaceValueCanBePassedBack))]
        public void InterfaceValueCanBePassedBack()
        {
            var obj = new JSObjectLiteralForInterface();
            var friendly = obj.GiveMeFriendly();
            Assert.Equal("I am literally friendly!", friendly.Hello());

            var greetingAugmenter = new GreetingAugmenter();
            var betterGreeting = greetingAugmenter.BetterGreeting(friendly);
            Assert.Equal("I am literally friendly! Let me buy you a drink!", betterGreeting);
        }

        [Fact(DisplayName = Prefix + nameof(StructsArePassedByValue))]
        public void StructsArePassedByValue()
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

        [Fact(DisplayName = Prefix + nameof(StaticMembersCanBeUsed))]
        public void StaticMembersCanBeUsed()
        {
            Assert.Equal("hello ,Yoyo!", Statics.StaticMethod("Yoyo"));
            Assert.Equal("default", Statics.Instance.Value);

            Statics newStatics = new Statics("new value");
            Statics.Instance = newStatics;
            Assert.Same(Statics.Instance, newStatics);
            Assert.Equal("new value", Statics.Instance.Value);

            Assert.Equal(100, Statics.NonConstStatic);
        }

        [Fact(DisplayName = Prefix + nameof(StaticPropertyAssignmentUpdatesJavaScript))]
        public void StaticPropertyAssignmentUpdatesJavaScript()
        {
            Assert.Equal("default", StaticPropertyAssignment.ReadValue());
            try
            {
                StaticPropertyAssignment.Value = "assigned";

                Assert.Equal("assigned", StaticPropertyAssignment.ReadValue());
                Assert.Equal("assigned", StaticPropertyAssignment.Value);
            }
            finally
            {
                StaticPropertyAssignment.Value = "default";
            }

            Assert.Equal("default", StaticPropertyAssignment.ReadValue());
        }

        [Fact(DisplayName = Prefix + nameof(ConstantsCanBeRead))]
        public void ConstantsCanBeRead()
        {
            Assert.Equal("hello", Statics.Foo);
            DoubleTrouble obj = Statics.ConstObj;
            Assert.Equal("world", obj.Hello());
            Assert.Equal(1234, Statics.BAR);
            Assert.Equal("world", Statics.ZooBar["hello"]);
        }

        [Fact(DisplayName = Prefix + nameof(ReservedWordMethodsAreCallable))]
        public void ReservedWordMethodsAreCallable()
        {
            var obj = new JavaReservedWords();
            obj.Import();
            obj.Const();
        }

        [Fact(DisplayName = Prefix + nameof(NodeStandardLibraryIsAvailable))]
        public void NodeStandardLibraryIsAvailable()
        {
            NodeStandardLibrary obj = new NodeStandardLibrary();
            Assert.Equal("Hello, resource!", obj.FsReadFile());
            Assert.Equal("Hello, resource! SYNC!", obj.FsReadFileSync());
            Assert.True(obj.OsPlatform.Length > 0);
            Assert.Equal("6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50",
                obj.CryptoSha256());
        }

        [Fact(DisplayName = Prefix + nameof(ObjectsReturnedAsAbstractTypeAreUsable))]
        public void ObjectsReturnedAsAbstractTypeAreUsable()
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

        [Fact(DisplayName = Prefix + nameof(PrivateConstructorClassFromStaticFactory))]
        public void PrivateConstructorClassFromStaticFactory()
        {
            var obj = ClassWithPrivateConstructorAndAutomaticProperties.Create("Hello", "Bye");
            Assert.Equal("Bye", obj.ReadWriteString);
            obj.ReadWriteString = "Hello";

            Assert.Equal("Hello", obj.ReadOnlyString);
        }

        [Fact(DisplayName = Prefix + nameof(HostNullIsSentAsUndefined))]
        public void HostNullIsSentAsUndefined()
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

        [Fact(DisplayName = Prefix + nameof(KernelKnowsTheHostRuntime))]
        public void KernelKnowsTheHostRuntime()
        {
            Assert.Equal("DotNet/" + Environment.Version + "/.NETCoreApp,Version=v6.0/1.0.0.0", JsiiAgent.Value);
        }

        [Fact(DisplayName = Prefix + nameof(NonExportedClassReceivedAsInterface))]
        public void NonExportedClassReceivedAsInterface()
        {
            Assert.True(new ReturnsPrivateImplementationOfInterface().PrivateImplementation.Success);
        }

        [Fact(DisplayName = Prefix + nameof(ObjectsReceivedAsMostDerivedPublicType))]
        public void ObjectsReceivedAsMostDerivedPublicType()
        {
            var classRef = Constructors.MakeClass();
            var ifaceRef = Constructors.MakeInterface();

            Assert.Equal(typeof(InbetweenClass), classRef.GetType());
            Assert.NotEqual(typeof(InbetweenClass), ifaceRef.GetType());
        }

        [Fact(DisplayName = Prefix + nameof(UnsetStructPropertiesAreOmitted))]
        public void UnsetStructPropertiesAreOmitted()
        {
            var opts = new EraseUndefinedHashValuesOptions {
                Option1 = "option1"
            };

            Assert.True(EraseUndefinedHashValues.DoesKeyExist(opts, "option1"));
            Assert.False(EraseUndefinedHashValues.DoesKeyExist(opts, "option2"));

            Assert.Equal(new Dictionary<string, object> { ["prop2"] = "value2" }, EraseUndefinedHashValues.Prop1IsNull());
            Assert.Equal(new Dictionary<string, object> { [ "prop1"] = "value1" }, EraseUndefinedHashValues.Prop2IsUndefined());
        }

        internal sealed class PartiallyInitializedThisConsumerImpl : PartiallyInitializedThisConsumer
        {
            public override String ConsumePartiallyInitializedThis(ConstructorPassesThisOut obj, DateTime dt, AllTypesEnum ev)
            {
                Assert.NotNull(obj);
                Assert.Equal(DateTime.UnixEpoch, dt);
                Assert.Equal(AllTypesEnum.THIS_IS_GREAT, ev);

                return "OK";
            }
        }

        [Fact(DisplayName = Prefix + nameof(ConstructorCanPassThisToTheHost))]
        public void ConstructorCanPassThisToTheHost()
        {
            var reflector = new PartiallyInitializedThisConsumerImpl();
            var obj = new ConstructorPassesThisOut(reflector);

            Assert.NotNull(obj);
        }

        [Fact(DisplayName = Prefix + nameof(OverrideReceivesDeserializedArguments))]
        public void OverrideReceivesDeserializedArguments()
        {
            var obj = new DataRendererSubclass();
            Assert.Equal("{\n  \"anumber\": 42,\n  \"astring\": \"bazinga!\"\n}", obj.Render(null));

            Assert.Equal("{\n  \"Key\": {},\n  \"Baz\": \"Zinga\"\n}", obj.RenderArbitrary(new Dictionary<string, object>()
            {
                { "Key", obj },
                { "Baz", "Zinga" }
            }));
        }

        [Fact(DisplayName = Prefix + nameof(InterfaceValueWithPrivateTypeIsUsable))]
        public void InterfaceValueWithPrivateTypeIsUsable()
        {
            var provider = new AnonymousImplementationProvider();
            Assert.Equal(1337d, provider.ProvideAsClass().Value);
            Assert.Equal(1337d, provider.ProvideAsInterface().Value);
            Assert.Equal("to implement", provider.ProvideAsInterface().Verb());
        }

        [Fact(DisplayName = Prefix + nameof(OverlappingStructUnionsAreDisambiguated))]
        public void OverlappingStructUnionsAreDisambiguated()
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

        [Fact(DisplayName = Prefix + nameof(ObjectsUsableThroughImplementedInterface), Skip = "An anonymous object returned as 'any' cannot be used through the interface it implements: the returnAnonymous() objref is typed 'Object' with no '$jsii.interfaces', so reading 'foo' via UnsafeCast<IReturnJsii976> fails with 'Type Object doesn't have a property foo'. The returnReturn() half of this test passes.")]
        public void ObjectsUsableThroughImplementedInterface()
        {
            var obj = SomeTypeJsii976.ReturnReturn();
            Assert.Equal(333, obj.Foo);

            // An anonymous object returned as `any` must also be usable through the interface it
            // implements (this previously lived in the standalone `downcasting` test).
            var anyValue = SomeTypeJsii976.ReturnAnonymous();
            var realValue = ((DeputyBase) anyValue).UnsafeCast<IReturnJsii976>();
            Assert.Equal(1337d, realValue.Foo);
        }

        class DataRendererSubclass : DataRenderer
        {
            public override string RenderMap(IDictionary<string, object> map)
            {
                return base.RenderMap(map);
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

        [Fact(DisplayName = Prefix + nameof(StructReceivedAsParentStructType))]
        public void StructReceivedAsParentStructType()
        {
            Assert.NotNull(Demonstrate982.TakeThis());
            Assert.NotNull(Demonstrate982.TakeThisToo());
        }

        [Fact(DisplayName = Prefix + nameof(UndefinedOptionalListReadsAsAbsent))]
        public void UndefinedOptionalListReadsAsAbsent()
        {
            Assert.Null(DisappointingCollectionSource.MaybeList);
        }

        [Fact(DisplayName = Prefix + nameof(UndefinedOptionalMapReadsAsAbsent))]
        public void UndefinedOptionalMapReadsAsAbsent()
        {
            Assert.Null(DisappointingCollectionSource.MaybeMap);
        }

        [Fact(DisplayName = Prefix + nameof(InterfacePropertyCanBeSet))]
        public void InterfacePropertyCanBeSet()
        {
            var obj = ObjectWithPropertyProvider.Provide();
            obj.Property = "New Value";
            Assert.True(obj.WasSet());
        }

        [Fact(DisplayName = Prefix + nameof(StructsAreSentAsPlainData))]
        public void StructsAreSentAsPlainData()
        {
            var json = JsonFormatter.Stringify(new StructB {RequiredString = "Bazinga!", OptionalBoolean = false})!;
            var actual = JObject.Parse(json);

            var expected = new JObject();
            expected.Add("RequiredString", "Bazinga!");
            expected.Add("OptionalBoolean", false);

            Assert.Equal(expected, actual);
        }

        [Fact(DisplayName = Prefix + nameof(ClassWithUnionPropertyCanBeReceived))]
        public void ClassWithUnionPropertyCanBeReceived()
        {
            Assert.NotNull(ConfusingToJackson.MakeInstance());
        }

        [Fact(DisplayName = Prefix + nameof(HostCanImplementInterface))]
        public void HostCanImplementInterface()
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

        [Fact(DisplayName = Prefix + nameof(HostCanImplementInterfaceThroughSuperclass))]
        public void HostCanImplementInterfaceThroughSuperclass()
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

        [Fact(DisplayName = Prefix + nameof(HostSubclassCanImplementAdditionalInterface))]
        public void HostSubclassCanImplementAdditionalInterface()
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

        [Fact(DisplayName = Prefix + nameof(PositionalArgumentAndStructPropertyWithSameName))]
        public void PositionalArgumentAndStructPropertyWithSameName()
        {
            // This is a replication of a test that mostly affects languages with keyword arguments (e.g: Python, Ruby, ...)
            var bell = new Bell();
            var amb = new AmbiguousParameters(bell, new StructParameterType { Scope = "Driiiing!" });

            Assert.Equal(bell, amb.Scope);
            Assert.Equal("Driiiing!", amb.Props.Scope);
        }

        [Fact(DisplayName = Prefix + nameof(HostImplementsAbstractMembers))]
        public void HostImplementsAbstractMembers()
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

        [Fact(DisplayName = Prefix + nameof(ListOfStructsElementsHaveStructType))]
        public void ListOfStructsElementsHaveStructType()
        {
            foreach (var elt in InterfaceCollections.ListOfStructs())
            {
                Assert.IsAssignableFrom<IStructA>(elt);
            }
        }

        [Fact(DisplayName = Prefix + nameof(ListOfInterfacesElementsAreUsable))]
        public void ListOfInterfacesElementsAreUsable()
        {
            foreach (var elt in InterfaceCollections.ListOfInterfaces())
            {
                Assert.IsAssignableFrom<IBell>(elt);
            }
        }

        [Fact(DisplayName = Prefix + nameof(MapOfStructsValuesHaveStructType))]
        public void MapOfStructsValuesHaveStructType()
        {
            foreach (var elt in InterfaceCollections.MapOfStructs().Values)
            {
                Assert.IsAssignableFrom<IStructA>(elt);
            }
        }

        [Fact(DisplayName = Prefix + nameof(MapOfInterfacesValuesAreUsable))]
        public void MapOfInterfacesValuesAreUsable()
        {
            foreach (var elt in InterfaceCollections.MapOfInterfaces().Values)
            {
                Assert.IsAssignableFrom<IBell>(elt);
            }
        }

        [Fact(DisplayName = Prefix + nameof(IsoDateStringsStayStrings))]
        public void IsoDateStringsStayStrings()
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

        [Fact(DisplayName = Prefix + nameof(TypesNotLoadedByTheHostCanBeReceived))]
        public void TypesNotLoadedByTheHostCanBeReceived()
        {
            new Cdk16625Impl().Test();
        }

        private sealed class Cdk16625Impl: Cdk16625 {
            protected override double Unwrap(IRandomNumberGenerator rng) {
                return rng.Next();
            }
        }

        [Fact(DisplayName = Prefix + nameof(StrippedDeprecatedTypeCanBeReceived))]
        public void StrippedDeprecatedTypeCanBeReceived()
        {
            Assert.NotNull(InterfaceFactory.Create());
        }

        [Fact(DisplayName = Prefix + nameof(VariadicArgumentsAreForwarded))]
        public void VariadicArgumentsAreForwarded()
        {
            var variadicMethod = new VariadicMethod(1);
            var result = variadicMethod.AsArray(3, 4, 5, 6);
            Assert.Equal(new[] { 1d, 3d, 4d, 5d, 6d }, result);
        }

        [Fact(DisplayName = Prefix + nameof(EnumValuesReturnedByTheKernel))]
        public void EnumValuesReturnedByTheKernel()
        {
            Assert.True(Enum.IsDefined(typeof(StringEnum), EnumDispenser.RandomStringLikeEnum()));
            Assert.True(Enum.IsDefined(typeof(AllTypesEnum), EnumDispenser.RandomIntegerLikeEnum()));
        }

        [Fact(DisplayName = Prefix + nameof(AsyncMethodReturningNothing), Skip = "Invoking an async Promise<void> method throws System.ArgumentNullException in EndResponse: the kernel 'end' response carries no 'result' for a void async method")]
        public void AsyncMethodReturningNothing()
        {
            // Verifies it's okay to return a Promise<void>.
            new PromiseNothing().InstancePromiseIt();
        }

        class BellRinger : DeputyBase, IBellRinger
        {
            public void YourTurn(IBell bell)
            {
                bell.Ring();
            }
        }

        [Fact(DisplayName = Prefix + nameof(CallbackReceivesInterfaceArguments))]
        public void CallbackReceivesInterfaceArguments()
        {
            var ringer = new BellRinger();
            Assert.True(ConsumerCanRingBell.StaticImplementedByObjectLiteral(ringer));
            Assert.True(ConsumerCanRingBell.StaticImplementedByPrivateClass(ringer));
            Assert.True(ConsumerCanRingBell.StaticImplementedByPublicClass(ringer));
        }

        [Fact(DisplayName = Prefix + nameof(ClassesCanReferenceEachOtherDuringInitialization))]
        public void ClassesCanReferenceEachOtherDuringInitialization()
        {
            var outerClass = new Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.OuterClass();
            Assert.NotNull(outerClass.InnerClass);
        }

        private sealed class DerivedFromAllTypes : AllTypes
        {
        }

        [Fact(DisplayName = Prefix + nameof(InheritedPropertiesUsableOnHostSubclass))]
        public void InheritedPropertiesUsableOnHostSubclass()
        {
            // make sure that fluent API can be assigned to objects from derived classes
            var obj = new DerivedFromAllTypes();
            obj.StringProperty = "Hello";
            obj.NumberProperty = 12;
            Assert.Equal("Hello", obj.StringProperty);
            Assert.Equal(12d, obj.NumberProperty);
        }

        [Fact(DisplayName = Prefix + nameof(ReservedWordClassPropertiesAreAccessible))]
        public void ReservedWordClassPropertiesAreAccessible()
        {
            var obj = new ClassWithJavaReservedWords("one");
            var result = obj.Import("two");
            Assert.Equal("onetwo", result);

            var words = new JavaReservedWords();
            Assert.Equal("hello", words.While);
        }

        [Fact(DisplayName = Prefix + nameof(ReservedWordStructPropertiesAreUsable))]
        public void ReservedWordStructPropertiesAreUsable()
        {
            var @struct = new StructWithJavaReservedWords
            {
                Assert = "one",
                Default = "two"
            };

            Assert.Equal("one", @struct.Assert);
            Assert.Equal("two", @struct.Default);
        }

        [Fact(DisplayName = Prefix + nameof(DiamondInheritedStructPropertiesAppearOnce))]
        public void DiamondInheritedStructPropertiesAppearOnce()
        {
            var @struct = new DiamondInheritanceTopLevelStruct
            {
                BaseLevelProperty = "base",
                FirstMidLevelProperty = "mid1",
                SecondMidLevelProperty = "mid2",
                TopLevelProperty = "top"
            };

            Assert.Equal("base", @struct.BaseLevelProperty);
            Assert.Equal("mid1", @struct.FirstMidLevelProperty);
            Assert.Equal("mid2", @struct.SecondMidLevelProperty);
            Assert.Equal("top", @struct.TopLevelProperty);
        }

        [Fact(DisplayName = Prefix + nameof(ReceivedStructEqualsHostBuiltStruct))]
        public void ReceivedStructEqualsHostBuiltStruct()
        {
            var gms = new GiveMeStructs();
            var returnedLiteral = gms.StructLiteral;
            var nativeBuilt = new Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.StructWithOnlyOptionals
            {
                Optional1 = "optional1FromStructLiteral",
                Optional3 = false
            };

            // .NET generated by-value classes do not override Equals, so compare the fields,
            // which is what "indistinguishable from a natively-built struct" means here.
            Assert.Equal(nativeBuilt.Optional1, returnedLiteral.Optional1);
            Assert.Equal(nativeBuilt.Optional2, returnedLiteral.Optional2);
            Assert.Equal(nativeBuilt.Optional3, returnedLiteral.Optional3);
        }

        [Fact(DisplayName = Prefix + nameof(UnionStructPropertyKeepsConcreteType))]
        public void UnionStructPropertyKeepsConcreteType()
        {
            // A union-typed struct property keeps its concrete type across the boundary.
            var withStruct = StructPassing.RoundTrip(123, new TopLevelStruct
            {
                Required = "hello",
                SecondLevel = new SecondLevelStruct { DeeperRequiredProp = "exists" }
            });
            Assert.Equal("hello", withStruct.Required);
            Assert.Null(withStruct.Optional);
            // The union member is received as a dynamically-typed object reference carrying the
            // SecondLevelStruct interface; use the binding's UnsafeCast to read it as that interface.
            var secondLevel = ((DeputyBase) withStruct.SecondLevel).UnsafeCast<ISecondLevelStruct>();
            Assert.Equal("exists", secondLevel.DeeperRequiredProp);

            var withNumber = StructPassing.RoundTrip(123, new TopLevelStruct
            {
                Required = "hello",
                SecondLevel = 5d
            });
            Assert.Equal("hello", withNumber.Required);
            Assert.Null(withNumber.Optional);
            Assert.Equal(5d, withNumber.SecondLevel);
        }

        [Fact(DisplayName = Prefix + nameof(UnionOfListAndObjectStructPropertyRoundTrips))]
        public void UnionOfListAndObjectStructPropertyRoundTrips()
        {
            // A struct property typed as a union of a list and an object keeps its value and identity.
            var friendly = new Add(new Number(1), new Number(2));

            var single = ConfusingToJackson.RoundTripStruct(new ConfusingToJacksonStruct { UnionProperty = friendly });
            Assert.Same(friendly, single.UnionProperty);

            var list = ConfusingToJackson.RoundTripStruct(new ConfusingToJacksonStruct { UnionProperty = new object[] { friendly } });
            var resultList = (object[]) list.UnionProperty!;
            Assert.Single(resultList);
            Assert.Same(friendly, resultList[0]);

            var unset = ConfusingToJackson.RoundTripStruct(new ConfusingToJacksonStruct());
            Assert.Null(unset.UnionProperty);
        }

        [Fact(DisplayName = Prefix + nameof(ReturnedArrayCanBeRead))]
        public void ReturnedArrayCanBeRead()
        {
            Assert.Equal(new[] { "one", "two" }, ClassWithCollections.CreateAList());
        }

        [Fact(DisplayName = Prefix + nameof(ReturnedMapCanBeRead))]
        public void ReturnedMapCanBeRead()
        {
            var result = ClassWithCollections.CreateAMap();
            Assert.Equal("value1", result["key1"]);
            Assert.Equal("value2", result["key2"]);
            Assert.Equal(2, result.Count);
        }

        [Fact(DisplayName = Prefix + nameof(ArrayPropertyCanBeRead))]
        public void ArrayPropertyCanBeRead()
        {
            var classWithCollections = new ClassWithCollections(
                new Dictionary<string, string>(),
                new[] { "one", "two" });
            Assert.Equal(new[] { "one", "two" }, classWithCollections.Array);
        }

        [Fact(DisplayName = Prefix + nameof(MapPropertyCanBeRead))]
        public void MapPropertyCanBeRead()
        {
            var classWithCollections = new ClassWithCollections(
                new Dictionary<string, string> { ["key"] = "value" },
                System.Array.Empty<string>());
            var result = classWithCollections.Map;
            Assert.Equal("value", result["key"]);
            Assert.Single(result);
        }

        [Fact(DisplayName = Prefix + nameof(StaticArrayPropertyCanBeRead))]
        public void StaticArrayPropertyCanBeRead()
        {
            Assert.Equal(new[] { "one", "two" }, ClassWithCollections.StaticArray);
        }

        [Fact(DisplayName = Prefix + nameof(StaticMapPropertyCanBeRead))]
        public void StaticMapPropertyCanBeRead()
        {
            var result = ClassWithCollections.StaticMap;
            Assert.Equal("value1", result["key1"]);
            Assert.Equal("value2", result["key2"]);
            Assert.Equal(2, result.Count);
        }

        [Fact(DisplayName = Prefix + nameof(ProtectedMethodCanBeOverridden))]
        public void ProtectedMethodCanBeOverridden()
        {
            const string challenge = "Cthulhu Fhtagn!";
            var overridden = new OverrideProtectedMethod(challenge);
            Assert.Equal(challenge, overridden.ValueFromProtected());
        }

        private sealed class OverrideProtectedMethod : OverridableProtectedMember
        {
            private readonly string _challenge;

            public OverrideProtectedMethod(string challenge)
            {
                _challenge = challenge;
            }

            protected override string OverrideMe()
            {
                return _challenge;
            }
        }

        [Fact(DisplayName = Prefix + nameof(ProtectedGetterCanBeOverridden))]
        public void ProtectedGetterCanBeOverridden()
        {
            var overridden = new OverrideProtectedGetter();
            Assert.Equal("Cthulhu Fhtagn!", overridden.ValueFromProtected());
        }

        private sealed class OverrideProtectedGetter : OverridableProtectedMember
        {
            protected override string OverrideReadOnly => "Cthulhu ";

            protected override string OverrideReadWrite => "Fhtagn!";
        }

        [Fact(DisplayName = Prefix + nameof(ProtectedSetterCanBeOverridden))]
        public void ProtectedSetterCanBeOverridden()
        {
            const string challenge = "Bazzzzzzzzzzzaar...";
            var overridden = new OverrideProtectedSetter();
            overridden.SwitchModes();
            Assert.Equal(challenge, overridden.ValueFromProtected());
        }

        private sealed class OverrideProtectedSetter : OverridableProtectedMember
        {
            protected override string OverrideReadWrite
            {
                get => base.OverrideReadWrite;
                set => base.OverrideReadWrite = "zzzzzzzzz" + value;
            }
        }

        [Fact(DisplayName = Prefix + nameof(HostMethodDoesNotOverridePrivateMethod))]
        public void HostMethodDoesNotOverridePrivateMethod()
        {
            var obj = new DoNotOverridePrivatesMethodPublic();
            Assert.Equal("privateMethod", obj.PrivateMethodValue());
        }

        private sealed class DoNotOverridePrivatesMethodPublic : DoNotOverridePrivates
        {
            public string PrivateMethod()
            {
                return "privateMethod-Override";
            }
        }

        [Fact(DisplayName = Prefix + nameof(HostMethodDoesNotOverridePrivateProperty))]
        public void HostMethodDoesNotOverridePrivateProperty()
        {
            var obj = new DoNotOverridePrivatesPropertyByNamePublic();
            Assert.Equal("privateProperty", obj.PrivatePropertyValue());
        }

        private sealed class DoNotOverridePrivatesPropertyByNamePublic : DoNotOverridePrivates
        {
            public string PrivateProperty()
            {
                return "privateProperty-Override";
            }
        }

        [Fact(DisplayName = Prefix + nameof(HostAccessorDoesNotOverridePrivateProperty))]
        public void HostAccessorDoesNotOverridePrivateProperty()
        {
            var obj = new DoNotOverridePrivatesPropertyGetterPublic();
            Assert.Equal("privateProperty", obj.PrivatePropertyValue());

            // verify the setter override is not invoked.
            obj.ChangePrivatePropertyValue("MyNewValue");
            Assert.Equal("MyNewValue", obj.PrivatePropertyValue());
        }

        private sealed class DoNotOverridePrivatesPropertyGetterPublic : DoNotOverridePrivates
        {
            public string GetPrivateProperty()
            {
                return "privateProperty-Override";
            }

            public void SetPrivateProperty(string value)
            {
                throw new RuntimeException("Boom");
            }
        }

        // ----------------------------------------------------------------------
        // Tests that are not applicable to the .NET language binding.
        // ----------------------------------------------------------------------

        // .NET returns a standard, mutable System.Collections.Generic.Dictionary for maps;
        // immutability of returned maps is not part of the .NET binding contract (same as Go).
        [Fact(DisplayName = Prefix + nameof(MapPropertyRejectsMutation), Skip = "Not applicable: .NET returns a standard mutable IDictionary; returned maps are not immutable")]
        public void MapPropertyRejectsMutation()
        {
        }

        [Fact(DisplayName = Prefix + nameof(ReturnedMapRejectsMutation), Skip = "Not applicable: .NET returns a standard mutable IDictionary; returned maps are not immutable")]
        public void ReturnedMapRejectsMutation()
        {
        }

        [Fact(DisplayName = Prefix + nameof(StaticMapPropertyRejectsMutation), Skip = "Not applicable: .NET returns a standard mutable IDictionary; returned maps are not immutable")]
        public void StaticMapPropertyRejectsMutation()
        {
        }

        // Collections modeled as arrays are surfaced as fixed-size C# arrays (string[]), which
        // have no add/remove API that could be rejected at runtime (same reasoning as Go).
        [Fact(DisplayName = Prefix + nameof(StaticArrayPropertyRejectsMutation), Skip = "Not applicable: C# arrays (string[]) are fixed-size by design; there is no add/remove API to reject")]
        public void StaticArrayPropertyRejectsMutation()
        {
        }

        [Fact(DisplayName = Prefix + nameof(ReturnedArrayRejectsMutation), Skip = "Not applicable: C# arrays (string[]) are fixed-size by design; there is no add/remove API to reject")]
        public void ReturnedArrayRejectsMutation()
        {
        }

        // ----------------------------------------------------------------------
        // Tests that are applicable but currently fail due to a generator/runtime gap.
        // ----------------------------------------------------------------------

        // The .NET generator does not emit required-field validation for structs, so passing an
        // under-specified struct to the kernel does not raise. See https://github.com/aws/jsii/issues/2672
        [Fact(DisplayName = Prefix + nameof(IncompleteStructIsRejected), Skip = ".NET does not validate required struct fields when marshalling to the kernel; see https://github.com/aws/jsii/issues/2672")]
        public void IncompleteStructIsRejected()
        {
        }
    }
}
