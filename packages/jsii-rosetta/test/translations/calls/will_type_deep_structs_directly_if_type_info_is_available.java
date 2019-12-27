public class BaseDeeperStruct {
    private int a;
    public int getA() {
        return this.a;
    }
    public BaseDeeperStruct a(int a) {
        this.a = a;
        return this;
    }
}
public class DeeperStruct extends BaseDeeperStruct {
    private int b;
    public int getB() {
        return this.b;
    }
    public DeeperStruct b(int b) {
        this.b = b;
        return this;
    }
}

public class OuterStruct {
    private int foo;
    public int getFoo() {
        return this.foo;
    }
    public OuterStruct foo(int foo) {
        this.foo = foo;
        return this;
    }
    private DeeperStruct deeper;
    public DeeperStruct getDeeper() {
        return this.deeper;
    }
    public OuterStruct deeper(DeeperStruct deeper) {
        this.deeper = deeper;
        return this;
    }
}

public void foo(int x, OuterStruct outer) {
}

foo(25, new OuterStruct().foo(3).deeper(new DeeperStruct()
        .a(1)
        .b(2)));
