(function () {
    var FileSentry = {
        start: function() {
            var counter = 0;
            Vws.disableServiceButtons("filesentry", "start");
            Vws.enableServiceButtons("filesentry", "kill");
            FileSUtils.createDecoyFiles(Cfg.locations, Cfg.decoyContent);
            setTimeout( function base() {
                var now = new Date().getTime();
                Cfg.filesentrytimeout = setInterval( function runner() {
                    counter++;
                    Vws.displayServiceStatus({
                        service: "filesentry",
                        status: "Running",
                        elapsed: new Date().getTime() - now, 
                        verif: counter 
                    });
                    if (FileSUtils.verifyDecoyFiles() > 0) { 
                        clearInterval(Cfg.filesentrytimeout);
                        FileSUtils.deleteDecoyFiles(Cfg.locations);
                        Trg.emergency(); 
                        return 1;
                    }
                } , Cfg.decoyCheckInterval );
            }, 3000) //sleeps for 3 seconds, to create the decoy files properly
            return 0;
        },
        kill: function() {
            var sure = confirm("Stopping the file sentry service might leave the computer unprotected, do you want to proceed?");
            if (!sure) { return; }
            clearInterval(Cfg.filesentrytimeout);
            Vws.enableServiceButtons("filesentry", "start");
            Vws.disableServiceButtons("filesentry", "kill");
            FileSUtils.deleteDecoyFiles(Cfg.locations);
            Vws.displayServiceStatus({
                service: "filesentry",
                status: "Stopped",
                elapsed: 0, 
                verif: 0
            });
            return 0;
        }
    }
    return FileSentry;
}).call();