class MyClassProps
{
    public string Prop1;
    public int Prop2;
}

class MyClass : cdk.SomeOtherClass
{
    public MyClass(cdk.Construct scope, string id, MyClassProps props) : base(scope, id, props)
    {

        Console.WriteLine(props.Prop1);
    }
}