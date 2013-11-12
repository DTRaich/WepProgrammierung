//InitializeDataBase
// behrends
//Parse.initialize("OCbRi66SwZ7d0xAik7xZXNZoRdLvSE87GSyw3zxJ", "Wb5Ul5lZhMH0Bhs8tTgvFqTKUZhjXR9cDa7zx3As");

// Unsere
Parse.initialize("1mwLhaHUhEnrZBlvwgHHy93PsixYFLeHmXTkl15v", "p6vQ9vyGS5XuFceJVgMBjr2T5YxCohqLdRTzSkKU");

//Define ParseObject
var MovieObject = Parse.Object.extend("MovieObject");
var RatedObject = Parse.Object.extend("RatedObject");

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
			selectedtablerebuild();
				
		},
		error: function(user, error) {
			alert('Login Fehlgeschlagen! \n \nBitte überprüfen Sie Ihre Eingaben.');
		}	
	});
}

//logout from DB
$.logOutFromDB =  function(){
	
	Parse.User.logOut();	
	$('#login').html(loginTemplate());
	$('#menu').html(nav_logout_Template());
	$('#main').html('');
	
	//table reload
	selectedtablerebuild();
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
			
				ratedObj.set("movieID", movieObj.id);
				ratedObj.set("userID", user);
				ratedObj.set("rating", movieObjadd["rating"]);
				
				// save the rating obj
				ratedObj.save(null, {
					success: function(ratedObj){
						// relation  also saved
					}
				
				})
			}
			alert('Neuer Film wurde erfolgreich gespeichert ' );	
		},
		error: function(movieObj, error) {
			
			alert('Speichern fehlgeschlagen. \n Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut.\n');
		}
		
	});
}

// addChanges to the DB 
$.addChangesToDB = function(addMovieSet,originalDBID){
	var user = Parse.User.current();
	var movieObj;
	var ratedObj = new RatedObject();	
	
	// getting the Movie ParseObject
	var query = new Parse.Query(MovieObject);
	query.get(originalDBID, {
		success: function(movieObj) {
			alert("hab dich")
		
		}
	});
	
	// Update the things
	
	movieObj.save(null, {
	success: function(movieObj) {
		// create movieObj
		movieObj.set("title",addMovieSet["title"]);
		movieObj.set("year", addMovieSet["year"]);
		movieObj.set("genre", addMovieSet["genre"]);	
		//movieObj.set("owner", addMovieSet["owner"]));
		movieObj.set("changed", user);
		movieObj.save();
  }
});
}

// getting the relations to build up the hofle stuckture
$.gettingRelations = function(movieObject, user){

	var relationQuery = new Parse.Query(RatedObject);
	var promise = Parse.Promise.as();				
	relationQuery.equalTo("movieID", movie.id);
				
	promise= promise.then(function(){return relationQuery.find({				
		success: function(results) {					
				// now finding the rest of the parameters										
				var sumRating = 0;
				var avgRating = 0;
				var	seen = 0;
				var myRating = 0;

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
						movieObject["rating"] = avgRating;				
						movieObject["seen"] = seen;	
						movieObject["myrating"] = myRating;
						
						}else{							
							movieObject["rating"] = "0";				
							movieObject["seen"] = "0";	
							movieObject["myrating"] = "0";
						
						}	
						
							
			},
			error: function(error) {
				alert('Fehler beim Laden der Anwendung.\nWir bitten um Ihr Verständnis.');
								
			}
		});
	})
	
	return promise;	
}

// gets all the Movies from the DB
$.gettingAllDBMovies = function(){
	var movieObject;
	var queryAllMovies = new Parse.Query(MovieObject);	
	var user = Parse.User.current();
	
	queryAllMovies.find({
		success: function(results) {		
			for(var i = 0; i < results.length; i++){
				
				movieObject	= new Object();		
				movie = results[i];	
				
				// fill with "movieClassDATA"							
				movieObject["title"] = movie.get('title');				
				movieObject["year"] = movie.get('year');
				movieObject["genre"] = movie.get('genre');								
								
				// now searching for the rating stuff
				$.gettingRelations(movieObject,user).then(function(){});
				
				// checking for is User or Not --> because of change matters in the table script	
				if(user == null){
					movieObject["owner"] = "0";	
				}else{	
					console.log(movie.get('owner').id);
					console.log(user.id);
					
					if(movie.get('owner').id == user.id){
						movieObject["owner"] = "1";	
					}else{					
						movieObject["owner"] = "0";	
					}
				}				
				movieObject["originalDBID"] = movie.id;		
				
				// last fire object into the Array	
				movieArray.push(movieObject);	
			}
			
		},
		error: function(error) {
			alert("Fehler beim Laden der Anwendung.\nWir bitten um Ihr Verständnis.")
		
		}		
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
		// The object was deleted from the Parse Cloud.
		}
	});	
	
	// Relation to be deleted.
	relationQuery.equalTo("movieID", originalDBID);
	relationQuery.find({
		success: function(results) {
			for( var i = 0; i < results.length;i++){
				var relation = results[i];
				relation.destroy({
					success: function(relation) {
						// nothing on delete
					}	
				})
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

