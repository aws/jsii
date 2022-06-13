public void Test(params object[] _args)
{
}

Test(new Dictionary<string, object> { { "Key", "Value" }, { "also", 1337 } });

Test(new Dictionary<string, string> { { "Key", "Value" } }, new Dictionary<string, int> { { "also", 1337 } });
