package software.amazon.jsii.testing;

import org.junit.jupiter.api.Test;
import software.amazon.jsii.JsiiException;
import software.amazon.jsii.JsiiObject;
import software.amazon.jsii.tests.calculator.*;
import software.amazon.jsii.tests.calculator.anonymous.*;
import software.amazon.jsii.tests.calculator.anonymous.UseOptions;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class StructAImplementer implements StructA, StructB {
  public String requiredString;

  StructAImplementer(String param) {
    requiredString = param;
  }

  public void setRequiredString(String param) {
    requiredString = param;
  }

  public String getRequiredString() {
    return requiredString;
  }
}

public class TypeCheckingTest {
    @Test
    public void Constructor() {
        boolean thrown = false;
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("good", new StructAImplementer("present"));
        map.put("bad", "Not a StructA or StructB");
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        list.add(map);
        Exception e = assertThrows(IllegalArgumentException.class, () ->
        {
            new ClassWithCollectionOfUnions(list);
        });

        assertEquals("Expected unionProperty.get(0).get(\"bad\") to be one of: software.amazon.jsii.tests.calculator.StructA, software.amazon.jsii.tests.calculator.StructB; received class java.lang.String, (Parameter 'unionProperty')", e.getMessage());
    }

    @Test
    public void AnonymousObjectIsValid()
    {
        Object anonymousObject = UseOptions.provide("A");
        assertEquals(JsiiObject.class, anonymousObject.getClass());
        assertEquals("A", UseOptions.consume(anonymousObject));
    }

    @Test
    public void NestedUnion() {
        IllegalArgumentException e = assertThrows(IllegalArgumentException.class, () ->
        {
            ArrayList<Object> list = new ArrayList<Object>();
            list.add(1337.42);
            new ClassWithNestedUnion(list);
        });
        assertEquals("Expected unionProperty.get(0) to be one of: java.util.Map<java.lang.String, java.lang.Object>, java.util.List<java.lang.Object>; received class java.lang.Double, (Parameter 'unionProperty')", e.getMessage());

        e = assertThrows(IllegalArgumentException.class, () ->
        {
            ArrayList<Object> list = new ArrayList<Object>();
            ArrayList<Object> nestedList = new ArrayList<Object>();
            nestedList.add(new StructAImplementer("required"));
            nestedList.add(1337.42);
            list.add(nestedList);
            new ClassWithNestedUnion(list);
        });
        assertEquals("Expected unionProperty.get(0).get(1) to be one of: software.amazon.jsii.tests.calculator.StructA, software.amazon.jsii.tests.calculator.StructB; received class java.lang.Double, (Parameter 'unionProperty')", e.getMessage());

        e = assertThrows(IllegalArgumentException.class, () ->
        {
            HashMap<String, Object> map = new HashMap<String, Object>();
            ArrayList<Object> list = new ArrayList<Object>();
            map.put("good", new StructAImplementer("present"));
            map.put("bad", "Not a StructA or StructB");
            list.add(map);
            new ClassWithNestedUnion(list);
        });
        assertEquals("Expected unionProperty.get(0).get(\"bad\") to be one of: software.amazon.jsii.tests.calculator.StructA, software.amazon.jsii.tests.calculator.StructB; received class java.lang.String, (Parameter 'unionProperty')", e.getMessage());
    }

    @Test
    public void Variadic() {
        IllegalArgumentException e = assertThrows(IllegalArgumentException.class, () ->
        {
            new VariadicTypeUnion(new StructAImplementer("present"), 1337.42);
        });
        assertEquals("Expected __union__asList.get(1) to be one of: software.amazon.jsii.tests.calculator.StructA, software.amazon.jsii.tests.calculator.StructB; received class java.lang.Double, (Parameter 'union')", e.getMessage());
    }

    @Test
    public void setter() {
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("good", new StructAImplementer("present"));
        map.put("bad", "Not a StructA or StructB");
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        ClassWithCollectionOfUnions subject = new ClassWithCollectionOfUnions(list);
        list.add(map);

        IllegalArgumentException e = assertThrows(IllegalArgumentException.class, () -> {
            subject.setUnionProperty(list);
        });
        assertEquals("Expected value.get(0).get(\"bad\") to be one of: software.amazon.jsii.tests.calculator.StructA, software.amazon.jsii.tests.calculator.StructB; received class java.lang.String, (Parameter 'value')", e.getMessage());
    }

    @Test
    public void StaticMethod()
    {
        IllegalArgumentException e = assertThrows(IllegalArgumentException.class, () -> {
            StructUnionConsumer.isStructA("Not a StructA");
        });
        assertEquals("Expected struct to be one of: software.amazon.jsii.tests.calculator.StructA, software.amazon.jsii.tests.calculator.StructB; received class java.lang.String, (Parameter 'struct')", e.getMessage());
    }
}
