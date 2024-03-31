<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;
	$Approve = $inData["Approve"];
    $EID = $inData["EID"];

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
		$stmt = $mysqliCon->prepare("UPDATE events SET Approve = ? WHERE (EID LIKE ?) ");
		$stmt->bind_param("ss",$Approve, $EID);
		$stmt->execute();
		
		$result = $stmt->get_result();
		$stmt->close();
		$mysqliCon->close();
        
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