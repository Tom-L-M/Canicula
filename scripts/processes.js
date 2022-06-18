// More info about GetObject("WinMgmts:").InstancesOf("Win32_Process"), see: https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-process
            
var refreshRate = 200
var searchString = ""

function clearSearchProcess(){
    searchString = ""
    document.getElementById("searchProcessName").value = "";
    getSysRunningProcesses();
}

function terminateProcess(processId, processName){
    if (confirm('Are you sure you want to terminate the process "' + processName + '"?')) {
        var WshShell = new ActiveXObject("WScript.Shell");
        var oExec = WshShell.Run("taskkill /F /PID " + processId, 0, true);
        getSysRunningProcesses()
    }
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
                                    + '<img class="icon" height="15px" width="15px" src="../assets/process_kill_icon.png"/>'
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
