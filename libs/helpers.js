//TODO: Create a function that uses the Save() method to create a shortcut to the application on the desktop
// [https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/k5x59zft(v=vs.84)]

var Shell = {
    startEngine: function() { return new ActiveXObject("WScript.Shell"); }
}

var File = {
    startEngine: function() { return new ActiveXObject("Scripting.FileSystemObject"); },
    formatPath: function(p) { return p.replace('/', '\\'); },
    verifyExistance: function(fpath) {
        var fso = this.startEngine();
        var b = formatPath(fpath);
        var p = b.substring(0, fpath.lastIndexOf('\\'));
        var f = b.substring(fpath.lastIndexOf('\\'));
        return (fso.FolderExists(p) && fso.FileExists(f));
    },
    create: function(name) {},
    get: function() {},
    remove: function() {},
    edit: function() {}
}

function displayServiceStatus(opts) {
    var service = opts.service;
    var status = opts.status;
    var elapsed = opts.elapsed;
    var verif = opts.verif;
    var content = "" +
        "<code>" + 
            " Service Status: " + status + "<br/>" +
            " Elapsed Time: " + elapsed + "<br/>" +
            " Decoy Verifications: " + verif + "<br/>" +
        "</code>"
    loadStatusFrame(service, content);
    return 0;
}

function getUser() {
    var wshShell = new ActiveXObject("WScript.Shell");
    var wshEnv = wshShell.Environment("Process");
    var home = wshEnv("HOMEPATH");
    return home;
}

function mountPath(path) {
    var u = getUser()
    var v = u.substring(u.indexOf("\\", 2) + 1);
    var n = path.replace("%USERPROFILE%", v);
    return n;
}

function emergencyTrigger() {
    alert("Missing File Decoys");
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
        var pa = mountPath(locs[i]);
        if (fso.FolderExists(pa)) {
            var file = pa + "\\"+ configs.decoyFilename;
            if (!fso.FileExists(file)) { counter++; continue; }
            var act = fso.GetFile(file);
            act.Delete();
        }
    }
    return counter;
}

function createDecoyFiles(locs, content) {
    // create decoy files in specified locs
    var tf;
    var fso = File.startEngine();
    for (var i = 0; i < locs.length; i++) {
        var pa = mountPath(locs[i]);
        if (fso.FolderExists(pa)) {
            tf = fso.CreateTextFile(pa + "\\"+ configs.decoyFilename, true);
            tf.Write(content);
            tf.Close();
        }
    }
    return 0;
}