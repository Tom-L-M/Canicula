window.onload = function() {
    Vws.loadConfigFrame();
    Vws.displayServiceStatus({ //display service as not running when opens the page
        service: "filesentry",
        status: "Stopped",
        elapsed: 0, 
        verif: 0
    });
    Vws.displayServiceStatus({ //display service as not running when opens the page
        service: "procsentry",
        status: "Stopped",
        elapsed: 0, 
        verif: 0
    });
}