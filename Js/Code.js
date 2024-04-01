const urlBase = 'http://localhost/dsplamp';
const extension = 'php';

// User Level
// 1 = Student
// 2 = Admin
// 3 = Super Admin

var Username = "";
var Password = "";
var UID = "";
var UserID = 0;
var RSO1 = 0;
var RSO2 = 0;
var RSO3 = 0;
var EID = 0;
var ID = 0;

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
				let jsonObject = JSON.parse( xhr.responseText );
				UserID = jsonObject.ID;
				RSO1 = 0;
				RSO2 = 0;
				RSO3 = 0;
				EID = 0;
				ID = jsonObject.ID;
				if( ID < 1 )
				{		
					window.alert("Incorrect Username or Password");
					return;
				}
				UID = jsonObject.UID;
				RSO1 = jsonObject.RSO1;
				RSO2 = jsonObject.RSO2;
				RSO3 = jsonObject.RSO3;
				UserLevel = jsonObject.UserLevel;

				saveCookie();

				window.location.href = "homepage.html";
	
			}

		};
		xhr.send(jsonCargo);

	}
	catch(err)
	{
		window.alert("Error in Login");
	}

}

function doSignUp()
{
	SName = document.getElementById("Name").value;
	SEmail = document.getElementById("email").value;
	SUsername = document.getElementById("username").value;
	SPassword = document.getElementById("password").value;
	ScodeLevel = document.getElementById("codeLevel").value;
	SconfirmPassword = document.getElementById("confirmPassword").value;
	if (SName == "" || SEmail == "" || SUsername == "" || SPassword == "" || SconfirmPassword == "")
	{
		window.alert("All Fields Required");
		return;
	}

	if(SPassword != SconfirmPassword)
	{
		window.alert("Password Does Not Match Up");
		return;
	}

	if(ScodeLevel == "Super Admin")
	{
		ScodeLevel = 3;
	}
	else if(ScodeLevel == "Admin")
	{
		ScodeLevel = 2;
	}
	else
	{
		ScodeLevel = 1;
	}
	
	console.log(SName);
	console.log(SEmail);
	console.log(SUsername);
	console.log(SPassword);
	console.log(ScodeLevel);
	console.log(SconfirmPassword);

	var jsonCargo = '{"Name" : "' + SName + '", "Email" : "' + SEmail + '", "Username" : "' + SUsername + '", "Password" : "' + SPassword + '", "codeLevel" : "' + ScodeLevel + '"}';
	let url = urlBase + '/Php/signup.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	try {
		xhr.onreadystatechange = function( ) 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse(xhr.responseText);
				userId = jsonObject.id;
				firstname = jsonObject.firstName;
				lastname = jsonObject.lastName;
				var success = jsonObject.error;
				console.log(success);
				
				if (!success.localeCompare("Failed")) 
				{
					window.alert("Login Name taken");
					return;
				}

				else
				{
					window.alert("Account Made");
					window.location.href = "index.html";
				}
			}
		};
		xhr.send(jsonCargo);
	}

	catch(err) {
		window.alert("Registration Failed");
		window.alert("Error SignUp");
	}

}

function EventpageHelper(EventID)
{
	EID = EventID;
	saveCookie();
	window.location.href = "eventpage.html";

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

function Comments()
{
	readCookie();
	EVID = EID;
	let jsonCargo = '{"EID" : "' + EVID + '"}';

	let url = urlBase + '/Php/CommentList.' + extension;
	
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
					count = i+1;
					var EID = jsonObject.results[i].EID;
					var UsID = jsonObject.results[i].UserID;
					var Review = jsonObject.results[i].Review;
					var Rating = jsonObject.results[i].Rating;
					var CID = jsonObject.results[i].CID;
					text += "<tr id='row" + i + "'>"
					text += "<td><a onclick='Eventpage("+EID+")'>Comment "+count+"</a></td>";
					text += "<td id='EName" + i + "'><span>" + UsID + "</span></td>";
                    text += "<td id='ECat" + i + "'><span>" + Review + "</span></td>";
                    text += "<td id='EDesc" + i + "'><span>" + Rating + "</span></td>";
					if (ID == UsID )
					{
						text += "<td id='edit_button" + i + "'>" +  "<button id = 'edit' type = 'button' onclick='editreview("+ CID +','+ EID +")'>Edit</button>"+ "</td>";
					}
					text += "<tr/>"
				}
				text += "</table>"
				document.getElementById("comments").innerHTML = text;
			}
		};
		xhr.send(jsonCargo);
	}
	catch(err)
	{
		window.alert("Error in Search");
	}
}

function editreview(CID,EID)
{
	var userInput = prompt("Update Review", "");
	var ratingInput = prompt("Update Ratings", "");
	if(ratingInput <= 5 && ratingInput >=0)
	{
		if(userInput.lenght != 0)
		{
			var jsonCargo = '{"new" : "' + userInput + '","rating" :"' + ratingInput + '","CID" :"'+CID+'"}';
			let url = urlBase + '/Php/UpdateComment.' + extension;
			let xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
			try
			{
				xhr.onreadystatechange = function() 
				{
					if (this.readyState == 4 && this.status == 200) 
					{
						window.alert("Review has been updated");
						EventpageHelper(EID);
					}

				};
				xhr.send(jsonCargo);

			}
			catch(err)
			{
				window.alert("Error");
			}
		}
	}
	else
	{
		window.alert("Invalid");
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

function SearchUni()
{
	let public = 1;
	let UniID = UID


	let jsonCargo = '{"Public" : "' + public + '", "UID" : "' + UniID + '", "RSO1" : "' + RSO1 + '", "RSO2" : "' + RSO2 + '", "RSO3" : "' + RSO3 + '"}';

	let url = urlBase + '/Php/LoadUni.' + extension;
	
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
					var UName = jsonObject.results[i].Name;
					var ULocation = jsonObject.results[i].Location;
					var UDescription = jsonObject.results[i].Description;
					var UStudentsNum = jsonObject.results[i].StudentsNum;
					var UUID = jsonObject.results[i].UID;

					text += "<tr id='row" + i + "'>"
					text += "<td id='EName" + i + "'><span>" + UName + "</span></td>";
					text += "<td id='EName" + i + "'><span>" + ULocation + "</span></td>";
                    text += "<td id='ECat" + i + "'><span>" + UDescription + "</span></td>";
                    text += "<td id='EDesc" + i + "'><span>" + UStudentsNum + "</span></td>";
                    text += "<td id='Date" + i + "'><span>" + UUID + "</span></td>";
					if (UID == UUID )
					{
						var temp = -1;
						UStudentsNum--;
						text += "<td id='edit_button" + i + "'>" +  "<button id = 'edit' type = 'button' onclick='edituni("+ temp + ","+ UUID + "," +UStudentsNum+")'>Leave</button>"+ "</td>";
					}
					if (UID == -1 )
					{
						UStudentsNum++;
						text += "<td id='edit_button" + i + "'>" +  "<button id = 'edit' type = 'button' onclick='edituni("+ UUID + ","+ UUID + "," +UStudentsNum+")'>Join</button>"+ "</td>";
					}
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

function edituni(UUID,UUUID,UStudentsNum)
{
	readCookie();
	var jsonCargo = '{"UUID" :"'+UUID+'","UID" :"'+UUUID+'","ID" :"'+ID+'","UStudentsNum" :"'+UStudentsNum+'"}';
	let url = urlBase + '/Php/UpdateUni.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				if(UUID == -1)
				{
					readCookie();
					UID = -1;
					saveCookie();
					window.location.href = "unipage.html";
				}
				else
				{
					readCookie();
					UID = UUID;
					saveCookie();
					window.location.href = "unipage.html";
				}
			}

		};
		xhr.send(jsonCargo);

	}
	catch(err)
	{
		window.alert("Error");
	}
}

function SearchRso()
{
	let public = 1;
	let UniID = UID


	let jsonCargo = '{"Public" : "' + public + '", "UID" : "' + UniID + '", "RSO1" : "' + RSO1 + '", "RSO2" : "' + RSO2 + '", "RSO3" : "' + RSO3 + '"}';

	let url = urlBase + '/Php/LoadRso.' + extension;
	
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
					var RID = jsonObject.results[i].RID;
					var RName = jsonObject.results[i].Name;
					var RCat = jsonObject.results[i].Category;
					var RDescription = jsonObject.results[i].Description;
					var RLocation = jsonObject.results[i].Location;
					var RPhone = jsonObject.results[i].Phone;
					var REmail = jsonObject.results[i].Email;
					let RCount = jsonObject.results[i].Count;
					var RCreator = jsonObject.results[i].Creator;

					text += "<tr id='row" + i + "'>"
					text += "<td id='EName" + i + "'><span>" + RName + "</span></td>";
					text += "<td id='EName" + i + "'><span>" + RCat + "</span></td>";
                    text += "<td id='ECat" + i + "'><span>" + RLocation + "</span></td>";
                    text += "<td id='EDesc" + i + "'><span>" + RPhone + "</span></td>";
                    text += "<td id='Date" + i + "'><span>" + REmail + "</span></td>";
					text += "<td id='Date" + i + "'><span>" + RCount + "</span></td>";
					readCookie();
					if (RSO1 == RID ||  RSO2 == RID || RSO3 == RID)
					{
						var temp = -1;
						var temp1 = RCount;
						var temp2 = RCount;
						var temp3 = RCount;
						var temptemp = -1;

						var RsoSlot = 0;
						
						if(ID != RCreator)
						{
							if(RSO1 == RID && (RSO2 != RID || RSO3 != RID))
							{
								RsoSlot = 1;
								temp1--;
								text += "<td id='edit_button" + i + "'>" +  "<button id = 'edit' type = 'button' onclick='editRSO("+ temp +','+ RsoSlot +','+ temp1 +','+ RID +")'>Leave</button>"+ "</td>";
							}
							else if(RSO2 == RID && (RSO1 != RID || RSO3 != RID))
							{
								RsoSlot = 2;
								temp2--;
								text += "<td id='edit_button" + i + "'>" +  "<button id = 'edit' type = 'button' onclick='editRSO("+ temp +','+ RsoSlot +','+ temp2 +','+ RID +")'>Leave</button>"+ "</td>";
							}
							else if(RSO3 == RID && (RSO2 != RID || RSO1 != RID))
							{
								RsoSlot = 3;
								temp3--;
								text += "<td id='edit_button" + i + "'>" +  "<button id = 'edit' type = 'button' onclick='editRSO("+ temp +','+ RsoSlot +','+ temp3 +','+ RID +")'>Leave</button>"+ "</td>";
							}
						}

						if(ID == RCreator && RCount == 1)
						{
							if(RSO1 == RID && (RSO2 != RID || RSO3 != RID))
							{
								RsoSlot = 1;
								temp1--;
								temptemp = -1;
								text += "<td id='edit_button" + i + "'>" +  "<button id = 'edit' type = 'button' onclick='deleteRSO("+ temptemp +','+ RsoSlot +','+ temp1 +','+ RID +")'>Delete</button>"+ "</td>";
							}
							else if(RSO2 == RID && (RSO1 != RID || RSO3 != RID))
							{
								RsoSlot = 2;
								temp2--;
								temptemp = -1;
								text += "<td id='edit_button" + i + "'>" +  "<button id = 'edit' type = 'button' onclick='deleteRSO("+ temptemp +','+ RsoSlot +','+ temp2 +','+ RID +")'>Delete</button>"+ "</td>";
							}
							else if(RSO3 == RID && (RSO2 != RID || RSO1 != RID))
							{
								RsoSlot = 3;
								temp3--;
								text += "<td id='edit_button" + i + "'>" +  "<button id = 'edit' type = 'button' onclick='deleteRSO("+ temptemp +','+ RsoSlot +','+ temp3 +','+ RID +")'>Delete</button>"+ "</td>";
							}
						}
						if(ID == RCreator && RCount >= 4)
						{
							if(RSO1 == RID && (RSO2 != RID || RSO3 != RID))
							{
								RsoSlot = 1;
								temp1--;
								text += "<td id='edit_button" + i + "'>" +  "<button id = 'edit' type = 'button' onclick='addEvent()'>Add Event</button>"+ "</td>";
							}
							else if(RSO2 == RID && (RSO1 != RID || RSO3 != RID))
							{
								RsoSlot = 2;
								temp2--;
								text += "<td id='edit_button" + i + "'>" +  "<button id = 'edit' type = 'button' onclick='addEvent()'>Add Event</button>"+ "</td>";
							}
							else if(RSO3 == RID && (RSO2 != RID || RSO1 != RID))
							{
								RsoSlot = 3;
								temp3--;
								text += "<td id='edit_button" + i + "'>" +  "<button id = 'edit' type = 'button' onclick='addEvent()'>Add Event</button>"+ "</td>";
							}
						}

					}
					if (RSO1 == -1 ||  RSO2 == -1 || RSO3 == -1)
					{
						var temp = -1;
						let temp4 = RCount;
						let temp5 = RCount;
						let temp6 = RCount;
						var RsoSlot = 0;
						if(RSO1 == -1 && (RSO2 != RID && RSO3 != RID))
						{
							RsoSlot = 1;
							temp4++;
							text += "<td id='edit_button" + i + "'>" +  "<button id = 'edit' type = 'button' onclick='editRSO("+ RID +','+ RsoSlot +','+ temp4 +','+ RID +")'>Join</button>"+ "</td>";
						}
						else if(RSO2 == -1 && (RSO1 != RID && RSO3 != RID))
						{
							RsoSlot = 2;
							temp5++;
							text += "<td id='edit_button" + i + "'>" +  "<button id = 'edit' type = 'button' onclick='editRSO("+ RID +','+ RsoSlot +','+ temp5 +','+ RID +")'>Join</button>"+ "</td>";
						}
						else if(RSO3 == -1 && (RSO2 != RID && RSO1 != RID))
						{
							RsoSlot = 3;
							temp6++;
							text += "<td id='edit_button" + i + "'>" +  "<button id = 'edit' type = 'button' onclick='editRSO("+ RID +','+ RsoSlot +','+ temp6 +','+ RID +")'>Join</button>"+ "</td>";
						}
					}
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

function editRSO(RID,RsoSlot,NewCount,TrueRID)
{
	readCookie();
	var jsonCargo = '{"ID" :"'+ID+'","RID" :"'+RID+'","RsoSlot" :"'+RsoSlot+'","Count" :"'+NewCount+'"}';
	let url = urlBase + '/Php/UpdateRsoUser.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				if(RID == -1)
				{
					if(RsoSlot == 1)
					{
						readCookie();
						RSO1 = -1;
						saveCookie();
						editRsoCount(NewCount,TrueRID);
						window.location.href = "rsopage.html";
					}
					else if(RsoSlot == 2)
					{
						console.log(RID);
						readCookie();
						RSO2 = -1;
						saveCookie();
						editRsoCount(NewCount,TrueRID);
						window.location.href = "rsopage.html";
					}
					else if(RsoSlot == 3)
					{
						readCookie();
						RSO3 = -1;
						saveCookie();
						editRsoCount(NewCount,TrueRID);
						window.location.href = "rsopage.html";
					}
				}
				else
				{
					if(RsoSlot == 1)
					{
						readCookie();
						RSO1 = RID;
						saveCookie();
						editRsoCount(NewCount,TrueRID);
						window.location.href = "rsopage.html";
					}
					else if(RsoSlot == 2)
					{
						readCookie();
						RSO2 = RID;
						saveCookie();
						editRsoCount(NewCount,TrueRID);
						window.location.href = "rsopage.html";
					}
					else if(RsoSlot == 3)
					{
						readCookie();
						RSO3 = RID;
						saveCookie();
						editRsoCount(NewCount,TrueRID);
						window.location.href = "rsopage.html";
					}
				}
			}

		};
		xhr.send(jsonCargo);

	}
	catch(err)
	{
		window.alert("Error");
	}
}

function editRsoCount(Count,RID)
{
	readCookie();
	var jsonCargo = '{"RID" :"'+RID+'","Count" :"'+Count+'"}';
	let url = urlBase + '/Php/UpdateRsoCount.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
			}

		};
		xhr.send(jsonCargo);

	}
	catch(err)
	{
		window.alert("Error");
	}
}

function deleteRSO(RID,RsoSlot,NewCount,TrueRID)
{
	readCookie();
	var jsonCargo = '{"ID" :"'+ID+'","RID" :"'+RID+'","RsoSlot" :"'+RsoSlot+'","Count" :"'+NewCount+'"}';
	let url = urlBase + '/Php/UpdateRsoUser.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				if(TrueRID == -1)
				{
					if(RsoSlot == 1)
					{
						readCookie();
						RSO1 = -1;
						saveCookie();
						deleteRSO2(TrueRID);
						//window.location.href = "rsopage.html";
					}
					else if(RsoSlot == 2)
					{
						console.log(RID);
						readCookie();
						RSO2 = -1;
						saveCookie();
						deleteRSO2(TrueRID);
						//window.location.href = "rsopage.html";
					}
					else if(RsoSlot == 3)
					{
						readCookie();
						RSO3 = -1;
						saveCookie();
						deleteRSO2(TrueRID);
						//window.location.href = "rsopage.html";
					}
				}
				else
				{
					if(RsoSlot == 1)
					{
						readCookie();
						RSO1 = RID;
						saveCookie();
						deleteRSO2(TrueRID);
						//window.location.href = "rsopage.html";
					}
					else if(RsoSlot == 2)
					{
						readCookie();
						RSO2 = RID;
						saveCookie();
						deleteRSO2(TrueRID);
						//window.location.href = "rsopage.html";
					}
					else if(RsoSlot == 3)
					{
						readCookie();
						RSO3 = RID;
						saveCookie();
						deleteRSO2(TrueRID);
						//window.location.href = "rsopage.html";
					}
				}
			}

		};
		xhr.send(jsonCargo);

	}
	catch(err)
	{
		window.alert("Error");
	}
}

function deleteRSO2(TrueRID)
{
	readCookie();
	var jsonCargo = '{"TrueRID" :"'+TrueRID+'"}';
	let url = urlBase + '/Php/DeleteRso.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				window.location.href = "rsopage.html";
			}

		};
		xhr.send(jsonCargo);

	}
	catch(err)
	{
		window.alert("Error");
	}
}

function addEvent()
{
	alert("Hello Fucker, It works but in progress")
}

function gotoUni()
{
	readCookie();
	//window.alert(UserLevel);
	if(UserLevel != 3)
	{
		window.location.href = "homepage.html";
	}
	else
	{
		window.location.href = "AddUni.html";
	}
}

function addUni()
{

	UniName = document.getElementById("UniName").value;
	UniLocation = document.getElementById("UniLocation").value;
	UniDescription = document.getElementById("UniDescription").value;
	UniEmail = document.getElementById("UniEmail").value;

	if (UniName == "" || UniLocation == "" || UniDescription == "" || UniEmail == "")
	{
		window.alert("All Fields Required");
		return;
	}

	var jsonCargo = '{"UniName" : "' + UniName + '", "UniLocation" : "' + UniLocation + '", "UniDescription" : "' + UniDescription + '", "UniEmail" : "' + UniEmail + '"}';
	let url = urlBase + '/Php/addUni.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse(xhr.responseText);
				var success = jsonObject.error;
				console.log(success);
				
				if (!success.localeCompare("Failed")) 
				{
					window.alert("University taken");
					return;
				}
				else
				{
					window.location.href = "unipage.html";
					window.alert("University Created");
				}
			}

		};
		xhr.send(jsonCargo);

	}
	catch(err)
	{
		window.alert("Error in adding University");
	}
}

function gotoRso()
{
	readCookie();
	//window.alert(UserLevel);
	if(UserLevel != 2)
	{
		window.location.href = "homepage.html";
	}
	else
	{
		window.location.href = "AddRso.html";
	}
}

function addRso()
{

	RSOName = document.getElementById("RSOName").value;
	RSOCategory = document.getElementById("RSOCategory").value;
	RSODescription = document.getElementById("RSODescription").value;
	RSOLocation = document.getElementById("RSOLocation").value;
	RSOPhone = document.getElementById("RSOPhone").value;
	RSOEmail = document.getElementById("RSOEmail").value;
	readCookie();

	if (RSOName == "" || RSOCategory == "" || RSODescription == "" || RSOLocation == "" || RSOPhone == "" || RSOEmail == "")
	{
		window.alert("All Fields Required");
		return;
	}

	if(RSO1 == -1 || RSO2 == -1 || RSO3 == -1)
	{
	}
	else
	{
		window.alert("You made too many RSOs");
		return;
	}

	var jsonCargo = '{"RSOName" : "' + RSOName + '", "RSOCategory" : "' + RSOCategory + '", "RSODescription" : "' + RSODescription + '", "RSOLocation" : "' + RSOLocation + '", "RSOPhone" : "' + RSOPhone + '", "RSOEmail" : "' + RSOEmail + '", "ID" : "' + ID + '", "UID" : "' + UID + '"}';
	let url = urlBase + '/Php/addRso.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse(xhr.responseText);
				var success = jsonObject.error;
				console.log(success);
				
				if (!success.localeCompare("Failed")) 
				{
					window.alert("RSO taken");
					return;
				}
				else
				{
					window.alert("RSO Created");
					var TempRID = jsonObject.RID;
					var NewCount = 1;
					var RsoSlot = 0;

					if(RSO1 == -1)
					{
						RsoSlot = 1;
					}
					else if(RSO2 == -1)
					{
						RsoSlot = 2;
					}
					else if(RSO3 == -1)
					{
						RsoSlot = 3;
					}

					editRSO(TempRID,RsoSlot,NewCount,TempRID);
				}
			}

		};
		xhr.send(jsonCargo);

	}
	catch(err)
	{
		window.alert("Error in adding RSO");
	}
}

function addEventPublic()
{

	EventName = document.getElementById("EventName").value;
	EventCategory = document.getElementById("EventCategory").value;
	EventDescription = document.getElementById("EventDescription").value;
	EventTime = document.getElementById("EventTime").value;
	EventDate = document.getElementById("EventDate").value;
	EventLocation = document.getElementById("EventLocation").value;
	EventPhone = document.getElementById("EventPhone").value;
	EventEmail = document.getElementById("EventEmail").value;
	Rso = 0;
	Public = 1;
	TempUID = 0;
	Approve = 0;
	readCookie();

	if (EventName == "" || EventCategory == "" || EventDescription == "" || EventTime == "" || EventLocation == "" || EventPhone == "" || EventEmail == "")
	{
		window.alert("All Fields Required");
		return;
	}

	var jsonCargo = '{"EventDate" : "' + EventDate + '","Approve" : "' + Approve + '","EventName" : "' + EventName + '", "EventCategory" : "' + EventCategory + '", "EventDescription" : "' + EventDescription + '", "EventTime" : "' + EventTime + '", "EventLocation" : "' + EventLocation + '", "EventPhone" : "' + EventPhone + '", "EventEmail" : "' + EventEmail + '", "Rso" : "' + Rso + '", "Public" : "' + Public + '", "UID" : "' + TempUID + '"}';
	let url = urlBase + '/Php/addEvent.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse(xhr.responseText);
				var success = jsonObject.error;
				console.log(success);
				
				if (!success.localeCompare("Failed")) 
				{
					window.alert("Event Creation Failed");
					return;
				}
				else
				{
					window.alert("Event Created");
				}
			}

		};
		xhr.send(jsonCargo);

	}
	catch(err)
	{
		window.alert("Error in adding Event");
	}
}

function gotoApprove()
{
	readCookie();
	//window.alert(UserLevel);
	if(UserLevel == 3)
	{
		window.location.href = "ApproveEvent.html";
	}
	else
	{
		window.location.href = "homepage.html";
	}
}

function searchApprove()
{
	let public = 0;

	let jsonCargo = '{"Public" : "' + public + '",}';

	let url = urlBase + '/Php/LoadEventsApprove.' + extension;
	
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
					text += "<td><a onclick='Approve("+EID+")'>Approve "+EID+"</a></td>";
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

function Approve(EID)
{
	window.alert(EID);
	let Approve = 1; 
	readCookie();

	var jsonCargo = '{"Approve" : "' + Approve + '", "EID" : "' + EID + '"}';
	let url = urlBase + '/Php/Approve.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse(xhr.responseText);
				var success = jsonObject.error;
				console.log(success);

			}

		};
		window.location.href = "ApproveEvent.html";
		xhr.send(jsonCargo);

	}
	catch(err)
	{
		window.alert("Error in Approving");
	}
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "UserID=" + UserID + ",Username=" + Username + ",Password=" + Password + ",UID=" + UID + ",RSO1=" + RSO1 + ",RSO2=" + RSO2 + ",RSO3=" + RSO3 + ",EID=" + EID + ",ID=" + ID + ",UserLevel=" + UserLevel + ";expires=" + date.toGMTString();
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
			UserID = tokens[1];
        }
		else if (tokens[0] == "UserLevel") 
		{
            UserLevel = tokens[1];
        }
        else if (tokens[0] == "ID") 
		{
            ID = parseInt(tokens[1].trim());
		}
    }
	if( ID < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		//document.getElementById("userName").innerHTML = "Welcome, " + firstname + " " + lastname + " " + userid + "!";
	}
}