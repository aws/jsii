package scopejsiicalclib
type IDoublable interface {
    getdoublevalue() number
    setdoublevalue()
}

type IFriendly interface {
    hello() string
}

type IThreeLevelsInterface interface {
    baz()
}

type MyFirstStruct interface {
    getanumber() number
    setanumber()
    getastring() string
    setastring()
    getfirstoptional() Array<string>
    setfirstoptional()
}

type Number struct {
    doubleValue number
    value number
}

type Operation struct {
}

func (O *Operation) toString() string {
    // jsiiruntime.methodcall(O)
}

type StructWithOnlyOptionals interface {
    getoptional1() string
    setoptional1()
    getoptional2() number
    setoptional2()
    getoptional3() boolean
    setoptional3()
}

type Value struct {
    value number
}

func (V *Value) toString() string {
    // jsiiruntime.methodcall(V)
}

