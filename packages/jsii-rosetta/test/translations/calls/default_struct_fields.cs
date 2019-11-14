class Struct
{
    public string? X;
    public string? Y;
}
public void Foo(Struct s)
{
    Console.WriteLine($"{s.X} {s.Y}");
}