package kernel

import (
	"encoding/json"
	"reflect"
	"testing"

	"github.com/aws/jsii-runtime-go/internal/objectstore"
)

type plainPayload struct {
	Ref    string                 `json:"$jsii.byref"`
	Nested map[string]interface{} `json:"nested"`
	List   []interface{}          `json:"list"`
	Big    int64                  `json:"big"`
	Hidden string                 `json:"-"`
}

type customMarshaler string

func (customMarshaler) MarshalJSON() ([]byte, error) {
	return []byte(`{"$jsii.byref":"Foo@10001"}`), nil
}

func TestCastPtrToRefWrapsUnknownValues(t *testing.T) {
	// None of these code paths require the kernel process.
	client := &Client{objects: objectstore.New()}

	payload := plainPayload{
		Ref:    "Foo@10001",
		Nested: map[string]interface{}{"$jsii.enum": "a.B/C"},
		List:   []interface{}{map[string]interface{}{"$jsii.date": "x"}, 1, nil, "s"},
		Big:    1 << 60,
		Hidden: "hidden",
	}

	cases := []struct {
		name     string
		value    interface{}
		expected string
	}{
		{
			name:     "struct by value",
			value:    payload,
			expected: `{"$jsii.map":{"$jsii.byref":"Foo@10001","big":1152921504606846976,"list":[{"$jsii.map":{"$jsii.date":"x"}},1,null,"s"],"nested":{"$jsii.map":{"$jsii.enum":"a.B/C"}}}}`,
		},
		{
			name:     "struct by value nested in a map",
			value:    map[string]plainPayload{"payload": {Ref: "Foo@10001"}},
			expected: `{"$jsii.map":{"payload":{"$jsii.map":{"$jsii.byref":"Foo@10001","big":0,"list":null,"nested":null}}}}`,
		},
		{
			name: "struct by value nested in a slice",
			value: []struct {
				A string `json:"$jsii.enum"`
			}{{"a.B/C"}},
			expected: `[{"$jsii.map":{"$jsii.enum":"a.B/C"}}]`,
		},
		{
			name:     "fixed-size array of maps",
			value:    [1]map[string]interface{}{{"$jsii.byref": "Foo@10001"}},
			expected: `[{"$jsii.map":{"$jsii.byref":"Foo@10001"}}]`,
		},
		{
			name:     "custom json.Marshaler",
			value:    customMarshaler("x"),
			expected: `{"$jsii.map":{"$jsii.byref":"Foo@10001"}}`,
		},
		{
			name:     "native map (unchanged)",
			value:    map[string]interface{}{"$jsii.byref": "Foo@10001"},
			expected: `{"$jsii.map":{"$jsii.byref":"Foo@10001"}}`,
		},
		{
			name:     "scalars (unchanged)",
			value:    []interface{}{"$jsii.byref", 42, 13.37, true},
			expected: `["$jsii.byref",42,13.37,true]`,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			actual, err := json.Marshal(client.CastPtrToRef(reflect.ValueOf(tc.value)))
			if err != nil {
				t.Fatalf("failed to marshal result: %v", err)
			}
			if string(actual) != tc.expected {
				t.Errorf("expected %s, got %s", tc.expected, string(actual))
			}
		})
	}
}
