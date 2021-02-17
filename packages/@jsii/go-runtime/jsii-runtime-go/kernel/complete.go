package kernel

type CompleteRequest struct {
	kernelRequester

	API        string      `json:"api"`
	CallbackID *string     `json:"cbid"`
	Error      *string     `json:"err"`
	Result     interface{} `json:"result"`
}

type CompleteResponse struct {
	kernelResponder

	CallbackID *string `json:"cbid"`
}

func (c *client) Complete(request CompleteRequest) (response CompleteResponse, err error) {
	err = c.request(request, &response)
	return
}
