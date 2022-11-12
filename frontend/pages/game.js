var playerposition = [0,0];
var step = 10;
var playsprite = "../sprites/player/player.jpeg";
var leversprite = "../sprites/items/leverup.png";
var leverposx = 0;
var leverposy = 0;
var leverdeltax = 27;
var leverdeltay = 12;

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
      li += ("<div>"); 
      for (var j=0;j<ysize;j++){ 
        li += ("<img class=\"room\" src=\"../sprites/rooms/" + result[i*ysize + j].posmod + ".png\" width=\""+ room_size + "\" height=\""+ room_size + "\"></img>"); 
        if (result[i*ysize+j].leverroom){
          // DETECT IF LEVERROOM ALREADY SOLVED
          $.ajax({url: "http://localhost:8000/leverroom/mapid/"+ mapid, success: function(result2){
            console.log(result2);
            result2.array.forEach(element => {
              if (!element.state){
                var leversprite = "../sprites/items/leverup.png"; //not solved
              }else{
                var leversprite = "../sprites/items/leverdown.png"; //solved
              }
            });
          },
          error : function(e) {
            $("#mainmap").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
          }});
          leverposx = result.posx * room_size + leverdeltax;
          leverposy = result.posy * room_size + leverdelaty;

          li+=("<img class=\"player\" src=\"" + leversprite +"\" width=\"16\" height=\"32\" id=\"lever\" style=\"top: " + leverposx + "px ;  left: " + leverposy + "px ;\" ></img>");
        }     
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
function onleverclick(){
  console.log("le levier a ete clique");

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