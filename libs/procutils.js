var procUtils = {}

procUtils.procList = []; //list with all processes manipulated
procUtils.cproc = ""; //current process being held and manipulated

procUtils.classificateProcess = function (p) {}

procUtils.verifyDangerLevel = function () {}

procUtils.getRunningProcesses = function () {
    var procs = GetObject("WinMgmts:").InstancesOf("Win32_Process");
    procEnum = new Enumerator(procs);
    return procEnum;
}

procUtils.verifyProcDanger = function () {
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


    //TODO: delete this
    var fso = File.startEngine();
    tf = fso.CreateTextFile("C:\\Users\\tom20\\Desktop\\pride_0.0.4\\test\\debugger.txt", true);
    tf.Write("Start");
    for ( ; !procEnum.atEnd(); procEnum.moveNext()) {
        var proc = procEnum.item();
        tf.Write(
            proc.Description + " : " + 
            proc.ExecutablePath + " : " + 
            proc.Name + " : " +
            proc.OtherOperationCount + " : " +
            proc.OtherTransferCount + " : " +
            proc.ParentProcessId + " : " +
            proc.PeakVirtualSize + " : " +
            proc.PeakWorkingSetSize + " : " +
            proc.Priority + " : " +
            proc.ProcessId + " : " +
            proc.ReadOperationCount + " : " +
            proc.ReadTransferCount + " : " +
            proc.ThreadCount + " : " +
            proc.VirtualSize + " : " +
            proc.WorkingSetSize + " : " +
            proc.WriteOperationCount + " : " +
            proc.WriteTransferCount + 
            " \n"
        );
        //procUtils.classificateProcess(proc);
    }
    tf.Write("End");
    tf.Close();
    
    return 0;
}
