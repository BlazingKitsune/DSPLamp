<?php

	$inData = getRequestInfo();

	$EventName = $inData["EventName"];
    $EventCategory = $inData["EventCategory"];
    $EventDescription = $inData["EventDescription"];
    $EventTime = $inData["EventTime"];
    $EventDate = $inData["EventDate"];
    $EventLocation = $inData["EventLocation"];
    $EventPhone = $inData["EventPhone"];
    $EventEmail = $inData["EventEmail"];
    $Rso = $inData["Rso"];
    $Public = $inData["Public"];
    $UID = $inData["UID"];
    $Approve = $inData["Approve"];

	$host = "localhost"; // Replace with your database host
    $dbname = "dsp"; // Replace with your database name
    $user = "root"; // Replace with your database username
    $pass = ""; // Replace with your database password

    $mysqliCon = new mysqli($host, $user, $pass, $dbname);
	if ($mysqliCon->connect_error) 
	{
		returnWithError( $mysqliCon->connect_error );
	} 
	else
	{
		$stmt = $mysqliCon->prepare("INSERT into events (Rso, Public, UID, Approve, EName, ECat, EDesc, Time, Date, Location, Phone, Email) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)");
		$stmt->bind_param("ssssssssssss", $Rso, $Public, $UID, $Approve, $EventName, $EventCategory, $EventDescription, $EventTime, $EventDate, $EventLocation, $EventPhone, $EventEmail);
		$stmt->execute();

        // Get the ID of the last inserted record
        $lastInsertedID = $mysqliCon->insert_id;

		$stmt->close();
		$mysqliCon->close();

        // Return the RID (last inserted ID)
        returnWithInfo($lastInsertedID);
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"RID":"' . $searchResults . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>