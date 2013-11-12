//Datascript
//------------------------GLOBAL VARIABLES----------------------------
var movieArray = new Array();


//------------------------DATA----------------------------------------
// how new array should look
//movieArray[9] = new Object();
//movieArray[9]["title"] = "Star Wars";
//movieArray[9]["year"] = "2013";
//movieArray[9]["genre"] = "SciFi";
//movieArray[9]["rating"] = "1"; // gesammt rating
//movieArray[9]["seen"] = "1"; 	// lsung suchen für nicht owner trotzdem changen von seen auf true damit das reine rating ausgeführt werden kann
//movieArray[9]["myrating"] = "1"; // wenn eigenes vergeben
//movieArray[9]["owner"] = "1"; // nur wenn owner generelles changen
//movieArray[9]["originalDBID"] = "1"; // für delte und change 
//--------------------------------------------------INTERN METHODS--------------------------------

// searches for the movie and the year
$.findLocationOfMovie = function(movie, year){
	
	//-1 represents not found
	var location = -1;
	
	for(var i = 0; i < movieArray.length; i++){
		
		if(movieArray[i]["title"] === movie && movieArray[i]["year"] == year){
			// movie found place is "i"
			location = i;
		}
	}
	return location;
}

// proofing change insert
$.proofChange = function(location, receivedData,movieTitle,year){
	var valid= false;
	// if not found
	if(location === -1){
	valid = false;
	// if found	
	}else{
		if (receivedData['title'] === movieTitle && receivedData['year'] === year){
			valid = false;
		}else{
			valid = true; 
		}
	}
	return valid;
}

//----------------------------------------------------------METHODS TO CALL------------------------------

// proofs if the movie exist ; same movie different year is OK!!!!
$.proofMovieExists = function(movieTitle,year,isChange,receivedData ){
	var location; 
	var valid = false;
	location = $.findLocationOfMovie(movieTitle,year);
	
	//section for movie changing
	if(isChange == true){
		valid = $.proofChange(location,receivedData,movieTitle,year);
		
	// section for new adding
	}else{
		// if not found
		if(location === -1){
			valid = false;
			
		// if found		
		}else{
			valid = true;
		}
	}
	
	return valid;
}

// gets the MovieData of one Movie
$.getOneMovieData =function(movieTitle,year){

	var movieData = new Object();
	var movielocation = $.findLocationOfMovie(movieTitle,year);

	movieData["title"] = movieArray[movielocation]["title"];
	movieData["year"] = movieArray[movielocation]["year"];
	movieData["genre"] = movieArray[movielocation]["genre"];
	movieData["rating"] = movieArray[movielocation]["rating"];
	movieData["seen"] = movieArray[movielocation]["seen"];
	movieData["OriginalId"] = movielocation;
	
	return movieData;
}
// returns all Movies without Filters
	
$.getAllMovies = function(){
	// getting the Movies from the DB.
	//---> Into the movie array because right now its much faster.. maybe due to the internet connection and db specific parameters.
	movieArray = new Array();
	$.gettingAllDBMovies();	
	return movieArray;	
}

//------------------------------add and delete-----------------------------
// adds a new movie to the Array
$.addMovie = function (movieObj){	
	movieArray.push(movieObj);
	
}

//deletes a movie in the movieArray
$.deleteMovies = function(movie,year){
	var location = $.findLocationOfMovie(movie,year);
	if(location !== -1){
		delete_result = confirm('Soll dieser Film wirklich entfernt werden?');
		if(delete_result == true){
			movieArray.splice(location,1);
		}
		
	}else{
		alert("Film konnte nicht gelöscht werden!");
	
	}	
}
	
//---------------------------changeStuff------------------------
// changes the parameters of the movie
$.addChanges = function(movieObj,movielocation){

	for (var attribute in movieObj){
		
		movieArray[movielocation][attribute] = movieObj[attribute];	
	}
}

// change rating

$.changeRating = function(movieTitle, year, newRating){

	var location = $.findLocationOfMovie(movieTitle,year);
	if ( location !== -1 ){
	movieArray[location]["rating"] = newRating;
	}else{
	alert('Änderung der Bewertung ist nicht möglich.');
	}
}

//------------------sorting and filtering-----------------------------------

//sort seen or not; seen= true/fals
$.sortMovieSeen =  function(seen, preSortedArray){
	var sortedArray = new Array();
	if(preSortedArray == "null"){
		//usemovieArray
	}else{
		//use preSorted
	}

}

// sort rating best first or last;  best = true/false;
$.sortMovieRating = function(best,preSortedArray){
	var sortedArray = new Array();
	
	if(preSortedArray == "null"){
		//usemovieArray
	}else{
		//use preSorted
	}
}

//sort Alphabet asc= true/false
$.sortMovie = function(asc,preSortedArray,filter){
	var sortedArray = new Array();
	var finalArray = new Array();
	for(var i = 0 ; i < preSortedArray.length ; i++){
		sortedArray.push(preSortedArray[i][filter]);	
	}	
	sortedArray.sort();
	if(asc === true){sortedArray.sort();}else{sortedArray.reverse();}
	
	for(var i = 0; i < sortedArray.length ; i++ ){
		for(var j = 0; j< preSortedArray.length ; j++){
			if(sortedArray[i] === preSortedArray[j][filter]){
				finalArray[i] = new Object();
				finalArray[i]["title"] = preSortedArray[j]["title"];
				finalArray[i]["year"] = preSortedArray[j]["year"];
				finalArray[i]["genre"] = preSortedArray[j]["genre"];
				finalArray[i]["rating"] = preSortedArray[j]["rating"];
				finalArray[i]["seen"] = preSortedArray[j]["seen"];				
				
			}		
		}	
	}	
	return finalArray;
}
//sort Alphabet asc= true/false
$.sortMovieNumbers = function(asc,preSortedArray,filter){
	var sortedArray = new Array();
	var finalArray = new Array();
	for(var i = 0 ; i < preSortedArray.length ; i++){
		sortedArray.push(preSortedArray[i][filter]+preSortedArray[i]["title"]);	
	}	
	sortedArray.sort();
	if(asc === true){sortedArray.sort();}else{sortedArray.reverse();}
	
	for(var i = 0; i < sortedArray.length ; i++ ){
		for(var j = 0; j< preSortedArray.length ; j++){
			var test= preSortedArray[j][filter]+preSortedArray[j]["title"];
			if(sortedArray[i] === test){
				finalArray[i] = new Object();
				finalArray[i]["title"] = preSortedArray[j]["title"];
				finalArray[i]["year"] = preSortedArray[j]["year"];
				finalArray[i]["genre"] = preSortedArray[j]["genre"];
				finalArray[i]["rating"] = preSortedArray[j]["rating"];
				finalArray[i]["seen"] = preSortedArray[j]["seen"];				
				
			}		
		}	
	}	
	return finalArray;
}




