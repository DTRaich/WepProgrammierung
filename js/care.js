//CareScript 
//----------------------------------------GLOBAL VARIABLES-------------------------
var isSeen = false;
//-------------------------------------------TEMPLATES-------------------------------

// ---------------------------------------standart care Form----------------------
var careFormTemplate = _.template('<br> <h1> Neuen Film hinzufügen </h1> <br><br> '+ 
									'Filmtitel:<input type="text" placeholder="Filmtitel" size="50" id="movietitle"/> <br> ' +
									'Gesehen: <input id="ratingChb" name"chbRating" type="checkbox" name="Gesehen:" value="seen" / ><br>');
									
//-----------------------------------------button to sen/add the movie ---------------------									
var sendButtonTemplate = _.template('<input type="button" name="addFilm" id="addMovie" value="Film hinzufügen" / >');


//------------------------------------- rate and Commen Template which is displayed between them----------									
var rateAndCommentTemplate = _.template('<select name="rating" size="5"> '+
										'  <option  value ="0">0</option> ' +
										'  <option  value ="1">1</option> '+
										' <option  value ="2" selected>2</option> '+
										' <option  value ="3">3</option> '+
										'  <option  value ="4">4</option> '+
										' <option  value ="5">5 </option> '+	  
										' </select> ');


										
//------------------------------------ PUBLIC METHODS TO CALL--------------------------

//--------------------------------------INTERN METHODS------------------------------


//------------------------------ CLICK AND KEYDOWN EVENTS----------------------------
		
$(document).ready(function(){

	// display templates for the Form
	$(document).on('click', '#nav_care', function(event) {
		
		$('#main_top').html(careFormTemplate());
		$('#main_low').html(sendButtonTemplate());
		event.preventDefault();
		event.stopImmediatePropagation();
	
	});	
			
	//add rating and comment stuff
	$(document).on('change', '#ratingChb', function(event) {
		
		
		if(isSeen=== false)
		{ // hier funkt was noch nicht richtig
			isSeen= true;
			$('#main_middle').html(rateAndCommentTemplate());
		}else
		{
			$('#main_middle').html('');
			isSeen = false;			
		}	
		
	})

	//addMovie Method
	$(document).on('click', '#addMovie', function(event) {
		
			var titel=$.trim($('#ID').val());		
			
		
			event.preventDefault();
			event.stopImmediatePropagation();
			});	

})