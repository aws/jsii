package scopejsiicalclib

type idoublable interface {
    getdoublevalue() number
    setdoublevalue()
}

type ifriendly interface {
    hello() string
}

type ithreelevelsinterface interface {
    baz()
}

type myfirststruct interface {
    getanumber() number
    setanumber()
    getastring() string
    setastring()
    getfirstoptional() Array<string>
    setfirstoptional()
}

type number struct {
    doublevalue number
    value number
}

type operation struct {
}

func (o *operation) tostring()  string {
    // jsiiruntime.methodcall(o)
}

type structwithonlyoptionals interface {
    getoptional1() string
    setoptional1()
    getoptional2() number
    setoptional2()
    getoptional3() boolean
    setoptional3()
}

type value struct {
    value number
}

func (v *value) tostring()  string {
    // jsiiruntime.methodcall(v)
}

