class MyClassProps
{
    public string Prop1 { get; set; }
    public int Prop2 { get; set; }
}

class MyClass : cdk.SomeOtherClass
{
    public MyClass(cdk.Construct scope, string id, MyClassProps props) : base(scope, id, props)
    {

        Console.WriteLine(props.Prop1);
    }
}