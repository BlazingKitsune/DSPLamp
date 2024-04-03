<?php

	$inData = getRequestInfo();

	$addInput = $inData["addInput"];
    $addRatingInput = $inData["addRatingInput"];
    $EID = $inData["EID"];
    $ID = $inData["ID"];

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
		$stmt = $mysqliCon->prepare("INSERT into comments (EID, UserID, Review, Rating) VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $EID, $ID, $addInput, $addRatingInput,);
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
		$retValue = '{"RID":"' . $searchResults . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>