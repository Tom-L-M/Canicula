(function () {
    var Sys = {}
    Sys.killProcess = function (processId, processName) {
        if (confirm('Are you sure you want to terminate the process "' + processName + '"?')) {
            var oExec = Eng.Shell.Run("taskkill /F /PID " + processId, 0, true);
        }
    },
    Sys.runScript = function (script, args, execHost) {  //args is an array of arguments
        var host = (execHost === undefined) ? ("") : (execHost);
        //change host to other engines, to execute different script types
        //Engines:  
        //  '' => default => runs .cmd and .bat files in the current cmd enviroment
        //  mshta.exe   => run MS .HTA files
        //  cscript.exe => runs VBScript and JScript in command line mode
        //  wscript.exe => runs VBScript and JScript in graphical mode
        
        return Eng.Shell.Run(host + ' ' + script + ' ' + args.join(" "), 0, true);
    }
    return Sys;
}).call();