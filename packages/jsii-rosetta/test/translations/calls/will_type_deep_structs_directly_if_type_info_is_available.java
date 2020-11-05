public class BaseDeeperStruct {
    private Number a;
    public Number getA() {
        return this.a;
    }
    public BaseDeeperStruct a(Number a) {
        this.a = a;
        return this;
    }
}
public class DeeperStruct extends BaseDeeperStruct {
    private Number b;
    public Number getB() {
        return this.b;
    }
    public DeeperStruct b(Number b) {
        this.b = b;
        return this;
    }
}

public class OuterStruct {
    private Number foo;
    public Number getFoo() {
        return this.foo;
    }
    public OuterStruct foo(Number foo) {
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

public void foo(Number x, OuterStruct outer) {
}

foo(25, new OuterStruct().foo(3).deeper(new DeeperStruct()
        .a(1)
        .b(2)));
