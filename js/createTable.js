//------------------------GLOBAL VARIABLES----------------------------

// ----------------------------------TEMPLATES---------------------------

// ----------------------------------MAINTEMPLATE---------------------------
var maintemplate=_.template('<br><table class="mainTemplateTable" id="tabelle"></table>'+
							'<div id="main_top"></div>'+
							'<div id="main_middle"></div>'+	
							'<div id="main_low"></div>');

// ----------------------------------IMDB-TEMPLATE---------------------------
var modalTemplate = _.template('<br><h1 class="modal-title" id="modaltitle">imdb Informationen</h1>'+
								'</div>'+
								'<table class="modal-body"><tr>'+  
								'<td><div id="modal-pic">'+  
								'</div></td>'+
								'<td><div id="modal-text">'+
								'<table border="1" id="tabelle"></table>'+
								'</div></td></tr>'+
								'</table>'+
								'<div class="modal-footer">'+
								'<button type="button" class="btn btn-primary" id="btndismiss" aling="right" data-dismiss="modal" align = "right">Zurück</button>'+
								'</div>');

//--------------------------------------------------INTERN VARIABELN--------------------------------

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
	preselecttablefilter(movies);	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
//show Comedy-Movies
$(document).on('click','#nav_comedy',function(event){	
	movies = loadedmovies;
	movies = $.filterMovies(movies,"Comedy");	
	preselecttablefilter(movies);	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
//show Horror-Movies
$(document).on('click','#nav_horror',function(event){	
	movies = loadedmovies;
	movies = $.filterMovies(movies,"Horror");	
	preselecttablefilter(movies);	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
//show SciFi-Movies
$(document).on('click','#nav_scifi',function(event){	
	movies = loadedmovies;
	movies = $.filterMovies(movies,"Sci-Fi");
	preselecttablefilter(movies);	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
//show Thriller 
$(document).on('click','#nav_thriller',function(event){	
	movies = loadedmovies;
	movies = $.filterMovies(movies,"Thriller");	
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
	movies = $.getAllMovies();
	selectedtablerebuild();
	}
	
});
//Rating clicked
$(document).on('click','#Ratingclicked',function(event){

	var classn = $(this).context.className;
	var rated= false;
	var mynewrating;
	while(rated === false){
	mynewrating = prompt("Deine Bewertung:",movies[classn]["rating"]);
		if(mynewrating==="0" || mynewrating==="1" || mynewrating==="2" || mynewrating==="3" || mynewrating==="4" || mynewrating==="5"){
			rated = true;
			//change Rating in data.js
			$.changeRating(movies[classn]["originalDBID"],movies[classn]["seen"], mynewrating);
			movies[classn]["myrating"]=mynewrating;			
		}else if(mynewrating === null){
			rated = true;
		}else{
			alert("Gebe eine Bewertung von 1 bis 5 an");
		}
		//rebuild the same table as bevore
		selectedtablerebuild();
	}	
	
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
});

//-------------------------------------------------

//detailview
function detailview(title){
	$('#main').html(modalTemplate());
	
	//Tabelle
	node = document.getElementById("tabelle");
	
	node.parentNode.insertBefore(getPoster(title), node);	
	
}

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
	loadedmovies = $.getAllMovies(); 
}
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
	loadedmovies = $.getAllMovies(); 
}

function createTablelogedIn(row, id) {		
		
    var myTable = document.createElement("table");
	myTable.border="0";
		
	var mytablehead = document.createElement("thead");
		//initialize Head Row
        mycurrent_row = document.createElement("tr");
		mycurrent_row.style.textAlign = "left";
		//Title Head
		for(var i=0;i<5;i++){
			mycurrent_cell = document.createElement("th");
			switch (i){
				case 0:					  					
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
					break;
				case 1:				  					
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
					currenttext = document.createTextNode("Genre");
					mycurrent_cell.appendChild(currenttext);
					break;
				case 3:
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
					currenttext = document.createTextNode(id[j]["title"]);
					mycurrent_cell.appendChild(currenttext);
					mycurrent_cell.style.backgroundColor = backg;
					break;
				case 1:				  					
					currenttext = document.createTextNode(id[j]["year"]);
					mycurrent_cell.appendChild(currenttext);
					mycurrent_cell.style.backgroundColor =backg2;
					break;
				case 2:
					currenttext = document.createTextNode(id[j]["genre"]);
					mycurrent_cell.appendChild(currenttext);
					mycurrent_cell.style.backgroundColor =backg;
					break;
				case 3:
					if(id[j]["seen"]==='0'){
						currenttext = document.createTextNode("Nein");
					}else{		
						currenttext = document.createTextNode("Ja");
					}
					mycurrent_cell.appendChild(currenttext);
					mycurrent_cell.style.backgroundColor =backg2;
					break;
				case 4:
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
					if(id[j]["owner"]==="1"){
					mycurrent_img = document.createElement("img");	
					mycurrent_img.src="./img/small/edit.png";
					mycurrent_img.style.width = "20px";
					mycurrent_img.style.height = "20px";
					mycurrent_img.style.border = "0";
					mycurrent_img.setAttribute("id","Editclicked");
					mycurrent_img.setAttribute("class",j);
					mycurrent_img.style.cursor = "pointer";
					mycurrent_cell.appendChild(mycurrent_img);
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
					currenttext = document.createTextNode(id[j]["owner"]);
					mycurrent_cell.appendChild(currenttext);
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
function createTableGuest(row, id) {	
		
    var myTable = document.createElement("table");
	myTable.border="0";
	var mytablehead = document.createElement("thead");
		//initialize Head Row
        mycurrent_row = document.createElement("tr");
		mycurrent_row.style.textAlign = "left";
		//Title Head
		for(var i=0;i<4;i++){
			mycurrent_cell = document.createElement("th");
			switch (i){
				case 0:					  					
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
					break;
				case 1:				  					
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
					currenttext = document.createTextNode("Genre");
					mycurrent_cell.appendChild(currenttext);
					break;
				case 3:
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
					currenttext = document.createTextNode(id[j]["title"]);
					mycurrent_cell.style.backgroundColor = backg;
					mycurrent_cell.appendChild(currenttext);
					break;
				case 1:				  					
					currenttext = document.createTextNode(id[j]["year"]);
					mycurrent_cell.style.backgroundColor =backg2;
					mycurrent_cell.appendChild(currenttext);
					break;
				case 2:
					currenttext = document.createTextNode(id[j]["genre"]);
					mycurrent_cell.style.backgroundColor =backg;
					mycurrent_cell.appendChild(currenttext);
					break;
				case 3:
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
