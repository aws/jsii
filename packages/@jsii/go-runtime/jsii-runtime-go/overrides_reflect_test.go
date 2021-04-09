package jsii

import (
	"reflect"
	"sort"
	"testing"
)

type IFace interface {
	M1()
	M2()
	M3()
}

type Base struct {
	X, Y int
}

func (b *Base) M1() {}
func (b *Base) M2() {}
func (b *Base) M3() {}

type D1 struct {
	*Base
}

func (d *D1) M1() {}

func (d *D1) X1() {}

type D2 struct {
	Name string
	IFace
}

func (d *D2) M2() {}

func (d *D2) X2() {}

func TestOverrideReflection(t *testing.T) {
	testCases := [...]struct {
		//overriding instance
		val interface{}
		//instance overriding methods
		methods []string
	}{
		{&Base{}, []string(nil)},
		{&D1{&Base{}}, []string{"M1", "X1"}},
		{&D2{Name: "abc", IFace: &D1{&Base{}}}, []string{"M1", "X1", "M2", "X2"}},
	}
	for _, tc := range testCases {
		sort.Slice(tc.methods, func(i, j int) bool {
			return tc.methods[i] < tc.methods[j]
		})
	}
	for _, tc := range testCases {
		methods := getMethodOverrides(tc.val, "Base")
		sort.Slice(methods, func(i, j int) bool {
			return methods[i] < methods[j]
		})
		if !reflect.DeepEqual(methods, tc.methods) {
			t.Errorf("expect: %v, got: %v", tc.methods, methods)
		}
	}
}
