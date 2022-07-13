(function () {
    var ProcSUtils = {}
    ProcSUtils.dangerProcSet = []; // list with the dangerous system processes running
    ProcSUtils.suspectProcSet = []; // list of suspect process running
    ProcSUtils.IPCRMlist = []; // list of all IPCRM bases 
    ProcSUtils.getRunningProcesses = function () { return new Enumerator(GetObject("WinMgmts:").InstancesOf("Win32_Process")); }
    ProcSUtils.resetLists = function() { ProcSUtils.dangerProcSet = []; ProcSUtils.suspectProcSet = []; ProcSUtils.IPCRMlist = []; return; }

    ProcSUtils.calculateFRAR = function(proc) { return ((proc.ReadOperationCount * proc.ReadTransferCount * proc.WriteOperationCount * proc.WriteTransferCount) / proc.ThreadCount); }
    ProcSUtils.calculateIPCRM = function(proc) { 
        return (((
            (proc.WriteOperationCount * Cfg.IPCRMvalues.WriteOperationCount) + 
            (proc.WriteTransferCount * Cfg.IPCRMvalues.WriteTransferCount) + 
            (proc.ReadOperationCount * Cfg.IPCRMvalues.ReadOperationCount) + 
            (proc.ReadTransferCount * Cfg.IPCRMvalues.ReadTransferCount)) * 
            Cfg.IPCRMvalues.ThreadCount) / Cfg.IPCRMvalues.ReductFactor
        );
    }
    
    ProcSUtils.classificateProcess = function (proc) {
        if (Cfg.safeProcesses.names.includes(proc.Name)) { 
            //safe processes
            return 0; 
        } else if (Cfg.dangerousProcesses.includes(proc.Name)) { 
            //dangerous processes (regedit / schtask / cmd / ...)
            ProcSUtils.dangerProcSet.push(proc); 
            return 1; 
        }
        //everything else
        if (ProcSUtils.calculateFRAR(proc) > 0) { 
            var base = ProcSUtils.calculateIPCRM(proc);
            var med = ProcSUtils.IPCRMlist.getAverage();
            if (base > (med / 2)) { 
                ProcSUtils.suspectProcSet.push(proc); 
                ProcSUtils.IPCRMlist.push(base);
                return 2;
            }
            //se o processo for menor do que a metade da média de processos adicionados,
            // então ele tem baixíssimo consimo de recursos, 
            // e oferece baixo risco
            return 0;
        } //removes the processes that don't interact with files
        return 0;
        
        // returns 0 if the process is 'safe', 1 if it is 'dangerous' and 2 if it is 'suspect'
        //adds the process to its respective list (ProcSUtils.dangerProcSet or ProcSUtils.suspectProcSet)
    }

    ProcSUtils.verifyEnvDanger = function () {
        //return environment danger level : 0=safe; 1=suspicious; 2=dangerous;
        return 0;
    }

    ProcSUtils.verifyProcDanger = function () {
        ProcSUtils.resetLists(); // to empty the lists and start the evaluation without previous BIAS interference
        var procEnum = ProcSUtils.getRunningProcesses();
        var base = TEST.begin(); //TODO: Test deps
        
        for ( ; !procEnum.atEnd(); procEnum.moveNext()) {
            var proc = procEnum.item();
            ProcSUtils.classificateProcess(proc);
            
           
            TEST.log(proc); //TODO: Test Deps
        }
        
        // After classificating all processes, it tests for environment danger level:
        var dangerLevel = ProcSUtils.verifyEnvDanger();
        if (dangerLevel > 1) { Trg.emergency(); }

        TEST.write(base[0], base[1]); //TODO: Test deps
        TEST.logArr(base[0], base[1], ProcSUtils.dangerProcSet, "DANGER"); //TODO: Test deps
        TEST.logArr(base[0], base[1], ProcSUtils.suspectProcSet, "SUSPECT"); //TODO: Test deps
        TEST.logArr(base[0], base[1], ProcSUtils.IPCRMlist, "IPCRM"); //TODO: Test deps
        return 0;
        //returning anything higher than 0 triggers the emergency switch
    }
    return ProcSUtils;
}).call();
