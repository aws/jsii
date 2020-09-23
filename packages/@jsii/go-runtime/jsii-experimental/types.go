package jsii

type Any interface{}

// JsiiObj is a trait implemented by every type that can have a corresponding
// instance within the kernel runtime. getInstanceId is needed for all generated
// types that may be passed by reference over the wire. For classes,
// getInstanceId returns a private property that is a jsii object instance ID so
// that calls to the runtime referencing this object can correctly reference the
// corresponding instance within the kernel.
type JsiiObj interface {
	getInstanceId() string
}
