//------------------------GLOBAL VARIABLES----------------------------

// ----------------------------------TEMPLATES---------------------------
//<br><br><div id="headline" align="center"><h1>Filmliste</h1></div>'+
// ----------------------------------MAINTEMPLATE---------------------------
var maintemplate=_.template('<br><br><table class="mainTemplateTable" id="tabelle"></table>'+
							'<div id="main_top"></div>'+
							'<div id="main_middle"></div>'+	
							'<div id="main_low"></div>');

// ----------------------------------IMDB-TEMPLATE---------------------------
var imdbinfoTemplate = _.template('<br><h1 class="modal-title" id="modaltitle">Details</h1>'+
								'</div>'+
								'<table class="modal-body"><tr>'+  
								'<td><div id="modal-pic">'+  
								'</div></td>'+
								'<td><div id="modal-text">'+
								'<table border="1" id="tabelle"></table>'+
								'</div></td></tr>'+
								'</table>'+
								'<div class="modal-footer" id= backBtnDiv>'+
								'<button type="button" class="btn btn-primary" id="btndismiss" aling="right" data-dismiss="modal">Zurück</button></div>'+
								'<div id= trailerBtnDiv> <a href ="#" class="tooltip"> '+
								'<button type="button" class="btn btn-primary" id="trailerListbtn" aling="right" data-dismiss="modal">Trailer Liste</button>'+
								'<span>Liste der Trailer auf Youtube</span></a> </div>');

								
var ratingTemplate= _.template('<div id="outerRating"> <div id="innerRating"><br><table class="ratingbox"><tr><th>Rating</th></tr>'+
								'<tr><td align="center"><img id="SelectedNewRating" class="1" src="./img/small/stars-1.jpg" width = "80px" height="20px"></td> </tr>'+
								'<tr><td align="center"><img id="SelectedNewRating" class="2" src="./img/small/stars-2.jpg" width = "80px" height="20px"></td> </tr>'+
								'<tr><td align="center"><img id="SelectedNewRating" class="3" src="./img/small/stars-3.jpg" width = "80px" height="20px"></td> </tr>'+
								'<tr><td align="center"><img id="SelectedNewRating" class="4" src="./img/small/stars-4.jpg" width = "80px" height="20px"></td> </tr>'+
								'<tr><td align="center"><img id="SelectedNewRating" class="5" src="./img/small/stars-5.jpg" width = "80px" height="20px"></td> </tr>'+
								'<tr><td align="center"><a href="#" id="SelectedNewRating" class="0">nicht Gesehen/Keine Bewertung abgeben</a></td></tr>'+
								'<tr><td align="center"><button type="button" id="btndismiss" align="right" data-dismiss="modal">Zurück</button></td></tr>'+
								'</table></div></div>')
 

//--------------------------------------------------VARIABELS--------------------------------

//init startuparray-struckture
var startuparray = new Array(); 
startuparray[0] = new Object();
startuparray[0]["title"] = "N/A";
startuparray[0]["year"] = "N/A";
startuparray[0]["genre"] = "N/A";
startuparray[0]["rating"] = "0";
startuparray[0]["seen"] = "0"; 	
startuparray[0]["myrating"] = "0"; 
startuparray[0]["owner"] = "X"; 
startuparray[0]["originalDBID"] = "0"; 
//---
var loadedmovies = startuparray;
var movies;
var backg="#C4C4C4";
var backg2 = "#E3E3E3";
var asc = true;
var yearsort = true;
var ratingsort = true;
var seensort = true;
var lineRating;

//--------------------------------------------------INTERN METHODS--------------------------------

//Click-Event Methods
$(document).ready(function(){
//homeClick - show the whole table
$(document).on('click','#nav_home',function(event){			

	preselecttable();	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
//navigation Genre Input
//show Aktion-Movies 
$(document).on('click','#nav_action',function(event){	
	movies = loadedmovies;
	movies = $.filterMovies(movies,"Action");	
	if(movies.length==0){movies = startuparray;}
	preselecttablefilter(movies);	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
//show Comedy-Movies
$(document).on('click','#nav_comedy',function(event){	
	movies = loadedmovies;
	movies = $.filterMovies(movies,"Comedy");
	if(movies.length==0){movies = startuparray;}	
	preselecttablefilter(movies);	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
//show Horror-Movies
$(document).on('click','#nav_horror',function(event){	
	movies = loadedmovies;
	movies = $.filterMovies(movies,"Horror");	
	if(movies.length==0){movies = startuparray;}	
	preselecttablefilter(movies);	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
//show SciFi-Movies
$(document).on('click','#nav_scifi',function(event){	
	movies = loadedmovies;
	movies = $.filterMovies(movies,"Sci-Fi");
	if(movies.length==0){movies = startuparray;}		
	preselecttablefilter(movies);	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
//show Thriller 
$(document).on('click','#nav_thriller',function(event){	
	movies = loadedmovies;
	movies = $.filterMovies(movies,"Thriller");	
	if(movies.length==0){movies = startuparray;}	
	preselecttablefilter(movies);	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
//show own movies
$(document).on('click','#nav_ownMovies',function(event){	
	movies = loadedmovies;
	movies = $.findUserFilms(movies,"1");
	if(movies.length==0){movies = startuparray;}	
	preselecttablefilter(movies);	
	event.preventDefault();
	event.stopImmediatePropagation();	
});

//Table Button click events
//Editbutton clicked
$(document).on('click','#Editclicked',function(event){

	var classn = $(this).context.className;
	$.changeMovie(movies[classn]["title"],movies[classn]["year"]);
	
	
});
//deletebutton clicked
$(document).on('click','#Deleteclicked',function(event){		
	var classn = $(this).context.className;
	var result = confirm('Sind sie sich sicher, dass sie den Film löschen möchten?');
	if(result == true){
		$.delMovieFromDB(movies[classn]["originalDBID"]);	
		//rebuild the same table without the deleted movie manualy to prevent loading lacks		
		var location = $.findLocationOfMovie(movies[classn]["title"],movies[classn]["year"]);
		if(location !== -1){
			movies.splice(location,1);
		}
		selectedtablerebuild();
	} 
});
//Rating clicked
$(document).on('click','#Ratingclicked',function(event){
	
	lineRating = $(this).context.className;
	$('#main_middle').html(ratingTemplate());	
	
	
});
//detailsclicked
$(document).on('click','#detailsclicked',function(event){
	
	var classn = $(this).context.className;
	detailview(movies[classn]["title"]);
	
});

//HeaderSort Clicks
//TitleSortClicked 
$(document).on('click','#TitleSortClicked',function(event){

	movies  = $.sortMovie(asc, movies, "title");
	preselecttablefilter(movies);
	if(asc === true){asc=false;}else{asc=true;}
	
});
//YearSortClicked 
$(document).on('click','#YearSortClicked',function(event){

	movies  = $.sortMovieNumbers(yearsort, movies, "year");
	preselecttablefilter(movies);
	if(yearsort === true){yearsort=false;}else{yearsort=true;}	
	
});
//RatingSortClicked 
$(document).on('click','#RatingSortClicked',function(event){

	movies  = $.sortMovieNumbers(ratingsort, movies, "rating");
	preselecttablefilter(movies);
	if(ratingsort === true){ratingsort=false;}else{ratingsort=true;}
	
});
//SeenSortClicked  
$(document).on('click','#SeenSortClicked',function(event){

	movies  = $.sortMovieNumbers(seensort, movies, "seen");
	preselecttablefilter(movies);
	if(seensort === true){seensort=false;}else{seensort=true;}
	
});

//imdbinfo dismiss 
$(document).on('click','#btndismiss',function(){
	selectedtablerebuild();	
});

$(document).on('click','#trailerListbtn',function(){
	var testtitle = document.getElementById("Title").textContent;
	window.open("http://www.youtube.com/results?search_query="+ testtitle +" trailer&sm=3");
});

//Searchinput enter
$(document).on('keypress','#searchinginput',function(event){
	if(event.which== 13){
		var input = $.trim($('#searchinginput').val());
		movies = $.Searchformovies(loadedmovies,input);
		if(movies.length==0){
			movies = startuparray;
		}
		preselecttablefilter(movies);
	}	
})

//Searchbuttonclicked 
$(document).on('click','#Searchbuttonclicked',function(){
	var input = $.trim($('#searchinginput').val());
	movies = $.Searchformovies(loadedmovies,input);
	if(movies.length==0){
		movies = startuparray;
	}
	preselecttablefilter(movies);		
})

//Ownerclicked
$(document).on('click','#Ownerclicked',function(){
	var classn = $(this).context.className;
	var selowner = movies[classn]["owner"];
	movies = loadedmovies;
	movies = $.findUserFilms(movies,selowner);
	if(movies.length==0){movies = startuparray;}	
	preselecttablefilter(movies);			
})

//SelectedNewRating
$(document).on('click','#SelectedNewRating',function(){
	var classn = $(this).context.className;
		
	$.changeRating(movies[lineRating]["originalDBID"],movies[lineRating]["seen"], classn);
	
	selectedtablerebuild();
	loadedmovies = $.getAllMovies(); 
})


});
//-------------------------------------------------



//-------------------------------------------------

//detailview
function detailview(title){
	$('#main').html(imdbinfoTemplate());
	
	//Tabelle
	node = document.getElementById("tabelle");
	
	node.parentNode.insertBefore(getPoster(title), node);	
	
}

//get informations from imdb and create the details view
function getPoster(title){	
    
	var myTable = document.createElement("table");
	var mytablebody = document.createElement("tbody");
	
	$.getJSON('http://www.imdbapi.com/?t=' + title + '&callback=?' ,
		function(data){
		if(data.Poster == undefined){
			//default picture
			mycurrent_img = document.createElement("img");		
			mycurrent_img.src = "./img/big/img-not-found.gif";	
			titlepic = document.getElementById("modal-pic");
			titlepic.appendChild(mycurrent_img);
	  
			alert("Fimdaten von imdb nicht abrufbar. \n\nBitte stellen Sie sicher, dass der Filmtitel korrekt eingegeben wurde.")
		
		}else{
			var items = [];
			var itemkeys = [];
			$.each(data, function(key, val) {	
				itemkeys.push(key);
				items.push(val);
		});
		mycurrent_img = document.createElement("img");
		if(data.Poster == 'N/A'){
			mycurrent_img.src = "./img/big/img-not-found.gif";
		}else{				
			mycurrent_img.src = data.Poster;	
		}	
		titlepic = document.getElementById("modal-pic");
		titlepic.appendChild(mycurrent_img);		
		
		for(var i = 0 ; i < items.length-3 ; i++){
			if(i!==2&&i!==10){
			mycurrent_row = document.createElement("tr");
			mycurrent_cell = document.createElement("td");
			
			mycurrent_cell.appendChild(document.createTextNode(itemkeys[i]));
			mycurrent_cell.style.backgroundColor = backg;	
			
			mycurrent_row.appendChild(mycurrent_cell);	
			mycurrent_cell = document.createElement("td");
			
			mycurrent_cell.appendChild(document.createTextNode(items[i]));
			mycurrent_cell.style.backgroundColor = backg2;
			mycurrent_cell.setAttribute("id",itemkeys[i]);
			
			mycurrent_row.appendChild(mycurrent_cell);		
			mytablebody.appendChild(mycurrent_row);	
			}
		}			
	  }
	  myTable.appendChild(mytablebody);
	  }	  
    );	
	myTable.style.width="95%";
	return myTable;
}

//-------------------------------------------------

//call method for the table creation at body onload
function preselecttable(){
	$('#main').html(maintemplate());	
	node = document.getElementById("tabelle");	
	
	//get all Movies in movies Array	
	movies = loadedmovies;	
	
	//check: Logedin User
	if($.getLogStatus()){
		node.parentNode.insertBefore(createTablelogedIn(movies.length, movies), node);	
	}else{
		node.parentNode.insertBefore(createTableGuest(movies.length, movies), node);
	}	
	loadedmovies = $.getAllMovies();
}

//call method for the table creation with filters
function preselecttablefilter(filterArray){
	$('#main').html(maintemplate());	
	node = document.getElementById("tabelle");
	
	//load all Movies
	movies = filterArray;	
	
	//check: Logedin User
	if($.getLogStatus()){
		node.parentNode.insertBefore(createTablelogedIn(movies.length, movies), node);	
	}else{
		node.parentNode.insertBefore(createTableGuest(movies.length, movies), node);
	}
}

//call method for the table creation
function selectedtablerebuild(){	
	$('#main').html(maintemplate());	
	node = document.getElementById("tabelle");	
	
	movies = loadedmovies;
	
	//check: Logedin User
	if($.getLogStatus()){
		node.parentNode.insertBefore(createTablelogedIn(movies.length, movies), node);	
	}else{
		node.parentNode.insertBefore(createTableGuest(movies.length, movies), node);
	}
}
//create a table for logged in Users
function createTablelogedIn(row, id) {		
		
    var myTable = document.createElement("table");
	myTable.border="0";
		
	var mytablehead = document.createElement("thead");
		//initialize Head Row
        mycurrent_row = document.createElement("tr");
		mycurrent_row.style.textAlign = "left";
		//Table Head
		for(var i=0;i<5;i++){
			mycurrent_cell = document.createElement("th");
			switch (i){
				case 0:	
					//Title Header
					currenttext = document.createTextNode("Titel");
					mycurrent_cell.appendChild(currenttext);
					mycurrent_img = document.createElement("img");			
					mycurrent_img.src="./img/small/sortArrow.jpg";
					mycurrent_img.style.width = "10px";
					mycurrent_img.style.height = "15px";
					mycurrent_img.style.border = "0";	
					mycurrent_img.setAttribute("id","TitleSortClicked");
					mycurrent_img.style.cursor = "pointer";
					mycurrent_cell.appendChild(mycurrent_img);
					//input field					
					mycurrent_input = document.createElement("input");
					mycurrent_input.setAttribute("id","searchinginput");
					mycurrent_input.setAttribute("placeholder","Suchfeld");
					mycurrent_cell.appendChild(mycurrent_input);
					//Searchbutton
					mycurrent_img = document.createElement("img");			
					mycurrent_img.src="./img/small/suchlupe.gif";
					mycurrent_img.style.width = "15px";
					mycurrent_img.style.height = "15px";
					mycurrent_img.style.border = "0";	
					mycurrent_img.setAttribute("id","Searchbuttonclicked");
					mycurrent_img.style.cursor = "pointer";
					mycurrent_cell.appendChild(mycurrent_img);
				
					break;
				case 1:	
					//Year Header
					currenttext = document.createTextNode("Jahr");
					mycurrent_cell.appendChild(currenttext);
					mycurrent_img = document.createElement("img");			
					mycurrent_img.src="./img/small/sortArrow.jpg";
					mycurrent_img.style.width = "10px";
					mycurrent_img.style.height = "15px";
					mycurrent_img.style.border = "0";	
					mycurrent_img.setAttribute("id","YearSortClicked");
					mycurrent_img.style.cursor = "pointer";
					mycurrent_cell.appendChild(mycurrent_img);
					break;
				case 2:
					//Genre Header
					currenttext = document.createTextNode("Genre");
					mycurrent_cell.appendChild(currenttext);
					break;
				case 3:
					//Seen Header 
					currenttext = document.createTextNode("Gesehen");
					mycurrent_cell.appendChild(currenttext);
					mycurrent_img = document.createElement("img");			
					mycurrent_img.src="./img/small/sortArrow.jpg";
					mycurrent_img.style.width = "10px";
					mycurrent_img.style.height = "15px";
					mycurrent_img.style.border = "0";	
					mycurrent_img.setAttribute("id","SeenSortClicked");
					mycurrent_img.style.cursor = "pointer";
					mycurrent_cell.appendChild(mycurrent_img);
					break;
				case 4:
					//Rating Header 
					currenttext = document.createTextNode("Bewertung");
					mycurrent_cell.appendChild(currenttext);
					mycurrent_img = document.createElement("img");			
					mycurrent_img.src="./img/small/sortArrow.jpg";
					mycurrent_img.style.width = "10px";
					mycurrent_img.style.height = "15px";
					mycurrent_img.style.border = "0";	
					mycurrent_img.setAttribute("id","RatingSortClicked");
					mycurrent_img.style.cursor = "pointer";
					mycurrent_cell.appendChild(mycurrent_img);
					break;						
			}		
			mycurrent_row.appendChild(mycurrent_cell);
		}
		
	//complete Header			
	mytablehead.appendChild(mycurrent_row);		
	myTable.appendChild(mytablehead);
    	
	var	mytablebody = document.createElement("tbody");
    for(var j = 0; j < row; j++) {
		//create Row
        mycurrent_row = document.createElement("tr");
        
		for(var i=0;i<7;i++){
			mycurrent_cell = document.createElement("td");
			switch (i){
				case 0:	
					//Title Cell
					currenttext = document.createTextNode(id[j]["title"]);
					mycurrent_cell.appendChild(currenttext);
					mycurrent_cell.style.backgroundColor = backg;
					mycurrent_cell.style.width = "230px";
					break;
				case 1:	
					//Year Cell
					currenttext = document.createTextNode(id[j]["year"]);
					mycurrent_cell.appendChild(currenttext);
					mycurrent_cell.style.backgroundColor =backg2;
					break;
				case 2:
					//Genre Cell
					currenttext = document.createTextNode(id[j]["genre"]);
					mycurrent_cell.appendChild(currenttext);
					mycurrent_cell.style.backgroundColor =backg;
					break;
				case 3:
					//Seen Cell
					if(id[j]["seen"]==='0'){
						currenttext = document.createTextNode("Nein");
					}else{		
						currenttext = document.createTextNode("Ja");
					}
					mycurrent_cell.appendChild(currenttext);
					mycurrent_cell.style.backgroundColor =backg2;
					break;
				case 4:
					//Rating Cell
					currenttext = document.createTextNode("");
					mycurrent_link = document.createElement("a");
					mycurrent_link.setAttribute("id","Ratinglink");
					mycurrent_link.setAttribute("class","tooltip");
					mycurrent_img = document.createElement("img");			
					mycurrent_img.src="./img/small/stars-"+id[j]["rating"]+".jpg";
					mycurrent_img.style.width = "80px";
					mycurrent_img.style.height = "20px";
					mycurrent_img.style.border = "0";
					mycurrent_img.setAttribute("id","Ratingclicked");
					mycurrent_img.setAttribute("class",j);
					mycurrent_img.style.cursor = "pointer";
					mycurrent_cell.style.width = "90px";
					mycurrent_link.appendChild(mycurrent_img);
					//Hover Event
					mycurrent_span = document.createElement("span");					
					mycurrent_span.appendChild(document.createTextNode("Eigene Bewertung:"));
					//own rating
					mycurrent_img = document.createElement("img");			
					mycurrent_img.src="./img/small/stars-"+id[j]["myrating"]+".jpg";
					mycurrent_img.style.width = "80px";
					mycurrent_img.style.height = "20px";
					mycurrent_img.style.border = "0";
					mycurrent_span.appendChild(mycurrent_img);
					//---
					mycurrent_link.appendChild(mycurrent_span);
					mycurrent_cell.appendChild(mycurrent_link);
					mycurrent_cell.appendChild(currenttext);
					break;	
				case 5:
					//Details Cell
					mycurrent_img =document.createElement("img");	
					mycurrent_img.src="./img/small/details.jpg";
					mycurrent_img.style.width = "20px";
					mycurrent_img.style.height = "20px";
					mycurrent_img.style.border = "0";
					mycurrent_img.setAttribute("id","detailsclicked");
					mycurrent_img.setAttribute("class",j);
					mycurrent_img.style.cursor = "pointer";
					mycurrent_cell.style.width = "20px";
					mycurrent_cell.appendChild(mycurrent_img);
					break;
				case 6: 
					//Owner Cell
					if(id[j]["owner"]==="1"){
					//Editbutton
					mycurrent_img = document.createElement("img");	
					mycurrent_img.src="./img/small/edit.png";
					mycurrent_img.style.width = "20px";
					mycurrent_img.style.height = "20px";
					mycurrent_img.style.border = "0";
					mycurrent_img.setAttribute("id","Editclicked");
					mycurrent_img.setAttribute("class",j);
					mycurrent_img.style.cursor = "pointer";
					mycurrent_cell.appendChild(mycurrent_img);
					//freespace between
					mycurrent_cell.appendChild(document.createTextNode(" "));					
					//Deletebutton
					mycurrent_img = document.createElement("img");	
					mycurrent_img.src="./img/small/Delete.png";
					mycurrent_img.style.width = "20px";
					mycurrent_img.style.height = "20px";
					mycurrent_img.style.border = "0";
					mycurrent_img.setAttribute("id","Deleteclicked");
					mycurrent_img.setAttribute("class",j);
					mycurrent_img.style.cursor = "pointer";
					mycurrent_cell.appendChild(mycurrent_img);
					}else{
					//if currentuser not owner -> display owner name					
					mycurrent_link = document.createElement("a");
					mycurrent_link.setAttribute("id","Ownerclicked");					
					mycurrent_link.setAttribute("class",j);					
					mycurrent_link.style.cursor = "pointer";
					currenttext = document.createTextNode(id[j]["owner"]);
					mycurrent_link.appendChild(currenttext);
					mycurrent_cell.appendChild(mycurrent_link);
					}					
					mycurrent_cell.style.backgroundColor =backg2;
					break;						
			}			
			
			mycurrent_row.appendChild(mycurrent_cell);
		} 		
		//complete Row
		mycurrent_row.setAttribute("id","Row"+j);
        mytablebody.appendChild(mycurrent_row);
    }
	//complete Table
    myTable.appendChild(mytablebody);
    myTable.setAttribute("ID", id);
	myTable.style.width="95%";
    return myTable;
} 

//Create a Table for Guests or logged out users
function createTableGuest(row, id) {	
		
    var myTable = document.createElement("table");
	myTable.border="0";
	var mytablehead = document.createElement("thead");
		//initialize Head Row
        mycurrent_row = document.createElement("tr");
		mycurrent_row.style.textAlign = "left";
		//Table Head
		for(var i=0;i<4;i++){
			mycurrent_cell = document.createElement("th");
			switch (i){
				case 0:		
					//Title Header
					currenttext = document.createTextNode("Titel");
					mycurrent_cell.appendChild(currenttext);
					mycurrent_img = document.createElement("img");			
					mycurrent_img.src="./img/small/sortArrow.jpg";
					mycurrent_img.style.width = "10px";
					mycurrent_img.style.height = "15px";
					mycurrent_img.style.border = "0";	
					mycurrent_img.setAttribute("id","TitleSortClicked");
					mycurrent_img.style.cursor = "pointer";
					mycurrent_cell.appendChild(mycurrent_img);
					//input field
					mycurrent_input = document.createElement("input");
					mycurrent_input.setAttribute("id","searchinginput");
					mycurrent_input.setAttribute("placeholder","Suchfeld");
					mycurrent_cell.appendChild(mycurrent_input);
					//Searchbutton
					mycurrent_img = document.createElement("img");			
					mycurrent_img.src="./img/small/suchlupe.gif";
					mycurrent_img.style.width = "15px";
					mycurrent_img.style.height = "15px";
					mycurrent_img.style.border = "0";	
					mycurrent_img.setAttribute("id","Searchbuttonclicked");
					mycurrent_img.style.cursor = "pointer";
					mycurrent_cell.appendChild(mycurrent_img);
					
					break;
				case 1:	
					//Year Header
					currenttext = document.createTextNode("Jahr");
					mycurrent_cell.appendChild(currenttext);
					mycurrent_img = document.createElement("img");			
					mycurrent_img.src="./img/small/sortArrow.jpg";
					mycurrent_img.style.width = "8px";
					mycurrent_img.style.height = "13px";
					mycurrent_img.style.border = "0";	
					mycurrent_img.setAttribute("id","YearSortClicked");
					mycurrent_img.style.cursor = "pointer";
					mycurrent_cell.appendChild(mycurrent_img);
					break;
				case 2:
					//Genre Header
					currenttext = document.createTextNode("Genre");
					mycurrent_cell.appendChild(currenttext);
					break;
				case 3:
					//Rating Header
					currenttext = document.createTextNode("Bewertung");								
					mycurrent_cell.appendChild(currenttext);
					mycurrent_img = document.createElement("img");			
					mycurrent_img.src="./img/small/sortArrow.jpg";
					mycurrent_img.style.width = "10px";
					mycurrent_img.style.height = "15px";
					mycurrent_img.style.border = "0";	
					mycurrent_img.setAttribute("id","RatingSortClicked");
					mycurrent_img.style.cursor = "pointer";
					mycurrent_cell.appendChild(mycurrent_img);
					break;			
			}
			mycurrent_row.appendChild(mycurrent_cell);
		}
		
	//complete Header			
	mytablehead.appendChild(mycurrent_row);		
	myTable.appendChild(mytablehead);
	
    var mytablebody = document.createElement("tbody");
		
    for(var j = 0; j < row; j++) {
		//create Row
        mycurrent_row = document.createElement("tr");
		
		for(var i=0;i<5;i++){
			mycurrent_cell = document.createElement("td");
			switch (i){
				case 0:		
					//Title Cell
					currenttext = document.createTextNode(id[j]["title"]);
					mycurrent_cell.style.backgroundColor = backg;
					mycurrent_cell.appendChild(currenttext);
					break;
				case 1:	
					//Year Cell
					currenttext = document.createTextNode(id[j]["year"]);
					mycurrent_cell.style.backgroundColor =backg2;
					mycurrent_cell.appendChild(currenttext);
					break;
				case 2:
					//Genre Cell
					currenttext = document.createTextNode(id[j]["genre"]);
					mycurrent_cell.style.backgroundColor =backg;
					mycurrent_cell.appendChild(currenttext);
					break;
				case 3:
					//Rating Cell
					currenttext = document.createTextNode("");
					mycurrent_cell.appendChild(currenttext);
					mycurrent_img = document.createElement("img");			
					mycurrent_img.src="./img/small/stars-"+id[j]["rating"]+".jpg";
					mycurrent_img.style.width = "80px";
					mycurrent_img.style.height = "20px";
					mycurrent_img.style.border = "0";	
					mycurrent_cell.style.width = "90px";
					mycurrent_cell.appendChild(mycurrent_img);
					break;		
				case 4:		
					//Details Cell
					mycurrent_img =document.createElement("img");	
					mycurrent_img.src="./img/small/details.jpg";
					mycurrent_img.style.width = "20px";
					mycurrent_img.style.height = "20px";
					mycurrent_img.style.border = "0";
					mycurrent_img.setAttribute("id","detailsclicked");
					mycurrent_img.setAttribute("class",j);
					mycurrent_img.style.cursor = "pointer";
					mycurrent_img.caption = "Details";
					mycurrent_cell.style.width = "20px";
					mycurrent_cell.appendChild(mycurrent_img);
					break;
			}			
			mycurrent_row.appendChild(mycurrent_cell);
		}        
		//complete Row
		mytablebody.appendChild(mycurrent_row);
    }
	//complete Table
    myTable.appendChild(mytablebody);
    myTable.setAttribute("ID", id);	
	myTable.style.width="95%";
    return myTable;
}
