var maintemplate=_.template('<br><table width="100%" height="100%" border="1" id="tabelle"></table>'+
							'<div id="main_top"></div>'+
							'<div id="main_middle"></div>'+	
							'<div id="main_low"></div>');
var movies;
var backg="#C4C4C4";
var backg2 = "#E3E3E3";

$(document).ready(function(){
$(document).on('click','#nav_home',function(event){			
	preselecttable();	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
});


//navigation Genre Input
$(document).ready(function(){
$(document).on('click','#nav_action',function(event){	
	movies = filter("Action");	
	preselecttablefilter(movies);	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
});
$(document).ready(function(){
$(document).on('click','#nav_comedy',function(event){	
	movies = filter("Comedy");	
	preselecttablefilter(movies);	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
});
$(document).ready(function(){
$(document).on('click','#nav_horror',function(event){	
	movies = filter("Horror");	
	preselecttablefilter(movies);	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
});
$(document).ready(function(){
$(document).on('click','#nav_scifi',function(event){	
	movies = filter("SciFi");	
	preselecttablefilter(movies);	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
});
$(document).ready(function(){
$(document).on('click','#nav_thriller',function(event){	
	movies = filter("Thriller");	
	preselecttablefilter(movies);	
	event.preventDefault();
	event.stopImmediatePropagation();	
});
});

//Genre Input Filter Function
function filter(filter){	
	movies = $.getAllMovies();	
	var arr = new Array();
	var j=0;
	for(var i =0;i<movies.length;i++){
		if(movies[i]["genre"]===filter){
			arr[j] = new Object();
			arr[j]["title"] = movies[i]["title"];
			arr[j]["year"] = movies[i]["year"];
			arr[j]["genre"] = movies[i]["genre"];
			arr[j]["rating"] = movies[i]["rating"];
			arr[j]["Seen"] = movies[i]["seen"];	
			j++;
		}		
	}
	return arr;
}



function preselecttable(){
	$('#main').html(maintemplate());	
	node = document.getElementById("tabelle");
	
	//load all Movies
	movies = $.getAllMovies();	
	
	//check: Logedin User
	if($.getLogStatus()){
    node.parentNode.insertBefore(createTablelogedIn(movies.length, movies), node);	
	}else{
    node.parentNode.insertBefore(createTableGuest(movies.length, movies), node);
	}
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
					currenttext = document.createTextNode("Title");
					break;
				case 1:				  					
					currenttext = document.createTextNode("Jahr");
					break;
				case 2:
					currenttext = document.createTextNode("Genre");
					break;
				case 3:
					currenttext = document.createTextNode("Gesehen");
					break;
				case 4:
					currenttext = document.createTextNode("Rating");
					break;			
			}			
			mycurrent_cell.appendChild(currenttext);
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
					mycurrent_cell.style.backgroundColor = backg;
					break;
				case 1:				  					
					currenttext = document.createTextNode(id[j]["year"]);
					mycurrent_cell.style.backgroundColor =backg2;
					break;
				case 2:
					currenttext = document.createTextNode(id[j]["genre"]);
					mycurrent_cell.style.backgroundColor =backg;
					break;
				case 3:
					if(id[j]["seen"]==='0'){
						currenttext = document.createTextNode("Nein");
					}else{		
						currenttext = document.createTextNode("Ja");
					}
					mycurrent_cell.style.backgroundColor =backg2;
					break;
				case 4:
					currenttext = document.createTextNode("");
					mycurrent_cell = document.createElement("img");			
					mycurrent_cell.src="./img/small/stars-"+id[j]["rating"]+".jpg";
					mycurrent_cell.style.width = "80px";
					mycurrent_cell.style.height = "20px";
					mycurrent_cell.style.border = "0";
					break;	
				case 5:
					mycurrent_cell =document.createElement("img");	
					mycurrent_cell.src="./img/small/edit.png";
					mycurrent_cell.style.width = "20px";
					mycurrent_cell.style.height = "20px";
					mycurrent_cell.style.border = "0";
					mycurrent_cell.setAttribute("id","Editclicked");
					mycurrent_cell.setAttribute("class",j);
					mycurrent_cell.style.cursor = "pointer";
					mycurrent_cell.style.backgroundColor =backg2;
					break;
				case 6: 
					mycurrent_cell = document.createElement("img");	
					mycurrent_cell.src="./img/small/Delete.png";
					mycurrent_cell.style.width = "20px";
					mycurrent_cell.style.height = "20px";
					mycurrent_cell.style.border = "0";
					mycurrent_cell.setAttribute("id","Deleteclicked");
					mycurrent_cell.setAttribute("class",j);
					mycurrent_cell.style.cursor = "pointer";
					mycurrent_cell.style.backgroundColor =backg2;
					break;
					
			}			
			mycurrent_cell.appendChild(currenttext);
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
					currenttext = document.createTextNode("Title");
					break;
				case 1:				  					
					currenttext = document.createTextNode("Jahr");
					break;
				case 2:
					currenttext = document.createTextNode("Genre");
					break;
				case 3:
					currenttext = document.createTextNode("Rating");
					break;			
			}			
			mycurrent_cell.appendChild(currenttext);
			mycurrent_row.appendChild(mycurrent_cell);
		}
		
	//complete Header			
	mytablehead.appendChild(mycurrent_row);		
	myTable.appendChild(mytablehead);
	
    var mytablebody = document.createElement("tbody");
		
    for(var j = 0; j < row; j++) {
		//create Row
        mycurrent_row = document.createElement("tr");
		
		for(var i=0;i<4;i++){
			mycurrent_cell = document.createElement("td");
			switch (i){
				case 0:					  					
					currenttext = document.createTextNode(id[j]["title"]);
					mycurrent_cell.style.backgroundColor = backg;
					break;
				case 1:				  					
					currenttext = document.createTextNode(id[j]["year"]);
					mycurrent_cell.style.backgroundColor =backg2;
					break;
				case 2:
					currenttext = document.createTextNode(id[j]["genre"]);
					mycurrent_cell.style.backgroundColor =backg;
					break;
				case 3:
					currenttext = document.createTextNode("");
					mycurrent_cell = document.createElement("img");			
					mycurrent_cell.src="./img/small/stars-"+id[j]["rating"]+".jpg";
					mycurrent_cell.style.width = "80px";
					mycurrent_cell.style.height = "20px";
					mycurrent_cell.style.border = "0";					
					break;			
			}			
			mycurrent_cell.appendChild(currenttext);
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

$(document).on('click','#Editclicked',function(event){

	alert($(this).context.className);	
	var classn = $(this).context.className;
	alert(movies[classn]["title"]);

})

$(document).on('click','#Deleteclicked',function(event){

	alert($(this).context.className);		
	var classn = $(this).context.className;
	alert(movies[classn]["title"]);
	
})

