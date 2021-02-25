package kernel

import "github.com/aws/jsii-runtime-go/api"

type SetRequest struct {
	kernelRequester

	API      string        `json:"api"`
	Property string        `json:"property"`
	Value    interface{}   `json:"value"`
	ObjRef   api.ObjectRef `json:"objref"`
}

type StaticSetRequest struct {
	kernelRequester

	API      string      `json:"api"`
	FQN      api.FQN     `json:"fqn"`
	Property string      `json:"property"`
	Value    interface{} `json:"value"`
}

type SetResponse struct {
	kernelResponder
}

func (c *client) Set(request SetRequest) (response SetResponse, err error) {
	err = c.request(request, &response)
	return
}

func (c *client) SSet(request StaticSetRequest) (response SetResponse, err error) {
	err = c.request(request, &response)
	return
}

// UnmarshalJSON provides custom unmarshalling implementation for response
// structs. Creating new types is required in order to avoid infinite recursion.
func (r *SetResponse) UnmarshalJSON(data []byte) error {
	type response SetResponse
	return unmarshalKernelResponse(data, (*response)(r))
}
