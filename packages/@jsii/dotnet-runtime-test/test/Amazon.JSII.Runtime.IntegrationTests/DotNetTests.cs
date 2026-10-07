using System;
using System.Collections.Generic;
using System.Linq;
using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;
using Xunit;
using Xunit.Abstractions;

#pragma warning disable CS0612

namespace Amazon.JSII.Runtime.IntegrationTests
{
    /// <summary>
    /// .NET specific tests that are not part of the jsii compliance suite.
    /// </summary>
    public sealed class DotNetTests : IClassFixture<ServiceContainerFixture>, IDisposable
    {
        const string Prefix = nameof(IntegrationTests) + ".DotNet.";

        private readonly IDisposable _serviceContainerFixture;

        public DotNetTests(ITestOutputHelper outputHelper, ServiceContainerFixture serviceContainerFixture)
        {
            serviceContainerFixture.SetOverride(outputHelper);
            _serviceContainerFixture = serviceContainerFixture;
        }

        void IDisposable.Dispose()
        {
            _serviceContainerFixture.Dispose();
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

        [Fact(DisplayName = Prefix + nameof(TestReturnInterfaceFromOverride))]
        public void TestReturnInterfaceFromOverride()
        {
            var n = 1337;
            var obj = new OverrideReturnsObject();
            var arg = new NumberReturner(n);
            Assert.Equal(4 * n, obj.Test(arg));
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

        [Fact(DisplayName = Prefix + nameof(CorrectlyReturnsFromVoidCallback))]
        public void CorrectlyReturnsFromVoidCallback()
        {
            var voidCallback = new VoidCallbackImpl();
            voidCallback.CallMe();

            Assert.True(voidCallback.MethodWasCalled);
        }

        [Fact(DisplayName = Prefix + nameof(MethodCanReturnArraysOfInterfaces))]
        public void MethodCanReturnArraysOfInterfaces()
        {
            var interfaces = InterfacesMaker.MakeInterfaces(4);
            Assert.Equal(4, interfaces.Length);
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

        class VoidCallbackImpl : VoidCallback
        {
            protected override void OverrideMe()
            {
                // Do nothing!
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
    }
}
