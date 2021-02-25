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

func (p *process) consumeStderr(done chan bool) {
	reader := bufio.NewReader(p.stderr)

	for true {
		line, err := reader.ReadBytes('\n')
		if len(line) == 0 || err == io.EOF {
			done <- true
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
