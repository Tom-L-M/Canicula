var TEST = {}

TEST.begin = function () {
    var fso = File.startEngine();
    var local = Env.getWorkingDir();
    local = Env.mountPath(local.substring(0, local.lastIndexOf('\\')) + "\\test\\log\\");
    return [fso, local];
}

TEST.log = function (engine, loc, proc) {
    var tf = engine.CreateTextFile(loc + proc.ProcessId + 'deb.txt', true);
        tf.Write(
            "{ " +
            "   \n Description: " + proc.Description + 
            "   \n Exe Path: " + proc.ExecutablePath + 
            "   \n Name: " + proc.Name +
            "   \n Other Operation Count: " + proc.OtherOperationCount +
            "   \n Other Transfer Count:" + proc.OtherTransferCount +
            "   \n Parent Process Id: " + proc.ParentProcessId +
            "   \n Peak Virtual Size: " + proc.PeakVirtualSize +
            "   \n Peak Working Set Size: " + proc.PeakWorkingSetSize +
            "   \n Priority: " + proc.Priority +
            "   \n Process Id: " + proc.ProcessId +
            "   \n Read Operation Count: " + proc.ReadOperationCount +
            "   \n Read Transfer Count: " + proc.ReadTransferCount +
            "   \n Thread Count: " + proc.ThreadCount +
            "   \n Virtual Size: " + proc.VirtualSize +
            "   \n WorkingSet Size: " + proc.WorkingSetSize +
            "   \n Write Operation Count: " + proc.WriteOperationCount +
            "   \n Write Transfer Count" + proc.WriteTransferCount + 
            "\n} "
        );
        tf.Close();
    return;
}

TEST.logArr = function (engine, loc, arr, arrname) {
    var tf = engine.CreateTextFile(loc + 'arr' + arrname + '.txt', true);
    tf.Write( "ARRAY [ " + arrname + " ] : ");
    for (var i = 0; i < arr.length; i++) {
        tf.Write("\n  " + arr[i].Name);
    }
    tf.Close();
    return;
}
