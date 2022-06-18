// RETURN 0 ON SUCESS / RETURN null OR 1 ON ERROR
// HANDLE ERRORS BY ASKING THE USER TO CLOSE AND OPEN THE APP AGAIN (DON'T KILL SERVICES IF NOT NECESSARY)
var ProcSentry = {
    start: function() {
        var counter = 0;
        View.disableServiceButtons("procsentry", "start");
        View.enableServiceButtons("procsentry", "kill");
        setTimeout( function base() {
            var now = new Date().getTime();
            configs.procsentrytimeout = setInterval( function runner() {
                counter++;
                View.displayServiceStatus({
                    service: "procsentry",
                    status: "Running",
                    elapsed: new Date().getTime() - now, 
                    verif: counter 
                });
                if (procUtils.verifyProcDanger() > 0) { 
                    clearInterval(configs.procsentrytimeout);
                    emergencyTrigger(); 
                    return 1;
                }
            } , configs.procsentryInterval );
        }, 100) //sleeps for 0.1 seconds, to set timers properly
        
        return 0;
    },
    kill: function() {
        var sure = confirm("Stopping the process sentry service might leave the computer unprotected, do you want to proceed?");
        if (!sure) { return; }
        clearInterval(configs.procsentrytimeout);
        View.enableServiceButtons("procsentry", "start");
        View.disableServiceButtons("procsentry", "kill");
        View.displayServiceStatus({
            service: "procsentry",
            status: "Stopped",
            elapsed: 0, 
            verif: 0
        });
        return 0;
    }
}
