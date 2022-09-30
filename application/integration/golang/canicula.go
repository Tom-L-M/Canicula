package main

import (
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

func check(e error) {
    if e != nil {
        panic(e)
    }
}

// CUSTOM CODE FOR THE MAIN APPLICATION
func RunElevatedCode() {
	path, err := os.Getwd()
	way := filepath.Join(path, "app.hta")
	var API_AUTORUN = "--nonce"

	dat, err := os.ReadFile("./env/cli.api.candata")
    check(err)
	API_KEY := string(dat)

	if (len(os.Args) > 1) {
		API_AUTORUN = os.Args[1]
    }
	
	print(API_KEY + " " + API_AUTORUN)

	cmd := exec.Command("mshta", way, API_KEY, API_AUTORUN) // must start it with the custom 'bin' flag
	// call it as canicula.exe /autostart to use autostart mode
	err = cmd.Run()
	if err != nil { fmt.Println(err.Error()); return }
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