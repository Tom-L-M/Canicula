var Import = function (f) { return eval((new ActiveXObject("Scripting.FileSystemObject")).OpenTextFile(f, 1).ReadAll()); } //This is needed to import other modules

// Module (path reference is 'app.hta')          // # Dependencies    # Name                 # Description

// Zero-Level Modules (zero dependencies)
var Eng = Import('./core/eng.js');               // ; []              ; Engines              ; Includes ActiveX Engine objects (Shell and Fso)
var Cfg = Import('./core/cfg.js');               // ; []              ; Configs              ; Configurations file
var Trg = Import('./core/trg.js');               // ; []              ; Trigger              ; Application triggers to kill processes

//Low-Level Modules (core-only dependencies)
var Vws = Import('./core/vws.js');               // ; [cfg]           ; App View             ; App views rendering custom methods
var Fso = Import('./core/fso.js');               // ; [eng]           ; FileSysObject        ; FileSystemObject custom methods
var Env = Import('./core/env.js');               // ; [eng]           ; Environment          ; Environment custom methods
var Sys = Import('./core/sys.js');               // ; [eng]           ; System               ; System custom methods

//Low-Level library Modules
var Crypto = Import('./libs/crypto.js');         // ; []              ; Crypto               ; Namespace for SHA-256 hashing and criptographic resources


// Test-Level Modules (experimental)
var TEST = Import('./test/testlog.js');
//TODO: remove test and experimental dependencies

// High-Level Modules (many dependencies)
var ProcSUtils = Import('./func/procsutils.js'); // ; [cfg,eng]       ; ProcSentry utils
var FileSUtils = Import('./func/filesutils.js'); // ; [cfg,eng,env]   ; FileSentry utils 
var ProcSentry = Import('./func/procsentry.js'); // ; [cfg,trg,vws]   ; ProcSentry manager 
var FileSentry = Import('./func/filesentry.js'); // ; [cfg,trg,vws]   ; FileSentry manager 

//TODO: create a function that verifies the software integrity before starting, getting the hash of all files, and comparing with an hash kept in a file
//TODO: Create a function that uses the Save() method to create a shortcut to the application on the desktop
// [https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/k5x59zft(v=vs.84)]
//TODO: Verificar se existe mais de um drive (buscar pelo 'D' e 'E') e se houver, mapear um certo número de locais para posicionar decoys, de forma a proteger todos os drives locais (remotos não)
