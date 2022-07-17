(function () {
    var Fso = {}
    Fso.formatPath = function (p) { return p.replace('/', '\\'); }
    Fso.verifyExistance = function(fpath) {
        var fs = Eng.Fso;
        var b = Fso.formatPath(fpath);
        var p = b.substring(0, fpath.lastIndexOf('\\'));
        var f = b.substring(fpath.lastIndexOf('\\'));
        return (fs.FolderExists(p) && fs.FileExists(f));
    },
    Fso.switchFileAttribute = function (file, attr, set) {
        var attrValues = {
            "none": 0, "readonly": 1, "hidden": 2,
            "system": 4, "volume": 8, "directory": 16, 
            "archive": 32, "alias": 1024, "compressed": 2048
        } 
        if (attrValues[attr] === undefined) { return 0; }
        var f = Eng.Fso.GetFile(file);
        if (set) { f.attributes = f.attributes + attrValues[attr]; } // set attribute as true
        else { f.attributes = f.attributes - attrValues[attr]; } // set attribute as false
        return f.attributes;
    }
    return Fso;
}).call();