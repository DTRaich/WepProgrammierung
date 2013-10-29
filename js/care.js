//CareScript 
//----------------------------------------GLOBAL VARIABLES-------------------------
var isSeen = false;
var inCommingChangeset;
// &nbsp leerzeichen
//-------------------------------------------TEMPLATES-------------------------------

// ---------------------------------------standart care Form----------------------
var careFormTemplate = _.template(' <h1> Neuen Film hinzufügen </h1> <br><br> '+ 
									'Filmtitel: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <input type="text" placeholder="Filmtitel" size="50" id="movietitle" class="care_textbox"/> <br> <br> ' +
									'Erscheinungsjahr: &nbsp&nbsp&nbsp <input type="number" placeholder="Jahr" size="4" id="year" maxlength="4" class="care_textbox" /> <br> <br> '+
									'Genre: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <select id="genre_select" class="care_textbox">'+
												'<option value="null">- Genre -</option>' +
												'<option value="Action">Action</option>' +
												'<option value="Comedy">Comedy</option>' +
												'<option value="Horror">Horror</option>' +
												'<option value="Sci-Fi">Sci-Fi</option>' +
												'<option value="Thriller">Thriller</option>' +
											'</select> <br><br>' +
									'Gesehen: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <input id="ratingChb" name"chbRating" type="checkbox" name="Gesehen:" value="seen" class="care_textbox"/ ><br><br>');
									
//-----------------------------------------button to sen/add the movie ---------------------									
var sendButtonTemplate = _.template('<input type="button" name="addFilm" id="addMovie" value="Film hinzufügen" / >');


//------------------------------------- rate and Commen Template which is displayed between them----------									
var rateAndCommentTemplate = _.template(' Bewertung : &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <select id="rating" class="care_textbox">'+
										'  <option  value ="1"> &#9733</option> '+
										'  <option  value ="2"> &#9733 &#9733</option> '+
										'  <option  value ="3"> &#9733 &#9733 &#9733</option> '+
										'  <option  value ="4"> &#9733 &#9733 &#9733 &#9733</option> '+
										'  <option  value ="5"> &#9733 &#9733 &#9733 &#9733 &#9733</option> '+	  
										' </select> <br><br>');
										
//------------------------------------ METHODS TO CALL--------------------------

$.changeMovie = function(){
// aufrufen und befüllen der jeweiligen Felder und boxen mit den bereits vorhandenen Daten 
// problem : normaler checkAblauf kann nicht 1:1 übernommen werden da der Film ja schon vorliegt oder durch schreibfehler korrektur erst danach vorliegt
// zum akteulle daten holen gibt es eine Funktion im data Script (Daniel fragen);
}

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
			var isSeen_input;
			var genreEl = document.getElementById("genre_select");
			var genre_input = genreEl.options[genreEl.selectedIndex].value;
			
			if(isSeen===true){
			var ratingEl = document.getElementById("rating");
			rating_input = ratingEl.options[ratingEl.selectedIndex].value;
			isSeen_input = true;
			}
			else{
			rating_input = "0";
			isSeen_input = false;
			}
			
			//alert("Titel: " + title_input + "\n" +  "Genre: " + genre_input + "\n" + "Rating: " + rating_input + "\n" + "Gesehen: " + isSeen_input);
			
			if( genre_input == "null" && title_input == "" || title_input== "undefined" ){
			alert('Bitte alle Felder richtig ausfüllen');
			}else{
			// erst prüfen: film schon vorhanden ( Titel + Jahr ) 
			// wenn ja dann nicht zulassen
			//wenn nein dann weiter
			prompt("bla");
			// daten, ja/nein button frage wegen speichern
			}
			
			
			event.preventDefault();
			event.stopImmediatePropagation();
			});
			
			// sehr gut -- > noch aussstehend
			// "prompt" poUp zum bestätigen das man speichert (daten nochmal wie in deinem Alert mit anzeigen (evtl. auch mit nils nochmal ablären was er meint)

})