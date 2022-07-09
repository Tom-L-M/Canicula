(function () {
    var TEST = {}

    TEST.storage = "";

    TEST.begin = function () {
        var local = Env.getWorkingDir() + "\\test\\log\\";
        return [Eng.Fso, local];
    }

    TEST.log = function(proc) {
        //var tf = engine.CreateTextFile(loc + proc.ProcessId + 'deb.txt', true);
            //tf.Write(
                TEST.storage += (
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
                )
            //);
            //tf.Close();
        return;
    }

    TEST.write = function(engine, loc) {
        var tf = engine.CreateTextFile(loc + 'deb.txt', true);
        tf.Write(TEST.storage);
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

    return TEST;
}).call();
