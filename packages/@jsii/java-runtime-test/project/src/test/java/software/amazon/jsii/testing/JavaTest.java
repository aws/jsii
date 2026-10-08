package software.amazon.jsii.testing;

import org.junit.jupiter.api.Test;
import software.amazon.jsii.tests.calculator.*;
import software.amazon.jsii.tests.calculator.lib.MyFirstStruct;
import software.amazon.jsii.tests.calculator.lib.StructWithOnlyOptionals;

import java.time.Instant;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests that exercise behaviour that is specific to the Java binding (idiomatic {@code equals}/{@code hashCode},
 * generated builders, and the handling of private members). These used to be part of the language-agnostic compliance
 * suite, but they verify Java-specific guarantees rather than cross-language jsii behaviour, so they live here as plain
 * JUnit 5 tests, outside of the {@link software.amazon.jsii.ComplianceSuiteHarness} reporting.
 */
public class JavaTest {
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
    public void canObtainStructReferenceWithOverloadedSetter() {
        assertNotNull(ConfusingToJackson.makeStructInstance());
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
}
