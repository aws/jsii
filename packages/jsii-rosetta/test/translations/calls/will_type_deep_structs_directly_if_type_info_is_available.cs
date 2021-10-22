class BaseDeeperStruct
{
    public int A { get; set; }
}

class DeeperStruct : BaseDeeperStruct
{
    public int B { get; set; }
}

class OuterStruct
{
    public int Foo { get; set; }
    public DeeperStruct Deeper { get; set; }
}

public void Foo(int x, OuterStruct outer)
{
}

Foo(25, new OuterStruct { Foo = 3, Deeper = new DeeperStruct {
    A = 1,
    B = 2
} });