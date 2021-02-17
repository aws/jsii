package kernel

import (
	"reflect"

	"github.com/aws/jsii-runtime-go/api"
)

// CastAndSetToPtr accepts a pointer to any type and attempts to cast the value
// argument to be the same type. Then it sets the value of the pointer element
// to be the newly cast data. This is used to cast payloads from JSII to
// expected return types for Get and Invoke functions.
func (c *client) CastAndSetToPtr(ptr interface{}, data interface{}) {
	ptrVal := reflect.ValueOf(ptr).Elem()
	dataVal := reflect.ValueOf(data)

	ref, isRef := castValToRef(data)
	if isRef {
		// If return data is JSII object references, add to objects table.
		if concreteType, err := c.Types().ConcreteTypeFor(ptrVal.Type()); err == nil {
			ptrVal.Set(reflect.New(concreteType))
			if err = c.RegisterInstance(ptrVal.Interface(), ref.InstanceID); err != nil {
				panic(err)
			}
		} else {
			panic(err)
		}
		return
	}

	if enumref, isEnum := castValToEnumRef(data); isEnum {
		member, err := c.Types().EnumMemberForEnumRef(enumref)
		if err != nil {
			panic(err)
		}

		ptrVal.Set(reflect.ValueOf(member))
		return
	}

	// arrays
	if ptrVal.Kind() == reflect.Slice && dataVal.Kind() == reflect.Slice {
		// If return type is a slice, recursively cast elements
		for i := 0; i < dataVal.Len(); i++ {
			innerType := ptrVal.Type().Elem()
			inner := reflect.New(innerType)

			c.CastAndSetToPtr(inner.Interface(), dataVal.Index(i).Interface())
			ptrVal.Set(reflect.Append(ptrVal, inner.Elem()))
		}

		return
	}

	// TODO: maps

	if data != nil {
		val := reflect.ValueOf(data)
		ptrVal.Set(val)
	}
}

func castValToRef(data interface{}) (api.ObjectRef, bool) {
	ref := api.ObjectRef{}
	ok := false
	dataVal := reflect.ValueOf(data)

	if dataVal.Kind() == reflect.Map {
		for _, k := range dataVal.MapKeys() {
			// Finding values type requires extracting from reflect.Value
			// otherwise .Kind() returns `interface{}`
			v := reflect.ValueOf(dataVal.MapIndex(k).Interface())

			if k.Kind() == reflect.String && k.String() == "$jsii.byref" && v.Kind() == reflect.String {
				ref.InstanceID = v.String()
				ok = true
			}

		}
	}

	return ref, ok
}

func castValToEnumRef(data interface{}) (enum api.EnumRef, ok bool) {
	dataVal := reflect.ValueOf(data)
	ok = false

	if dataVal.Kind() == reflect.Map {
		for _, k := range dataVal.MapKeys() {
			// Finding values type requires extracting from reflect.Value
			// otherwise .Kind() returns `interface{}`
			v := reflect.ValueOf(dataVal.MapIndex(k).Interface())

			if k.Kind() == reflect.String && k.String() == "$jsii.enum" && v.Kind() == reflect.String {
				enum.MemberFQN = v.String()
				ok = true
				return
			}
		}
	}

	return
}
