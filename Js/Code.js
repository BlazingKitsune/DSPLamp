const urlBase = 'http://localhost/dsplamp';
const extension = 'php';

var Username = "";
var Password = "";
var UID = "";
var UserID = 0;
var RSO1 = 0;
var RSO2 = 0;
var RSO3 = 0;
var EID = 0;

function doLogin()
{
	Username = document.getElementById("username").value;
	Password = document.getElementById("password").value;

    //window.alert(username + password);

	if (Username == "" || Password == "")
	{
		window.alert("Incorrect Username/Password");
		return;
	}

	var jsonCargo = '{"Username" : "' + Username + '", "Password" : "' + Password + '"}';
	let url = urlBase + '/Php/login.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				console.log(UserID);
				let jsonObject = JSON.parse( xhr.responseText );
				UserID = jsonObject.ID;
				if( UserID < 1 )
				{		
					window.alert("Incorrect Username or Password");
					return;
				}
				UID = jsonObject.UID;
				RSO1 = jsonObject.RSO1;
				RSO2 = jsonObject.RSO2;
				RSO3 = jsonObject.RSO3;

				saveCookie();

				window.location.href = "test.html";
	
			}

		};
		xhr.send(jsonCargo);

	}
	catch(err)
	{
		window.alert("Error in Login");
	}

}
function EventpageHelper(EventID)
{
	EID = EventID;
	saveCookie();
	window.location.href = "test2.html";

}
function Eventpage()
{
	EVID = EID;
	let jsonCargo = '{"EID" : "' + EVID + '"}';

	let url = urlBase + '/Php/EventInfo.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				if (jsonObject.error) 
				{
                    console.log(jsonObject.error);
					let text = ""
					document.getElementById("tbodyevent").innerHTML = text;
					return;
                }
				let text = "<table>"
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					var EName = jsonObject.results[i].EName;
					var ECat = jsonObject.results[i].ECat;
					var EDesc = jsonObject.results[i].EDesc;
					var Date = jsonObject.results[i].Date;
					var Location = jsonObject.results[i].Location;
					var EID = jsonObject.results[i].EID;

					text += "<tr id='row" + i + "'>"
					text += "<tr><a onclick='Eventpage("+EID+")'>Event "+EID+"</a></tr>";
					text += "<tr id='EName" + i + "'><span>" + EName + "</span></tr>";
                    text += "<tr id='ECat" + i + "'><span>" + ECat + "</span></tr>";
                    text += "<tr id='EDesc" + i + "'><span>" + EDesc + "</span></tr>";
                    text += "<tr id='Date" + i + "'><span>" + Date + "</span></tr>";
					text += "<tr id='Location" + i + "'><span>" + Location + "</span></tr>";

					text += "<tr/>"
				}
				text += "</table>"
				document.getElementById("tbodyevent").innerHTML = text;
			}
		};
		xhr.send(jsonCargo);
	}
	catch(err)
	{
		window.alert("Error in Search");
	}
}

function SearchEvents()
{
	let public = 1;
	let UniID = UID


	let jsonCargo = '{"Public" : "' + public + '", "UID" : "' + UniID + '", "RSO1" : "' + RSO1 + '", "RSO2" : "' + RSO2 + '", "RSO3" : "' + RSO3 + '"}';

	let url = urlBase + '/Php/LoadEvents.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				if (jsonObject.error) 
				{
                    console.log(jsonObject.error);
					let text = ""
					document.getElementById("tbody").innerHTML = text;
					return;
                }
				let text = "<table>"
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					var EName = jsonObject.results[i].EName;
					var ECat = jsonObject.results[i].ECat;
					var EDesc = jsonObject.results[i].EDesc;
					var Date = jsonObject.results[i].Date;
					var Location = jsonObject.results[i].Location;
					var EID = jsonObject.results[i].EID;

					text += "<tr id='row" + i + "'>"
					text += "<td><a onclick='EventpageHelper("+EID+")'>Go To "+EID+"</a></td>";
					text += "<td id='EName" + i + "'><span>" + EName + "</span></td>";
                    text += "<td id='ECat" + i + "'><span>" + ECat + "</span></td>";
                    text += "<td id='EDesc" + i + "'><span>" + EDesc + "</span></td>";
                    text += "<td id='Date" + i + "'><span>" + Date + "</span></td>";
					text += "<td id='Location" + i + "'><span>" + Location + "</span></td>";

					text += "<tr/>"
				}
				text += "</table>"
				document.getElementById("tbody").innerHTML = text;
			}
		};
		xhr.send(jsonCargo);
	}
	catch(err)
	{
		window.alert("Error in Search");
	}

}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "Username=" + Username + ",Password=" + Password + ",UID=" + UID + ",RSO1=" + RSO1 + ",RSO2=" + RSO2 + ",RSO3=" + RSO3 + ",EID=" + EID + ",UserID=" + UserID + ";expires=" + date.toGMTString();
}

function readCookie()
{
	UserID = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for (var i = 0; i < splits.length; i++) 
	{

        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");

        if (tokens[0] == "Username") 
		{
            Username = tokens[1];
        }

        else if (tokens[0] == "Password") 
		{
            Password = tokens[1];
        }
		else if (tokens[0] == "UID") 
		{
            UID = tokens[1];
        }
		else if (tokens[0] == "RSO1") 
		{
            RSO1 = tokens[1];
        }
		else if (tokens[0] == "RSO2") 
		{
            RSO2 = tokens[1];
        }
		else if (tokens[0] == "RSO3") 
		{
            RSO3 = tokens[1];
        }
		else if (tokens[0] == "EID") 
		{
            EID = tokens[1];
        }

        else if (tokens[0] == "UserID") 
		{
            UserID = parseInt(tokens[1].trim());
		}
		
    }
	
	if( UserID < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		//document.getElementById("userName").innerHTML = "Welcome, " + firstname + " " + lastname + " " + userid + "!";
	}
}