//CareScript 
//----------------------------------------GLOBAL VARIABLES-------------------------
var isSeen = false;
var inCommingChangeset;
var addMovieSet;
//-------------------------------------------TEMPLATES-------------------------------

// ---------------------------------------standart care Form----------------------
var careFormTemplate = _.template(' <h1> Neuen Film hinzufügen </h1> <br><br> '+ 
									'Filmtitel: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <input type="text" placeholder="Filmtitel" size="50" id="movietitle"/> <br> <br> ' +
									'Erscheinungsjahr: &nbsp&nbsp&nbsp <div id="yearddb"/> <br> <br> '+
									'Genre: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <select id="genre_select">'+
												'<option value="null">- Genre -</option>' +
												'<option value="Action">Action</option>' +
												'<option value="Comedy">Comedy</option>' +
												'<option value="Horror">Horror</option>' +
												'<option value="Sci-Fi">Sci-Fi</option>' +
												'<option value="Thriller">Thriller</option>' +
											'</select> <br><br>' +
									'Gesehen: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <input id="ratingChb" name"chbRating" type="checkbox" name="Gesehen:" value="seen"/><br><br>');
									
//-----------------------------------------button to sen/add the movie ---------------------									
var sendButtonTemplate = _.template('<input type="button" name="addFilm" id="addMovie" value="Film hinzufügen" / >');


//------------------------------------- rate and Commen Template which is displayed between them----------									
var rateAndCommentTemplate = _.template(' Bewertung : &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <select id="rating">'+
										'  <option  value ="1"> &#9733</option> '+
										'  <option  value ="2"> &#9733 &#9733</option> '+
										'  <option  value ="3"> &#9733 &#9733 &#9733</option> '+
										'  <option  value ="4"> &#9733 &#9733 &#9733 &#9733</option> '+
										'  <option  value ="5"> &#9733 &#9733 &#9733 &#9733 &#9733</option> '+	  
										' </select> <br><br>');
										
//------------------------------------ METHODS TO CALL--------------------------

$.changeMovie = function(title, year){

var receivedData = $.getOneMovieData(title,year);
$.newFormular();

$('#movietitle').val(receivedData['title']);
$('#year').val(receivedData['year']);
$('#genre_select').val(receivedData['genre']);
$('#rating').val(receivedData['rating']);
// $('#ratingChb').val(receivedData['genre']);

// aufrufen und befüllen der jeweiligen Felder und boxen mit den bereits vorhandenen Daten 
// problem : normaler checkAblauf kann nicht 1:1 übernommen werden da der Film ja schon vorliegt oder durch schreibfehler korrektur erst danach vorliegt
// zum akteulle daten holen gibt es eine Funktion im data Script (Daniel fragen);
}

//--------------------------------------INTERN METHODS------------------------------
// loads new formular
$.newFormular = function(){
	$('#main').html(maintemplate());	
	$('#main_top').html(careFormTemplate());
	$.createDropDownYear();
	$('#main_low').html(sendButtonTemplate());
	isSeen = false;
}
//create DropDown Year
$.createDropDownYear = function(){
	node = document.getElementById("yearddb");
	
	var selector = document.createElement('select');
	var option;
 	for(var i = 2014;i>1884;i--){
		option = document.createElement('option');
		option.value = i;
		option.appendChild(document.createTextNode(i));
		selector.appendChild(option);	
	}
	node.parentNode.insertBefore(selector,node);
}
// checks and colors fields
$.checkFields = function(genre_input,title_input){;
	var valid = false;
	
	// generell if
	if (genre_input == "null" || title_input == "" || title_input== "undefined"){
		valid = false;
	}else{
		valid = true;
	}
	
	// genre red
	if(genre_input == "null"){
		$('#genre_select').addClass("inputError");
	}else{
		$('#genre_select').removeClass("inputError");
	}
	
	// title red
	if(title_input == "" || title_input == "undefined"){
		$('#movietitle').addClass("inputError");
	}else{
		$('#movietitle').removeClass("inputError");
	}
	return valid;
}
	
	



$.collectFormData = function(){
		var title_input = $.trim($('#movietitle').val());
		var year_input = "1999";
		var rating_input;
		var genreEl = document.getElementById("genre_select");
		var genre_input = genreEl.options[genreEl.selectedIndex].value;
		var result;	
		
		if(isSeen===true){
			var ratingEl = document.getElementById("rating");
			rating_input = ratingEl.options[ratingEl.selectedIndex].value;
		}else{
			rating_input = "0";
		}
		
		if($.checkFields(genre_input,title_input) == false){
			alert('Bitte alle Felder richtig ausfüllen');
		}else{
		if($.proofMovieExists(title_input, year_input) == true){
				alert("Film schon vorhanden!");
				$('#movietitle').addClass("inputError");
			}else{
				$('#movietitle').removeClass("inputError");
			if (isSeen===true){result = confirm(" Filmdaten speichern? \n \n " + "Titel: " + title_input + "\n Jahr: " + year_input + "\n Genre: " + genre_input + "\n Bewertung: " + rating_input);
			}else{
			result = confirm(" Filmdaten speichern? \n \n " + "Titel: " + title_input + "\n Jahr: " + year_input + "\n Genre: " + genre_input);
			}
			if ( result == true ){					
				addMovieSet = new Object();
				addMovieSet["title"] = title_input;
				addMovieSet["year"] = year_input;
				addMovieSet["genre"] = genre_input;
				addMovieSet["rating"] = rating_input;

				if (isSeen == true ){
					addMovieSet["seen"] = "1";
				}else{
					addMovieSet["seen"] = "0";
				}
			if($.proofMovieExists(title_input, year_input) == true){
				alert("gefunden");
			}else{
			alert("nicht");
			}
			
			$.addMovie(addMovieSet);
			$.newFormular();			
					}	
			}
}			
}

//------------------------------ CLICK AND KEYDOWN EVENTS----------------------------
		
$(document).ready(function(){

	// display templates for the Form
	$(document).on('click', '#nav_care', function(event) {
		$.newFormular();
		event.preventDefault();
		event.stopImmediatePropagation();
	});	
			
	//add rating and comment stuff
	$(document).on('change', '#ratingChb', function(event) {
		if(isSeen=== false){ 
			isSeen= true;
			$('#main_middle').html(rateAndCommentTemplate());
		}else{
			$('#main_middle').html('');
			isSeen = false;			
		}		
	})
	//addMovie Method
	$(document).on('click', '#addMovie', function(event) {		
			//$.collectFormData();
			$.changeMovie("Lord of War", "1999");
			
			event.preventDefault();
			event.stopImmediatePropagation();
			});
})