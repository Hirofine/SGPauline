//var api_url = "http://83.194.254.189:8000";
var api_url = "http://localhost:8000";

var playerposition = [0,0];
var playhitboxcorr = 7; 
var step = 0;
var playsprite = "../sprites/player/player.png";
var playsprite_size = [0,0];
var leversprite = "../sprites/items/leverup.png";
var leverposx = 0;
var leverposy = 0;
var leverdeltax = 27;
var leverdeltay = 35;
var room_size = 0;
var xsize = 5;
var ysize = 5;
var room_founded = [[false,false,false,false,false],
                    [false,false,false,false,false],
                    [false,false,false,false,false],
                    [false,false,false,false,false],
                    [false,false,false,false,false]];


$(document).ready(function(){
 // dummy file to be implemented (ajax functions)

  var mapid = localStorage.getItem('mapid');
  var playerid = 0;
  var winwidth = window.innerWidth;
  var margin = 10; //margin in percentage
 


  //GREETS PLAYER WITH PSEUDO
  $("#greetings").html("Bonjour " + localStorage.getItem('pseudo'));


  //GET MAP FROM API
  $.ajax({url: api_url + "/map/" + mapid, async: false, success: function(result){
    xsize = result.xsize;
    ysize = result.ysize; 
    console.log(result); 
  },
  error : function(e) {
    $("#div1").html("<strong>Error</strong>");
    console.log("ERROR: ", e);
  }}); 

  //PROCESS ROOM SIZE ON SCREEN
  if( xsize != 0){
    room_size = Math.round((window.innerWidth - (2*(margin/100)) * window.innerWidth) * (1/xsize));
    playsprite_size = [Math.round(room_size/8), Math.round(room_size/8)]
    step = Math.round(room_size / 32);
    
  }else{
    room_size=64;
  }
  //GET ROOMS FROM API AND DISPLAY THEM
  console.log("room size : " + room_size);
  var maproom = "";
  $.ajax({url: api_url + "/room/mapid/"+ mapid, success: function(result){
    console.log(result);
    var li = "<div>";
    for (var i=0;i<xsize;i++){  
      li += ("<div id=\"maprow"+ i + "\">"); 
      for (var j=0;j<ysize;j++){ 
        maproom = "maproom" + (i*ysize + j);
        opacity = ((result[i*ysize+j].isfound)? 1.0 : 0.05);
        li += ("<img id=\"" + maproom + "\" class=\"room\" src=\"../sprites/rooms/" + result[i*ysize + j].posmod + ".png\" width=\""+ room_size + "\" height=\""+ room_size + "\" top=\"0\" left=\"0\" style=\"opacity:" + opacity + "\"></img>"); 
        room_founded[i][j] = result[i*ysize+j].isfound;     
      }
      li += ("</div>"); 
    }

    li+=("</div>");
    $("#mainmap").append(li);
  },
  error : function(e) {
    $("#mainmap").html("<strong>Error</strong>");
    console.log("ERROR: ", e);
  }}); 

 
    // DISPLAY LEVER
    $.ajax({url: api_url + "/leverroom/mapid/"+ mapid, success: function(result2){
      console.log(result2);
      result2.forEach(element => {
        if (!element.state){
          var leversprite = "../sprites/items/leverup.png"; //not solved
          
        }else{
          var leversprite = "../sprites/items/leverdown.png"; //solved
        }
        leverposx = -((xsize - element.posx) * room_size) + leverdeltax;
        leverposy = - leverdeltay;
        var opa = 1 * element.state;
        $("#maprow" + element.posy).append("<img id=\"lever"+ element.id + "\" class=\"lever\" src=\"" + leversprite +"\" width=\"16\" height=\"32\" id=\"lever\" style=\"top: " + leverposy + "px ;  left: " + leverposx + "px; opacity:" + opa +";\" onclick=\"onleverclick("+ element.state + "," + element.id +")\" ></img>");
      });
    },
    error : function(e) {
      $("#mainmap").html("<strong>Error</strong>");
      console.log("ERROR: ", e);
    }});
    // GET PLAYER POSITION
    ppid = localStorage.getItem('playerposid');
    $.ajax({url: api_url + "/playerpos/" + ppid , async: false, success: function(result){
      playerposition[0] = result[0].posx;
      playerposition[1] = result[0].posy; 
      console.log("ppid : " + ppid + " playerpos: " + playerposition[0]);
      console.log(result); 
    },
    error : function(e) {
      $("#div1").html("<strong>Error</strong>");
      console.log("ERROR: ", e);
    }});
    
  // ADD PLAYER SPRITE
  console.log("adding player sprite");
  
  $("#player").html("<img class=\"player\" src=\"" + playsprite +"\" width=\"" + playsprite_size[0] + "\" height=\"" + playsprite_size[1] + "\" id=\"player\" style=\"top: " + playerposition[0] + "px ;  left: " + playerposition[1] + "px ;\" ></img>")

  

 $("button").click(function(){
  $.ajax({url: api_url + "/", success: function(result){
    $("#map").html(result);
  },
  error : function(e) {
    $("#div1").html("<strong>Error</strong>");
    console.log("ERROR: ", e);
  }});
});
});

function onleverclick(state, id){
  console.log("le levier a ete clique");
  localStorage.setItem('lastLeverClicked', id);
  var mapid= localStorage.getItem("mapid");
  //DETERMINER SI PLAYER ASSEZ PROCHE (plus tard)

  var distance_max = Math.round(room_size/10);
  var lever = document.getElementById("lever" + id);
  var poslevx = lever.getBoundingClientRect().left;
  var poslevy = lever.getBoundingClientRect().top;
  var first_room = document.getElementById("maproom0");
  var top_offset = first_room.getBoundingClientRect().top;
  var left_offset = first_room.getBoundingClientRect().left;
  console.log("x : " + poslevx + ", y : " + poslevy);


  if(Math.abs(playerposition[0] - (poslevx - left_offset)) <= distance_max && Math.abs(playerposition[1] - (poslevy - top_offset)) < distance_max){
    console.log("close enough");
  
  //DETERMINER SI LEVIER CLICKABLE (aka exo non resolu)
  if (!state){
    //STOCKER POS PLAYER
    var data = '{"id":' + ppid + ', "playerid":' + localStorage.getItem('playerid') + ', "posx":' + playerposition[0] + ' , "posy":' + playerposition[1] + '}'; 
    console.log("data before posting ppos" + data);
    console.log()
    $.ajax({type:"PUT",
            url: api_url+ "/playerpos/" + ppid, 
            async: false, 
            data: data,
            dataType: "json",
            contentType: "application/json",
            success: function(result){
        console.log(result);
        pid = result;
    },
    error : function(e) {
        pid = -1;
        console.log("ERROR: ", e);
    }}); 

    //STOCKER ETAT DES SALLES
    for (var i=0;i<xsize;i++){
      for(var j=0;j<ysize;j++){
        room_id = i*ysize + j;
        data = '{}'; 
        console.log("data before posting ppos" + data);
        console.log()
        $.ajax({type:"PUT",
                url: api_url + "/room/" + room_id + "?isfound=" + room_founded[i][j] + "&mapid=" + mapid, 
                async: false, 
                data: data,
                dataType: "json",
                contentType: "application/json",
                success: function(result){
            console.log(result);
            pid = result;
        },
        error : function(e) {
            pid = -1;
            console.log("ERROR: ", e);
        }}); 
      }
    }
    

  //DETERMINER QUEL EXO LANCER
  var exo1 = localStorage.getItem('exo1state');
  var exo2 = localStorage.getItem('exo2state');
  var exo3 = localStorage.getItem('exo3state');
  var exo4 = localStorage.getItem('exo4state');
  var exo5 = localStorage.getItem('exo5state');

  var loc = "";
  if(exo1 == 'false'){
    loc = './exos/exo1.html';
  }else{
    if (exo2 == 'false'){
      loc = './exos/exo2.html';
    }else{
      if (exo3 == 'false'){
        loc = './exos/exo3.html';
      }else{
        if(exo4 == 'false'){
          loc = './exos/exo4.html';
        }else{
          if(exo5 == 'false'){
            loc = './exos/exo5.html';
          }else{
            //all lever are already activated
          }
        }
      }
    }
  }


  //LANCER L'EXO
  location.href = loc;
  }
}
};


document.onkeydown = function(e) {
var pposroomx = playerposition[0]% room_size;
var pposroomy = playerposition[1]% room_size;
var proomy = Math.floor(playerposition[0] / room_size);
var proomx = Math.floor(playerposition[1] / room_size);
var door_ratio = 0.1875;
var door_size = Math.round(room_size * door_ratio);
var wall_ratio = 0.04296875;
var wall_size = Math.round(room_size * wall_ratio);
room_founded[proomx][proomy] = true;
var actualroomid = "maproom" + (proomx*ysize + proomy);
document.getElementById(actualroomid).style.opacity = 1;
var leverid = "lever" + (proomx*ysize + proomy);
var lever = document.getElementById(leverid);
console.log("refresh lever id: " + leverid);
if (lever != null){
  console.log("il existe un levier");
  lever.style.opacity = 1;
}

switch(e.which) {
  case 37: // left
    if (playerposition[0] - step < wall_size){ //map border
      playerposition[0] = wall_size;
    }else{ 
      if((pposroomx - step < wall_size)){ //left wall of room
        console.log("left_wall");
        if((pposroomy < (room_size - door_size)/2) || (pposroomy > (room_size - door_size) / 2 + door_size - playsprite_size[1])  ){ //not the door
          console.log("y a un mur");
          playerposition[0] = playerposition[0] - (pposroomx - wall_size);
        }else{           
          //the door
          console.log("y a une porte");
          playerposition[0] -= step;
        }
      }else{
        if(pposroomy < wall_size || pposroomy > room_size - wall_size - playsprite_size[1]){ // inside the wall door (top/bottom door)
            if(pposroomx - step < Math.round((room_size - door_size)/2)){
              playerposition[0] = playerposition[0] - (pposroomx - Math.round((room_size - door_size)/2));
            }else{
              playerposition[0] -= step;
            }
        }else{
          console.log("all clear")
          playerposition[0] -= step; //move classic
        }
      }
    }
    break;

    case 38: // up
    if (playerposition[1] - step < wall_size){ //map border
      playerposition[1] = wall_size;
    }else{ 
      if((pposroomy - step < wall_size)){ //top wall of room
        console.log("top_wall");
        if((pposroomx < Math.round((room_size - door_size)/2)) || (pposroomx > Math.round((room_size - door_size) / 2) + door_size - playsprite_size[0]) ){ //not the door
          console.log("y a un mur");
          playerposition[1] = playerposition[1] - (pposroomy - wall_size);
        }else{           
          //the door
          console.log("y a une porte");
          playerposition[1] -= step;
        }
      }else{
        if(pposroomx < wall_size || pposroomx > room_size - wall_size - playsprite_size[0]){ // inside the wall door (left/right door)
            if(pposroomy - step < Math.round((room_size - door_size)/2)){
              playerposition[1] = playerposition[1] - Math.round(pposroomy - (room_size - door_size)/2);
            }else{
              playerposition[1] -= step;
            }
        }else{
          console.log("all clear")
          playerposition[1] -= step; //move classic
        }
      }
    }
    break;

    case 39: // right
    if (playerposition[0] + step > (5 * room_size - playsprite_size[0] - wall_size)){ //map border
      playerposition[0] = 5 * room_size - playsprite_size[0] - wall_size;
    }else{ 
      if((pposroomx + step > room_size - wall_size - playsprite_size[0])){ //right wall of room
        console.log("right_wall");
        if((pposroomy < Math.round((room_size - door_size)/2)) || (pposroomy + playsprite_size[1] > Math.round((room_size - door_size) / 2) + door_size)){ //not the door
          console.log("y a un mur (right)");
          playerposition[0] = playerposition[0] + (room_size - pposroomx - wall_size - playsprite_size[0]);
        }else{           
          //the door
          console.log("y a une porte");
          playerposition[0] += step;
        }
      }else{
        if(pposroomy < wall_size || pposroomy > room_size - wall_size - playsprite_size[1]){ // inside the wall door (top/bottom door)
            if(pposroomx + step > Math.round((room_size - door_size)/2) + door_size - playsprite_size[1]){
              playerposition[0] = playerposition[0] + ((Math.round((room_size - door_size)/2) + door_size - playsprite_size[0])) - pposroomx;
            }else{
              playerposition[0] += step;
            }
        }else{
          console.log("all clear")
          playerposition[0] += step; //move classic
        }
      }
    }

    break;

    case 40: // down
    if (playerposition[1] + step > (5 * room_size - playsprite_size[1] - wall_size)){ //map border
      playerposition[1] = 5 * room_size - playsprite_size[1] - wall_size;
    }else{ 
      if((pposroomy + step > room_size - wall_size - playsprite_size[1])){ //right wall of room
        console.log("bot_wall");
        if((pposroomx < Math.round((room_size - door_size)/2)) || (pposroomx + playsprite_size[0] > Math.round((room_size - door_size) / 2) + door_size)){ //not the door
          console.log("y a un mur (right)");
          playerposition[1] = playerposition[1] + (room_size - pposroomy - wall_size - playsprite_size[1]);
        }else{           
          //the door
          console.log("y a une porte");
          playerposition[1] += step;
        }
      }else{
        if(pposroomx < wall_size || pposroomx > room_size - wall_size - playsprite_size[0]){ // inside the wall door (top/bottom door)
            if(pposroomy + step > Math.round((room_size - door_size)/2) + door_size - playsprite_size[0]){
              playerposition[1] = playerposition[1] + ((Math.round((room_size - door_size)/2) + door_size - playsprite_size[1])) - pposroomy;
            }else{
              playerposition[1] += step;
            }
        }else{
          console.log("all clear")
          playerposition[1] += step; //move classic
        }
      }
    }
    break;

    
    default: return; // exit this handler for other keys
}

console.log("x: " + playerposition[0] + ", y: " + playerposition[1]);
$("#player").html("<img class=\"player\" src=\"" + playsprite +"\" width=\"" + playsprite_size[0] + "\" height=\"" + playsprite_size[1] + "\" id=\"player\" style=\"top: " + realplayerpos(playerposition)[1] + "px ;  left: " + realplayerpos(playerposition)[0] + "px ;\" ></img>")

e.preventDefault(); // prevent the default action (scroll / move caret)
};


var xTriggered = 0;
$(document).keypress(function( event ) {
  if ( event.which == 13 ) {
     event.preventDefault();
  }
  xTriggered++;
  var msg = "Handler for .keypress() called " + xTriggered + " time(s).";
  console.log( msg, "html" );
  console.log( event );
});

function realplayerpos(position){
  var playerpos = [0,0]
  //fix pos 0,0
  playerpos[0] = 0; //x nothing to change
  playerpos[1] = -(5 * room_size); //y must up by mapsize *  nroomy



  //adapt to player pos

  playerpos[0] += position[0];
  playerpos[1] += position[1];

  //return position
  return playerpos
};


function refresh_map(){
  console.log("refresh_map");
}