(function () {
    var ProcSentry = {
        start: function() {
            var counter = 0;
            Vws.disableServiceButtons("procsentry", "start");
            Vws.enableServiceButtons("procsentry", "kill");
            setTimeout( function base() {
                var now = new Date().getTime();
                Cfg.procsentrytimeout = setInterval( function runner() {
                    counter++;
                    Vws.displayServiceStatus({
                        service: "procsentry",
                        status: "Running",
                        elapsed: new Date().getTime() - now, 
                        verif: counter 
                    });
                    if (ProcSUtils.verifyProcDanger() > 0) { 
                        clearInterval(Cfg.procsentrytimeout);
                        Trg.emergency(); 
                        return 1;
                    }
                } , Cfg.procsentryInterval );
            }, 100) //sleeps for 0.1 seconds, to set timers properly
            return 0;
        },
        kill: function() {
            var sure = confirm("Stopping the process sentry service might leave the computer unprotected, do you want to proceed?");
            if (!sure) { return; }
            clearInterval(Cfg.procsentrytimeout);
            Vws.enableServiceButtons("procsentry", "start");
            Vws.disableServiceButtons("procsentry", "kill");
            Vws.displayServiceStatus({
                service: "procsentry",
                status: "Stopped",
                elapsed: 0, 
                verif: 0
            });
            return 0;
        }
    }
    return ProcSentry;
}).call();