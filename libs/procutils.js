var procUtils = {}

procUtils.dangerProcSet = []; //list with the dangerous system processes running
procUtils.suspectProcSet = []; //list of suspect process running
procUtils.getRunningProcesses = function () { return new Enumerator(GetObject("WinMgmts:").InstancesOf("Win32_Process")); }

procUtils.compareResourceUsage = function (procRes) {
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
        //returns the number of items in proc that exceeds configs.procResourceUsage * danger level
    var dangerLevel = 0;
    for (var key in procRes) {
        if (procRes[key] > configs.procResourceUsage[key].max) {
            dangerLevel += (1 * configs.procResourceUsage[key].danger);
        }
    }
    return dangerLevel;
}

procUtils.classificateProcess = function (proc) {

    if (configs.dangerousProcesses.includes(proc.Name)) {
        procUtils.dangerProcSet.push(proc);
    } else if (
            configs.safeProcesses.names.includes(proc.Name) ||
            configs.safeProcesses.companies.includes(proc.Company)
        ) {
    } else {
        if (procUtils.compareResourceUsage(
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
        ) > configs.maxProcDangerLevel) {
            procUtils.suspectProcSet.push(proc);
            
            //TODO: Remove testing dependencies
            var base = TEST.begin();
            TEST.log(base[0], base[1], proc);

        }
    }

    // returns 0 if the process is 'safe', 1 if it is 'dangerous' and 2 if it is 'suspect'
    //adds the process to its respective list (procUtils.dangerProcSet or procUtils.suspectProcSet)
}

procUtils.verifyEnvDangerLevel = function () {}
procUtils.verifyProcDangerLevel = function () {}

procUtils.verifyProcDanger = function () {
    var procEnum = procUtils.getRunningProcesses();
    for ( ; !procEnum.atEnd(); procEnum.moveNext()) {
        var proc = procEnum.item();
        procUtils.classificateProcess(proc);

    }
    
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
         *  For each item in proc that exceeds configs.procResourceUsage, it sums (1 * configs.procResourceUsage[item].danger)
         *  If priority is too high, adds +1 to danger marker
         *  If executable path is 'weird', adds +2 to danger marker
         *  If (proc.Company or proc.Description) == null, adds +1 to danger marker
         *  If the proc's PID matches the Parent PID of a process in procUtils.dangerProcSet, and process danger is already above 5, kills the proc immediately
         *  For each item in proc that matches configs.procDangerMarks, it sums (1 * configs.procDangerMarks[item].danger)
         *  If the danger marker exceeds configs.maxProcDangerLevel the emergency alert is triggered, and the process is killed 
         * 
         * CALCULATING ENVIRONMENT DANGER LEVEL:
         *  +1 * X for each proc in dangerProcSet
         *  +1 * X for each resource in the computer that exceeds configs.procResourceUsage[resource].max
         *  if env danger level exceeds config.maxEnvDangerLevel, kill all processes in procUtils.suspectProcSet
        */
    
    return 0;
}
