package kernel

type EndRequest struct {
	kernelRequester

	API       string  `json:"api"`
	PromiseID *string `json:"promise_id"`
}

type EndResponse struct {
	kernelResponder

	Result interface{} `json:"result"`
}

func (c *client) End(request EndRequest) (response EndResponse, err error) {
	err = c.request(request, &response)
	return
}
