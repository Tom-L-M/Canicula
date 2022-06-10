function loadConfigFrame() {
    var render = "<br/><br/><br/>" + 
        "Number of decoy files:  " + configs.locations.length + "<br/>" +
        "Verification interval:  " + configs.decoyCheckInterval + "<br/>" +
        "Decoy file name:        " + configs.decoyFilename + "<br/>" +
        "Bytes written per file: " + configs.decoyContent.length * 2 + "<br/>"
        
    document.getElementById("config-status").innerHTML = render;
    //verify if the serives are running, by checking if there are proper files in 'data/servicelock'
}

function disableServiceButtons(service, button) { //"filesentry", "start"
    var c = "" + service + "-" + button;
    document.getElementById(c).disabled = true;
    return 0;
}

function enableServiceButtons(service, button) {
    var c = "" + service + "-" + button;
    document.getElementById(c).disabled = false;
    return 0;
}

function loadStatusFrame(service, content) {
    if (service === "filesentry") {
        document.getElementById(service + "-status").innerHTML = content;
    }
    return 0;
}

window.onload = function() {
    loadConfigFrame();
    displayServiceStatus({ //display service as not running when opens the page
        service: "filesentry",
        status: "Stopped",
        elapsed: 0, 
        verif: 0
    });
}