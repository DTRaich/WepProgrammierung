//InitializeDataBase
// behrends
Parse.initialize("OCbRi66SwZ7d0xAik7xZXNZoRdLvSE87GSyw3zxJ", "Wb5Ul5lZhMH0Bhs8tTgvFqTKUZhjXR9cDa7zx3As");
//Define ParseObject
var MovieObject = Parse.Object.extend("MovieObject");
var RatedObject = Parse.Object.extend("RatedObject");

var loadTemplate= _.template('<div id="loadding"><img id="loadingGif"src="./img/small/loading.gif"></div>')
 
//----------------------LogIn/LogOut/Register/GetLogStat---------------------- 
//add User to the DB-
$.addUserDB = function(username,pswd){
	var user = new Parse.User();
	user.set("username", username);
	user.set("password", pswd);
	
	user.signUp(null, {
	success: function(user) {
		alert("Benutzer wurde registriert");
		$('#login').html(loginTemplate());
	},
	error: function(user, error) {
		
		alert("Registration fehlgeschlagen:\n" + error.message);
	}
	});
}

//login to DB
$.loginToDB = function(username,pswd){

	var user = Parse.User.logIn(username, pswd, {
		success: function(user) {
			//loged IN
			$('#login').html(welcomeTemplate({id:username}));
			$('#menu').html(nav_login_Template());						
			loadedmovies = $.getAllMovies(); 
				
		},
		error: function(user, error) {
			alert('Login fehlgeschlagen! \n \nBitter vergewissern Sie sich, dass Ihre Eingaben korrekt sind.');
		}	
	});
}

//logout from DB
$.logOutFromDB =  function(){
	
	Parse.User.logOut();	
	$('#login').html(loginTemplate());
	$('#menu').html(nav_logout_Template());
		
	//table reload	
	loadedmovies = $.getAllMovies(); 

}

//gets current User returns null if no user is logedIn
$.getLogStatusDB = function(){	
	return Parse.User.current();
}

//------------------LOAD /DELETE / CHANGE MOVIES-----------------------------

// Add movies into the DB, together with the rated and seen relations
$.insertMovieInDB = function (movieObjadd){

	// inital variable and Objects
	var user = Parse.User.current();
	var movieObj = new MovieObject();
	var ratedObj = new RatedObject();
	
	// create movie
	movieObj.set("title",movieObjadd["title"]);
	movieObj.set("year", movieObjadd["year"]);
	movieObj.set("genre", movieObjadd["genre"]);	
	movieObj.set("owner", user);
	movieObj.set("changed", user);
	
	// Save the movieObj
	movieObj.save(null, {
		success: function(movieObj) {
		
			// create rated object with current movieObj id --- if movie is seen ---else not
			if(movieObjadd["seen"] === "1"){
			
				//adding new relation
				$.newRatingRelation(movieObj.id,user,movieObjadd["rating"]);
				alert('Neuer Film wurde erfolgreich gespeichert ' );	
			}
			
		},
		error: function(movieObj, error) {
			
			alert('Speichern fehlgeschlagen. \n Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut.\n');
		}
		
	});
}

//new Seen and Rating Relations 
$.newRatingRelation = function(movieID,user,rating){
	var ratedObj = new RatedObject();
	var done= $.Deferred();
	
	ratedObj.set("movieID", movieID);
	ratedObj.set("userID", user);
	ratedObj.set("rating", rating);
	
	// save the rating obj
	ratedObj.save().then(function(ratedObj) {
		// the object was saved successfully.
		console.log("savedrelation");
		loadedmovies = $.getAllMovies(); 

	}, function(error) {
		// the save failed.
	});	
	
}

// delete or Update Rating relation ---> one fucntion because we have to search for both movieId and userID due to the relation
$.deleteOrUpdateRating = function(movieID,user,rating,isDel){
	//define query	
	var relationQuery = new Parse.Query(RatedObject);	
	relationQuery.equalTo("movieID",movieID);
	relationQuery.equalTo("userID",user);
	
	// find relation
	relationQuery.find({
		success: function(results){
		console.log(results.length);
			var ratingRelation = results[0];			
			// delete or update
			if(isDel == true){
			
				ratingRelation.destroy().then(function(ratingRelation) {
					// the object was saved successfully.
					console.log("delete"+ rating);
					loadedmovies = $.getAllMovies(); 

				}, function(error) {
					// the save failed.
				});	
				
			}else{
				ratingRelation.set("rating",rating);
				
				// save the rating obj
				ratingRelation.save().then(function(ratingRelation) {
					// the object was saved successfully.
					console.log("updated"+ rating);
					loadedmovies = $.getAllMovies(); 

				}, function(error) {
					// the save failed.
				});	
			
			}
			
		},
		error: function(error) {
			// There was an error.
		}
	});
	
	// delete or updated

}
// tes
var FunctionTwo = function () {
  console.log('FunctionTwo');
};

//handles all cases of relation changeing
$.ratedRelationHandler = function(movieID,seenBeforeChange,rating,addMovieSet){
	var user = Parse.User.current();
	if(seenBeforeChange == "1"){	
		if(addMovieSet["seen"] == "0"){
			//delete
			$.deleteOrUpdateRating(movieID,user,rating,true);
		}else{
			//update
			$.deleteOrUpdateRating(movieID,user,rating,false);		
		}
	
	}else{	
		if(addMovieSet["seen"] == "1"){
			//add new relation		
			$.newRatingRelation(movieID,user,rating);
		}
	
	}
}

// addChanges to the DB (changes from carescript complete editing mode)
$.addChangesToDB = function(addMovieSet,receivedData){	
	var movieObj;	
	var user = Parse.User.current();
	var movieID = receivedData["originalDBID"];
	var user = Parse.User.current();
	var seenBeforeChange = receivedData["seen"];
	var rating  = addMovieSet["rating"];
	
	// getting the Movie
	var query = new Parse.Query(MovieObject);	
	query.get(movieID, {
		success: function(movieObj) {
			movieObj.set("title",addMovieSet["title"]);
			movieObj.set("year", addMovieSet["year"]);
			movieObj.set("genre", addMovieSet["genre"]);
			movieObj.set("changed", user);
			
			movieObj.save(null, {
					success: function(movieObj){
						// successfull updated
					}
				
				})
		
			
		},
		error: function(error) {
			alert('Fehler beim Laden der Benutzer');							
		}
	});	
	// relation handling	
	$.ratedRelationHandler(movieID,seenBeforeChange,rating,addMovieSet);
	
			
}

// getting the relations to the USer to find the "owner"
$.gettingUserRelations = function(movieObject, currentUser, movie){
	var relationQuery = new Parse.Query(Parse.User);
	var promise = Parse.Promise.as();	
	var movieOwner = movie.get("owner");
	
	relationQuery.equalTo("objectId",movieOwner.id );	

	promise= promise.then(function(){return relationQuery.find({				
		success: function(results) {					
					if(results.length != 0){
						var foundUser = results[0];
						
						if(movie.get('owner').id == currentUser.id){
							movieObject["owner"] = "1";	
						}else{
							movieObject["owner"] = foundUser.get('username');	
						}
					}
					
			},
			error: function(error) {
				alert('Fehler beim Laden der Benutzer');
								
			}
		});
	})
	
	return promise;	
}

// getting the relations to build up the whole stucture
$.gettingRatedRelations = function(movieObject, user){

	var relationQuery = new Parse.Query(RatedObject);
	var promise = Parse.Promise.as();				
	relationQuery.equalTo("movieID", movie.id);
	// to prevend multiple alerts
	var errorWasThere = false;		
	
	promise= promise.then(function(){return relationQuery.find({				
		success: function(results) {					
				// now finding the rest of the parameters										
				var sumRating = 0;
				var avgRating = 0;
				var	seen = 0;
				var myRating = 0;
				var round = 0;

				if(results.length != 0){
					for(var k = 0; k < results.length; k++){
						rated = results[k];	
						var rating = parseFloat(rated.get('rating'));									
						sumRating = sumRating + rating;									
								
						// checks if user  is current user to get the personal rating
						if(user == null){
								seen  = "0";
								myRating = "0";
						}else{
							if(rated.get('userID').id != user.id){								
								seen = "0";	
								myRating = "0";									
							}else{									
								seen  = "1";
								myRating = rated.get('rating');
							}	
						}								
														
						
						}
						avgRating = sumRating/results.length;	
						round = Math.round(avgRating);					
						movieObject["rating"] = round;				
						movieObject["seen"] = seen;	
						movieObject["myrating"] = myRating;
						
				}else{							
					movieObject["rating"] = "0";				
					movieObject["seen"] = "0";	
					movieObject["myrating"] = "0";
						
				}	
						
							
			},
			error: function(error) {
				// to prevend multiple alerts
				if(errorWasThere == false){
					alert('Fehler beim Laden der Anwendung.\nWir bitten um Ihr Verständnis.');
					errorWasThere = true;
				}else{
					// do nothing
				}
			
				
								
			}
		});
	})
	
	return promise;	
}

// gets all the Movies from the DB
$.gettingAllDBMovies = function(){
	// vor providing the loading div
	$('#main_middle').html(loadTemplate());	
	//variables
	var movieObject;
	var queryAllMovies = new Parse.Query(MovieObject);	
	var user = Parse.User.current();
	
	
	queryAllMovies.find().then(function(results) {
  // Collect one promise for each delete into an array.
	var promises = [];
	
		_.each(results, function(result) {
				movieObject	= new Object();		
				movie = result;					
				//movie = results[i];	
				
				// fill with "movieClassDATA"							
				movieObject["title"] = movie.get('title');				
				movieObject["year"] = movie.get('year');
				movieObject["genre"] = movie.get('genre');	
				// Start this delete immediately and add its promise to the list.
				
				promises.push($.gettingRatedRelations(movieObject,user).then(function(){}));
				
				
				if(user == null){
					movieObject["owner"] = "0";	
				}else{
					promises.push($.gettingUserRelations(movieObject,user,movie).then(function(){}));
					//$.gettingUserRelations(movieObject,user,movie).then(function(){});	
				}	
				
				movieObject["originalDBID"] = movie.id;		
				//console.log(movieObject);
				
				// last fire object into the Array	
				movieArray.push(movieObject);	
	});
	// Return a new promise that is resolved when all of the deletes are finished.
	return Parse.Promise.when(promises);
 
	}).then(function() {
	// Every comment was deleted.
		selectedtablerebuild();
	});	

	
}

// delete movies from the DB
$.delMovieFromDB = function(originalDBID){
	// queries
	var query = new Parse.Query(MovieObject);
	var relationQuery = new Parse.Query(RatedObject);
	
	// getting the movieObj
	query.get(originalDBID, {
		success: function(movieObj) {		
			// deleting the movieObj
			movieObj.destroy({			
				success: function(movieObj) {
					// nothing on delete
				},
				error: function(movieObj, error) {
					
				}
			});	
		// The object has been deleted from the Parse Cloud.
		}
	});	
	
	// Relations to be deleted.
	relationQuery.equalTo("movieID", originalDBID);
	relationQuery.find({
		success: function(results) {
			for( var i = 0; i < results.length;i++){
				var relation = results[i];
				relation.destroy({
					success: function(relation) {
						// nothing on delete^
					}	
				})
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
	
}

