var configs = {}
configs.filesentrytimeout = 0,
configs.procsentrytimeout = 0,
configs.procsentryInterval = 1000,
configs.decoyFilename = "__decoy.txt",
configs.decoyContent = "trigger",
configs.locations = [
    //"C:/Users/%USERPROFILE%/Documents"
    "C:\\Users\\%USERPROFILE%\\Desktop\\pride_current\\test"
]
configs.decoyCheckInterval = (1000/configs.locations.length);
configs.dangerousProcesses = [];
configs.safeProcesses = {
    names: ["mshta.exe"],
    companies: []
}
configs.procDangerMarks = [ //all factors used to measure danger level of a process
    "ExecutablePath",
    "Priority",
    "Description",
    "Company",
    "Name",
    "ParentProcessId",
    "ProcessId",
]
configs.procResourceUsage = { //max always in bytes
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
configs.maxProcDangerLevel = 5;
configs.maxEnvDangerLevel = 5;
