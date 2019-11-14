interface Struct {
  public string x;
  public string? y;
}

public void foo(Struct s)
{
  Console.WriteLine($"{s.x} {s.y}")
}