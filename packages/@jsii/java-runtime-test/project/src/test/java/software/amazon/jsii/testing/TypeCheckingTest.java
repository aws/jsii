package software.amazon.jsii.testing;

import org.junit.jupiter.api.Test;
import software.amazon.jsii.JsiiException;
//import software.amazon.jsii.tests.compliance;
import software.amazon.jsii.tests.calculator.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class TypeCheckingTest {
    @Test
    public void Constructor() {
        boolean thrown = false;
        try {
            new ClassWithCollectionOfUnions(new ArrayList<Map<String, Object>>());
        }
        catch (JsiiException e) {
            thrown = true;
        }
        assertTrue(thrown);
    }
}