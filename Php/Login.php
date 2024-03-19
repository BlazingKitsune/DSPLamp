<?php
	$inData = getRequestInfo();
	
	$id = 0;
	$host = "localhost"; // Replace with your database host
    $dbname = "dsp"; // Replace with your database name
    $user = "root"; // Replace with your database username
    $pass = ""; // Replace with your database password

    $mysqliCon = new mysqli($host, $user, $pass, $dbname);
	if( $mysqliCon->connect_error )
	{
		returnWithError( $mysqliCon->connect_error );
	}
	else
	{
		$stmt = $mysqliCon->prepare("SELECT ID,Username,Password,UID FROM users WHERE (Username =? AND Password =?)");
		$stmt->bind_param("ss", $inData["Username"], $inData["Password"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['Username'], $row['Password'], $row['ID'],  $row['UID'] );
		}
		else
		{
			returnWithError("No Records Found");
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
		$retValue = '{"ID":0,"Username":"","Password":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $username, $password, $id, $UID )
	{
		$retValue = '{"ID":' . $id . ',"Username":"' . $username . '","Password":"' . $password . '","UID":' . $UID . ',"error": ""}';
		sendResultInfoAsJson( $retValue );
	}
?>