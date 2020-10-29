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

// FQN represents a fully-qualified type name in the jsii type system.
type FQN string

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

type objref struct {
	JsiiInstanceId string `json:"$jsii.byref"`
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

type createRequest struct {
	kernelRequester

	Api        string        `json:"api"`
	Fqn        FQN           `json:"fqn"`
	Interfaces []FQN         `json:"interfaces"`
	Args       []interface{} `json:"args"`
	Overrides  []Override    `json:"overrides"`
}

// TODO extends AnnotatedObjRef?
type createResponse struct {
	kernelResponder

	JsiiInstanceId string `json:"$jsii.byref"`
}

type DelRequest struct {
	kernelRequester

	Api    string `json:"api"`
	Objref objref `json:"objref"`
}

type DelResponse struct {
	kernelResponder
}

type getRequest struct {
	kernelRequester

	Api      string `json:"api"`
	Property string `json:"property"`
	Objref   objref `json:"objref"`
}

type staticGetRequest struct {
	kernelRequester

	Api      string `json:"api"`
	Fqn      FQN    `json:"fqn"`
	Property string `json:"property"`
}

type getResponse struct {
	kernelResponder

	Value interface{} `json:"value"`
}

type setRequest struct {
	kernelRequester

	Api      string      `json:"api"`
	Property string      `json:"property"`
	Value    interface{} `json:"value"`
	Objref   objref      `json:"objref"`
}

type staticSetRequest struct {
	kernelRequester

	Api      string      `json:"api"`
	Fqn      FQN         `json:"fqn"`
	Property string      `json:"property"`
	Value    interface{} `json:"value"`
}

type setResponse struct {
	kernelResponder
}

type staticInvokeRequest struct {
	kernelRequester

	Api    string        `json:"api"`
	Fqn    FQN           `json:"fqn"`
	Method string        `json:"method"`
	Args   []interface{} `json:"args"`
}

type invokeRequest struct {
	kernelRequester

	Api    string        `json:"api"`
	Method string        `json:"method"`
	Args   []interface{} `json:"args"`
	Objref objref        `json:"objref"`
}

type invokeResponse struct {
	kernelResponder

	Result interface{} `json:"result"`
}

type BeginRequest struct {
	kernelRequester

	Api    string        `json:"api"`
	Method *string       `json:"method"`
	Args   []interface{} `json:"args"`
	Objref objref        `json:"objref"`
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

	Result interface{} `json:"result"`
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

	Api    string      `json:"api"`
	Cbid   *string     `json:"cbid"`
	Err    *string     `json:"err"`
	Result interface{} `json:"result"`
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
	Invoke invokeRequest `json:"invoke"`
	Get    getRequest    `json:"get"`
	Set    setRequest    `json:"set"`
}

type OkayResponse struct {
	Ok interface{} `json:"ok"`
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

func (r *createResponse) UnmarshalJSON(data []byte) error {
	type response createResponse
	return unmarshalKernelResponse(data, (*response)(r))
}

func (r *invokeResponse) UnmarshalJSON(data []byte) error {
	type response invokeResponse
	return unmarshalKernelResponse(data, (*response)(r))
}

func (r *getResponse) UnmarshalJSON(data []byte) error {
	type response getResponse
	return unmarshalKernelResponse(data, (*response)(r))
}

func (r *setResponse) UnmarshalJSON(data []byte) error {
	type response setResponse
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

	err := json.Unmarshal(response["ok"], resstruct)
	return err
}
