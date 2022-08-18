package software.amazon.jsii.testing;

import org.junit.jupiter.api.Test;
import software.amazon.jsii.JsiiException;
import software.amazon.jsii.tests.calculator.*;

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
        try {

            HashMap<String, Object> map = new HashMap<String, Object>();
            map.put("good", new StructAImplementer("present"));
            map.put("bad", "Not a StructA or StructB");
            ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
            list.add(map);
            new ClassWithCollectionOfUnions(list);
        }
        catch (IllegalArgumentException e) {
            thrown = true;
            assertEquals("foo", e.getMessage());
        }
        assertTrue(thrown);
    }

    /*
    @Test
    public void setter() {
        boolean thrown = false;
        try {
            HashMap<String, Object> map = new HashMap<String, Object>();
            map.put("good", new StructAImplementer("present"));
            map.put("bad", "Not a StructA or StructB");
            ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
            list.add(map);
            new ClassWithCollectionOfUnions(list);
        }
        catch (JsiiException e) {
            thrown = true;
            assertEquals("foo", e.getMessage());
        }
        assertTrue(thrown);
    }
    */
}