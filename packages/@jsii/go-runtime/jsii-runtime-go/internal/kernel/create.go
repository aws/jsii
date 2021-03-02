package kernel

import "github.com/aws/jsii-runtime-go/internal/api"

type CreateProps struct {
	FQN        api.FQN        `json:"fqn"`
	Interfaces []api.FQN      `json:"interfaces"`
	Arguments  []interface{}  `json:"args"`
	Overrides  []api.Override `json:"overrides"`
}

// TODO extends AnnotatedObjRef?
type CreateResponse struct {
	kernelResponse
	InstanceID string `json:"$jsii.byref"`
}

func (c *client) Create(props CreateProps) (response CreateResponse, err error) {
	type request struct {
		kernelRequest
		CreateProps
	}
	err = c.request(request{kernelRequest{"create"}, props}, &response)
	return
}

// UnmarshalJSON provides custom unmarshalling implementation for response
// structs. Creating new types is required in order to avoid infinite recursion.
func (r *CreateResponse) UnmarshalJSON(data []byte) error {
	type response CreateResponse
	return unmarshalKernelResponse(data, (*response)(r))
}
