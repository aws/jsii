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

	if ref, isRef := castValToRef(data); isRef {
		// If return data is a jsii struct passed by reference, de-reference it all.
		if fields, isStruct := c.Types().StructFields(ptrVal.Type()); isStruct {
			for _, field := range fields {
				got, err := c.Get(GetRequest{
					API:      "get",
					Property: field.Tag.Get("json"),
					ObjRef:   ref,
				})
				if err != nil {
					panic(err)
				}
				fieldVal := ptrVal.FieldByIndex(field.Index)
				c.CastAndSetToPtr(fieldVal.Addr().Interface(), got.Value)
			}
			return
		}

		// If return data is jsii object references, add to objects table.
		if err := c.Types().InitJsiiProxy(ptrVal); err == nil {
			if err = c.RegisterInstance(ptrVal, ref.InstanceID); err != nil {
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

	// maps
	if m, isMap := c.castValToMap(dataVal, ptrVal.Type()); isMap {
		ptrVal.Set(m)
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

// castValToMap attempts converting the provided jsii wire value to a
// go map. This recognizes the "$jsii.map" object and does the necessary
// recursive value conversion.
func (c *client) castValToMap(data reflect.Value, mapType reflect.Type) (m reflect.Value, ok bool) {
	ok = false

	if data.Kind() != reflect.Map || data.Type().Key().Kind() != reflect.String {
		return
	}

	if mapType.Kind() == reflect.Map && mapType.Key().Kind() != reflect.String {
		return
	}
	anyType := reflect.TypeOf((*interface{})(nil)).Elem()
	if mapType == anyType {
		mapType = reflect.TypeOf((map[string]interface{})(nil))
	}

	dataIter := data.MapRange()
	for dataIter.Next() {
		key := dataIter.Key().String()
		if key != "$jsii.map" {
			continue
		}

		// Finding value type requries extracting from reflect.Value
		// otherwise .Kind() returns `interface{}`
		val := reflect.ValueOf(dataIter.Value().Interface())
		if val.Kind() != reflect.Map {
			return
		}

		ok = true

		m = reflect.MakeMap(mapType)

		iter := val.MapRange()
		for iter.Next() {
			val := iter.Value().Interface()
			// Note: reflect.New(t) returns a pointer to a newly allocated t
			convertedVal := reflect.New(mapType.Elem())
			c.CastAndSetToPtr(convertedVal.Interface(), val)

			m.SetMapIndex(iter.Key(), convertedVal.Elem())
		}
		return
	}
	return
}
