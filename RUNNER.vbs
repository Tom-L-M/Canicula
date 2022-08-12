Const SHOW_ACTIVE_APP = 1 
Set objShell = Wscript.CreateObject("Wscript.Shell") 
objShell.Run ("app.hta /runas /savecred /user:administrador"), SHOW_ACTIVE_APP, True 
Wscript.Quit