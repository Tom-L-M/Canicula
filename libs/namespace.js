var configs = {}

configs.filesentrytimeout = 0,
configs.procsentrytimeout = 0,
configs.procsentryInterval = 1000,
configs.decoyFilename = "__decoy.txt",
configs.decoyContent = "trigger",
configs.locations = [
    //"C:/Users/%USERPROFILE%/Documents"
    "C:\\Users\\%USERPROFILE%\\Desktop\\pride_0.0.4\\test"
]
configs.decoyCheckInterval = (1000/configs.locations.length);
