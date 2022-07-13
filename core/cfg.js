(function () {
    var Cfg = {}
        Cfg.mainAppPasswordPath = "./env/main.auth.can";
        Cfg.filesentrytimeout = 0;
        Cfg.procsentrytimeout = 0;
        Cfg.procsentryInterval = 1000;
        Cfg.decoyFilename = "__canicula_decoy.txt";
        Cfg.decoyContent = "trigger";
        Cfg.locations = [
            //"C:/Users/%USERPROFILE%/Documents"
            //"C:\\Users\\%USERPROFILE%\\Desktop\\pride_current\\test"
            "%ROOTDIR%\\test"
        ]
        Cfg.decoyCheckInterval = (1000/Cfg.locations.length);
        Cfg.dangerousProcesses = [
            "Registry", "cmd.exe", "taskkill.exe",
            "sc.exe", "fsutil.exe", "wbadmin.exe", 
            "bcdedit.exe", "schtasks.exe", "regedit.exe"
        ];
        Cfg.safeProcesses = {
            names: [ 
                "System", 
                "System Idle Process", 
                "mshta.exe",
                "wininit.exe",
                "winlogon.exe",
                "services.exe",
                //"svchost.exe"
            ]
        }
        Cfg.IPCRMvalues = {
            ThreadCount: 1.75,
            WriteTransferCount: 1.5,
            WriteOperationCount: 2,
            ReadTransferCount: 1.5,
            ReadOperationCount: 2,
            OtherTransferCount: 0.625,
            OtherOperationCount: 0.625,
            ReductFactor: 10 //só pra tirar a média (com a soma dos valores acima)
        }
        
    return Cfg;
}).call();
