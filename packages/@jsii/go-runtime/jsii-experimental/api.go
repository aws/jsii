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

	Method *string `json:"method"`
	Cookie *string `json:"cookie"`
}

type PropertyOverride struct {
	override

	Property *string `json:"property"`
	Cookie   *string `json:"cookie"`
}

func isMethodOverride(value Override) bool {
	switch value.(type) {
	case MethodOverride, *MethodOverride:
		return true
	default:
		return false
	}
}

func isPropertyOverride(value Override) bool {
	switch value.(type) {
	case PropertyOverride, *PropertyOverride:
		return true
	default:
		return false
	}
}

// KernelRequest and KernelResponse allow creating a union of KernelRequest and
// KernelResponse types by defining private method implemented by a private
// custom type, which is embedded in all relevant types.
type KernelRequest interface {
	isRequest()
}

type kernelRequester struct {
}

func (r kernelRequester) isRequest() {
	return
}

type KernelResponse interface {
	isResponse()
}

type kernelResponder struct {
}

func (r kernelResponder) isResponse() {
	return
}

type LoadRequest struct {
	kernelRequester

	Api     string `json:"api"`
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

	Api        string     `json:"api"`
	Fqn        string     `json:"fqn"`
	Interfaces []string   `json:"interfaces"`
	Args       []Any      `json:"args"`
	Overrides  []Override `json:"overrides"`
}

// TODO extends AnnotatedObjRef?
type CreateResponse struct {
	kernelResponder
}

type DelRequest struct {
	kernelRequester

	Api string `json:"api"`
	// Objref   ObjRef
}

type DelResponse struct {
	kernelResponder
}

type GetRequest struct {
	kernelRequester

	Api      string  `json:"api"`
	Property *string `json:"property"`
	// Objref   ObjRef
}

type StaticGetRequest struct {
	kernelRequester

	Api      string  `json:"api"`
	Fqn      *string `json:"fqn"`
	Property *string `json:"property"`
}
type GetResponse struct {
	kernelResponder

	Value Any `json:"value"`
}

type StaticSetRequest struct {
	kernelRequester

	Api      string  `json:"api"`
	Fqn      *string `json:"fqn"`
	Property *string `json:"property"`
	Value    Any     `json:"value"`
}

type SetRequest struct {
	kernelRequester

	Api      string  `json:"api"`
	Property *string `json:"property"`
	Value    Any     `json:"value"`
	// Objref   ObjRef
}

type SetResponse struct {
	kernelResponder
}

type StaticInvokeRequest struct {
	kernelRequester

	Api    string  `json:"api"`
	Fqn    *string `json:"fqn"`
	Method *string `json:"method"`
	Args   []Any   `json:"args"`
}

type InvokeRequest struct {
	kernelRequester

	Api    string  `json:"api"`
	Method *string `json:"method"`
	Args   []Any   `json:"args"`
	// Objref ObjRef
}

type InvokeResponse struct {
	kernelResponder

	Result Any `json:result`
}

type BeginRequest struct {
	kernelRequester

	Api    string  `json:"api"`
	Method *string `json:"method"`
	Args   []Any   `json:"args"`
	// Objref   ObjRef
}

type BeginResponse struct {
	kernelResponder

	Promiseid *string `json:"promise_id"`
}

type EndRequest struct {
	kernelRequester

	Api       string  `json:"api"`
	Promiseid *string `json:"promise_id"`
}

type EndResponse struct {
	kernelResponder

	Result Any `json:"result"`
}

type CallbacksRequest struct {
	kernelRequester

	Api string `json:"api"`
}

type CallbacksResponse struct {
	kernelResponder

	Callbacks []Callback `json:"callbacks"`
}

type CompleteRequest struct {
	kernelRequester

	Api    string  `json:"api"`
	Cbid   *string `json:"cbid"`
	Err    *string `json:"err"`
	Result Any     `json:"result"`
}

type CompleteResponse struct {
	kernelResponder

	Cbid *string `json:"cbid"`
}

type NamingRequest struct {
	kernelRequester

	Api      string `json:"api"`
	Assembly string `json:"assembly"`
}

type NamingResponse struct {
	kernelResponder
	// readonly naming: {
	//   readonly [language: string]: { readonly [key: string]: any } | undefined;
	// };
}

type StatsRequest struct {
	kernelRequester

	Api string `json:"api"`
}

type StatsResponse struct {
	kernelResponder

	ObjectCount float64 `json:"object_count"`
}

// HelloResponse?
type InitOkResponse struct {
	kernelResponder

	Hello string `json:"hello"`
}

type Callback struct {
	Cbid   *string       `json:"cbid"`
	Cookie *string       `json:"cookie"`
	Invoke InvokeRequest `json:"invoke"`
	Get    GetRequest    `json:"get"`
	Set    SetRequest    `json:"set"`
}

type OkayResponse struct {
	Ok Any `json:"ok"`
}

type ErrorResponse struct {
	Error *string `json:"error"`
	Stack *string `json:"stack"`
}

// Custom unmarshalling implementation for response structs. Creating new types
// is required in order to avoid infinite recursion.
func (r *LoadResponse) UnmarshalJSON(data []byte) error {
	type response LoadResponse
	return unmarshalKernelResponse(data, (*response)(r))
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
