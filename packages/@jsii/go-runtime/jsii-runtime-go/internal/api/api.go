package api

// FQN represents a fully-qualified type name in the jsii type system.
type FQN string

// Override is a public interface implementing a private method `isOverride`
// implemented by the private custom type `override`. This is embedded by
// MethodOverride and PropertyOverride to simulate the union type of Override =
// MethodOverride | PropertyOverride.
type Override interface {
	isOverride()
}

type override struct{}

func (o override) isOverride() {
	return
}

// MethodOverride is used to register a "go-native" implementation to be
// substituted to the default javascript implementation on the created object.
type MethodOverride struct {
	override

	JsiiMethod string `json:"method"`
	GoMethod   string `json:"cookie"`
}

// PropertyOverride is used to register a "go-native" implementation to be
// substituted to the default javascript implementation on the created object.
type PropertyOverride struct {
	override

	JsiiProperty string `json:"property"`
	GoGetter     string `json:"cookie"`
}

func IsMethodOverride(value Override) bool {
	switch value.(type) {
	case MethodOverride, *MethodOverride:
		return true
	default:
		return false
	}
}

func IsPropertyOverride(value Override) bool {
	switch value.(type) {
	case PropertyOverride, *PropertyOverride:
		return true
	default:
		return false
	}
}

type ObjectRef struct {
	InstanceID string `json:"$jsii.byref"`
}

type EnumRef struct {
	MemberFQN string `json:"$jsii.enum"`
}

type WireMap struct {
	MapData map[string]interface{} `json:"$jsii.map"`
}
