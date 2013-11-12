//LoginScript
// ----------------------------------TEMPLATES---------------------------

//-----------------------------------Loginscreens----------------------
var welcomeTemplate= _.template("<h2> Herzlich Willkommen , <br> <%- id %> ! </h2><div align = 'left'><a id='logout' href='#'>Logout</a></div>")

var loginTemplate=_.template('<h1>Login</h1>'+
								'<table border= "0">'+
								'<tr>'+
								'<td>Benutzer:</td>'+
								'<td><input id="ID" type="text" placeholder="Benutzername" /></td></tr>'+
								'<tr>'+
								'<td>Passwort:</td>'+	
								'<td><input id="PW" type="password" placeholder="Passwort" />'+
								'</td></tr>'+
								'<tr><td><div align="left"><a href="#" id="register" style="color: black;">Registrieren</div></td>'+
								'<td><div align="right"><a id="loginLink" style="color: black;" href="#">Login</a>'+
								'</div>'+
								'</td>'+
								'</tr>'+
								'</table>')
		
//----------------------------Navigation when logged in---------------------		
var nav_login_Template=_.template('<ul> <li class="topmenu">  <a href="#" id="nav_home">Home</a>  </li>'+ 
									'<li class="topmenu">' +
									' <a href="#" >Genre</a> '+
									' <ul>' +
									' <li class="submenu" ><a href="#" id="nav_action">Action</a></li> '+
									' <li class="submenu"><a href="#" id="nav_comedy">Comedy</a></li>' +
									' <li class="submenu"><a href="#" id="nav_horror">Horror</a></li> '+
								    ' <li class="submenu"><a href="#" id="nav_scifi">Sci-Fi</a></li> '+
									' <li class="submenu"><a href="#" id="nav_thriller">Thriller</a></li> '+
									' </ul> </li>' +
									' <li class="topmenu">' +
									'  <a href="#" id="nav_care">Verwaltung</a></li> ' + 
									' </li> '+
									'</ul> ');
	
//---------------------------Navigation when logout	-----------------------
var nav_logout_Template=_.template('<ul> <li class="topmenu">  <a href="#" id="nav_home">Home</a>  </li>'+
								    '<li class="topmenu">' +
									' <a href="#" >Genre</a> '+
									' <ul>' +
									' <li class="submenu"><a href="#" id="nav_action">Action</a></li> '+
									' <li class="submenu"><a href="#" id="nav_comedy">Comedy</a></li>' +
									' <li class="submenu"><a href="#" id="nav_horror">Horror</a></li>  '+
									' <li class="submenu"><a href="#" id="nav_scifi">Sci-Fi</a></li> '+
									' <li class="submenu"><a href="#" id="nav_thriller">Thriller</a></li> </ul> '+
									' </li> </ul> ');
									
//-------------------------------Registration Template-------------------------------------------
var registrationTemplate=_.template('<h1>Registrieren</h1>'+
								'<table border= "0">'+
								'<tr>'+
								'<td>Benutzer:</td>'+
								'<td><input id="ID" type="text" placeholder="Benutzername" /></td></tr>'+
								'<tr>'+
								'<td>Passwort:</td>'+	
								'<td><input id="PW1" type="password" placeholder="Passwort" />'+
								'</td></tr>'+
								'<tr>'+
								'<td>Passwort:</td>'+	
								'<td><input id="PW2" type="password" placeholder="Passwort wiederholen" />'+
								'</td></tr>'+
								'<tr><td><div align="left"><a id="goBack" style="color: black;" href="#">Zurück</a>'+
								'<td><div align="right"><a href="#" id="registerNow" style="color: black;">Registrieren</div></td>'+
								'</div>'+
								'</td>'+
								'</tr>'+
								'</table>')												
									
//------------------------METHODS TO CALL----------------------------

//gets the logstatus 
$.getLogStatus = function()
{	// if current User == null --> no active user
 	if($.getLogStatusDB() == null){
	
		return false;
		
	}else{
	
		return true;
	}
}

// provides start template
$(function(){
	 // in case of refresh or open up again get DB value
	if($.getLogStatus() == false){
		$('#menu').html(nav_logout_Template());
		$('#login').html(loginTemplate());
	}else{
		var user  = $.getLogStatusDB();
		var username = user.get('username');
		$('#menu').html(nav_login_Template());
		$('#login').html(welcomeTemplate({id:username}));
	}
	
})

//-----------------------INTERN METHODS------------------

// login Method 
$.loginMethod = function()
{
	var ID=$.trim($('#ID').val());
	var PW=$.trim($('#PW').val());	
	$.loginToDB(ID,PW);
	
}

// logout Method 
$.logOutMethod = function()
{
	$.logOutFromDB();	
}

//--------------------------------CLICK AND KEYDOWN EVENTS-----------------------------		
$(document).ready(function(){

		// click on the loginLink and providing the logout Link
		$(document).on('click', '#loginLink', function(event) {
				
			$.loginMethod();		
				
			event.preventDefault();
			event.stopImmediatePropagation();
		
		});	
		
		// provides clicks on the logout Link
		$(document).on('click','#logout', function(event){	
		
			$.logOutMethod();	

			event.preventDefault();
			event.stopImmediatePropagation();		
		
		});
		
		// login on keypress enter in password field
		$(document).on('keypress', '#PW', function(event) {
		
			if(event.which == 13) {
				$.loginMethod();
			}
		});
		
		// login on keypress enter in ID field
		$(document).on('keypress', '#ID', function(event) {
		
			if(event.which == 13) {
				$.loginMethod();
			}
		});
				// click on "Registrieren"for providing new template
		$(document).on('click', '#register', function(event) {
		
				$('#login').html(registrationTemplate());
			
		});
		
		// click on "goBack"for providing new template
		$(document).on('click', '#goBack', function(event) {
		
				$('#login').html(loginTemplate());
			
		});
		
		// registering now
		$(document).on('click', '#registerNow', function(event) {
		
			var user = $.trim($('#ID').val());
			var pswd1 = $.trim($('#PW1').val());
			var pswd2 = $.trim($('#PW2').val());
			
			// prüfung siehe care script 
			//if(user == ""){
				//addClasse
			//}else{
			//	if(pswd1 = ""){
				//add Class
			//	}
		//	}
			$.addUserDB(user,pswd1);
			


			// get all
			//überprüfen pswd gleich (Min max anforderungen)
			//überprüfen ob Username schon vorhanden
			// register -->datenbankfunktion
			//popUp mit Daten
			// soll jz neu einloggen load loginTemplate
			
		});
})