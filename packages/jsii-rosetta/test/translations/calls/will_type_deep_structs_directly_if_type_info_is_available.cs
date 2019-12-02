class BaseDeeperStruct
{
    public int A;
}
class DeeperStruct : BaseDeeperStruct
{
    public int B;
}

class OuterStruct
{
    public int Foo;
    public DeeperStruct Deeper;
}

public void Foo(int x, OuterStruct outer)
{
}

Foo(25, new OuterStruct { Foo = 3, Deeper = new DeeperStruct {
    A = 1,
    B = 2
} });