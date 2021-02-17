package kernel

type statsRequest struct {
	kernelRequester

	API string `json:"api"`
}

type StatsResponse struct {
	kernelResponder

	ObjectCount float64 `json:"object_count"`
}

func (c *client) Stats() (response StatsResponse, err error) {
	err = c.request(statsRequest{API: "stats"}, &response)
	return
}
