//Datascript
//------------------------GLOBAL VARIABLES----------------------------
var movieArray = new Array();


//------------------------DATA----------------------------------------
movieArray[0] = new Object();
movieArray[0]["title"] = "American History X";
movieArray[0]["year"] = "1999";
movieArray[0]["genre"] = "Genre";
movieArray[0]["rating"] = "3";
movieArray[0]["seen"] = "1";

movieArray[1] = new Object();
movieArray[1]["title"] = "Lord of War";
movieArray[1]["year"] = "1999";
movieArray[1]["genre"] = "Action";
movieArray[1]["rating"] = "3";
movieArray[1]["seen"] = "0";

movieArray[2] = new Object();
movieArray[2]["title"] = "Der Soldat James Ryan";
movieArray[2]["year"] = "1999";
movieArray[2]["genre"] = "Genre";
movieArray[2]["rating"] = "0";
movieArray[2]["seen"] = "0";
//--------------------------------------------------INTERN METHODS--------------------------------

// searches for the movie and the year
$.findLocationOfMovie = function(movie, year){
	alert("location");
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

//----------------------------------------------------------METHODS TO CALL------------------------------
// module pattern 
// proofs if the movie exist ; same movie different year is OK!!!!
$.proofMovieExists = function(movieTitle,year){

	var location = $.findLocationOfMovie(movieTitle,year);
	
	if(location === -1){
		return false;
	}else{
		return true;
	}	 
}


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

	return movieArray;
}

//------------------------------add and delete-----------------------------
// adds a new movie to the Array
$.addMovie = function (movieArr){	
	movieArray.push(movieArr);
	
}

//deletes a movie in the movieArray
$.deleteMovies(movie,year) = function(){

	if(findLocationOfMovie(movie,year) !== -1){
	
		movieArray.splice(findLocationOfMovie(movie,year),1);

	}	
}
	
//---------------------------changeStuff------------------------
// changes the parameters of the movie
$.addChanges = function(movieObj){

	var movielocation = findLocationOfMovie(movieObj[0]["title"], movieObj[0]["year"]);
	
	for (var attribute in movieObj[0]){
		
		movieArray[movielocation][attribute] = movieObj[0][attribute];	
	}
}

// gets the MovieData of one Movie








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
$.sortMovieAlphabet = function(asc,preSortedArray){
	var sortedArray = new Array();
	
	if(preSortedArray == "null"){
		//usemovieArray
	}else{
		//use preSorted
	}
}

// Filters movie with the genre
$.getWithGenreFilter = function(filterGenre){

	var filteredMovieArray = new Array();	
	for(var i = 0; i < movieArray.length; i++){
	
		if(movieArray[i].genre === filterGenre){
			filteredMovieArray.push(movieArray[i]);			
		}
	}
	return filteredMovieArray;
}


