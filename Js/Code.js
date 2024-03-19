const urlBase = 'http://localhost/dsplamp';
const extension = 'php';

var Username = "";
var Password = "";
var UID = "";
var UserID = 0;

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

function SearchEvents()
{
	let public = 1;
	let UniID = UID
	let jsonCargo = '{"Public" : "' + public + '", "UID" : "' + UniID + '"}';

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

					text += "<tr id='row" + i + "'>"
					text += "<td><a href='test2.html'>Go To</a></td>";
					text += "<td id='EName" + i + "'><span>" + EName + "</span></td>";
                    text += "<td id='ECat" + i + "'><span>" + ECat + "</span></td>";
                    text += "<td id='EDesc" + i + "'><span>" + EDesc + "</span></td>";
                    text += "<td id='Date" + i + "'><span>" + Date + "</span></td>";
					text += "<td id='Location" + i + "'><span>" + Location + "</span></td>";

					text += "<tr/>"
				}
				text += "</table>"
			}
		};
		xhr.send(jsonCargo);
	}
	catch(err)
	{
		window.alert("Error in Search");
	}

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

					text += "<tr id='row" + i + "'>"
					text += "<td><a href='test2.html'>Go To</a></td>";
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
	document.cookie = "Username=" + Username + ",Password=" + Password + ",UID=" + UID + ",UserID=" + UserID + ";expires=" + date.toGMTString();
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