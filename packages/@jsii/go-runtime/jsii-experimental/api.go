package jsii

import (
	"encoding/json"
	"errors"
)

// JSII Kernel API

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

type MethodOverride struct {
	override
	Method *string
	Cookie *string
}

type PropertyOverride struct {
	override
	Property *string
	Cookie   *string
}

func isMethodOverride(value Override) bool {
	_, ok := value.(MethodOverride)
	return ok
}

func isPropertyOverride(value Override) bool {
	_, ok := value.(PropertyOverride)
	return ok
}

// KernelRequest and KernelResponse allow creating a union of KernelRequest and
// KernelResponse types by defining private method implemented by a private
// custom type, which is embedded in all relevant types.
type KernelRequest interface {
	req()
}

type kernelRequester struct {
	Api string `json:"api"`
}

func (r kernelRequester) req() {
	return
}

type KernelResponse interface {
	res()
}

type kernelResponder struct {
}

func (r kernelResponder) res() {
	return
}

type LoadRequest struct {
	kernelRequester

	Name    string `json:"name"`
	Version string `json:"version"`
	Tarball string `json:"tarball"`
}

type LoadResponse struct {
	kernelResponder

	Assembly string  `json:"assembly"`
	Types    float64 `json:"types"`
}

type CreateRequest struct {
	kernelRequester

	Fqn        string
	Interfaces []string
	Args       []Any
	Overrides  []Override
}

// TODO extends AnnotatedObjRef?
type CreateResponse struct {
	kernelResponder
}

type DelRequest struct {
	kernelRequester

	// Objref   ObjRef
}

type DelResponse struct {
	kernelResponder
}

type GetRequest struct {
	kernelRequester

	// Objref   ObjRef
	Property *string
}

type StaticGetRequest struct {
	kernelRequester

	Fqn      *string
	Property *string
}

type GetResponse struct {
	kernelResponder

	Value Any
}

type StaticSetRequest struct {
	kernelRequester

	Fqn      *string
	Property *string
	Value    Any
}

type SetRequest struct {
	kernelRequester

	// Objref   ObjRef
	Property *string
	Value    Any
}

type SetResponse struct {
	kernelResponder
}

type StaticInvokeRequest struct {
	kernelRequester

	Fqn    *string
	Method *string
	Args   []Any
}

type InvokeRequest struct {
	kernelRequester

	// Objref ObjRef
	Method *string
	Args   []Any
}

type InvokeResponse struct {
	kernelResponder

	Result Any
}

type BeginRequest struct {
	kernelRequester

	// Objref   ObjRef
	Method *string
	Args   []Any
}

type BeginResponse struct {
	kernelResponder

	Promiseid *string
}

type EndRequest struct {
	kernelRequester

	Promiseid *string
}

type EndResponse struct {
	kernelResponder

	Result Any
}

type CallbacksRequest struct {
	kernelRequester
}

type CallbacksResponse struct {
	kernelResponder

	Callbacks []Callback
}

type CompleteRequest struct {
	kernelRequester

	Cbid   *string
	Err    *string
	Result Any
}

type CompleteResponse struct {
	kernelResponder

	Cbid *string
}

type NamingRequest struct {
	kernelRequester

	Assembly string
}

type NamingResponse struct {
	kernelResponder
	// readonly naming: {
	//   readonly [language: string]: { readonly [key: string]: any } | undefined;
	// };
}

type StatsRequest struct {
	kernelRequester
}

type StatsResponse struct {
	kernelResponder

	ObjectCount float64
}

// HelloResponse?
type InitOkResponse struct {
	kernelResponder

	Hello string `json:"hello"`
}

type Callback struct {
	Cbid   *string
	Cookie *string
	Invoke InvokeRequest
	Get    GetRequest
	Set    SetRequest
}

type OkayResponse struct {
	Ok Any
}

type ErrorResponse struct {
	Error *string
	Stack *string
}

func (r *LoadResponse) UnmarshalJSON(data []byte) error {
	return unmarshalKernelResponse(data, r)
}

// Custom unmarshaling for kernel responses, checks for presence of `error` key on json and returns if present
func unmarshalKernelResponse(data []byte, resstruct interface{}) error {
	datacopy := make([]byte, len(data))
	copy(datacopy, data)

	var response map[string]json.RawMessage
	if err := json.Unmarshal(datacopy, &response); err != nil {
		return err
	}

	if errmessage, ok := response["error"]; ok {
		return errors.New(string(errmessage))
	}

	return json.Unmarshal(data, resstruct)
}
