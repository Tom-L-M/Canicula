(function () {
    var Eng = {}
    Eng.Shell;
    Eng.Fso;
    Eng.StartAppEngines = function () { //starts low-level functions to make the app work
        Eng.Shell = new ActiveXObject("WScript.Shell");
        Eng.Fso = new ActiveXObject("Scripting.FileSystemObject");

        // Adds support to a pseudo 'includes()' array method
        Array.prototype.includes = function(str) { for (var i = 0; i < this.length; i++) { if (this[i] == str) { return true; } } return false; }

        // Adds support to a pseudo 'join()' array method
        Array.prototype.join = function(sep) { 
            var ac = '';
            for (var i = 0; i < this.length; i++) { ac += this[i] + sep; }
            return ac.substring(0, ac.length - sep.length); // Removes the extra separator chars at the end
        }
    }

    Eng.StartAppEngines(); //starts engines automatically (explicit starting is not necessary anymore)
    
    return Eng; 
}).call();
