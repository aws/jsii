package kernel

type CompleteProps struct {
	CallbackID string      `json:"cbid"`
	Error      string      `json:"err,omitempty"`
	Result     interface{} `json:"result,omitempty"`
}

type CompleteResponse struct {
	kernelResponse
	CallbackID string `json:"cbid"`
}

// Complete fulfills a callback request obtained from Callbacks.
func (c *Client) Complete(props CompleteProps) (response CompleteResponse, err error) {
	type request struct {
		kernelRequest
		CompleteProps
	}
	err = c.request(request{kernelRequest{"complete"}, props}, &response)
	return
}

// UnmarshalJSON provides custom unmarshalling implementation for response
// structs. Creating new types is required in order to avoid infinite recursion.
func (r *CompleteResponse) UnmarshalJSON(data []byte) error {
	type response CompleteResponse
	return unmarshalKernelResponse(data, (*response)(r), r)
}
