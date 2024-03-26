<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;
	$ID = $inData["ID"];
	$RID = $inData["RID"];
    $RsoSlot = $inData["RsoSlot"];

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
        if($inData["RsoSlot"] == 1)
        {
            $stmt = $mysqliCon->prepare("UPDATE users SET RSO1 = ? WHERE (ID LIKE ?) ");
            $stmt->bind_param("ss",$RID, $ID);
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            $mysqliCon->close();
        }
        else if($inData["RsoSlot"] == 2)
        {
            $stmt = $mysqliCon->prepare("UPDATE users SET RSO2 = ? WHERE (ID LIKE ?) ");
            $stmt->bind_param("ss",$RID, $ID);
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            $mysqliCon->close();
        }
        else if($inData["RsoSlot"] == 3)
        {
            $stmt = $mysqliCon->prepare("UPDATE users SET RSO3 = ? WHERE (ID LIKE ?) ");
            $stmt->bind_param("ss",$RID, $ID);
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            $mysqliCon->close();
        }
        
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