package main

import (
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"strings"
	"path/filepath"
    "time"
    "syscall"
	"golang.org/x/sys/windows"
)

func main() {
	// if not elevated, relaunch by shellexecute with runas verb set
	if !AdminLevel() { ElevatePrivilege() }
	time.Sleep(time.Second)

	// run custom code
	RunElevatedCode();
}


// CUSTOM CODE FOR THE MAIN APPLICATION
func RunElevatedCode() {
	reader := bufio.NewReader(os.Stdin)
	fmt.Println("\nCanicula Control Panel:")
	fmt.Println("(Tip: type 'help')")

	for {
		fmt.Print("\n$> ")
		text, _ := reader.ReadString('\n')
		// convert CRLF to LF
		//text = strings.Replace(text, "\n", "", -1) //If in UNIX
		text = strings.Replace(text, "\r\n", "", -1) //If in Windows

		if strings.Compare("help", text) == 0 {
			fmt.Println(" This is the main canicula control panel. \n Available commands are: 'help' / 'start' / 'exit'")
		} else if strings.Compare("start", text) == 0 {
			path, err := os.Getwd()
			way := filepath.Join(path, "app.hta")
			cmd := exec.Command("mshta", way)
			err = cmd.Run()
			if err != nil { fmt.Println(err.Error()); return }
		} else if strings.Compare("exit", text) == 0 { return }
	}
}


// FUNCTIONS TO ELEVATE PRIVILEGE LEVEL
func ElevatePrivilege() {
    verb := "runas"
    exe, _ := os.Executable()
    cwd, _ := os.Getwd()
    args := strings.Join(os.Args[1:], " ")

    verbPtr, _ := syscall.UTF16PtrFromString(verb)
    exePtr, _ := syscall.UTF16PtrFromString(exe)
    cwdPtr, _ := syscall.UTF16PtrFromString(cwd)
    argPtr, _ := syscall.UTF16PtrFromString(args)
    
	var showCmd int32 = 1 //SW_NORMAL

    err := windows.ShellExecute(0, verbPtr, exePtr, argPtr, cwdPtr, showCmd)
    if err != nil {
        fmt.Println(err)
    }
	os.Exit(0)
}

func AdminLevel() bool {
    _, err := os.Open("\\\\.\\PHYSICALDRIVE0")
    if err != nil { return false }
    return true
}