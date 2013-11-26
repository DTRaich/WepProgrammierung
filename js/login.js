//LoginScript
// ----------------------------------TEMPLATES---------------------------

//-----------------------------------Loginscreens----------------------
var welcomeTemplate= _.template("<h2> Herzlich Willkommen, <br> "+
								"<%- id %> ! </h2><div align = 'left'>"+
								"<a id='logout' href='#'>Logout</a></div>"+
								"<div> <br> <br> Lust auf Kino?<br>Hier die <a href='#' id='InTheaters'>aktuellen Kinofilme</a> "+
								"<br><br> Nichts dabei?<br>Diese Filme kommen <a href='#' id='ComingSoon'>demnächst ins Kino</a></div>")

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
								'</table>'+
								"<div> <br> <br> Lust auf Kino?<br>Hier die <a href='#' id='InTheaters'>aktuellen Kinofilme</a> "+
								"<br><br> Nichts dabei?<br>Diese Filme kommen <a href='#' id='ComingSoon'>demnächst ins Kino</a></div>")
		
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

//Method for registration 
$.checkRegistration = function(user, pswd1,pswd2){
	var checkR = false;

	if ( user =='' || user == 'undefined' || pswd1 =='' || pswd2 == 'undefined' || pswd2 =='' || pswd2 == 'undefined' ){
		checkR = false;			
	}else{
		checkR = true;
	}

	if(user == ""){
		$('#ID').addClass("inputError");
	}else{
		$('#ID').removeClass("inputError");
	}
	if(pswd1 == ""){
		$('#PW1').addClass("inputError");
	}else{
		$('#PW1').removeClass("inputError");
	}
	if(pswd2 == ""){
		$('#PW2').addClass("inputError");
	}else{
		$('#PW2').removeClass("inputError");
	}
		
	
	return checkR;
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
		var checkR = $.checkRegistration(user,pswd1,pswd2);
			
		if(checkR == true){
			
			if(pswd1 === pswd2){
				result = confirm(" Möchten sie einen neuen Benutzer mit folgenden Daten erstellen? \n \n" + "Benutzername: " + user + "\n \n Passwort: " + pswd1 );
				if( result == true){
					$.addUserDB(user,pswd1);
					$('#login').html(loginTemplate());						
				}	
			}else{
				alert(' Die beiden Passwörter müssen übereinstimmen um einen Benutzer registrieren zu können ' );
			}
		}
			
	});
	
	//Coming Soon
	$(document).on('click','#ComingSoon',function(){
		if(gar<3){
			window.open("http://www.imdb.com/movies-coming-soon/");
			gar++;
		}else{
			alert("gah gah");
			gar = 0;
		}
	});
		
	//In Theaters
	$(document).on('click','#InTheaters',function(){
		if(gar<3){
			window.open("http://www.imdb.com/movies-in-theaters/");
			gar++;
		}else{
			alert("gah gah");
			gar = 0;
		}
	});
});
