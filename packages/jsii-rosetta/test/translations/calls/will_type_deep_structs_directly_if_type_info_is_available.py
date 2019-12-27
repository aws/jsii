def foo(x, *, foo, deeper):
    pass

foo(25, foo=3, deeper=DeeperStruct(
    a=1,
    b=2
))