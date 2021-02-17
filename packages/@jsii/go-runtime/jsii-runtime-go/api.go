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

// MethodOverride is used to register a "go-native" implementation to be
// substituted to the default javascript implementation on the created object.
type MethodOverride struct {
	override

	Method *string `json:"method"`
	Cookie *string `json:"cookie"`
}

// PropertyOverride is used to register a "go-native" implementation to be
// substituted to the default javascript implementation on the created object.
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
type kernelRequest interface {
	isRequest()
}

type kernelRequester struct {
}

func (r kernelRequester) isRequest() {
	return
}

type kernelResponse interface {
	isResponse()
}

type kernelResponder struct {
}

func (r kernelResponder) isResponse() {
	return
}

type objectRef struct {
	InstanceID string `json:"$jsii.byref"`
}

type enumRef struct {
	MemberFQN string `json:"$jsii.enum"`
}

type wireMap struct {
	MapData map[string]interface{} `json:"$jsii.map"`
}

type loadRequest struct {
	kernelRequester

	API     string `json:"api"`
	Name    string `json:"name"`
	Version string `json:"version"`
	Tarball string `json:"tarball"`
}

type loadResponse struct {
	kernelResponder

	Assembly string  `json:"assembly"`
	Types    float64 `json:"types"`
}

type createRequest struct {
	kernelRequester

	API        string        `json:"api"`
	FQN        FQN           `json:"fqn"`
	Interfaces []FQN         `json:"interfaces"`
	Arguments  []interface{} `json:"args"`
	Overrides  []Override    `json:"overrides"`
}

// TODO extends AnnotatedObjRef?
type createResponse struct {
	kernelResponder

	InstanceID string `json:"$jsii.byref"`
}

type delRequest struct {
	kernelRequester

	API    string    `json:"api"`
	ObjRef objectRef `json:"objref"`
}

type delResponse struct {
	kernelResponder
}

type getRequest struct {
	kernelRequester

	API      string    `json:"api"`
	Property string    `json:"property"`
	ObjRef   objectRef `json:"objref"`
}

type staticGetRequest struct {
	kernelRequester

	API      string `json:"api"`
	FQN      FQN    `json:"fqn"`
	Property string `json:"property"`
}

type getResponse struct {
	kernelResponder

	Value interface{} `json:"value"`
}

type setRequest struct {
	kernelRequester

	API      string      `json:"api"`
	Property string      `json:"property"`
	Value    interface{} `json:"value"`
	ObjRef   objectRef   `json:"objref"`
}

type staticSetRequest struct {
	kernelRequester

	API      string      `json:"api"`
	FQN      FQN         `json:"fqn"`
	Property string      `json:"property"`
	Value    interface{} `json:"value"`
}

type setResponse struct {
	kernelResponder
}

type staticInvokeRequest struct {
	kernelRequester

	API       string        `json:"api"`
	FQN       FQN           `json:"fqn"`
	Method    string        `json:"method"`
	Arguments []interface{} `json:"args"`
}

type invokeRequest struct {
	kernelRequester

	API       string        `json:"api"`
	Method    string        `json:"method"`
	Arguments []interface{} `json:"args"`
	ObjRef    objectRef     `json:"objref"`
}

type invokeResponse struct {
	kernelResponder

	Result interface{} `json:"result"`
}

type beginRequest struct {
	kernelRequester

	API       string        `json:"api"`
	Method    *string       `json:"method"`
	Arguments []interface{} `json:"args"`
	ObjRef    objectRef     `json:"objref"`
}

type beginResponse struct {
	kernelResponder

	PromiseID *string `json:"promise_id"`
}

type endRequest struct {
	kernelRequester

	API       string  `json:"api"`
	PromiseID *string `json:"promise_id"`
}

type endResponse struct {
	kernelResponder

	Result interface{} `json:"result"`
}

type callbacksRequest struct {
	kernelRequester

	API string `json:"api"`
}

type callbacksResponse struct {
	kernelResponder

	Callbacks []callback `json:"callbacks"`
}

type completeRequest struct {
	kernelRequester

	API        string      `json:"api"`
	CallbackID *string     `json:"cbid"`
	Error      *string     `json:"err"`
	Result     interface{} `json:"result"`
}

type completeResponse struct {
	kernelResponder

	CallbackID *string `json:"cbid"`
}

type namingRequest struct {
	kernelRequester

	API      string `json:"api"`
	Assembly string `json:"assembly"`
}

type namingResponse struct {
	kernelResponder
	// readonly naming: {
	//   readonly [language: string]: { readonly [key: string]: any } | undefined;
	// };
}

type statsRequest struct {
	kernelRequester

	API string `json:"api"`
}

type statsResponse struct {
	kernelResponder

	ObjectCount float64 `json:"object_count"`
}

// HelloResponse?
type initOKResponse struct {
	kernelResponder

	Hello string `json:"hello"`
}

type callback struct {
	CallbackID *string       `json:"cbid"`
	Cookie     *string       `json:"cookie"`
	Invoke     invokeRequest `json:"invoke"`
	Get        getRequest    `json:"get"`
	Set        setRequest    `json:"set"`
}

type okayResponse struct {
	OK interface{} `json:"ok"`
}

type errorResponse struct {
	Error *string `json:"error"`
	Stack *string `json:"stack"`
}

// UnmarshalJSON provides custom unmarshalling implementation for response
// structs. Creating new types is required in order to avoid infinite recursion.
func (r *loadResponse) UnmarshalJSON(data []byte) error {
	type response loadResponse
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
