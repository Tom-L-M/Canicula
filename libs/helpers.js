//TODO: Create a function that uses the Save() method to create a shortcut to the application on the desktop
// [https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/k5x59zft(v=vs.84)]

//TODO: declarar as variáveis com nomes dos namespaces no arquivo 'namespace.js' e mover configurações para um arquivo 'config.js' dentro do diretório '/core/'

var Shell = {
    startEngine: function () { return new ActiveXObject("WScript.Shell"); }
}

var File = {
    startEngine: function () { return new ActiveXObject("Scripting.FileSystemObject"); },
    formatPath: function (p) { return p.replace('/', '\\'); },
    verifyExistance: function(fpath) {
        var fso = this.startEngine();
        var b = formatPath(fpath);
        var p = b.substring(0, fpath.lastIndexOf('\\'));
        var f = b.substring(fpath.lastIndexOf('\\'));
        return (fso.FolderExists(p) && fso.FileExists(f));
    }
}

var View = {
    loadStatusFrame: function (service, content) {
        document.getElementById(service + "-status").innerHTML = content;
        return 0;
    },
    loadConfigFrame: function () {
        var render = "<br/><br/><br/>" + 
            "Number of decoy files:  " + configs.locations.length + "<br/>" +
            "Verification interval:  " + configs.decoyCheckInterval + "<br/>" +
            "Decoy file name:        " + configs.decoyFilename + "<br/>" +
            "Bytes written per file: " + configs.decoyContent.length * 2 + "<br/>"
            
        document.getElementById("config-status").innerHTML = render;
    },
    displayServiceStatus: function (opts) {
        var service = opts.service;
        var status = opts.status;
        var elapsed = opts.elapsed;
        var verif = opts.verif;
        var content = "" +
            "<code>" + 
                " Service Status: " + status + "<br/>" +
                " Elapsed Time: " + elapsed + "<br/>" +
                " Verifications: " + verif + "<br/>" +
            "</code>"
        View.loadStatusFrame(service, content);
        return 0;
    },
    disableServiceButtons: function (service, button) { //"filesentry", "start"
        var c = "" + service + "-" + button;
        document.getElementById(c).disabled = true;
        return 0;
    },
    enableServiceButtons: function (service, button) {
        var c = "" + service + "-" + button;
        document.getElementById(c).disabled = false;
        return 0;
    }
}

var Env = {
    getUser: function () {
        var wshShell = new ActiveXObject("WScript.Shell");
        var wshEnv = wshShell.Environment("Process");
        var home = wshEnv("HOMEPATH");
        return home;
    },
    mountPath: function (path) {
        var u = Env.getUser()
        var v = u.substring(u.indexOf("\\", 2) + 1);
        var n = path.replace("%USERPROFILE%", v);
        return n;
    }
}

var Sys = {
    killProcess: function (processId, processName) {
        if (confirm('Are you sure you want to terminate the process "' + processName + '"?')) {
            var WshShell = new ActiveXObject("WScript.Shell");
            var oExec = WshShell.Run("taskkill /F /PID " + processId, 0, true);
            getSysRunningProcesses()
        }
    }
}


// TODO: Migrate methods below to respective scripts (*utils: procSentryUtils / triggerUtils / fileSentryUtils) and create namespaces for it
function emergencyTrigger() {
    
    alert("alert");
    return 0;
}

function verifyDecoyFiles() {
    //return number of decoy files not in place
    //return 0 for all files in place
    //return -1 for no files found
    return 0;
}

function deleteDecoyFiles(locs) {
    // delete all the reacheable decoy files (return the number of unreached ones)
    var fso = File.startEngine();
    var counter = 0;
    for (var i = 0; i < locs.length; i++) {
        var pa = Env.mountPath(locs[i]);
        if (fso.FolderExists(pa)) {
            var file = pa + "\\"+ configs.decoyFilename;
            if (!fso.FileExists(file)) { counter++; continue; }
            var act = fso.GetFile(file);
            act.Delete();
        }
    }
    if (counter != 0) { alert("WARNING:" + counter + " decoy files were not found"); }
    
    return counter;
}

function createDecoyFiles(locs, content) {
    // create decoy files in specified locs
    var tf;
    var fso = File.startEngine();
    for (var i = 0; i < locs.length; i++) {
        var pa = Env.mountPath(locs[i]);
        if (fso.FolderExists(pa)) {
            tf = fso.CreateTextFile(pa + "\\"+ configs.decoyFilename, true);
            tf.Write(content);
            tf.Close();
        }
    }
    return 0;
}
