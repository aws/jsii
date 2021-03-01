package kernel

import "github.com/aws/jsii-runtime-go/api"

type InvokeRequest struct {
	kernelRequester

	API       string        `json:"api"`
	Method    string        `json:"method"`
	Arguments []interface{} `json:"args"`
	ObjRef    api.ObjectRef `json:"objref"`
}

type StaticInvokeRequest struct {
	kernelRequester

	API       string        `json:"api"`
	FQN       api.FQN       `json:"fqn"`
	Method    string        `json:"method"`
	Arguments []interface{} `json:"args"`
}

type InvokeResponse struct {
	kernelResponder

	Result interface{} `json:"result"`
}

func (c *client) Invoke(request InvokeRequest) (response InvokeResponse, err error) {
	err = c.request(request, &response)
	return
}

func (c *client) SInvoke(request StaticInvokeRequest) (response InvokeResponse, err error) {
	err = c.request(request, &response)
	return
}

// UnmarshalJSON provides custom unmarshalling implementation for response
// structs. Creating new types is required in order to avoid infinite recursion.
func (r *InvokeResponse) UnmarshalJSON(data []byte) error {
	type response InvokeResponse
	return unmarshalKernelResponse(data, (*response)(r))
}
