package kernel

type EndProps struct {
	PromiseID *string `json:"promise_id"`
}

type EndResponse struct {
	kernelResponse
	Result interface{} `json:"result"`
}

func (c *client) End(props EndProps) (response EndResponse, err error) {
	type request struct {
		kernelRequest
		EndProps
	}
	err = c.request(request{kernelRequest{"end"}, props}, &response)
	return
}
