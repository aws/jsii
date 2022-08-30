package software.amazon.jsii;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Collections;

public final class UnsafeCastTest {
    @Test
    public void canCastToAnyInterface() {
        final JsiiObject subject = new JsiiObject(new JsiiObjectRef("Object@1000", Collections.emptySet()));

        final IManagedInterface result = UnsafeCast.unsafeCast(subject, IManagedInterface.class);
        Assertions.assertInstanceOf(IManagedInterface.class, result);
    }

    @Jsii(fqn = "test.IManagedInterface", module = JsiiModule.class)
    @Jsii.Proxy(ManagedInterfaceProxy.class)
    private interface IManagedInterface extends JsiiSerializable {
        boolean getBooleanProperty();
    }

    private final static class ManagedInterfaceProxy extends JsiiObject implements IManagedInterface {
        public ManagedInterfaceProxy(final JsiiObjectRef objRef) {
            super(objRef);
        }

        @Override
        public boolean getBooleanProperty() {
            throw new UnsupportedOperationException("Not Implemented");
        }
    }
}
