(function () {
    var Vws = {}
    Vws.loadStatusFrame = function (service, content) {
        document.getElementById(service + "-status").innerHTML = content;
        return 0;
    }
    Vws.loadConfigFrame = function () {
        var render = "<br/><br/><br/>" + 
            "Number of decoy files:  " + Cfg.locations.length + "<br/>" +
            "Verification interval:  " + Cfg.decoyCheckInterval + "<br/>" +
            "Decoy file name:        " + Cfg.decoyFilename + "<br/>" +
            "Bytes written per file: " + Cfg.decoyContent.length * 2 + "<br/>"    
        document.getElementById("config-status").innerHTML = render;
    }
    Vws.displayServiceStatus = function (opts) {
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
        Vws.loadStatusFrame(service, content);
        return 0;
    }
    Vws.disableServiceButtons = function (service, button) { //("filesentry", "start") / ("procsentry", "start")
        var c = "" + service + "-" + button;
        document.getElementById(c).disabled = true;
        return 0;
    }
    Vws.enableServiceButtons = function (service, button) {
        var c = "" + service + "-" + button;
        document.getElementById(c).disabled = false;
        return 0;
    }
    Vws.popup = function (content) { WScript.Echo(content); }
    return Vws;
}).call();
