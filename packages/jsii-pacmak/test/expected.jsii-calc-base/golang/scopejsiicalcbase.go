package scopejsiicalcbase

type Base struct {
}

func (B *Base) typeName() any {
    // jsiiruntime.methodcall(B)
}

type BaseProps interface {
    getbar() string
    setbar()
}

type IBaseInterface interface {
    bar()
}

