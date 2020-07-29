public void Test(Array _args)
{
}

Test(new Struct { Key = "Value", Also = 1337 });

Test(new Struct { Key = "Value" }, new Struct { Also = 1337 });
