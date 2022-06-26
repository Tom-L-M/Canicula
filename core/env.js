(function () {
    var Env = {}
    Env.getUser = function () {
        var wshShell = Eng.Shell;
        var wshEnv = wshShell.Environment("Process");
        var home = wshEnv("HOMEPATH");
        return home;
    }
    Env.getWorkingDir = function () {
        return Eng.Fso.GetFolder(".").Path;
    }
    Env.mountPath = function (path) {
        var u = Env.getUser();
        var v = u.substring(u.indexOf("\\", 2) + 1);
        var n = path.replace("%USERPROFILE%", v);
        n = n.replace("%ROOTDIR%", Env.getWorkingDir());
        return n;
    }
    return Env;
}).call();
