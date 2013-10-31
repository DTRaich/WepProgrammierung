//LoginScript
//---------------------------------GLOBAL VARIABLES----------------------- 
var logedIn = false;

// ----------------------------------TEMPLATES---------------------------

//-----------------------------------Loginscreens----------------------
var welcomeTemplate= _.template("<h2> Herzlich Willkommen , <%- id %> ! \n \n </h2><div align = 'right'><a id='logout' href='#'>Logout</a></div>")

var loginTemplate=_.template('<h1>Login</h1>'+
								'<br>'+
								'<table border= "0">'+
								'<tr>'+
								'<td>Benutzer:</td>'+
								'<td><input id="ID" type="text" placeholder="Benutzername" /></td></tr>'+
								'<tr>'+
								'<td>Passwort:</td>'+	
								'<td><input id="PW" type="password" placeholder="Passwort" />'+
								'</td></tr>'+
								'<tr><td></td>'+
								'<td><div align = "right"><a id="loginLink" href="#">Login</a></div>'+
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
									
									
//------------------------METHODS TO CALL----------------------------

//gets the logstatus 
$.getLogStatus = function()
{
	return logedIn; 
}

// provides start template
$(function(){
	$('#menu').html(nav_logout_Template());
	$('#login').html(loginTemplate());
})

//-----------------------INTERN METHODS------------------

// login Method 
$.loginMethod = function()
{
	var ID=$.trim($('#ID').val());
	var PW=$.trim($('#PW').val());
	
	if(ID === 'X' && PW === '13'){
		
		$('#login').html(welcomeTemplate({id:ID}));
		$('#menu').html(nav_login_Template());
		logedIn = true;		
		
		//table reload
		selectedtablerebuild();
	}else{
		
		alert('Login Fehlgeschlagen! \n \nBitte überprüfen Sie Ihre Eingaben.');
	}
}

// logout Method 
$.logOutMethod = function()
{
	$('#login').html(loginTemplate());
	$('#menu').html(nav_logout_Template());
	$('#main').html('');
	logedIn = false;
	
	//table reload
	selectedtablerebuild();
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
})