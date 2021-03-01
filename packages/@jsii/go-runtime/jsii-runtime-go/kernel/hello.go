package kernel

import "regexp"

type HelloMessage struct {
	kernelResponder

	Hello string `json:"hello"`
}

func (c *client) processHello() (version string, err error) {
	response := HelloMessage{}

	if err = c.response(&response); err != nil {
		return
	}

	parts := regexp.MustCompile("@").Split(response.Hello, 3)
	version = parts[len(parts)-1]
	return
}
