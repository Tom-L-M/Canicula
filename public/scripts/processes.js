// For more info about GetObject("WinMgmts:").InstancesOf("Win32_Process"), see: https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-process
            
var refreshRate = 200
var searchString = ""

function clearSearchProcess(){
    searchString = ""
    document.getElementById("searchProcessName").value = "";
    getSysRunningProcesses();
}

function terminateProcess(processId, processName){
    var defPass = '';
    var pass = prompt('This action requires elevated privileges. Insert your password to continue: \n Action: killing process ' + processName, defPass);
    if (pass === null || pass === defPass) { getSysRunningProcesses(); return; } //in case user clicks on 'cancel' button or leaves the field empty
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var tf = fso.OpenTextFile(Cfg.mainAppPasswordPath, 1); //1 is for reading, 2 is for writing into file
    var authCred = tf.ReadLine();
    var userPass = Crypto.sha256(pass)
    tf.Close();
    if (userPass === authCred) {
        var WshShell = new ActiveXObject("WScript.Shell");
        var oExec = WshShell.Run("taskkill /F /PID " + processId, 0, true);
        getSysRunningProcesses()
    } else { alert("Password is Incorrect"); getSysRunningProcesses() }
    return;
}

function getProcessListAndDisplayInHTML()
{
    searchString = document.getElementById("searchProcessName").value;
    
    var procs = GetObject("WinMgmts:").InstancesOf("Win32_Process");
    var tableRowsHTML = "";
    var i = 1
    procEnum = new Enumerator(procs);

    for ( ; !procEnum.atEnd(); procEnum.moveNext())
    {
        var proc = procEnum.item();
        var isShow = false;
        if (searchString != "") {
            if (proc.Name.toLowerCase().indexOf(searchString.toLowerCase()) != -1
                || proc.Description.toLowerCase().indexOf(searchString.toLowerCase()) != -1) {
                isShow = true;
            }
        } else {
            isShow = true;
        }
        if (isShow) {
            tableRowsHTML += '<tr>'
                            + '<td style="width:200px">'
                                + '<button onclick=\'terminateProcess(' + proc.ProcessID.toString() + ', "' + proc.Name + '")\'>'
                                    + '<img class="icon" height="15px" width="15px" src="../../assets/process_kill_icon.png.canicon"/>'
                                + '</button></td>'
                            + '<td>' + proc.ProcessID
                            + '</td><td>' + proc.ParentProcessID
                            + '</td><td>' + proc.Name
                            + '</td><td>' + proc.Priority
                            + '</td><td>' + proc.ThreadCount
                            + '</td><td>' + proc.ReadOperationCount
                            + '</td><td>' + proc.ReadTransferCount
                            + '</td><td>' + proc.WriteOperationCount
                            + '</td><td>' + proc.WriteTransferCount
                            + '</td><td>' + proc.VirtualSize
                            + '</td><td>' + proc.WorkingSetSize						
                            + '</td><td>' + proc.ExecutablePath	
                            + '</td></tr>\n';
        }
        i++;
    }
    
    var htmlTable = '<table id="processTable" style="position: absolute;">'
                    + '<tr>'
                    + '	<th>Kill</th>'
                    + '	<th>PID</th>'
                    + '	<th>Parent PID</th>'
                    + '	<th>Process Name</th>'
                    + '	<th>Priority</th>'
                    + '	<th>Thread Count</th>'
                    + '	<th>Readings</th>'
                    + '	<th>Read Volume</th>'
                    + '	<th>Writings</th>'
                    + '	<th>Write Volume</th>'
                    + '	<th>Virtual Size</th>'
                    + '	<th>WorkSet</th>'
                    + '	<th>Executable Path</th>'
                    + '</tr>'
                    + tableRowsHTML + '</table>'
    
    return htmlTable;
}

function getSysRunningProcesses()
{
    var oOutput = document.getElementById("processTableDisplay");
    oOutput.innerHTML = "";
    oOutput.innerHTML = getProcessListAndDisplayInHTML();
}

window.onload = function() {
    getSysRunningProcesses()
}

refreshInterval = setInterval(getSysRunningProcesses, refreshRate);
