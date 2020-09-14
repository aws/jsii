package jsii

import (
	"bufio"
	"encoding/json"
	"errors"
	"io"
	"io/ioutil"
	"log"
	"os/exec"
	"regexp"
)

type Any interface{}

type Client struct {
	Process        *exec.Cmd
	RuntimeVersion string
	writer         *json.Encoder
	reader         *json.Decoder
	stderr         io.ReadCloser
}

func CheckFatalError(e error) {
	if e != nil {
		log.Fatal(e)
	}
}

func InitClient() (Client, error) {
	cmd := exec.Command("node", "./embedded/jsii-runtime.js")

	out, err := cmd.StdoutPipe()
	if err != nil {
		return Client{}, err
	}

	in, err := cmd.StdinPipe()
	if err != nil {
		return Client{}, err
	}

	stderr, err := cmd.StderrPipe()
	if err != nil {
		return Client{}, err
	}

	// Start Process
	if err := cmd.Start(); err != nil {
		return Client{}, err
	}

	writer := json.NewEncoder(in)
	reader := json.NewDecoder(out)

	client := Client{
		Process: cmd,
		writer:  writer,
		reader:  reader,
		stderr:  stderr,
	}

	// Check for OK response and parse runtime version
	rtver, err := client.validateClientStart()

	if err != nil {
		return Client{}, err
	}

	client.RuntimeVersion = rtver
	return client, nil
}

func (c *Client) request(req interface{}, res interface{}) error {
	err := c.writer.Encode(req)
	if err != nil {
		return err
	}

	return c.response(res)
}

func (c *Client) response(res interface{}) error {
	if c.reader.More() {
		return c.reader.Decode(res)
	}

	errrdr := bufio.NewReader(c.stderr)
	if errrdr.Size() > 0 {
		erroutput, err := ioutil.ReadAll(errrdr)

		if err != nil {
			return err
		}

		return errors.New(string(erroutput))
	}

	return errors.New("No Response from runtime")

}

func (c *Client) validateClientStart() (string, error) {
	response := InitOkResponse{}

	if err := c.response(&response); err != nil {
		return "", err
	}

	version := regexp.MustCompile("@").Split(response.Hello, 3)[2]
	return version, nil
}

func (c *Client) load(request LoadRequest) (LoadResponse, error) {
	response := LoadResponse{}
	return response, c.request(request, &response)
}
