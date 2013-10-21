//LoginScript 
var logedIn = false;

// ----------------------------------templates---------------------------

//-----------------------------------Loginscreens----------------------
var welcomeTemplate= _.template("<h1>welcome, <%- id %> !</h1><a id='logout' href='#' align='center'>logout</a>")
var loginTemplate=_.template('<h1>Login</h1>'+
		'<table border= "0">'+
		'<tr>'+
			'<td>Benutzer:</td>'+
			'<td><input id="ID" type="text" placeholder="Username" /></td></tr>'+
		'<tr>'+
			'<td>Passwort:</td>'+	
			'<td><input id="PW" type="password" placeholder="Password" />'+
			'</td></tr>'+
		'<tr><td></td>'+
			'<td><div align="right"><a id="loginLink" style="color: black;" href="#">Login</a>'+
			'</div>'+
			'</td>'+
			'</tr>'+
		'</table>')
		
//----------------------------Navigation when logged in---------------------		
var nav_login_Template=_.template('<ul> <li class="topmenu">  <a href="#">Home</a>  </li>'+
     '<li class="topmenu">' +
      ' <a href="#" >Genre</a> '+
       ' <ul>' +
         ' <li class="submenu"><a href="#">Action</a></li> '+
          '<li class="submenu"><a href="#">Comedy</a></li>' +
		 ' <li class="submenu"><a href="#">Horror</a></li> '+

       ' </ul> '+
     ' </li>' +
     ' <li class="topmenu">' +
      '  <a href="#">Pflege</a></li> ' +        
	' </li> '+
    '</ul> ');
	
//---------------------------Navigation when logout	-----------------------
var nav_logout_Template=_.template('<ul> <li class="topmenu">  <a href="#">Home</a>  </li>'+
     '<li class="topmenu">' +
      ' <a href="#" >Genre</a> '+
       ' <ul>' +
         ' <li class="submenu"><a href="#">Action</a></li> '+
          '<li class="submenu"><a href="#">Comedy</a></li>' +
		 ' <li class="submenu"><a href="#">Horror</a></li> '+

       ' </ul> '+
     ' </li>' +     
    '</ul> ');
//------------------------public methods to call----------------------------
//gets the logstatus 
$.getLogStatus = function()
{
	return logedIn; 
}

//-----------------------intern Methods------------------

// login Method 
$.loginMethod = function(ID)
{
	$('#loginscreen').html(welcomeTemplate({id:ID}));
	$('#menu').html(nav_login_Template());
	logedIn = true;
}

// logout Method 
$.logOutMethod = function()
{
	$('#loginscreen').html(loginTemplate());
	$('#menu').html(nav_logout_Template());
	logedIn = false;
	event.preventDefault();
    event.stopImmediatePropagation();
}

//--------------------------------Click and Keyenters-----------------------------		
$(document).ready(function(){
		// click on the loginLink and providing the logout Link
		$(document).on('click', '#loginLink', function(event) {
		
		var ID=$.trim($('#ID').val());
		var PW=$.trim($('#PW').val());
		
		if(ID == 'X' && PW == '13'){
		
			$.loginMethod(ID);
				
		}else{
		
			alert('Login Fehlgeschlagen! \n \nBitte überprüfen Sie Ihre Eingaben.');
		}
		
		event.preventDefault();
		event.stopImmediatePropagation();
		});	
		
		// provides clicks on the logout Link
		$(document).on('click','#logout', function(event){	
		
		$.logOutMethod();		
		
		})
})