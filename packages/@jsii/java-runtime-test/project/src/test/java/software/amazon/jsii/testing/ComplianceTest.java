package software.amazon.jsii.testing;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import software.amazon.jsii.ComplianceSuiteHarness;
import software.amazon.jsii.JsiiEngine;
import software.amazon.jsii.JsiiException;
import software.amazon.jsii.ReloadingClassLoader;
import software.amazon.jsii.tests.calculator.*;
import software.amazon.jsii.tests.calculator.baseofbase.StaticConsumer;
import software.amazon.jsii.tests.calculator.cdk16625.Cdk16625;
import software.amazon.jsii.tests.calculator.composition.CompositeOperation;
import software.amazon.jsii.tests.calculator.custom_submodule_name.NestingClass.NestedStruct;
import software.amazon.jsii.tests.calculator.lib.deprecation_removal.InterfaceFactory;
import software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule;
import software.amazon.jsii.tests.calculator.lib.IFriendly;
import software.amazon.jsii.tests.calculator.lib.MyFirstStruct;
import software.amazon.jsii.tests.calculator.lib.Number;
import software.amazon.jsii.tests.calculator.lib.NumericValue;
import software.amazon.jsii.tests.calculator.lib.StructWithOnlyOptionals;
import software.amazon.jsii.tests.calculator.submodule.child.OuterClass;

import java.io.IOException;
import java.lang.reflect.Constructor;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.hasEntry;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;

@SuppressWarnings("deprecated")
@ExtendWith(ComplianceSuiteHarness.class)
public class ComplianceTest {
    @Test
    public void useNestedStruct() {
        StaticConsumer.consume(
            new NestedStruct.Builder()
                .name("Bond, James Bond")
                .build()
        );
    }

    /**
     * Verify that we can marshal and unmarshal objects without type information.
     */
    @Test
    public void primitiveTypes() throws IOException {
        AllTypes types = new AllTypes();

        // boolean
        types.setBooleanProperty(true);
        assertEquals(true, types.getBooleanProperty());

        // string
        types.setStringProperty("foo");
        assertEquals("foo", types.getStringProperty());

        // number
        types.setNumberProperty(1234);
        assertEquals(1234, types.getNumberProperty());

        // date
        types.setDateProperty(Instant.ofEpochMilli(123));
        assertEquals(Instant.ofEpochMilli(123), types.getDateProperty());

        // json
        types.setJsonProperty((ObjectNode) new ObjectMapper().readTree("{ \"Foo\": { \"Bar\": 123 } }"));
        assertEquals(123, types.getJsonProperty().get("Foo").get("Bar").numberValue());
    }

    @Test
    public void dates() {
        AllTypes types = new AllTypes();

        // strong type
        types.setDateProperty(Instant.ofEpochMilli(123));
        assertEquals(Instant.ofEpochMilli(123), types.getDateProperty());

        // weak type
        types.setAnyProperty(Instant.ofEpochSecond(999));
        assertEquals(Instant.ofEpochSecond(999), types.getAnyProperty());
    }

    @Test
    public void collectionTypes() {
        AllTypes types = new AllTypes();

        // array
        types.setArrayProperty(Arrays.asList("Hello", "World"));
        assertEquals("World", types.getArrayProperty().get(1));

        // map
        Map<String, Number> map = new HashMap<>();
        map.put("Foo", new Number(123));
        types.setMapProperty(map);
    }

    @Test
    public void dynamicTypes() throws IOException {
        AllTypes types = new AllTypes();

        // boolean
        types.setAnyProperty(false);
        assertEquals(false, types.getAnyProperty());

        // string
        types.setAnyProperty("String");
        assertEquals("String", types.getAnyProperty());

        // number
        types.setAnyProperty(12);
        assertEquals(12, types.getAnyProperty());

        // date
        types.setAnyProperty(Instant.ofEpochSecond(1234));
        assertEquals(Instant.ofEpochSecond(1234), types.getAnyProperty());

        // json (notice that when deserialized, it is deserialized as a map).
        types.setAnyProperty(Collections.singletonMap("Goo", Arrays.asList("Hello", Collections.singletonMap("World", 123))));
        assertEquals(123, ((Map<?, ?>)((List<?>)((Map<?, ?>)types.getAnyProperty()).get("Goo")).get(1)).get("World"));

        // array
        types.setAnyProperty(Arrays.asList("Hello", "World"));
        assertEquals("Hello", ((List<?>)types.getAnyProperty()).get(0));
        assertEquals("World", ((List<?>)types.getAnyProperty()).get(1));

        // array of any
        types.setAnyArrayProperty(Arrays.asList("Hybrid", new Number(12), 123, false));
        assertEquals(123, types.getAnyArrayProperty().get(2));

        // map
        Map<String, Object> map = new HashMap<>();
        map.put("MapKey", "MapValue");
        types.setAnyProperty(map);
        assertEquals("MapValue", ((Map<?, ?>)types.getAnyProperty()).get("MapKey"));

        // map of any
        map.put("Goo", 19289812);
        types.setAnyMapProperty(map);
        assertEquals(19289812, types.getAnyMapProperty().get("Goo"));

        // classes
        Multiply mult = new Multiply(new Number(10), new Number(20));
        types.setAnyProperty(mult);
        assertSame(types.getAnyProperty(), mult);
        assertTrue(types.getAnyProperty() instanceof Multiply);
        assertEquals(200, ((Multiply) types.getAnyProperty()).getValue());
    }

    @Test
    public void unionTypes() {
        AllTypes types = new AllTypes();

        // single valued property
        types.setUnionProperty(1234);
        assertEquals(1234, types.getUnionProperty());

        types.setUnionProperty("Hello");
        assertEquals("Hello", types.getUnionProperty());

        types.setUnionProperty(new Multiply(new Number(2), new Number(12)));
        assertEquals(24, ((Multiply)types.getUnionProperty()).getValue());

        // NOTE: union collections are untyped in Java (java.lang.Object)

        // map
        Map<String, Object> map = new HashMap<>();
        map.put("Foo", new Number(99));
        types.setUnionMapProperty(map);

        // array
        types.setUnionArrayProperty(Arrays.asList(123, new Number(33)));
        assertEquals(33, ((Number)((List<?>)types.getUnionArrayProperty()).get(1)).getValue());
    }

    @Test
    public void createObjectAndCtorOverloads() {
        new Calculator();
        new Calculator(CalculatorProps.builder().maximumValue(10).build());
    }

    @Test
    public void getSetPrimitiveProperties() {
        Number number = new Number(20);
        assertEquals(20, number.getValue());
        assertEquals(40, number.getDoubleValue());
        assertEquals(-30, new Negate(new Add(new Number(20), new Number(10))).getValue());
        assertEquals(20, new Multiply(new Add(new Number(5), new Number(5)), new Number(2)).getValue());
        assertEquals(3 * 3 * 3 * 3, new Power(new Number(3), new Number(4)).getValue());
        assertEquals(999, new Power(new Number(999), new Number(1)).getValue());
        assertEquals(1, new Power(new Number(999), new Number(0)).getValue());
    }

    @Test
    public void callMethods() {
        Calculator calc = new Calculator();
        calc.add(10); assertEquals(10, calc.getValue());
        calc.mul(2); assertEquals(20, calc.getValue());
        calc.pow(5); assertEquals(20 * 20 * 20 * 20 * 20, calc.getValue());
        calc.neg(); assertEquals(-3200000, calc.getValue());
    }

    @Test
    public void unmarshallIntoAbstractType() {
        Calculator calc = new Calculator();
        calc.add(120);
        NumericValue value = calc.getCurr();
        assertEquals(120, value.getValue());
    }

    @Test
    public void getAndSetNonPrimitiveProperties() {
        Calculator calc = new Calculator();
        calc.add(3200000);
        calc.neg();
        calc.setCurr(new Multiply(new Number(2), calc.getCurr()));
        assertEquals(-6400000, calc.getValue());
    }

    @Test
    public void getAndSetEnumValues() {
        Calculator calc = new Calculator();
        calc.add(9);
        calc.pow(3);
        assertEquals(CompositeOperation.CompositionStringStyle.NORMAL, calc.getStringStyle());
        calc.setStringStyle(CompositeOperation.CompositionStringStyle.DECORATED);
        assertEquals(CompositeOperation.CompositionStringStyle.DECORATED, calc.getStringStyle());
        assertEquals("<<[[{{(((1 * (0 + 9)) * (0 + 9)) * (0 + 9))}}]]>>", calc.toString());
    }

    @Test
    public void useEnumFromScopedModule() {
        ReferenceEnumFromScopedPackage obj = new ReferenceEnumFromScopedPackage();
        assertEquals(EnumFromScopedModule.VALUE2, obj.getFoo());
        obj.setFoo(EnumFromScopedModule.VALUE1);
        assertEquals(EnumFromScopedModule.VALUE1, obj.loadFoo());
        obj.saveFoo(EnumFromScopedModule.VALUE2);
        assertEquals(EnumFromScopedModule.VALUE2, obj.getFoo());
    }

    @Test
    public void undefinedAndNull() {
        Calculator calculator = new Calculator();
        assertNull(calculator.getMaxValue());
        calculator.setMaxValue(null);
    }

    @Test
    public void arrays() {
        Sum sum = new Sum();
        sum.setParts(Arrays.asList(new Number(5), new Number(10), new Multiply(new Number(2), new Number(3))));
        assertEquals(10 + 5 + (2 * 3), sum.getValue());
        assertEquals(5, sum.getParts().get(0).getValue());
        assertEquals(6, sum.getParts().get(2).getValue());
        assertEquals("(((0 + 5) + 10) + (2 * 3))", sum.toString());
    }

    @Test
    public void maps() {
        Calculator calc2 = new Calculator(); // Initializer overload (props is optional)
        calc2.add(10);
        calc2.add(20);
        calc2.mul(2);
        assertEquals(2, calc2.getOperationsMap().get("add").size());
        assertEquals(1, calc2.getOperationsMap().get("mul").size());
        assertEquals(30, calc2.getOperationsMap().get("add").get(1).getValue());
    }

    @Test
    public void fluentApi() {
        final Calculator calc3 = new Calculator(CalculatorProps.builder()
                .initialValue(20)
                .maximumValue(30)
                .build());
        calc3.add(3);
        assertEquals(23, calc3.getValue());
    }

    @Test
    public void unionPropertiesWithBuilder() throws Exception {

        // verify we have a withXxx overload for each union type
        UnionProperties.Builder builder = UnionProperties.builder();
        assertNotNull(builder.getClass().getMethod("bar", java.lang.Number.class));
        assertNotNull(builder.getClass().getMethod("bar", String.class));
        assertNotNull(builder.getClass().getMethod("bar", AllTypes.class));
        assertNotNull(builder.getClass().getMethod("foo", String.class));
        assertNotNull(builder.getClass().getMethod("foo", java.lang.Number.class));

        UnionProperties obj1 = UnionProperties.builder()
            .bar(12)
            .foo("Hello")
            .build();
        assertEquals(12, obj1.getBar());
        assertEquals("Hello", obj1.getFoo());

        UnionProperties obj2 = UnionProperties.builder()
            .bar("BarIsString")
            .build();
        assertEquals("BarIsString", obj2.getBar());
        assertNull(obj2.getFoo());

        AllTypes allTypes = new AllTypes();
        UnionProperties obj3 = UnionProperties.builder()
            .bar(allTypes)
            .foo(999)
            .build();
        assertSame(allTypes, obj3.getBar());
        assertEquals(999, obj3.getFoo());
    }

    @Test
    public void exceptions() {
        final Calculator calc3 = new Calculator(CalculatorProps.builder()
            .initialValue(20)
            .maximumValue(30).build());
        calc3.add(3);
        assertEquals(23, calc3.getValue());
        boolean thrown = false;
        try {
            calc3.add(10);
        } catch (JsiiException e) {
            // We expect a RuntimeException that is NOT a JsiiException.
            throw e;
        } catch (RuntimeException e) {
            thrown = true;
        }
        assertTrue(thrown);
        calc3.setMaxValue(40);
        calc3.add(10);
        assertEquals(33, calc3.getValue());
    }

    @Test
    public void unionProperties() {
        Calculator calc3 = new Calculator();
        calc3.setUnionProperty(new Multiply(new Number(9), new Number(3)));
        assertTrue(calc3.getUnionProperty() instanceof Multiply);
        assertEquals(9 * 3, calc3.readUnionValue());
        calc3.setUnionProperty(new Power(new Number(10), new Number(3)));
        assertTrue(calc3.getUnionProperty() instanceof Power);
    }

    @Test
    public void subclassing() {
        Calculator calc = new Calculator();
        calc.setCurr(new AddTen(33));
        calc.neg();
        assertEquals(-43, calc.getValue());
    }

    @Test
    public void testJSObjectLiteralToNative() {
        JSObjectLiteralToNative obj = new JSObjectLiteralToNative();
        JSObjectLiteralToNativeClass obj2 = obj.returnLiteral();

        assertEquals("Hello", obj2.getPropA());
        assertEquals(102, obj2.getPropB());
    }

    @Test
    public void testFluentApiWithDerivedClasses() {
        // make sure that fluent API can be assigned to objects from derived classes
        DerivedFromAllTypes obj = new DerivedFromAllTypes();
        obj.setStringProperty("Hello");
        obj.setNumberProperty(12);
        assertEquals("Hello", obj.getStringProperty());
        assertEquals(12, obj.getNumberProperty());
    }

    /**
     * See that we can create a native object, pass it JS and then unmarshal
     * back without type information.
     */
    @Test
    @SuppressWarnings("deprecated")
    public void creationOfNativeObjectsFromJavaScriptObjects() {
        AllTypes types = new AllTypes();

        Number jsObj = new Number(44);
        types.setAnyProperty(jsObj);
        Object unmarshalledJSObj = types.getAnyProperty();
        assertEquals(Number.class, unmarshalledJSObj.getClass());

        AddTen nativeObj = new AddTen(10);
        types.setAnyProperty(nativeObj);

        Object result1 = types.getAnyProperty();
        assertSame(nativeObj, result1);

        MulTen nativeObj2 = new MulTen(20);
        types.setAnyProperty(nativeObj2);
        Object unmarshalledNativeObj = types.getAnyProperty();
        assertEquals(MulTen.class, unmarshalledNativeObj.getClass());
        assertSame(nativeObj2, unmarshalledNativeObj);
    }

    @Test
    public void asyncOverrides_callAsyncMethod() {
        AsyncVirtualMethods obj = new AsyncVirtualMethods();
        assertEquals(128, obj.callMe());
        assertEquals(528, obj.overrideMe(44));
    }

    @Test
    public void asyncOverrides_overrideAsyncMethod() {
        OverrideAsyncMethods obj = new OverrideAsyncMethods();
        assertEquals(4452, obj.callMe());
    }

    @Test
    public void asyncOverrides_overrideAsyncMethodByParentClass() {
        OverrideAsyncMethodsByBaseClass obj = new OverrideAsyncMethodsByBaseClass();
        assertEquals(4452, obj.callMe());
    }

    @Test
    public void asyncOverrides_overrideCallsSuper() {
        OverrideCallsSuper obj = new OverrideCallsSuper();
        assertEquals(1441, obj.overrideMe(12));
        assertEquals(1209, obj.callMe());
    }

    @Test
    public void asyncOverrides_twoOverrides() {
        TwoOverrides obj = new TwoOverrides();
        assertEquals(684, obj.callMe());
    }

    @Test
    public void asyncOverrides_overrideThrows() {
        AsyncVirtualMethods obj = new AsyncVirtualMethods() {
            public java.lang.Number overrideMe(java.lang.Number mult) {
                throw new RuntimeException("Thrown by native code");
            }
        };

        boolean thrown = false;
        try {
            obj.callMe();
        } catch (JsiiException e) {
            throw e;
        } catch (RuntimeException e) {
            assertTrue(e.getMessage().contains( "Thrown by native code"));
            thrown = true;
        }
        assertTrue(thrown);
    }

    @Test
    public void syncOverrides() {
        SyncOverrides obj = new SyncOverrides();
        assertEquals(10 * 5, obj.callerIsMethod());

        // affect the result
        obj.multiplier = 5;
        assertEquals(10 * 5 * 5, obj.callerIsMethod());

        // verify callbacks are invoked from a property
        assertEquals(10 * 5 * 5, obj.getCallerIsProperty());

    }

    /**
     * Allow overriding property getters and setters.
     */
    @Test
    public void propertyOverrides_get_set() {
        SyncOverrides so = new SyncOverrides();
        assertEquals("I am an override!", so.retrieveValueOfTheProperty());
        so.modifyValueOfTheProperty("New Value");
        assertEquals("New Value", so.anotherTheProperty);
    }

    @Test
    public void propertyOverrides_get_calls_super() {
        SyncVirtualMethods so = new SyncVirtualMethods() {
            public String getTheProperty() {
                String superValue = super.getTheProperty();
                return "super:" + superValue;
            }
        };

        assertEquals("super:initial value", so.retrieveValueOfTheProperty());
        assertEquals("super:initial value", so.getTheProperty());
    }

    @Test
    public void propertyOverrides_set_calls_super() {
        SyncVirtualMethods so = new SyncVirtualMethods() {
            @Override
            public void setTheProperty(String value) {
                super.setTheProperty(value + ":by override");
            }
        };

        so.modifyValueOfTheProperty("New Value");
        assertEquals("New Value:by override", so.getTheProperty());
    }

    @Test
    public void propertyOverrides_get_throws() {
        SyncVirtualMethods so = new SyncVirtualMethods() {
            public String getTheProperty() {
                throw new RuntimeException("Oh no, this is bad");
            }
        };

        boolean thrown = false;
        try {
            so.retrieveValueOfTheProperty();
        } catch (JsiiException e) {
            throw e;
        } catch (RuntimeException e) {
            assertTrue(e.getMessage().contains("Oh no, this is bad"));
            thrown = true;
        }
        assertTrue(thrown);
    }

    @Test
    public void propertyOverrides_set_throws() {
        SyncVirtualMethods so = new SyncVirtualMethods() {
            public void setTheProperty(String value) {
                throw new RuntimeException("Exception from overloaded setter");
            }
        };

        boolean thrown = false;
        try {
            so.modifyValueOfTheProperty("Hii");
        } catch (JsiiException e) {
            throw e;
        } catch (RuntimeException e) {
            assertTrue(e.getMessage().contains("Exception from overloaded setter"));
            thrown = true;
        }
        assertTrue(thrown);
    }

    @Test
    public void propertyOverrides_interfaces() {
        IInterfaceWithProperties obj = new IInterfaceWithProperties() {
            private String x;

            @Override
            public String getReadOnlyString() {
                return "READ_ONLY_STRING";
            }

            @Override
            public String getReadWriteString() {
                return x + "?";
            }

            @Override
            public void setReadWriteString(String value) {
                this.x = value + "!";
            }
        };

        UsesInterfaceWithProperties interact = new UsesInterfaceWithProperties(obj);
        assertEquals("READ_ONLY_STRING", interact.justRead());
        assertEquals("Hello!?", interact.writeAndRead("Hello"));
    }

    @Test
    public void interfaceBuilder() {
        IInterfaceWithProperties obj = new IInterfaceWithProperties() {
            private String value = "READ_WRITE";

            @Override
            public String getReadOnlyString() {
                return "READ_ONLY";
            }

            @Override
            public String getReadWriteString() {
                return value;
            }

            @Override
            public void setReadWriteString(String value) {
                this.value = value;
            }
        };

        UsesInterfaceWithProperties interact = new UsesInterfaceWithProperties(obj);
        assertEquals("READ_ONLY", interact.justRead());
        assertEquals("Hello", interact.writeAndRead("Hello"));
    }

    @Test
    public void syncOverrides_callsSuper() {
        SyncOverrides obj = new SyncOverrides();
        assertEquals(10 * 5, obj.getCallerIsProperty());

        obj.returnSuper = true; // js code returns n * 2
        assertEquals(10 * 2, obj.getCallerIsProperty());
    }

    @Test
    public void fail_syncOverrides_callsDoubleAsync_method() {
        assertThrows(JsiiException.class, () -> {
            try {
                JsiiEngine.setQuietMode(true);

                SyncOverrides obj = new SyncOverrides();
                obj.callAsync = true;

                obj.callerIsMethod();
            } finally {
                JsiiEngine.setQuietMode(false);
            }
        });
    }

    @Test
    public void fail_syncOverrides_callsDoubleAsync_propertyGetter() {
        assertThrows(JsiiException.class, () -> {
            SyncOverrides obj = new SyncOverrides();
            obj.callAsync = true;

            obj.getCallerIsProperty();
        });
    }

    @Test
    public void fail_syncOverrides_callsDoubleAsync_propertySetter() {
        assertThrows(JsiiException.class, () -> {
            SyncOverrides obj = new SyncOverrides();
            obj.callAsync = true;

            obj.setCallerIsProperty(12);
        });
    }

    @Test
    public void testInterfaces() {
        IFriendly friendly;
        IFriendlier friendlier;
        IRandomNumberGenerator randomNumberGenerator;
        IFriendlyRandomGenerator friendlyRandomGenerator;

        Add add = new Add(new Number(10), new Number(20));
        friendly = add;
        // friendlier = add // <-- shouldn't compile since Add implements IFriendly
        assertEquals("Hello, I am a binary operation. What's your name?", friendly.hello());

        Multiply multiply = new Multiply(new Number(10), new Number(30));
        friendly = multiply;
        friendlier = multiply;
        randomNumberGenerator = multiply;
        // friendlyRandomGenerator = multiply; // <-- shouldn't compile
        assertEquals("Hello, I am a binary operation. What's your name?", friendly.hello());
        assertEquals("Goodbye from Multiply!", friendlier.goodbye());
        assertEquals(89, randomNumberGenerator.next());

        friendlyRandomGenerator = new DoubleTrouble();
        assertEquals("world", friendlyRandomGenerator.hello());
        assertEquals(12, friendlyRandomGenerator.next());

        Polymorphism poly = new Polymorphism();
        assertEquals("oh, Hello, I am a binary operation. What's your name?", poly.sayHello(friendly));
        assertEquals("oh, world", poly.sayHello(friendlyRandomGenerator));
        assertEquals("oh, SubclassNativeFriendlyRandom", poly.sayHello(new SubclassNativeFriendlyRandom()));
        assertEquals("oh, I am a native!", poly.sayHello(new PureNativeFriendlyRandom()));
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
    @Test
    public void testNativeObjectsWithInterfaces() {
        // create a pure and native object, not part of the jsii hierarchy, only implements a jsii interface
        PureNativeFriendlyRandom pureNative = new PureNativeFriendlyRandom();
        SubclassNativeFriendlyRandom subclassedNative = new SubclassNativeFriendlyRandom();

        NumberGenerator generatorBoundToPSubclassedObject = new NumberGenerator(subclassedNative);
        assertSame(subclassedNative, generatorBoundToPSubclassedObject.getGenerator());
        generatorBoundToPSubclassedObject.isSameGenerator(subclassedNative);
        assertEquals(10000, generatorBoundToPSubclassedObject.nextTimes100());

        // when we invoke nextTimes100 again, it will use the objref and call into the same object.
        assertEquals(20000, generatorBoundToPSubclassedObject.nextTimes100());

        NumberGenerator generatorBoundToPureNative = new NumberGenerator(pureNative);
        assertSame(pureNative, generatorBoundToPureNative.getGenerator());
        generatorBoundToPureNative.isSameGenerator(pureNative);
        assertEquals(100000, generatorBoundToPureNative.nextTimes100());
        assertEquals(200000, generatorBoundToPureNative.nextTimes100());
    }

    @Test
    public void testLiteralInterface() {
        JSObjectLiteralForInterface obj = new JSObjectLiteralForInterface();
        IFriendly friendly = obj.giveMeFriendly();
        assertEquals("I am literally friendly!", friendly.hello());

        IFriendlyRandomGenerator gen = obj.giveMeFriendlyGenerator();
        assertEquals("giveMeFriendlyGenerator", gen.hello());
        assertEquals(42, gen.next());
    }

    @Test
    public void testInterfaceParameter() {
        JSObjectLiteralForInterface obj = new JSObjectLiteralForInterface();
        IFriendly friendly = obj.giveMeFriendly();
        assertEquals("I am literally friendly!", friendly.hello());

        GreetingAugmenter greetingAugmenter = new GreetingAugmenter();
        String betterGreeting = greetingAugmenter.betterGreeting(friendly);
        assertEquals("I am literally friendly! Let me buy you a drink!", betterGreeting);
    }

    @Test
    public void structs_stepBuilders() {
        Instant someInstant = Instant.now();
        DoubleTrouble nonPrim = new DoubleTrouble();

        DerivedStruct s = new DerivedStruct.Builder()
                .nonPrimitive(nonPrim)
                .bool(false)
                .anotherRequired(someInstant)
                .astring("Hello")
                .anumber(1234)
                .firstOptional(Arrays.asList("Hello", "World"))
                .build();

        assertSame(nonPrim, s.getNonPrimitive());
        assertEquals(false, s.getBool());
        assertEquals(someInstant, s.getAnotherRequired());
        assertEquals("Hello", s.getAstring());
        assertEquals(1234, s.getAnumber());
        assertEquals("World", s.getFirstOptional().get(1));
        assertNull(s.getAnotherOptional());
        assertNull(s.getOptionalArray());

        MyFirstStruct myFirstStruct = new MyFirstStruct.Builder()
                .astring("Hello")
                .anumber(12)
                .build();

        assertEquals("Hello", myFirstStruct.getAstring());
        assertEquals(12, myFirstStruct.getAnumber());

        StructWithOnlyOptionals onlyOptionals1 = new StructWithOnlyOptionals.Builder()
                .optional1("Hello")
                .optional2(1)
                .build();

        assertEquals("Hello", onlyOptionals1.getOptional1());
        assertEquals(1, onlyOptionals1.getOptional2());
        assertNull(onlyOptionals1.getOptional3());

        StructWithOnlyOptionals onlyOptionals2 = new StructWithOnlyOptionals.Builder().build();
        assertNull(onlyOptionals2.getOptional1());
        assertNull(onlyOptionals2.getOptional2());
        assertNull(onlyOptionals2.getOptional3());
    }

    @Test
    public void structs_withDiamondInheritance_correctlyDedupeProperties() {
        DiamondInheritanceTopLevelStruct struct = DiamondInheritanceTopLevelStruct.builder()
                                                                                  .baseLevelProperty("base")
                                                                                  .firstMidLevelProperty("mid1")
                                                                                  .secondMidLevelProperty("mid2")
                                                                                  .topLevelProperty("top")
                                                                                  .build();

        assertEquals("base", struct.getBaseLevelProperty());
        assertEquals("mid1", struct.getFirstMidLevelProperty());
        assertEquals("mid2", struct.getSecondMidLevelProperty());
        assertEquals("top", struct.getTopLevelProperty());
    }

    @Test
    public void structs_nonOptionalequals() {
        StableStruct structA = StableStruct.builder()
                                           .readonlyProperty("one")
                                           .build();

        StableStruct structB = StableStruct.builder()
                                           .readonlyProperty("one")
                                           .build();

        StableStruct structC = StableStruct.builder()
                                           .readonlyProperty("two")
                                           .build();


        assertTrue(structA.equals(structB));
        assertFalse(structA.equals(structC));
    }

    @Test
    public void structs_nonOptionalhashCode() {
        StableStruct structA = StableStruct.builder()
                                           .readonlyProperty("one")
                                           .build();

        StableStruct structB = StableStruct.builder()
                                           .readonlyProperty("one")
                                           .build();

        StableStruct structC = StableStruct.builder()
                                           .readonlyProperty("two")
                                           .build();


        assertTrue(structA.hashCode() == structB.hashCode());
        assertFalse(structA.hashCode() == structC.hashCode());
    }

    @Test
    public void structs_optionalEquals() {
        OptionalStruct structA = OptionalStruct.builder()
                                               .field("one")
                                               .build();

        OptionalStruct structB = OptionalStruct.builder()
                                               .field("one")
                                               .build();

        OptionalStruct structC = OptionalStruct.builder()
                                               .field("two")
                                               .build();

        OptionalStruct structD = OptionalStruct.builder()
                                               .build();


        assertTrue(structA.equals(structB));
        assertFalse(structA.equals(structC));
        assertFalse(structA.equals(structD));
    }

    @Test
    public void structs_optionalHashCode() {
        OptionalStruct structA = OptionalStruct.builder()
                                               .field("one")
                                               .build();

        OptionalStruct structB = OptionalStruct.builder()
                                               .field("one")
                                               .build();

        OptionalStruct structC = OptionalStruct.builder()
                                               .field("two")
                                               .build();

        OptionalStruct structD = OptionalStruct.builder()
                                               .build();

        assertTrue(structA.hashCode() == structB.hashCode());
        assertFalse(structA.hashCode() == structC.hashCode());
        assertFalse(structA.hashCode() == structD.hashCode());
    }

    @Test
    public void structs_multiplePropertiesEquals() {
        DiamondInheritanceTopLevelStruct structA = DiamondInheritanceTopLevelStruct.builder()
                                                                                   .baseLevelProperty("one")
                                                                                   .firstMidLevelProperty("two")
                                                                                   .secondMidLevelProperty("three")
                                                                                   .topLevelProperty("four")
                                                                                   .build();

        DiamondInheritanceTopLevelStruct structB = DiamondInheritanceTopLevelStruct.builder()
                                                                                   .baseLevelProperty("one")
                                                                                   .firstMidLevelProperty("two")
                                                                                   .secondMidLevelProperty("three")
                                                                                   .topLevelProperty("four")
                                                                                   .build();

        DiamondInheritanceTopLevelStruct structC = DiamondInheritanceTopLevelStruct.builder()
                                                                                   .baseLevelProperty("one")
                                                                                   .firstMidLevelProperty("two")
                                                                                   .secondMidLevelProperty("different")
                                                                                   .topLevelProperty("four")
                                                                                   .build();

        assertTrue(structA.equals(structB));
        assertFalse(structA.equals(structC));
    }

    @Test
    public void structs_multiplePropertiesHashCode() {
        DiamondInheritanceTopLevelStruct structA = DiamondInheritanceTopLevelStruct.builder()
                                                                                   .baseLevelProperty("one")
                                                                                   .firstMidLevelProperty("two")
                                                                                   .secondMidLevelProperty("three")
                                                                                   .topLevelProperty("four")
                                                                                   .build();

        DiamondInheritanceTopLevelStruct structB = DiamondInheritanceTopLevelStruct.builder()
                                                                                   .baseLevelProperty("one")
                                                                                   .firstMidLevelProperty("two")
                                                                                   .secondMidLevelProperty("three")
                                                                                   .topLevelProperty("four")
                                                                                   .build();

        DiamondInheritanceTopLevelStruct structC = DiamondInheritanceTopLevelStruct.builder()
                                                                                   .baseLevelProperty("one")
                                                                                   .firstMidLevelProperty("two")
                                                                                   .secondMidLevelProperty("different")
                                                                                   .topLevelProperty("four")
                                                                                   .build();

        assertTrue(structA.hashCode() == structB.hashCode());
        assertFalse(structA.hashCode() == structC.hashCode());
    }

    @Test
    public void structs_containsNullChecks() {
        assertThrows(NullPointerException.class,
                () -> new MyFirstStruct.Builder().build());
    }

    @Test
    public void structs_serializeToJsii() {
        MyFirstStruct firstStruct = MyFirstStruct.builder()
                .astring("FirstString")
                .anumber(999)
                .firstOptional(Arrays.asList("First", "Optional"))
                .build();

        DoubleTrouble doubleTrouble = new DoubleTrouble();

        DerivedStruct derivedStruct = DerivedStruct.builder()
                .nonPrimitive(doubleTrouble)
                .bool(false)
                .anotherRequired(Instant.now())
                .astring("String")
                .anumber(1234)
                .firstOptional(Arrays.asList("one", "two"))
                .build();

        GiveMeStructs gms = new GiveMeStructs();
        assertEquals(999, gms.readFirstNumber(firstStruct));
        assertEquals(1234, gms.readFirstNumber(derivedStruct)); // since derived inherits from first
        assertSame(doubleTrouble, gms.readDerivedNonPrimitive(derivedStruct));

        StructWithOnlyOptionals literal = gms.getStructLiteral();
        assertEquals("optional1FromStructLiteral", literal.getOptional1());
        assertEquals(false, literal.getOptional3());
        assertNull(literal.getOptional2());
    }

    @Test
    public void structs_returnedLiteralEqualsNativeBuilt() {
        GiveMeStructs gms = new GiveMeStructs();
        StructWithOnlyOptionals returnedLiteral = gms.getStructLiteral();
        StructWithOnlyOptionals nativeBuilt = StructWithOnlyOptionals.builder()
                                                                     .optional1("optional1FromStructLiteral")
                                                                     .optional3(false)
                                                                     .build();

        assertEquals(nativeBuilt.getOptional1(), returnedLiteral.getOptional1());
        assertEquals(nativeBuilt.getOptional2(), returnedLiteral.getOptional2());
        assertEquals(nativeBuilt.getOptional3(), returnedLiteral.getOptional3());
        assertEquals(nativeBuilt, returnedLiteral);
        assertEquals(returnedLiteral, nativeBuilt);
        assertEquals(nativeBuilt.hashCode(), returnedLiteral.hashCode());
    }

    @Test
    public void statics() {
        assertEquals("hello ,Yoyo!", Statics.staticMethod("Yoyo"));
        assertEquals("default", Statics.getInstance().getValue());

        Statics newStatics = new Statics("new value");
        Statics.setInstance(newStatics);
        assertSame(Statics.getInstance(), newStatics);
        assertEquals(Statics.getInstance().getValue(), "new value");

        assertEquals(100, Statics.getNonConstStatic());
    }

    @Test
    @SuppressWarnings("unchecked")
    public void consts() throws Exception {
        /*
         * Here be dragons: "consts" are actually pre-fetched when the class gets loaded, and they are static final
         * properties (so we cannot reset those). Since those tests need to run with a new Engine process, what was
         * loaded at this point may have been loaded by an engine that was long since disposed of. So we need to
         * actually run this code through a classloader that'll get a brand _new_ instance of the class.
         *
         * This whole process relies on ClassLoader black magic because I don't know a better way.
         */
        final Class<ConstTestRunner> reloadedClass = ReloadingClassLoader.reload(this.getClass().getClassLoader(), ConstTestRunner.class, Statics.class);
        final Constructor<ConstTestRunner> constructor = reloadedClass.getConstructor();
        constructor.setAccessible(true);

        final Runnable runnable = constructor.newInstance();
        runnable.run();
    }

    private static final class ConstTestRunner implements Runnable {
        public ConstTestRunner() {}

        public final void run() {
            assertEquals("hello", Statics.FOO);
            DoubleTrouble obj = Statics.CONST_OBJ;
            assertEquals("world", obj.hello());

            assertEquals(1234, Statics.BAR);
            assertEquals("world", Statics.ZOO_BAR.get("hello"));
        }
    }

    @Test
    public void reservedKeywordsAreSlugifiedInMethodNames() {
        JavaReservedWords obj = new JavaReservedWords();
        obj.doImport();
        obj.doConst();
        assertEquals("hello", obj.getWhileValue()); // properties should also be 'slugified'
    }

    @Test
    public void reservedKeywordsAreSlugifiedInStructProperties() {
        StructWithJavaReservedWords struct = StructWithJavaReservedWords.builder()
                                                                        .assertValue("one")
                                                                        .defaultValue("two")
                                                                        .build();

        assertEquals("one", struct.getAssertValue());
        assertEquals("two", struct.getDefaultValue());
    }

    @Test
    public void reservedKeywordsAreSlugifiedInClassProperties() {
        ClassWithJavaReservedWords obj = new ClassWithJavaReservedWords("one");

        String result = obj.doImport("two");

        assertEquals("onetwo", result);
    }

    @Test
    public void hashCodeIsResistantToPropertyShadowingResultVariable() {
        StructWithJavaReservedWords first = StructWithJavaReservedWords.builder().defaultValue("one").build();
        StructWithJavaReservedWords second = StructWithJavaReservedWords.builder().defaultValue("one").build();
        StructWithJavaReservedWords third = StructWithJavaReservedWords.builder().defaultValue("two").build();

        assertEquals(first.hashCode(), second.hashCode());
        assertNotEquals(first.hashCode(), third.hashCode());
    }

    @Test
    public void equalsIsResistantToPropertyShadowingResultVariable() {
        StructWithJavaReservedWords first = StructWithJavaReservedWords.builder().defaultValue("one").build();
        StructWithJavaReservedWords second = StructWithJavaReservedWords.builder().defaultValue("one").build();
        StructWithJavaReservedWords third = StructWithJavaReservedWords.builder().defaultValue("two").build();

        assertEquals(first, second);
        assertNotEquals(first, third);
    }

    @Test
    public void nodeStandardLibrary() {
        NodeStandardLibrary obj = new NodeStandardLibrary();
        assertEquals("Hello, resource!", obj.fsReadFile());
        assertEquals("Hello, resource! SYNC!", obj.fsReadFileSync());
        assertTrue(obj.getOsPlatform().length() > 0);
        assertEquals("6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50",
            obj.cryptoSha256());
    }

    @Test
    public void returnAbstract() {
        AbstractClassReturner obj = new AbstractClassReturner();
        AbstractClass obj2 = obj.giveMeAbstract();

        assertEquals("Hello, John!!", obj2.abstractMethod("John"));
        assertEquals("propFromInterfaceValue", obj2.getPropFromInterface());
        assertEquals(42, obj2.nonAbstractMethod());

        IInterfaceImplementedByAbstractClass iface = obj.giveMeInterface();
        assertEquals("propFromInterfaceValue", iface.getPropFromInterface());

        assertEquals("hello-abstract-property", obj.getReturnAbstractFromProperty().getAbstractProperty());
    }

    @Test
    public void doNotOverridePrivates_method_public() {
        DoNotOverridePrivates obj = new DoNotOverridePrivates() {
            @SuppressWarnings("unused")
            public String privateMethod() {
                return "privateMethod-Override";
            }
        };

        assertEquals("privateMethod", obj.privateMethodValue());
    }

    @Test
    public void doNotOverridePrivates_method_private() {
        DoNotOverridePrivates obj = new DoNotOverridePrivates() {
            @SuppressWarnings("unused")
            private String privateMethod() {
                return "privateMethod-Override";
            }
        };

        assertEquals("privateMethod", obj.privateMethodValue());
    }

    @Test
    public void doNotOverridePrivates_property_by_name_private() {
        DoNotOverridePrivates obj = new DoNotOverridePrivates() {
            @SuppressWarnings("unused")
            private String privateProperty() {
                return "privateProperty-Override";
            }
        };

        assertEquals("privateProperty", obj.privatePropertyValue());
    }

    @Test
    public void doNotOverridePrivates_property_by_name_public() {
        DoNotOverridePrivates obj = new DoNotOverridePrivates() {
            @SuppressWarnings("unused")
            public String privateProperty() {
                return "privateProperty-Override";
            }
        };

        assertEquals("privateProperty", obj.privatePropertyValue());
    }

    @Test
    public void doNotOverridePrivates_property_getter_public() {
        DoNotOverridePrivates obj = new DoNotOverridePrivates() {
            @SuppressWarnings("unused")
            public String getPrivateProperty() {
                return "privateProperty-Override";
            }
            @SuppressWarnings("unused")
            public void setPrivateProperty(String value) {
                throw new RuntimeException("Boom");
            }
        };

        assertEquals("privateProperty", obj.privatePropertyValue());

        // verify the setter override is not invoked.
        obj.changePrivatePropertyValue("MyNewValue");
        assertEquals("MyNewValue", obj.privatePropertyValue());
    }

    @Test
    public void doNotOverridePrivates_property_getter_private() {
        DoNotOverridePrivates obj = new DoNotOverridePrivates() {
            @SuppressWarnings("unused")
            private String getPrivateProperty() {
                return "privateProperty-Override";
            }
            @SuppressWarnings("unused")
            public void setPrivateProperty(String value) {
                throw new RuntimeException("Boom");
            }
        };

        assertEquals("privateProperty", obj.privatePropertyValue());

        // verify the setter override is not invoked.
        obj.changePrivatePropertyValue("MyNewValue");
        assertEquals("MyNewValue", obj.privatePropertyValue());
    }

    @Test
    public void classWithPrivateConstructorAndAutomaticProperties() {
        ClassWithPrivateConstructorAndAutomaticProperties obj = ClassWithPrivateConstructorAndAutomaticProperties.create("Hello", "Bye");
        assertEquals("Bye", obj.getReadWriteString());
        obj.setReadWriteString("Hello");
        assertEquals("Hello", obj.getReadOnlyString());
    }

    @Test
    public void nullShouldBeTreatedAsUndefined() {
        NullShouldBeTreatedAsUndefined obj = new NullShouldBeTreatedAsUndefined("hello", null);
        obj.giveMeUndefined(null);
        obj.giveMeUndefinedInsideAnObject(NullShouldBeTreatedAsUndefinedData.builder()
                .thisShouldBeUndefined(null)
                .arrayWithThreeElementsAndUndefinedAsSecondArgument(Arrays.asList("hello", null, "boom"))
                .build());
        obj.setChangeMeToUndefined(null);
        obj.verifyPropertyIsUndefined();
    }

    @Test
    public void testJsiiAgent() {
        assertEquals("Java/" + System.getProperty("java.version"), JsiiAgent.getValue());
    }

    /**
     * @see https://github.com/aws/jsii/issues/320
     */
    @Test
    public void receiveInstanceOfPrivateClass() {
        assertTrue(new ReturnsPrivateImplementationOfInterface().getPrivateImplementation().getSuccess());
    }

    @Test
    public void objRefsAreLabelledUsingWithTheMostCorrectType() {
        final PublicClass classRef = Constructors.makeClass();
        final IPublicInterface ifaceRef = Constructors.makeInterface();

        assertTrue(classRef instanceof InbetweenClass);
        assertNotNull(ifaceRef);
    }

    /**
     * Verifies that data values that are not set are recognized as unset keys
     * in JavaScript-land. See https://github.com/aws/jsii/issues/375
     */
    @Test
    public void eraseUnsetDataValues() {
        EraseUndefinedHashValuesOptions opts = EraseUndefinedHashValuesOptions.builder()
                .option1("option1")
                .build();

        assertTrue(EraseUndefinedHashValues.doesKeyExist(opts, "option1"));
        assertFalse(EraseUndefinedHashValues.doesKeyExist(opts, "option2"));

        assertEquals("{prop2=value2}", EraseUndefinedHashValues.prop1IsNull().toString());
        assertEquals("{prop1=value1}", EraseUndefinedHashValues.prop2IsUndefined().toString());
    }

    @Test
    public void objectIdDoesNotGetReallocatedWhenTheConstructorPassesThisOut() {
        final PartiallyInitializedThisConsumer reflector = new PartiallyInitializedThisConsumerImpl();
        new ConstructorPassesThisOut(reflector);
    }

    @Test
    public void variadicMethodCanBeInvoked() {
        final VariadicMethod variadicMethod = new VariadicMethod(1);
        final List<java.lang.Number> result = variadicMethod.asArray(3, 4, 5, 6);
        assertEquals(Arrays.asList(1, 3, 4, 5, 6), result);
    }

    @Test
    public void callbacksCorrectlyDeserializeArguments() {
        final DataRenderer renderer = new DataRenderer() {
            public final String renderMap(final Map<String, Object> map) {
                return super.renderMap(map);
            }
        };
        assertEquals("{\n  \"anumber\": 42,\n  \"astring\": \"bazinga!\"\n}", renderer.render());
    }

    @Test
    public void canLoadEnumValues() {
        assertNotNull(EnumDispenser.randomStringLikeEnum());
        assertNotNull(EnumDispenser.randomIntegerLikeEnum());
    }

    public void listInClassCannotBeModified() {
        List<String> modifiableList = Arrays.asList("one", "two");

        ClassWithCollections classWithCollections = new ClassWithCollections(Collections.emptyMap(), modifiableList);

        assertThrows(UnsupportedOperationException.class,
                () -> classWithCollections.getArray().add("three"));
    }

    @Test
    public void listInClassCanBeReadCorrectly() {
        List<String> modifiableList = Arrays.asList("one", "two");

        ClassWithCollections classWithCollections = new ClassWithCollections(Collections.emptyMap(), modifiableList);

        assertThat(classWithCollections.getArray(), contains("one", "two"));
    }

    @Test
    public void mapInClassCannotBeModified() {
        Map<String, String> modifiableMap = new HashMap<>();
        modifiableMap.put("key", "value");

        ClassWithCollections classWithCollections = new ClassWithCollections(modifiableMap, Collections.emptyList());

        assertThrows(UnsupportedOperationException.class,
                () -> classWithCollections.getMap().put("keyTwo", "valueTwo"));
    }

    @Test
    public void mapInClassCanBeReadCorrectly() {
        Map<String, String> modifiableMap = new HashMap<>();
        modifiableMap.put("key", "value");

        ClassWithCollections classWithCollections = new ClassWithCollections(modifiableMap, Collections.emptyList());

        Map<String, String> result = classWithCollections.getMap();
        assertThat(result, hasEntry("key", "value"));
        assertThat(result.size(), is(1));
    }

    @Test
    public void staticListInClassCannotBeModified() {
        assertThrows(UnsupportedOperationException.class,
                () -> ClassWithCollections.getStaticArray().add("three"));
    }

    @Test
    public void staticListInClassCanBeReadCorrectly() {
        assertThat(ClassWithCollections.getStaticArray(), contains("one", "two"));
    }

    @Test
    public void staticMapInClassCannotBeModified() {
        assertThrows(UnsupportedOperationException.class,
                () -> ClassWithCollections.getStaticMap().put("keyTwo", "valueTwo"));
    }

    @Test
    public void staticMapInClassCanBeReadCorrectly() {
        Map<String, String> result = ClassWithCollections.getStaticMap();
        assertThat(result, hasEntry("key1", "value1"));
        assertThat(result, hasEntry("key2", "value2"));
        assertThat(result.size(), is(2));
    }

    @Test
    public void arrayReturnedByMethodCannotBeModified() {
        assertThrows(UnsupportedOperationException.class,
                () -> ClassWithCollections.createAList().add("three"));
    }

    @Test
    public void arrayReturnedByMethodCanBeRead() {
        assertThat(ClassWithCollections.createAList(), contains("one", "two"));
    }

    @Test
    public void mapReturnedByMethodCannotBeModified() {
        assertThrows(UnsupportedOperationException.class,
                () -> ClassWithCollections.createAMap().put("keyThree", "valueThree"));
    }

    @Test
    public void mapReturnedByMethodCanBeRead() {
        Map<String, String> result = ClassWithCollections.createAMap();
        assertThat(result, hasEntry("key1", "value1"));
        assertThat(result, hasEntry("key2", "value2"));
        assertThat(result.size(), is(2));
    }

    @Test
    public void canOverrideProtectedMethod() {
        final String challenge = "Cthulhu Fhtagn!";
        final OverridableProtectedMember overridden = new OverridableProtectedMember() {
            @Override
            protected String overrideMe() {
                return challenge;
            }
        };
        assertEquals(challenge, overridden.valueFromProtected());
    }

    @Test
    public void canOverrideProtectedGetter() {
        final String challenge = "Cthulhu Fhtagn!";
        final OverridableProtectedMember overridden = new OverridableProtectedMember() {
            @Override
            protected String getOverrideReadOnly() {
                return "Cthulhu ";
            }

            @Override
            protected String getOverrideReadWrite() {
                return "Fhtagn!";
            }
        };
        assertEquals(challenge, overridden.valueFromProtected());
    }

    @Test
    public void canOverrideProtectedSetter() {
        final String challenge = "Bazzzzzzzzzzzaar...";
        final OverridableProtectedMember overridden = new OverridableProtectedMember() {
            @Override
            protected void setOverrideReadWrite(String value) {
                super.setOverrideReadWrite("zzzzzzzzz" + value);
            }
        };
        overridden.switchModes();
        assertEquals(challenge, overridden.valueFromProtected());
    }

    @Test
    public void canLeverageIndirectInterfacePolymorphism() {
        final IAnonymousImplementationProvider provider = new AnonymousImplementationProvider();
        assertEquals(1337, provider.provideAsClass().getValue());
        assertEquals(1337, provider.provideAsInterface().getValue());
        assertEquals("to implement", provider.provideAsInterface().verb());
    }

    @Test
    public void correctlyDeserializesStructUnions() {
        final StructA a0 = StructA.builder()
                .requiredString("Present!")
                .optionalString("Bazinga!")
                .build();
        final StructA a1 = StructA.builder()
                .requiredString("Present!")
                .optionalNumber(1337)
                .build();
        final StructB b0 = StructB.builder()
                .requiredString("Present!")
                .optionalBoolean(true)
                .build();
        final StructB b1 = StructB.builder()
                .requiredString("Present!")
                .optionalStructA(a1)
                .build();

        assertTrue(StructUnionConsumer.isStructA(a0));
        assertTrue(StructUnionConsumer.isStructA(a1));
        assertFalse(StructUnionConsumer.isStructA(b0));
        assertFalse(StructUnionConsumer.isStructA(b1));

        assertFalse(StructUnionConsumer.isStructB(a0));
        assertFalse(StructUnionConsumer.isStructB(a1));
        assertTrue(StructUnionConsumer.isStructB(b0));
        assertTrue(StructUnionConsumer.isStructB(b1));
    }

    @Test
    public void returnSubclassThatImplementsInterface976() {
        IReturnJsii976 obj = SomeTypeJsii976.returnReturn();
        assertEquals(obj.getFoo(), 333);
    }

    @Test
    public void testStructsCanBeDowncastedToParentType() {
        assertNotNull(Demonstrate982.takeThis());
        assertNotNull(Demonstrate982.takeThisToo());
    }

    @Test
    public void testNullIsAValidOptionalList() {
        assertNull(DisappointingCollectionSource.MAYBE_LIST);
    }

    @Test
    public void testNullIsAValidOptionalMap() {
        assertNull(DisappointingCollectionSource.MAYBE_MAP);
    }

    static class PartiallyInitializedThisConsumerImpl extends PartiallyInitializedThisConsumer {
        @Override
        public String consumePartiallyInitializedThis(final ConstructorPassesThisOut obj,
                                                      final Instant dt,
                                                      final AllTypesEnum en) {
            assertNotNull(obj);
            assertEquals(Instant.EPOCH, dt);
            assertEquals(AllTypesEnum.THIS_IS_GREAT, en);

            return "OK";
        }
    }

    static class MulTen extends Multiply {
        public MulTen(final int value) {
            super(new Number(value), new Number(10));
        }
    }

    static class AddTen extends Add {
        public AddTen(final int value) {
            super(new Number(value), new Number(10));
        }
    }

    static class DerivedFromAllTypes extends AllTypes {

    }

    static class OverrideAsyncMethods extends AsyncVirtualMethods {
        @Override
        public java.lang.Number overrideMe(java.lang.Number mult) {
            return this.foo() * 2;
        }

        /**
         * Implement another method, which doesn't override anything in the base class.
         * This should obviously be possible.
         */
        public int foo() {
            return 2222;
        }
    }

    static class OverrideAsyncMethodsByBaseClass extends OverrideAsyncMethods {

    }

    static class OverrideCallsSuper extends AsyncVirtualMethods {
        @Override
        public java.lang.Number overrideMe(java.lang.Number mult) {
            java.lang.Number superRet = super.overrideMe(mult);
            return superRet.intValue() * 10 + 1;
        }
    }

    static class TwoOverrides extends AsyncVirtualMethods {
        @Override
        public java.lang.Number overrideMe(java.lang.Number mult) {
            return 666;
        }

        @Override
        public java.lang.Number overrideMeToo() {
            return 10;
        }
    }

    static class SyncOverrides extends SyncVirtualMethods {

        int multiplier = 1;
        boolean returnSuper = false;
        boolean callAsync = false;

        @Override
        public java.lang.Number virtualMethod(java.lang.Number n) {
            if (returnSuper) {
                return super.virtualMethod(n);
            }

            if (callAsync) {
                OverrideAsyncMethods obj = new OverrideAsyncMethods();
                return obj.callMe();
            }

            return 5 * n.intValue() * multiplier;
        }

        @Override
        public String getTheProperty() {
            return "I am an override!";
        }

        @Override
        public void setTheProperty(String value) {
            this.anotherTheProperty = value;
        }

        /**
         * Used by the test that verifies that it is possible to override a property setter.
         */
        public String anotherTheProperty;
    }

    /**
     * In this case, the class does not derive from the JsiiObject hierarchy. It means
     * that when we pass it along to javascript, we won't have an objref. This should result
     * in creating a new empty javascript object and applying the overrides.
     *
     * The newly created objref will need to be stored somewhere (in the engine's object map)
     * so that subsequent calls won't create a new object every time.
     */
    class PureNativeFriendlyRandom implements IFriendlyRandomGenerator {

        private int nextNumber = 1000;

        @Override
        public java.lang.Number next() {
            int n = this.nextNumber;
            this.nextNumber += 1000;
            return n;
        }

        @Override
        public String hello() {
            return "I am a native!";
        }
    }

    class SubclassNativeFriendlyRandom extends Number implements IFriendly, IRandomNumberGenerator {

        private int nextNumber;

        public SubclassNativeFriendlyRandom() {
            super(908);
            this.nextNumber = 100;
        }

        @Override
        public String hello() {
            return "SubclassNativeFriendlyRandom";
        }

        @Override
        public java.lang.Number next() {
            int next = this.nextNumber;
            this.nextNumber += 100;
            return next;
        }
    }

    @Test
    public void canUseInterfaceSetters() {
        final IObjectWithProperty obj = ObjectWithPropertyProvider.provide();
        obj.setProperty("New Value");
        assertTrue(obj.wasSet());
    }

    @Test
    public void structsAreUndecoratedOntheWayToKernel() throws IOException {
        final ObjectMapper om = new ObjectMapper();
        final String json = JsonFormatter.stringify(StructB.builder().requiredString("Bazinga!").optionalBoolean(false).build());
        final JsonNode actual = om.readTree(json);

        final ObjectNode expected = om.createObjectNode();
        expected.put("requiredString", "Bazinga!");
        expected.put("optionalBoolean", Boolean.FALSE);

        assertEquals(expected, actual);
    }

    @Test
    public void canObtainReferenceWithOverloadedSetter() {
        assertNotNull(ConfusingToJackson.makeInstance());
    }

    @Test
    public void canObtainStructReferenceWithOverloadedSetter() {
        assertNotNull(ConfusingToJackson.makeStructInstance());
    }

    @Test
    public void pureInterfacesCanBeUsedTransparently() {
        final StructB expected = StructB.builder()
            .requiredString("It's Britney b**ch!")
            .build();
        final IStructReturningDelegate delegate = new IStructReturningDelegate() {
            public StructB returnStruct() {
                return expected;
            }
        };
        final ConsumePureInterface consumer = new ConsumePureInterface(delegate);
        assertEquals(expected, consumer.workItBaby());
    }

    @Test
    public void pureInterfacesCanBeUsedTransparently_WhenTransitivelyImplementing() {
        final StructB expected = StructB.builder()
            .requiredString("It's Britney b**ch!")
            .build();
        final IStructReturningDelegate delegate = new IndirectlyImplementsStructReturningDelegate(expected);
        final ConsumePureInterface consumer = new ConsumePureInterface(delegate);
        assertEquals(expected, consumer.workItBaby());
    }

    private static final class IndirectlyImplementsStructReturningDelegate extends ImplementsStructReturningDelegate {
        public IndirectlyImplementsStructReturningDelegate(final StructB struct) {
            super(struct);
        }
    }

    private static class ImplementsStructReturningDelegate implements IStructReturningDelegate {
        private final StructB struct;

        protected ImplementsStructReturningDelegate(final StructB struct) {
            this.struct = struct;
        }

        public StructB returnStruct() {
            return this.struct;
        }
    }

    @Test
    public void interfacesCanBeUsedTransparently_WhenAddedToJsiiType() {
        final StructB expected = StructB.builder()
            .requiredString("It's Britney b**ch!")
            .build();
        final IStructReturningDelegate delegate = new ImplementsAdditionalInterface(expected);
        final ConsumePureInterface consumer = new ConsumePureInterface(delegate);
        assertEquals(expected, consumer.workItBaby());
    }

    private static final class ImplementsAdditionalInterface extends AllTypes implements IStructReturningDelegate {
        private final StructB struct;

        public ImplementsAdditionalInterface(final StructB struct) {
            this.struct = struct;
        }

        public StructB returnStruct() {
            return this.struct;
        }
    }

    @Test
    public void liftedKwargWithSameNameAsPositionalArg() {
        // This is a replication of a test that mostly affects languages with keyword arguments (e.g: Python, Ruby, ...)
        final Bell bell = new Bell();
        final AmbiguousParameters amb = AmbiguousParameters.Builder.create(bell).scope("Driiiing!").build();
        assertEquals(bell, amb.getScope());
        assertEquals(StructParameterType.builder().scope("Driiiing!").build(), amb.getProps());
    }

    @Test
    public void abstractMembersAreCorrectlyHandled() {
        final AbstractSuite abstractSuite = new AbstractSuite() {
            private String property;

            @Override
            protected String someMethod(String str) {
                return String.format("Wrapped<%s>", str);
            }

            @Override
            protected String getProperty() {
                return this.property;
            }

            @Override
            protected void setProperty(String value) {
                this.property = String.format("String<%s>", value);
            }
        };

        assertEquals("Wrapped<String<Oomf!>>", abstractSuite.workItAll("Oomf!"));
    }

    @Test
    public void collectionOfInterfaces_ListOfStructs() {
        for (final Object obj : InterfaceCollections.listOfStructs()) {
            assertTrue(obj instanceof StructA, () -> obj + " is an instance of " + StructA.class.getCanonicalName());
        }
    }

    @Test
    public void collectionOfInterfaces_ListOfInterfaces() {
        for (final Object obj : InterfaceCollections.listOfInterfaces()) {
            assertTrue(obj instanceof IBell, () -> obj + " is an instance of " + IBell.class.getCanonicalName());
        }
    }

    @Test
    public void collectionOfInterfaces_MapOfStructs() {
        for (final Object obj : InterfaceCollections.mapOfStructs().values()) {
            assertTrue(obj instanceof StructA, () -> obj + " is an instance of " + StructA.class.getCanonicalName());
        }
    }

    @Test
    public void collectionOfInterfaces_MapOfInterfaces() {
        for (final Object obj : InterfaceCollections.mapOfInterfaces().values()) {
            assertTrue(obj instanceof IBell, () -> obj + " is an instance of " + IBell.class.getCanonicalName());
        }
    }

    @Test
    public void classesCanSelfReferenceDuringClassInitialization() {
        final OuterClass outerClass = new OuterClass();
        assertNotNull(outerClass.getInnerClass());
    }

    @Test
    public void iso8601DoesNotDeserializeToDate() {
        final TimeZone tz = TimeZone.getTimeZone("UTC");
        final DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'");
        df.setTimeZone(tz);
        final String nowAsISO = df.format(new Date());

        final IWallClock wallClock = new IWallClock() {
            @NotNull
            @Override
            public String iso8601Now() {
                return nowAsISO;
            }
        };

        final Entropy entropy = new Entropy(wallClock) {
            @NotNull
            @Override
            public String repeat(@NotNull final String word) {
                return word;
            }
        };

        assertEquals(nowAsISO, entropy.increase());
    }

    @Test
    public void classCanBeUsedWhenNotExpressedlyLoaded() {
        final Cdk16625 subject = new Cdk16625() {
            @NotNull
            @Override
            protected java.lang.Number unwrap(final IRandomNumberGenerator rng) {
                return rng.next();
            }
        };
        subject.test();
    }

    @Test
    public void strippedDeprecatedMemberCanBeReceived() {
        assertNotNull(InterfaceFactory.create());
    }
}
