$LOCATION = $args[0]
Get-ChildItem -Path $LOCATION -Include * | foreach { $_.Delete() }
# Get-ChildItem -Path $LOCATION -Include * -Recurse | foreach { $_.Delete() }