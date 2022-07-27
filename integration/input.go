package main

import (
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"runtime"
	"strings"
)

func main() {

	reader := bufio.NewReader(os.Stdin)
	fmt.Println("\nCanicula Control Panel:")
	fmt.Println("(Tip: type 'help')")

	for {
		fmt.Print("\n $> ")
		text, _ := reader.ReadString('\n')
		// convert CRLF to LF
		//text = strings.Replace(text, "\n", "", -1) //If in UNIX
		text = strings.Replace(text, "\r\n", "", -1) //If in Windows

		if strings.Compare("help", text) == 0 {
			fmt.Println(" This is the main canicula control panel. \n Available commands are: 'help' / 'start' / 'exit'")
		} else if strings.Compare("start", text) == 0 {
			_, fil, _, _ := runtime.Caller(0)
			str := fil[:strings.LastIndex(fil, "/")]
			cmd := exec.Command("mshta.exe", str + "/app.hta")
			err := cmd.Run()
			if err != nil {
				fmt.Println(err.Error())
				return
			}
		} else if strings.Compare("exit", text) == 0 {
			return
		}

	}

}
