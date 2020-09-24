package main

import (
	// "log"
	"fmt"
	jsiicalc "github.com/aws-cdk/jsii/jsii-calc/golang/jsiicalc"
	"github.com/aws-cdk/jsii/jsii-experimental"
)

func main() {
	fmt.Println("Hello, JSII")
	// client, err := jsii.InitClient()

	// if err !=nil {
	//   log.Fatal(err)
	// }
	fmt.Print(jsii.Client{RuntimeVersion: "100.100.100"})

	// fmt.Printf("Client init successful\nRuntime version: %s", client.RuntimeVersion)
	fmt.Println(jsiicalc.AbstractClass{})
}
