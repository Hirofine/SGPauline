var playerposition = [0,0];
var step = 10;
var playsprite = "../sprites/player/player.jpeg";
var leversprite = "../sprites/items/leverup.png";
var leverposx = 0;
var leverposy = 0;
var leverdeltax = 27;
var leverdeltay = 35;


$(document).ready(function(){
 // dummy file to be implemented (ajax functions)
  var xsize = 5;
  var ysize = 5;
  var mapid = localStorage.getItem('mapid');
  var playerid = 0;
  var winwidth = window.innerWidth;
  var margin = 10; //margin in percentage
 


  //GREETS PLAYER WITH PSEUDO
  $("#greetings").html("Bonjour " + localStorage.getItem('pseudo'));


  //GET MAP FROM API
  $.ajax({url: "http://localhost:8000/map/" + mapid, async: false, success: function(result){
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
    var room_size = Math.round((window.innerWidth - (2*(margin/100)) * window.innerWidth) * (1/xsize));
    
  }else{
    room_size=64;
  }
  //GET ROOMS FROM API AND DISPLAY THEM
  console.log("room size : " + room_size);
  $.ajax({url: "http://localhost:8000/room/mapid/"+ mapid, success: function(result){
    console.log(result);
    var li = "<div>";
    for (var i=0;i<xsize;i++){  
      li += ("<div id=\"maprow"+ i + "\">"); 
      for (var j=0;j<ysize;j++){ 
        li += ("<img class=\"room\" src=\"../sprites/rooms/" + result[i*ysize + j].posmod + ".png\" width=\""+ room_size + "\" height=\""+ room_size + "\" top=\"0\" left=\"0\"></img>"); 
             
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
    $.ajax({url: "http://localhost:8000/leverroom/mapid/"+ mapid, success: function(result2){
      console.log(result2);
      result2.forEach(element => {
        if (!element.state){
          var leversprite = "../sprites/items/leverup.png"; //not solved
          
        }else{
          var leversprite = "../sprites/items/leverdown.png"; //solved
        }
        leverposx = -((xsize - element.posx) * room_size) + leverdeltax;
        leverposy = - leverdeltay;
        $("#maprow" + element.posy).append("<img class=\"lever\" src=\"" + leversprite +"\" width=\"16\" height=\"32\" id=\"lever\" style=\"top: " + leverposy + "px ;  left: " + leverposx + "px ;\" onclick=\"onleverclick("+ element.state + "," + element.id +")\" ></img>");
      });
    },
    error : function(e) {
      $("#mainmap").html("<strong>Error</strong>");
      console.log("ERROR: ", e);
    }});
    // GET PLAYER POSITION
    ppid = localStorage.getItem('playerposid');
    $.ajax({url: "http://localhost:8000/playerpos/" + ppid , async: false, success: function(result){
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
  
  $("#player").html("<img class=\"player\" src=\"" + playsprite +"\" width=\"75\" height=\"75\" id=\"player\" style=\"top: " + playerposition[0] + "px ;  left: " + playerposition[1] + "px ;\" ></img>")

  

 $("button").click(function(){
  $.ajax({url: "http://127.0.0.1:8000/", success: function(result){
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
  //DETERMINER SI PLAYER ASSEZ PROCHE (plus tard)

  //DETERMINER SI LEVIER CLICKABLE (aka exo non resolu)
  if (!state){
    //STOCKER POS PLAYER
    var data = '{"id":' + ppid + ', "playerid":' + localStorage.getItem('playerid') + ', "posx":' + playerposition[0] + ' , "posy":' + playerposition[1] + '}'; 
    console.log()
    $.ajax({type:"PUT",
            url: "http://127.0.0.1:8000/playerpos/" + ppid, 
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
  //DETERMINER QUEL EXO LANCER
  var exo1 = localStorage.getItem('exo1state');
  var exo2 = localStorage.getItem('exo2state');
  var exo3 = localStorage.getItem('exo3state');
  var exo4 = localStorage.getItem('exo4state');
  var exo5 = localStorage.getItem('exo5state');

  var loc = "";
  if(!exo1){
    loc = './exos/exo1.html';
  }else{
    if (!exo2){
      loc = './exos/exo2.html';
    }else{
      if (!exo3){
        loc = './exos/exo3.html';
      }else{
        if(!exo4){
          loc = './exos/exo4.html';
        }else{
          if(!exo5){
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
  
};


document.onkeydown = function(e) {
  
  switch(e.which) {
      case 37: // left
        playerposition[0] -= step;
      break;

      case 38: // up
        playerposition[1] -= step;
      break;

      case 39: // right
        playerposition[0] += step;
      break;

      case 40: // down
        playerposition[1] += step;
      break;

      
      default: return; // exit this handler for other keys
  }
  console.log("x: " + playerposition[0] + ", y: " + playerposition[1]);
  $("#player").html("<img class=\"player\" src=\"" + playsprite +"\" width=\"75\" height=\"75\" id=\"player\" style=\"top: " + playerposition[1] + "px ;  left: " + playerposition[0] + "px ;\" ></img>")

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