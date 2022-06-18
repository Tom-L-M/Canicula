// RETURN 0 ON SUCESS / RETURN null OR 1 ON ERROR
// HANDLE ERRORS BY ASKING THE USER TO CLOSE AND OPEN THE APP AGAIN (DON'T KILL SERVICES IF NOT NECESSARY)
var FileSentry = {
    start: function() {
        var counter = 0;
        View.disableServiceButtons("filesentry", "start");
        View.enableServiceButtons("filesentry", "kill");
        createDecoyFiles(configs.locations, configs.decoyContent);
        setTimeout( function base() {
            var now = new Date().getTime();
            configs.filesentrytimeout = setInterval( function runner() {
                counter++;
                View.displayServiceStatus({
                    service: "filesentry",
                    status: "Running",
                    elapsed: new Date().getTime() - now, 
                    verif: counter 
                });
                if (verifyDecoyFiles() > 0) { 
                    clearInterval(configs.filesentrytimeout);
                    deleteDecoyFiles(config.locations);
                    emergencyTrigger(); 
                    return 1;
                }
            } , configs.decoyCheckInterval );
        }, 3000) //sleeps for 3 seconds, to create the decoy files properly
        
        return 0;
    },
    kill: function() {
        var sure = confirm("Stopping the file sentry service might leave the computer unprotected, do you want to proceed?");
        if (!sure) { return; }
        clearInterval(configs.filesentrytimeout);
        View.enableServiceButtons("filesentry", "start");
        View.disableServiceButtons("filesentry", "kill");
        deleteDecoyFiles(configs.locations);
        View.displayServiceStatus({
            service: "filesentry",
            status: "Stopped",
            elapsed: 0, 
            verif: 0
        });
        return 0;
    }
}
