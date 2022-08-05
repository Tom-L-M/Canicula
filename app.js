var Import = function (f) { return eval((new ActiveXObject("Scripting.FileSystemObject")).OpenTextFile(f, 1).ReadAll()); } //This is needed to import other modules

// Modules (path reference is 'app.hta')          // # Dependencies    # Name                 # Description
// Zero-Level Modules
var Crypto = Import('./libs/crypto.canscript');         // ; []              ; Crypto               ; Namespace for SHA-256 hashing and criptographic resources
// Core Modules
var Eng = Import('./core/eng.canscript');               // ; []              ; Engines              ; Includes ActiveX Engine objects (Shell and Fso)
var Dbs = Import('./core/dbs.canscript')                // ; []              ; Databases            ; Database methods 
var Cfg = Import('./core/cfg.canscript');               // ; []              ; Configs              ; Configurations file
var Trg = Import('./core/trg.canscript');               // ; [sys]           ; Trigger              ; Application triggers to kill processes
// Low-Level Modules (core-only dependencies)
var Vws = Import('./core/vws.canscript');               // ; [cfg]           ; App View             ; App views rendering custom methods
var Fso = Import('./core/fso.canscript');               // ; [eng]           ; FileSysObject        ; FileSystemObject custom methods
var Htt = Import('./core/htt.canscript');
var Env = Import('./core/env.canscript');               // ; [eng]           ; Environment          ; Environment custom methods
var Sys = Import('./core/sys.canscript');               // ; [eng]           ; System               ; System custom methods
// Test-Level Modules (experimental)
var TEST = Import('./test/testlog.canscript'); //TODO: Test deps
// High-Level Modules (many dependencies)
var ProcSUtils = Import('./func/procsutils.canscript'); // ; [cfg,eng]       ; ProcSentry utils
var FileSUtils = Import('./func/filesutils.canscript'); // ; [cfg,eng,env]   ; FileSentry utils 
var ProcSentry = Import('./func/procsentry.canscript'); // ; [cfg,trg,vws]   ; ProcSentry manager 
var FileSentry = Import('./func/filesentry.canscript'); // ; [cfg,trg,vws]   ; FileSentry manager 

// Top-Level Modules
var App = Import('./core/app.canscript');

//TODO: create a function that verifies the software integrity before starting, getting the hash of all files, and comparing with an hash kept in a file
//TODO: Create a function that uses the Save() method to create a shortcut to the application on the desktop
// [https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/k5x59zft(v=vs.84)]
//TODO: Verificar se existe mais de um drive (buscar pelo 'D' e 'E') e se houver, mapear um certo número de locais para posicionar decoys, de forma a proteger todos os drives locais (remotos não)