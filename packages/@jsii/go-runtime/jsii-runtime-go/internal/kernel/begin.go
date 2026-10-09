package kernel

import (
	"github.com/aws/jsii-runtime-go/internal/api"
)

type BeginProps struct {
	Method    string        `json:"method"`
	Arguments []interface{} `json:"args"`
	ObjRef    api.ObjectRef `json:"objref"`
}

type StaticBeginProps struct {
	FQN       api.FQN       `json:"fqn"`
	Method    string        `json:"method"`
	Arguments []interface{} `json:"args"`
}

type BeginResponse struct {
	kernelResponse
	PromiseID string `json:"promiseid"`
}

// Begin starts an asynchronous method call on an object instance.
func (c *Client) Begin(props BeginProps) (response BeginResponse, err error) {
	type request struct {
		kernelRequest
		BeginProps
	}
	err = c.request(request{kernelRequest{"begin"}, props}, &response)
	return
}

// SBegin starts an asynchronous static method call.
func (c *Client) SBegin(props StaticBeginProps) (response BeginResponse, err error) {
	type request struct {
		kernelRequest
		StaticBeginProps
	}
	err = c.request(request{kernelRequest{"sbegin"}, props}, &response)
	return
}

// UnmarshalJSON provides custom unmarshalling implementation for response
// structs. Creating new types is required in order to avoid infinite recursion.
func (r *BeginResponse) UnmarshalJSON(data []byte) error {
	type response BeginResponse
	return unmarshalKernelResponse(data, (*response)(r), r)
}
