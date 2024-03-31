<?php

	$inData = getRequestInfo();

	$UniName = $inData["UniName"];
    $UniLocation = $inData["UniLocation"];
    $UniDescription = $inData["UniDescription"];
    $UniEmail = $inData["UniEmail"];
    

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
		$stmt = $mysqliCon->prepare("INSERT into university (Name, Location, Description, Uemail) VALUES(?,?,?,?)");
		$stmt->bind_param("sssi", $UniName, $UniLocation, $UniDescription, $UniEmail);
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