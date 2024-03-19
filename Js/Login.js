const urlBase = 'http://localhost/dsplamp';
const extension = 'php';

var Username = "";
var Password = "";
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
				Name = jsonObject.Name;
				Email = jsonObject.Email;

				saveCookie();

				window.location.href = "test.html";
				console.log(UserID);
				console.log(Name);
				console.log(Email);
	
			}

		};
		xhr.send(jsonCargo);

	}
	catch(err)
	{
		window.alert("Error in Login");
	}

}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "Username=" + Username + ",Password=" + Password + ",UserId=" + UserID + ";expires=" + date.toGMTString();
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

        else if (tokens[0] == "UserId") 
		{
            UserId = parseInt(tokens[1].trim());
        }
    }
	
	if( userid < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		//document.getElementById("userName").innerHTML = "Welcome, " + firstname + " " + lastname + " " + userid + "!";
	}
}