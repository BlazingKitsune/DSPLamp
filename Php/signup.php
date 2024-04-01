<?php
	$inData = getRequestInfo();
	
    $name = $inData["Name"];
	$username = $inData["Username"];
	$password = $inData["Password"];
    $userlevel = $inData["codeLevel"];
    $email= $inData["Email"];
    $empty = -1;

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
		$stmt = $mysqliCon->prepare("SELECT ID,Name,Email FROM Users WHERE (Username=? AND Password =?)");
		$stmt->bind_param("ss", $inData["Username"], $inData["Password"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			returnWithError("Failed");
		}
		else
		{
			$stmt = $mysqliCon->prepare("INSERT into users (Username, Password, Name, Email,UID,RSO1,RSO2,RSO3,UserLevel) VALUES(?,?,?,?,?,?,?,?,?)");
			$stmt->bind_param("sssssssss", $username, $password, $name, $email,$empty,$empty,$empty,$empty,$userlevel);
			$test = $stmt->execute();

			$stmt->close();
			$mysqliCon->close();

			if($test == true)
			{
				returnWithError("Success");
			}
			else if($test == false)
			{
				returnWithError("Failed");
			}
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
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>