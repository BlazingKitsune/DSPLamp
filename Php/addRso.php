<?php

	$inData = getRequestInfo();

	$RSOName = $inData["RSOName"];
    $RSOCategory = $inData["RSOCategory"];
    $RSODescription = $inData["RSODescription"];
    $RSOLocation = $inData["RSOLocation"];
    $RSOPhone = $inData["RSOPhone"];
    $RSOEmail = $inData["RSOEmail"];
    $RSOID = $inData["ID"];
    $RSOUID = $inData["UID"];

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
		$stmt = $mysqliCon->prepare("INSERT into rso (Name, Category, Description, Location, Phone, Email, Creator, URID) VALUES(?,?,?,?,?,?,?,?)");
		$stmt->bind_param("ssssssss", $RSOName, $RSOCategory, $RSODescription, $RSOLocation, $RSOPhone, $RSOEmail, $RSOID, $RSOUID);
		$stmt->execute();
		$stmt->close();
		$mysqliCon->close();
		returnWithError("Not Poggers!");
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
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>