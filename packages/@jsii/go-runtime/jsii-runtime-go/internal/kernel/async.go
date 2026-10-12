package kernel

import "fmt"

type CallbacksResponse struct {
	kernelResponse
	Callbacks []callback `json:"callbacks"`
}

// Callbacks lists the callback requests queued by asynchronous method calls.
func (c *Client) Callbacks() (response CallbacksResponse, err error) {
	err = c.request(kernelRequest{"callbacks"}, &response)
	return
}

// UnmarshalJSON provides custom unmarshalling implementation for response
// structs. Creating new types is required in order to avoid infinite recursion.
func (r *CallbacksResponse) UnmarshalJSON(data []byte) error {
	type response CallbacksResponse
	return unmarshalKernelResponse(data, (*response)(r), r)
}

// Await fulfills all callback requests queued by asynchronous method calls,
// then waits for the promise to settle and returns its result.
func (c *Client) Await(promiseID string) (EndResponse, error) {
	for {
		res, err := c.Callbacks()
		if err != nil {
			return EndResponse{}, err
		}
		if len(res.Callbacks) == 0 {
			break
		}
		for _, cb := range res.Callbacks {
			if err := cb.complete(); err != nil {
				return EndResponse{}, err
			}
		}
	}

	return c.End(EndProps{PromiseID: promiseID})
}

// complete runs the callback in the host and reports the outcome to the
// kernel. Errors raised by the host implementation are sent to the kernel,
// which rejects the corresponding promise with them.
func (c *callback) complete() error {
	props := CompleteProps{CallbackID: c.CallbackID}
	if retval, err := c.run(); err != nil {
		props.Error = err.Error()
	} else {
		props.Result = GetClient().CastPtrToRef(retval)
	}

	res, err := GetClient().Complete(props)
	if err != nil {
		return err
	}
	if res.CallbackID != c.CallbackID {
		return fmt.Errorf("completed callback %v, but kernel acknowledged %v", c.CallbackID, res.CallbackID)
	}
	return nil
}
