package software.amazon.jsii.tests.calculator;
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Polymorphism")
public class Polymorphism extends software.amazon.jsii.JsiiObject {
    protected Polymorphism(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public Polymorphism() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }
    public java.lang.String sayHello(final software.amazon.jsii.tests.calculator.lib.IFriendly friendly) {
        return this.jsiiCall("sayHello", java.lang.String.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(friendly, "friendly is required")).toArray());
    }
}
