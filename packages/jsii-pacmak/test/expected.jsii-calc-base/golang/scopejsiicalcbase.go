package scopejsiicalcbase

type Base struct {
}

func (b *Base) typename() any {
    // jsiiruntime.methodcall(b)
}

type BaseProps interface {
    getbar() string
    setbar()
}

type IBaseInterface interface {
    bar()
}

