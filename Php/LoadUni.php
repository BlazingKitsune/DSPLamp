<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;
	$Public = $inData["Public"];
    $UID = $inData["UID"];
    $Approve = 1;
    $RSO = 0;
    $RSO1 = $inData["RSO1"];
    $RSO2 = $inData["RSO2"];
    $RSO3 = $inData["RSO3"];
    

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
		$stmt = $mysqliCon->prepare("SELECT * FROM university");
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '{"Name" : "' . $row["Name"]. '", "Location" : "' . $row["Location"]. '", "Description" : "' . $row["Description"]. '", "StudentsNum" : "' . $row["StudentsNum"]. '", "UID" : "' . $row["UID"]. '"}';
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found!" );
		}
		else
		{
			returnWithInfo( $searchResults );
		}
		
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