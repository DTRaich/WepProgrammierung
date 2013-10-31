//Datascript
//------------------------GLOBAL VARIABLES----------------------------
var movieArray = new Array();


//------------------------DATA----------------------------------------
movieArray[0] = new Object();
movieArray[0]["title"] = "American History X";
movieArray[0]["year"] = "1999";
movieArray[0]["genre"] = "Thriller";
movieArray[0]["rating"] = "5";
movieArray[0]["seen"] = "1";

movieArray[1] = new Object();
movieArray[1]["title"] = "Lord of War";
movieArray[1]["year"] = "1999";
movieArray[1]["genre"] = "Horror";
movieArray[1]["rating"] = "3";
movieArray[1]["seen"] = "0";

movieArray[2] = new Object();
movieArray[2]["title"] = "Der Soldat James Ryan";
movieArray[2]["year"] = "1999";
movieArray[2]["genre"] = "Action";
movieArray[2]["rating"] = "2";
movieArray[2]["seen"] = "0";

movieArray[3] = new Object();
movieArray[3]["title"] = "Boondock Saints";
movieArray[3]["year"] = "2003";
movieArray[3]["genre"] = "Action";
movieArray[3]["rating"] = "5";
movieArray[3]["seen"] = "1";

movieArray[4] = new Object();
movieArray[4]["title"] = "Saw 7";
movieArray[4]["year"] = "2011";
movieArray[4]["genre"] = "Horror";
movieArray[4]["rating"] = "4";
movieArray[4]["seen"] = "1";

movieArray[5] = new Object();
movieArray[5]["title"] = "Pitch Black";
movieArray[5]["year"] = "2007";
movieArray[5]["genre"] = "Action";
movieArray[5]["rating"] = "5";
movieArray[5]["seen"] = "1";

movieArray[6] = new Object();
movieArray[6]["title"] = "Chronicles of Riddick";
movieArray[6]["year"] = "2010";
movieArray[6]["genre"] = "Action";
movieArray[6]["rating"] = "5";
movieArray[6]["seen"] = "1";

movieArray[7] = new Object();
movieArray[7]["title"] = "Mario Barth";
movieArray[7]["year"] = "2013";
movieArray[7]["genre"] = "Comedy";
movieArray[7]["rating"] = "1";
movieArray[7]["seen"] = "1";

movieArray[8] = new Object();
movieArray[8]["title"] = "Star Wars";
movieArray[8]["year"] = "2013";
movieArray[8]["genre"] = "SciFi";
movieArray[8]["rating"] = "1";
movieArray[8]["seen"] = "1";
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

	return movieArray;
}

//------------------------------add and delete-----------------------------
// adds a new movie to the Array
$.addMovie = function (movieArr){	
	movieArray.push(movieArr);
	
}

//deletes a movie in the movieArray
$.deleteMovies = function(movie,year){
	var location = $.findLocationOfMovie(movie,year);
	if(location !== -1){
		alert(location);
		movieArray.splice(location,1);
		
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




