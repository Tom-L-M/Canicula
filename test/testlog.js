(function () {
    var TEST = {}

    TEST.storage = "Name,Description,Executable Path,PID,Parent PID,Priority,Threads,Read Op. Count,Read Op. Vol.,Write Op. Count,Write Op. Vol.,Other Op. Count,Other Op. Vol.,Virtual Size,Peak Virtual Size,Working Set,Peak Working Set";

    TEST.begin = function () {
        var local = Env.getWorkingDir() + "\\test\\log\\";
        return [Eng.Fso, local];
    }

    TEST.log = function(proc) {
        //var tf = engine.CreateTextFile(loc + proc.ProcessId + 'deb.txt', true);
            //tf.Write(
                // TEST.storage += (
                //     "{ " +
                //     "   \n Description: " + proc.Description + 
                //     "   \n Exe Path: " + proc.ExecutablePath + 
                //     "   \n Name: " + proc.Name +
                //     "   \n Other Operation Count: " + proc.OtherOperationCount +
                //     "   \n Other Transfer Count:" + proc.OtherTransferCount +
                //     "   \n Parent Process Id: " + proc.ParentProcessId +
                //     "   \n Peak Virtual Size: " + proc.PeakVirtualSize +
                //     "   \n Peak Working Set Size: " + proc.PeakWorkingSetSize +
                //     "   \n Priority: " + proc.Priority +
                //     "   \n Process Id: " + proc.ProcessId +
                //     "   \n Read Operation Count: " + proc.ReadOperationCount +
                //     "   \n Read Transfer Count: " + proc.ReadTransferCount +
                //     "   \n Thread Count: " + proc.ThreadCount +
                //     "   \n Virtual Size: " + proc.VirtualSize +
                //     "   \n WorkingSet Size: " + proc.WorkingSetSize +
                //     "   \n Write Operation Count: " + proc.WriteOperationCount +
                //     "   \n Write Transfer Count: " + proc.WriteTransferCount + 
                //     "\n} "
                // )
                TEST.storage += (
                    "\n" 
                    + proc.Name +','
                    + proc.Description + ','
                    + proc.ExecutablePath + ','
                    + proc.ProcessId +','
                    + proc.ParentProcessId +','
                    + proc.Priority +','
                    + proc.ThreadCount +','
                    + proc.ReadOperationCount +','
                    + proc.ReadTransferCount +','
                    + proc.WriteOperationCount +','
                    + proc.WriteTransferCount + ','
                    + proc.OtherOperationCount +','
                    + proc.OtherTransferCount +','
                    + proc.VirtualSize +','
                    + proc.PeakVirtualSize +','
                    + proc.WorkingSetSize +','
                    + proc.PeakWorkingSetSize
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
            if (arrname === "IPCRM") { tf.Write("\n  " + arr[i]) ;}
            else { 
                tf.Write(
                    "\n" 
                    + arr[i].Name +','
                    + arr[i].Description + ','
                    + arr[i].ExecutablePath + ','
                    + arr[i].ProcessId +','
                    + arr[i].ParentProcessId +','
                    + arr[i].Priority +','
                    + arr[i].ThreadCount +','
                    + arr[i].ReadOperationCount +','
                    + arr[i].ReadTransferCount +','
                    + arr[i].WriteOperationCount +','
                    + arr[i].WriteTransferCount + ','
                    + arr[i].OtherOperationCount +','
                    + arr[i].OtherTransferCount +','
                    + arr[i].VirtualSize +','
                    + arr[i].PeakVirtualSize +','
                    + arr[i].WorkingSetSize +','
                    + arr[i].PeakWorkingSetSize
                ); 
            }
        }
        tf.Close();
        return;
    }

    return TEST;
}).call();
