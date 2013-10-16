var welcometemplate= _.template("<h1>welcome, <%- id %> !</h1><a id='logout' href='#' align='center'>logout</a>")
var logintemplate=_.template('<h1>Login</h1>'+
		'<table border= "0">'+
		'<tr>'+
			'<td>User:</td>'+
			'<td><input id="ID" type="text" placeholder="Username" /></td></tr>'+
		'<tr>'+
			'<td>PW:</td>'+	
			'<td><input id="PW" type="password" placeholder="Password" />'+
			'</td></tr>'+
		'<tr><td></td>'+
			'<td><div align="right"><a id="loginLink" style="color: black;" href="#">Login</a>'+
			'</div>'+
			'</td>'+
			'</tr>'+
		'</table>')
$(document).ready(function(){
var log=$('#loginLink');
		$(loginLink).click(function(event){
		var ID=$.trim($('#ID').val());
		var PW=$.trim($('#PW').val());
		if(ID == 'X' && PW == '13'){
		alert('login');
		$('#loginscreen').html(welcometemplate({id:ID}));
		}else{
		alert('insert values');
		}
		event.preventDefault();
		event.stopImmediatePropagation();
		});		
		$(document).on('click','#logout', function(event){	
		$('#loginscreen').html(logintemplate());
		})
})