package process

import (
	"bufio"
	"encoding/json"
	"io"
	"os"
)

type consoleMessage struct {
	Stderr []byte `json:"stderr"`
	Stdout []byte `json:"stdout"`
}

// consumeStderr is intended to be used as a goroutine, and will consume this
// process' stderr stream until it reaches EOF. It reads the stream line-by-line
// and will decode any console messages per the jsii wire protocol specification.
// Closing done broadcasts completion to cleanup and the process monitor.
func (p *Process) consumeStderr(done chan struct{}) {
	defer close(done)
	reader := bufio.NewReader(p.stderr)

	for true {
		line, err := reader.ReadBytes('\n')
		if len(line) == 0 || err == io.EOF {
			return
		}
		var message consoleMessage
		if err := json.Unmarshal(line, &message); err != nil {
			os.Stderr.Write(line)
		} else {
			if message.Stderr != nil {
				os.Stderr.Write(message.Stderr)
			}
			if message.Stdout != nil {
				os.Stdout.Write(message.Stdout)
			}
		}
	}
}
