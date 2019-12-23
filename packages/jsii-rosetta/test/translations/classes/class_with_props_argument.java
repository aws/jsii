public class MyClassProps {
    private String prop1;
    public String getProp1() {
        return this.prop1;
    }
    public MyClassProps prop1(String prop1) {
        this.prop1 = prop1;
        return this;
    }
    private int prop2;
    public int getProp2() {
        return this.prop2;
    }
    public MyClassProps prop2(int prop2) {
        this.prop2 = prop2;
        return this;
    }
}

public class MyClass extends SomeOtherClass {
    public MyClass(Construct scope, String id, MyClassProps props) {
        super(scope, id, props);

        System.out.println(props.getProp1());
    }
}
