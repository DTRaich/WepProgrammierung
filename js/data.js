//Datascript
//------------------------GLOBAL VARIABLES----------------------------
var movieArray = new Array();
//------------------------DATA----------------------------------------
// how new array should look
//movieArray[9] = new Object();
//movieArray[9]["title"] = "Star Wars";
//movieArray[9]["year"] = "2013";
//movieArray[9]["genre"] = "SciFi";
//movieArray[9]["rating"] = "1"; // avg rating
//movieArray[9]["seen"] = "1"; 	// 
//movieArray[9]["myrating"] = "1"; // 
//movieArray[9]["owner"] = "1"; //
//movieArray[9]["originalDBID"] = "1"; // 

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
	movieData["myrating"] = movieArray[movielocation]["myrating"];
	movieData["owner"] = movieArray[movielocation]["owner"];	
	movieData["originalDBID"] = movieArray[movielocation]["originalDBID"];
	
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

//changes the rating and the "seen" yes/ no matters
$.changeRating = function(originalDBID, seenBeforeChange, newRating){
	// db changing
		// addMovieset object is neccessary for the relationHandler 
	var addMovieSet = new Object();
	if(newRating == "0"){
		addMovieSet["seen"]= "0";
	}else{
		addMovieSet["seen"]= "1";
	}	
	$.ratedRelationHandler(originalDBID,seenBeforeChange,newRating,addMovieSet);
	// beachten für Nils neu array laden
	
}

//------------------sorting and filtering-----------------------------------
//sort Alphabet asc= true/false
$.sortMovie = function(asc,preSortedArray,filter){
	//define the working arrays
	var sortedArray = new Array();
	var finalArray = new Array();
	
	// creating sorting key
	for(var i = 0 ; i < preSortedArray.length ; i++){
		sortedArray.push(preSortedArray[i][filter]);	
	}	
	// SORT!
	sortedArray.sort();
	// asc or dec
	if(asc === true){sortedArray.sort();}else{sortedArray.reverse();}
	
	// fill new sorted array
	for(var i = 0; i < sortedArray.length ; i++ ){
		for(var j = 0; j< preSortedArray.length ; j++){
			if(sortedArray[i] === preSortedArray[j][filter]){
				finalArray[i] = new Object();
				finalArray[i]["title"] = preSortedArray[j]["title"];
				finalArray[i]["year"] = preSortedArray[j]["year"];
				finalArray[i]["genre"] = preSortedArray[j]["genre"];
				finalArray[i]["rating"] = preSortedArray[j]["rating"];
				finalArray[i]["seen"] = preSortedArray[j]["seen"];				
				finalArray[i]["myrating"] = preSortedArray[j]["myrating"];				
				finalArray[i]["owner"] = preSortedArray[j]["owner"];
				finalArray[i]["originalDBID"] = preSortedArray[j]["originalDBID"];
			}		
		}	
	}	
	return finalArray;
}

//sort Alphabet asc= true/false
$.sortMovieNumbers = function(asc,preSortedArray,filter){
	//define the working arrays
	var sortedArray = new Array();
	var finalArray = new Array();
	// creating sorting key
	for(var i = 0 ; i < preSortedArray.length ; i++){
		sortedArray.push(preSortedArray[i][filter]+preSortedArray[i]["title"]);	
	}	
	// SORT!
	sortedArray.sort();
	// asc or dec
	if(asc === true){sortedArray.sort();}else{sortedArray.reverse();}
	
	// fill new sorted array
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
				finalArray[i]["myrating"] = preSortedArray[j]["myrating"];				
				finalArray[i]["owner"] = preSortedArray[j]["owner"];
				finalArray[i]["originalDBID"] = preSortedArray[j]["originalDBID"];

			}		
		}	
	}	
	return finalArray;
}

//Genre Input Filter Function
$.filterMovies = function(preSortedArray,filter){		
	
	var finalArray = new Array();
	var i=0;
	for(var j =0;j<preSortedArray.length;j++){
		if(preSortedArray[j]["genre"]===filter){
			finalArray[i] = new Object();
			finalArray[i]["title"] = preSortedArray[j]["title"];
			finalArray[i]["year"] = preSortedArray[j]["year"];
			finalArray[i]["genre"] = preSortedArray[j]["genre"];
			finalArray[i]["rating"] = preSortedArray[j]["rating"];
			finalArray[i]["seen"] = preSortedArray[j]["seen"];	
			finalArray[i]["myrating"] = preSortedArray[j]["myrating"];				
			finalArray[i]["owner"] = preSortedArray[j]["owner"];
			finalArray[i]["originalDBID"] = preSortedArray[j]["originalDBID"];
			i++;
		}		
	}
	return finalArray;
}

//Search Input Filter Function
$.Searchformovies = function(preSortedArray,filter){		
	
	var finalArray = new Array();
	var i=0;
	for(var j =0;j<preSortedArray.length;j++){
		if(preSortedArray[j]["title"].indexOf(filter)!= -1){
			finalArray[i] = new Object();
			finalArray[i]["title"] = preSortedArray[j]["title"];
			finalArray[i]["year"] = preSortedArray[j]["year"];
			finalArray[i]["genre"] = preSortedArray[j]["genre"];
			finalArray[i]["rating"] = preSortedArray[j]["rating"];
			finalArray[i]["seen"] = preSortedArray[j]["seen"];	
			finalArray[i]["myrating"] = preSortedArray[j]["myrating"];				
			finalArray[i]["owner"] = preSortedArray[j]["owner"];
			finalArray[i]["originalDBID"] = preSortedArray[j]["originalDBID"];
			i++;
		}		
	}
	return finalArray;
}

// Shows all movies by current user or clicked user
$.findUserFilms = function(preSortedArray,filter){

	var finalArray = new Array();
	var i=0;
	
	for(var j =0;j<preSortedArray.length;j++){
		if(preSortedArray[j]["owner"] == filter){
		
			finalArray[i] = new Object();
			finalArray[i]["title"] = preSortedArray[j]["title"];
			finalArray[i]["year"] = preSortedArray[j]["year"];
			finalArray[i]["genre"] = preSortedArray[j]["genre"];
			finalArray[i]["rating"] = preSortedArray[j]["rating"];
			finalArray[i]["seen"] = preSortedArray[j]["seen"];	
			finalArray[i]["myrating"] = preSortedArray[j]["myrating"];				
			finalArray[i]["owner"] = preSortedArray[j]["owner"];
			finalArray[i]["originalDBID"] = preSortedArray[j]["originalDBID"];
			i++;
			
		}		
	}
	return finalArray;
}