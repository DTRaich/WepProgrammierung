//CareScript 
//----------------------------------------GLOBAL VARIABLES-------------------------
var isSeen = false;
var receivedData;
var isChange = false;
var items;
//-------------------------------------------TEMPLATES-------------------------------

// ---------------------------------------standart care Form----------------------
var careFormTemplate = _.template(' <h1> Neuen Film hinzufügen </h1> <br><br> '+ 
									'Filmtitel: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <input type="text" placeholder="Filmtitel" size="50" id="movietitle"/><input type="button" name="imdbmoviebtn" id="imdbmovies" value="Filme vorschlagen" / > <br> <br> <br> ' +
									'Erscheinungsjahr: &nbsp&nbsp <div id="yearddb"/> <br> <br>'+
									'Genre: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <select id="genre_select">'+
												'<option value="null">- Genre -</option>' +
												'<option value="Action">Action</option>' +
												'<option value="Comedy">Comedy</option>' +
												'<option value="Horror">Horror</option>' +
												'<option value="Sci-Fi">Sci-Fi</option>' +
												'<option value="Thriller">Thriller</option>' +
											'</select> <br><br><br>' +
									'Gesehen: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <input id="ratingChb" name"chbRating" type="checkbox"/><br><br><br>');
									
//-----------------------------------------button to sen/add the movie ---------------------									
var sendButtonTemplate = _.template('<input type="button" name="addFilm" id="addMovie" value="Film hinzufügen" / >');
var editButtonTemplate = _.template('<input type="button" name="addFilm" id="addMovie" value="Filmdaten ändern" / >');

//------------------------------------- rate and Commen Template which is displayed between them----------									
var rateAndCommentTemplate = _.template(' Bewertung : &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <select id="rating">'+
										'  <option  value ="1"> &#9733</option> '+
										'  <option  value ="2"> &#9733 &#9733</option> '+
										'  <option  value ="3"> &#9733 &#9733 &#9733</option> '+
										'  <option  value ="4"> &#9733 &#9733 &#9733 &#9733</option> '+
										'  <option  value ="5"> &#9733 &#9733 &#9733 &#9733 &#9733</option> '+	  
										' </select> <br><br>');

var imdbmovietemplate=_.template('<br><table class="mainTemplateTable" id="tabelle"></table>'+
							'<div id="main_top"></div>'+
							'<div id="main_middle"></div>'+	
							'<div id="main_low"><button type="button" class="btn btn-primary" id="movdismiss" align="right" data-dismiss="modal" align = "right">Abbrechen</button>'+
							'</div>');
										
//------------------------------------ METHODS TO CALL--------------------------
// fills formular when data needs to be changed
$.changeMovie = function(title, year){
	// we are in change mode
	isChange = true;
	
	receivedData = $.getOneMovieData(title,year);	
	$.newFormular();
	
	// insert the received movie data
	$('#movietitle').val(receivedData['title']);
	$('#hallo').val(receivedData['year']);
	$('#genre_select').val(receivedData['genre']);

	if (receivedData['seen'] === '1' ){
		$('#ratingChb').attr('checked',true);
		$('#main_middle').html(rateAndCommentTemplate());
		$('#rating').val(receivedData['rating']);
		// is seen true is necessary to open up the rating stuff
		isSeen = true;
	}		
}

//--------------------------------------INTERN METHODS------------------------------
// loads new formular
$.newFormular = function(){
	$('#main').html(maintemplate());	
	$('#main_top').html(careFormTemplate());
	$.createDropDownYear(); 
	
	// define whether is in change mode or in adding new one
	if(isChange==true){
		$('#main_low').html(editButtonTemplate());
	}else{
		$('#main_low').html(sendButtonTemplate());
	}
	isSeen = false;
}

//create DropDown Year
$.createDropDownYear = function(){
	node = document.getElementById("yearddb");
	
	var selector = document.createElement('select');
	selector.id = "hallo";
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

// gets data from formular
$.collectFormData = function(){
		// getting all entries
		var title_input = $.trim($('#movietitle').val());
		var yearEl = document.getElementById("hallo");
		var year_input  = yearEl.options[yearEl.selectedIndex].value;
		var rating_input;
		var genreEl = document.getElementById("genre_select");
		var genre_input = genreEl.options[genreEl.selectedIndex].value;
		var result;
		var addMovieSet;
		
		// if movie is seen get rating	
		if(isSeen===true){
			var ratingEl = document.getElementById("rating");
			rating_input = ratingEl.options[ratingEl.selectedIndex].value;
		}else{
			rating_input = "0";
		}
		
		//checking things --> also seen method in data.js
		if($.checkFields(genre_input,title_input) == false){
			alert('Bitte alle Felder richtig ausfüllen');
		}else{
			if($.proofMovieExists(title_input, year_input,isChange,receivedData) == true){
				// movie is already there
				alert("Film schon vorhanden!");
				$('#movietitle').addClass("inputError");
			}else{
				$('#movietitle').removeClass("inputError");
				
				//let the user confirm his changes
				if (isSeen===true){
					result = confirm(" Filmdaten speichern? \n \n " + "Titel: " + title_input + "\n Jahr: " + year_input + "\n Genre: " + genre_input + "\n Bewertung: " + rating_input);
				}else{
					result = confirm(" Filmdaten speichern? \n \n " + "Titel: " + title_input + "\n Jahr: " + year_input + "\n Genre: " + genre_input);
				}
				// ok he did confirm
				if (result == true ){					
					addMovieSet = new Object();
					addMovieSet["title"] = title_input;
					addMovieSet["year"] = year_input;
					addMovieSet["genre"] = genre_input;
					addMovieSet["rating"] = rating_input;
					
					//seen yes no?
					if (isSeen == true ){
						addMovieSet["seen"] = "1";
					}else{
						addMovieSet["seen"] = "0";
					}
					// procedure for change or to add a new movie
					if (isChange == false){					
						$.insertMovieInDB(addMovieSet); 
				
					}else{
						$.addChangesToDB(addMovieSet,receivedData)
						isChange=false;
					}

					// provides new formular
					$.newFormular();			
				}else{
					//he did not confirm his entries, and is now able to edit again
				}
				
			}
		}			
}

//get imdbmovies
function getimdbmovies(title){	
	
	
	var myTable = document.createElement("table");
	var mytablebody = document.createElement("tbody");
	
	$.getJSON('http://www.imdbapi.com/?s=' + title + '&callback=?' ,
		function(data){
		
		items = new Array();

		if(data.Response == false){
		
			mycurrent_row = document.createElement("tr");
			mycurrent_cell = document.createElement("td");
			
			mycurrent_cell.appendChild(document.createTextNode("Kein Titel gefunden"));
			mycurrent_cell.style.backgroundColor = backg;	
			
			mycurrent_row.appendChild(mycurrent_cell);	
			mycurrent_cell = document.createElement("td");
			
			mycurrent_cell.appendChild(document.createTextNode("N/A"));
			mycurrent_cell.style.backgroundColor = backg2;
			mycurrent_row.appendChild(mycurrent_cell);	
			
			mytablebody.appendChild(mycurrent_row);	
			myTable.appendChild(mytablebody);

			
		}else{
			for(var i=0;i<data.Search.length;i++){
				if(data.Search.Type = "movie"){
				
					items[i]=new Object();
					items[i]["title"] = data.Search[i].Title;
					items[i]["year"] = data.Search[i].Year;
				}
				
			}
			
			for(var i = 0 ; i < items.length ; i++){
			
				mycurrent_row = document.createElement("tr");
				mycurrent_cell = document.createElement("td");
			
				mycurrent_cell.appendChild(document.createTextNode(items[i]["title"]));
				mycurrent_cell.style.backgroundColor = backg;	
			
				mycurrent_row.appendChild(mycurrent_cell);	
				mycurrent_cell = document.createElement("td");
			
				mycurrent_cell.appendChild(document.createTextNode(items[i]["year"]));
				mycurrent_cell.style.backgroundColor = backg2;
			
				mycurrent_row.appendChild(mycurrent_cell);	
				mycurrent_cell = document.createElement("td");
			
				mycurrent_img = document.createElement("img");			
				mycurrent_img.src="./img/small/hand-point-left.jpg";
				mycurrent_img.style.height = "15px";
				mycurrent_img.style.border = "0";	
				mycurrent_img.setAttribute("id","AcceptedMovieClicked");
				mycurrent_img.setAttribute("class",i);
				mycurrent_img.style.cursor = "pointer";
				mycurrent_cell.appendChild(mycurrent_img);
				mycurrent_cell.style.width = "30px";
				mycurrent_cell.style.backgroundColor = backg;
			
				mycurrent_row.appendChild(mycurrent_cell);	
				mytablebody.appendChild(mycurrent_row);				
			}			
	  
		myTable.appendChild(mytablebody);
		}
		} 
    );	
	myTable.style.width="95%";
	return myTable;
}

//------------------------------ CLICK AND KEYDOWN EVENTS----------------------------
		
$(document).ready(function(){

	// display templates for the Form
	$(document).on('click', '#nav_care', function(event) {
	isChange = false;
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
			$.collectFormData();
	
			event.preventDefault();
			event.stopImmediatePropagation();
			});
			
	//imdbmoviebtn method
	$(document).on('click','#imdbmovies',function(event){
				
		var mov = $.trim($('#movietitle').val());
		$('#main').html(loadTemplate());	
		myTable = document.createElement("table");
		myTable = getimdbmovies(mov);
		
		$('#main').html(imdbmovietemplate());	
		//Tabelle
		node = document.getElementById("tabelle");				
		node.parentNode.insertBefore(myTable, node);
	
	})
	//AcceptedMovieClicked method
	$(document).on('click','#AcceptedMovieClicked',function(event){
		var classn = $(this).context.className;
		
		$.newFormular();
		$('#movietitle').val(items[classn]["title"]);
		$('#hallo').val(items[classn]["year"]);
	})
	//movdismiss method
	$(document).on('click','#movdismiss',function(event){
		
		$.newFormular();
	})
	
})