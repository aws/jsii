class Struct
{
    public string? X { get; set; }
    public string? Y { get; set; }
}
public void Foo(Struct s)
{
    Console.WriteLine($"{s.X} {s.Y}");
}