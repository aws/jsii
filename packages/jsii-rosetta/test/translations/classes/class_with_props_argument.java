public class MyClass extends SomeOtherClass {
    public MyClass(Construct scope, String id, MyClassProps props) {
        super(scope, id, props);

        System.out.println(props.getProp1());
    }
}
