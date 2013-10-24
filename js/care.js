//CareScript 
//----------------------------------------GLOBAL VARIABLES-------------------------
var isSeen = false;
//-------------------------------------------TEMPLATES-------------------------------

// ---------------------------------------standart care Form----------------------
var careFormTemplate = _.template('<br> <h1> Neuen Film hinzufügen </h1> <br><br> '+ 
									'Filmtitel:<input type="text" placeholder="Filmtitel" size="50" id="movietitle" class="care_textbox" /> <br> <br> ' +
									'Erscheinungsjahr:<input type="number" placeholder="Jahr" size="4" id="year" maxlength="4" /> <br> <br> '+
									'Genre: <select id="genre_select">'+
												'<option value="null">- Genre -</option>' +
												'<option value="Action">Action</option>' +
												'<option value="Comedy">Comedy</option>' +
												'<option value="Horror">Horror</option>' +
												'<option value="Sci-Fi">Sci-Fi</option>' +
												'<option value="Thriller">Thriller</option>' +
											'</select> <br><br>' +
									'Gesehen: <input id="ratingChb" name"chbRating" type="checkbox" name="Gesehen:" value="seen" / ><br><br>');
									
//-----------------------------------------button to sen/add the movie ---------------------									
var sendButtonTemplate = _.template('<input type="button" name="addFilm" id="addMovie" value="Film hinzufügen" / >');


//------------------------------------- rate and Commen Template which is displayed between them----------									
var rateAndCommentTemplate = _.template(' Bewertung : <select id="rating">'+
										'  <option  value ="1"> &#9733</option> '+
										'  <option  value ="2"> &#9733 &#9733</option> '+
										'  <option  value ="3"> &#9733 &#9733 &#9733</option> '+
										'  <option  value ="4"> &#9733 &#9733 &#9733 &#9733</option> '+
										'  <option  value ="5"> &#9733 &#9733 &#9733 &#9733 &#9733</option> '+	  
										' </select> <br><br>');
										
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
		{ 
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
		
			var title_input = $.trim($('#movietitle').val());
			var year_input = "1999";
			var rating_input;
			var genreEl = document.getElementById("genre_select");
			var genre_input = genreEl.options[genreEl.selectedIndex].value;
			
			if(isSeen===true){
			var ratingEl = document.getElementById("rating");
			rating_input = ratingEl.options[ratingEl.selectedIndex].value;
			}
			else{
			rating_input = "0";
			}
			
			alert("Titel: " + title_input + "\n" +  "Genre: " + genre_input + "\n" + "Rating: " + rating_input );
			
			event.preventDefault();
			event.stopImmediatePropagation();
			});

})