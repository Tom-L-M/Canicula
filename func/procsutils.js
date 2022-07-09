(function () {
    var ProcSUtils = {}
    ProcSUtils.dangerProcSet = []; //list with the dangerous system processes running
    ProcSUtils.suspectProcSet = []; //list of suspect process running
    ProcSUtils.getRunningProcesses = function () { return new Enumerator(GetObject("WinMgmts:").InstancesOf("Win32_Process")); }
    ProcSUtils.compareResourceUsage = function (procRes) {
        /*  procRes = {
                OtherOperationCount,
                OtherTransferCount,
                ReadOperationCount,
                ReadTransferCount,
                ThreadCount,
                VirtualSize,
                WorkingSetSize,
                WriteOperationCount,
                WriteTransferCount
            } */
            //returns the number of items in proc that exceeds Cfg.procResourceUsage * danger level
        var dangerLevel = 0;
        for (var key in procRes) {
            if (procRes[key] > Cfg.procResourceUsage[key].max) {
                dangerLevel += (1 * Cfg.procResourceUsage[key].danger);
            }
        }
        return dangerLevel;
    }
    ProcSUtils.classificateProcess = function (proc) {
        if (Cfg.dangerousProcesses.includes(proc.Name)) {
            ProcSUtils.dangerProcSet.push(proc);
        } else if (
                Cfg.safeProcesses.names.includes(proc.Name) ||
                Cfg.safeProcesses.companies.includes(proc.Company)
            ) {
        } else {
            if (ProcSUtils.compareResourceUsage(
                {
                    OtherOperationCount: proc.OtherOperationCount,
                    OtherTransferCount: proc.OtherTransferCount,
                    ReadOperationCount: proc.ReadOperationCount,
                    ReadTransferCount: proc.ReadTransferCount,
                    ThreadCount: proc.ThreadCount,
                    VirtualSize: proc.VirtualSize,
                    WorkingSetSize: proc.WorkingSetSize,
                    WriteOperationCount: proc.WriteOperationCount,
                    WriteTransferCount: proc.WriteTransferCount
                }
            ) > Cfg.maxProcDangerLevel) {
                ProcSUtils.suspectProcSet.push(proc);
            }
        }

        // returns 0 if the process is 'safe', 1 if it is 'dangerous' and 2 if it is 'suspect'
        //adds the process to its respective list (ProcSUtils.dangerProcSet or ProcSUtils.suspectProcSet)
    }
    ProcSUtils.verifyEnvDangerLevel = function () {}
    ProcSUtils.verifyProcDangerLevel = function () {}
    ProcSUtils.verifyProcDanger = function () {
        var procEnum = ProcSUtils.getRunningProcesses();

        //TODO: Remove testing dependencies
        var base = TEST.begin();
        
        for ( ; !procEnum.atEnd(); procEnum.moveNext()) {
            var proc = procEnum.item();
            ProcSUtils.classificateProcess(proc);

            //TODO: Remove testing dependencies
            TEST.log(proc);
        }
        //TODO: Remove testing dependencies
        TEST.write(base[0], base[1]);
        TEST.logArr(base[0], base[1], ProcSUtils.dangerProcSet, "DANGER");
        TEST.logArr(base[0], base[1], ProcSUtils.suspectProcSet, "SUSPECT");
        
        /* Flow:
            if (processo pertence à lista de processos perigosos) {
                adiciona à lista de processos perigosos correndo
            } else {
                if (consumo de recursos > consumo máximo não-suspeito) {
                    adiciona à lista de processos suspeitos
                }
                continue;
            }

            > verifica o nível de perigo checando as listas de processos perigosos e suspeitos correndo (verifyDangerLevel)
            > verifica associações entre processos usando o 'Parent PID'
            > Se o nível de perigo for muito alto, bloqueia processos suspeitos
            > Cria logs para a operação toda
        */

            /**
             * CALCULATING PROCESS DANGER LEVEL:
             *  For each item in proc that exceeds Cfg.procResourceUsage, it sums (1 * Cfg.procResourceUsage[item].danger)
             *  If priority is too high, adds +1 to danger marker
             *  If executable path is 'weird', adds +2 to danger marker
             *  If (proc.Company or proc.Description) == null, adds +1 to danger marker
             *  If the proc's PID matches the Parent PID of a process in ProcSUtils.dangerProcSet, and process danger is already above 5, kills the proc immediately
             *  For each item in proc that matches Cfg.procDangerMarks, it sums (1 * Cfg.procDangerMarks[item].danger)
             *  If the danger marker exceeds Cfg.maxProcDangerLevel the emergency alert is triggered, and the process is killed 
             * 
             * CALCULATING ENVIRONMENT DANGER LEVEL:
             *  +1 * X for each proc in dangerProcSet
             *  +1 * X for each resource in the computer that exceeds Cfg.procResourceUsage[resource].max
             *  if env danger level exceeds config.maxEnvDangerLevel, kill all processes in ProcSUtils.suspectProcSet
            */
        return 0;
    }

    return ProcSUtils;
}).call();
