(function () {
    var Cfg = {}
        Cfg.filesentrytimeout = 0,
        Cfg.procsentrytimeout = 0,
        Cfg.procsentryInterval = 1000,
        Cfg.decoyFilename = "__canicula_decoy.txt",
        Cfg.decoyContent = "trigger",
        Cfg.locations = [
            //"C:/Users/%USERPROFILE%/Documents"
            //"C:\\Users\\%USERPROFILE%\\Desktop\\pride_current\\test"
            "%ROOTDIR%\\test"
        ]
        Cfg.decoyCheckInterval = (1000/Cfg.locations.length);
        Cfg.dangerousProcesses = [
            "Registry", 
            "cmd.exe",
            "taskkill.exe",
            "sc.exe",
            "fsutil.exe",
            "wbadmin.exe",
            "bcdedit.exe",
            "schtasks.exe",
            "regedit.exe"
        ];
        Cfg.safeProcesses = {
            names: [
                "System", 
                "System Idle Process", 
                "mshta.exe"
            ],
            companies: []
        }
        Cfg.procDangerMarks = [ //all factors used to measure danger level of a process
            "ExecutablePath",
            "Priority",
            "Description",
            "Company",
            "Name",
            "ParentProcessId",
            "ProcessId",
        ]
        Cfg.procResourceUsage = { //max always in bytes
            OtherOperationCount: {max: 300, danger: 1},
            OtherTransferCount: {max: 30000, danger: 1},
            ReadOperationCount: {max: 500, danger: 3},
            ReadTransferCount: {max: 200000, danger: 2},
            ThreadCount: {max: 15, danger: 2},
            VirtualSize: {max: 1000000000000, danger: 1},
            WorkingSetSize: {max: 10000000, danger: 1},
            WriteOperationCount: {max: 5000, danger: 3},
            WriteTransferCount: {max: 300000, danger: 2}
        }
        Cfg.maxProcDangerLevel = 5;
        Cfg.maxEnvDangerLevel = 5;
    return Cfg;
}).call();
