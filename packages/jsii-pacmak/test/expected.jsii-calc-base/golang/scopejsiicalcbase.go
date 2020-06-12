package scopejsiicalcbase

type base struct {
}

func (b *base) typename()  any {
    // jsiiruntime.methodcall(b)
}

type baseprops interface {
    getbar() string
    setbar()
}

type ibaseinterface interface {
    bar()
}

