package scopejsiicalclib

type IDoublable interface {
    getdoubleValue() number
    setdoubleValue()
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
    getfirstOptional() Array<string>
    setfirstOptional()
}

type Number struct {
    doublevalue number
    value number
}

type Operation struct {
}

func (o *Operation) tostring() string {
    // jsiiruntime.methodcall(o)
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

func (v *Value) tostring() string {
    // jsiiruntime.methodcall(v)
}

