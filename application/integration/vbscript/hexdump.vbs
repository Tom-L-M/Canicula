option explicit
dim fso, wshSHell, objShellApp, args, stdin,stdout

set fso         = CreateObject("Scripting.FileSystemObject")
Set wshShell    = CreateObject("WScript.Shell")
set objShellApp = CreateObject("Shell.Application")
Set args = Wscript.Arguments
set stdin = wscript.stdin
set stdout = wscript.stdout

dim filename, dumpmode, linetowrite, txtFile

filename = args(0)
dumpmode = args(1) 
linetowrite = ""
'dump modes:
' 0 : full raw dump (same as case default)
' 1 : full formatted dump
' 2 : offsets only
' 3 : bytes only
' 4 : ascii only
' 5 : offsets + bytes
' 6 : offsets + ascii
' 7 : bytes + ascii
' 8 : offsets + unitary bytes

Const adTypeBinary = 1

'Create Stream object
Dim BinaryStream, data
Set BinaryStream = CreateObject("ADODB.Stream")

'Specify stream type - we want To get binary data.
BinaryStream.Type = adTypeBinary

'Open the stream
BinaryStream.Open

'Load the file data from disk To stream object
BinaryStream.LoadFromFile filename

'Open the stream And get binary data from the object
data = BinaryStream.Read
BinaryStream.close

dim i, item, strLine, hexLine
hexLine = ""
strLine = ""

Select Case dumpmode 
Case 0
    for i = 0 to lenb(data)-1
        item = ascb(midb(data,i+1,1))
        if ((i MOD 16) = 0) and (i<>0) then
            stdout.writeLine "0x" & right("00000000" & hex(i-16),8) & " | " &  hexLine & "| " & strLine
            hexLine = ""
            strLine = ""
        end if
        hexLine = hexLine & right("0" & hex(item),2) & " "
        if (item <= 32) or (item > 254) then 
            strLine=strLine + "."
        else
            strLine = strLine & chr(item)
        end if
    next

Case 1
    stdout.writeline "  __________________________________________________________________________________________"
    stdout.writeline " |       Offsets       |                              Datasets                              "
    stdout.writeline " |---------------------|--------------------------------------------------------------------"
    stdout.writeline " |   Dec    |   Hex    |                      Bytes                       |      ASCII      "
    stdout.writeline " |----------|----------|--------------------------------------------------|-----------------"
    for i = 0 to lenb(data)-1
        item = ascb(midb(data,i+1,1))
        if ((i MOD 16) = 0) and (i<>0) then
            stdout.writeLine " | " & right("00000000" & i-16,8) & " | " & right("00000000" & hex(i-16),8) & " | " &  hexLine & " | " & strLine
            hexLine = ""
            strLine = ""
        end if
        hexLine = hexLine & right("0" & hex(item),2) & " "
        if (item <= 32) or (item > 254) then 
            strLine=strLine + "."
        else
            strLine = strLine & chr(item)
        end if
    next

Case 2
    for i = 0 to lenb(data)-1
        item = ascb(midb(data,i+1,1))
        if ((i MOD 16) = 0) and (i<>0) then
            stdout.writeLine "0x" & right("00000000" & hex(i-16),8)
            hexLine = ""
            strLine = ""
        end if
        hexLine = hexLine & right("0" & hex(item),2) & " "
        if (item <= 32) or (item > 254) then 
            strLine=strLine + "."
        else
            strLine = strLine & chr(item)
        end if
    next
    
Case 3
    for i = 0 to lenb(data)-1
        item = ascb(midb(data,i+1,1))
        if ((i MOD 16) = 0) and (i<>0) then
            stdout.writeLine hexLine
            hexLine = ""
            strLine = ""
        end if
        hexLine = hexLine & right("0" & hex(item),2) & " "
        if (item <= 32) or (item > 254) then 
            strLine=strLine + "."
        else
            strLine = strLine & chr(item)
        end if
    next

Case 4
    for i = 0 to lenb(data)-1
        item = ascb(midb(data,i+1,1))
        if ((i MOD 16) = 0) and (i<>0) then
            stdout.writeLine strLine
            hexLine = ""
            strLine = ""
        end if
        hexLine = hexLine & right("0" & hex(item),2) & " "
        if (item <= 32) or (item > 254) then 
            strLine=strLine + "."
        else
            strLine = strLine & chr(item)
        end if
    next

Case 5
    for i = 0 to lenb(data)-1
        item = ascb(midb(data,i+1,1))
        if ((i MOD 16) = 0) and (i<>0) then
            stdout.writeLine "0x" & right("00000000" & hex(i-16),8) & " | " &  hexLine
            hexLine = ""
            strLine = ""
        end if
        hexLine = hexLine & right("0" & hex(item),2) & " "
        if (item <= 32) or (item > 254) then 
            strLine=strLine + "."
        else
            strLine = strLine & chr(item)
        end if
    next

Case 6
    for i = 0 to lenb(data)-1
        item = ascb(midb(data,i+1,1))
        if ((i MOD 16) = 0) and (i<>0) then
            stdout.writeLine "0x" & right("00000000" & hex(i-16),8) & " | " & strLine
            hexLine = ""
            strLine = ""
        end if
        hexLine = hexLine & right("0" & hex(item),2) & " "
        if (item <= 32) or (item > 254) then 
            strLine=strLine + "."
        else
            strLine = strLine & chr(item)
        end if
    next

Case 7
    for i = 0 to lenb(data)-1
        item = ascb(midb(data,i+1,1))
        if ((i MOD 16) = 0) and (i<>0) then
            stdout.writeLine hexLine & "| " & strLine
            hexLine = ""
            strLine = ""
        end if
        hexLine = hexLine & right("0" & hex(item),2) & " "
        if (item <= 32) or (item > 254) then 
            strLine=strLine + "."
        else
            strLine = strLine & chr(item)
        end if
    next

Case 8
    for i = 0 to lenb(data)-1
        item = ascb(midb(data,i+1,1))
        if (i<>0) then
            stdout.writeLine "0x" & right("00000000" & hex(i-16),8) & " | " &  hexLine
            hexLine = ""
            strLine = ""
        end if
        hexLine = hexLine & right("0" & hex(item),2) & " "
        if (item <= 32) or (item > 254) then 
            strLine=strLine + "."
        else
            strLine = strLine & chr(item)
        end if
    next

Case Else 
    for i = 0 to lenb(data)-1
        item = ascb(midb(data,i+1,1))
        if ((i MOD 16) = 0) and (i<>0) then
            stdout.writeLine "0x" & right("00000000" & hex(i-16),8) & " | " &  hexLine & "| " & strLine
            hexLine = ""
            strLine = ""
        end if
        hexLine = hexLine & right("0" & hex(item),2) & " "
        if (item <= 32) or (item > 254) then 
            strLine=strLine + "."
        else
            strLine = strLine & chr(item)
        end if
    next

End Select