//var api_url = "http://83.194.254.189:8000";
//var api_url = "http://localhost:8000";
var api_url = "http://memoire.hirofine.fr:8000";
$(document).ready(function(){

    
});
$("#pseudoform").submit(function(event){
    event.preventDefault();
    console.log("only submit");
    const inputs = document.getElementById("pseudoform").elements;
    const pseudo = inputs["pseudo"].value;
    var pid = 0;
    var mid = 0;
    var ppid = 0;

    //get the mapid of the filled player if existing (-1) si pas de map crée pour ce pseudo

    // GET A PLAYER ID
    $.ajax({url: api_url  + "/player/newplayerid", async: false, success: function(result){
        console.log(result);
        pid = result;
    },
    error : function(e) {
        pid = -1;
        console.log("ERROR: ", e);
    }});

    //GET A PLAYERPOS ID
    $.ajax({url: api_url + "/playerpos/newplayerposid", async: false, success: function(result){
        console.log(result);
        ppid = result;
    },
    error : function(e) {
        ppid = -1;
        console.log("ERROR: ", e);
    }});

    // GET A MAP ID
    $.ajax({url: api_url + "/map/newmapid", async: false, success: function(result){
        console.log("playerpos " + result);
        mid = result;
    },
    error : function(e) {
        mid = -1;
        console.log("ERROR: ", e);
    }});
    console.log("before posting new player, pid: " + pid + ", mid: " + mid + ", pseudo : " + clear_string(pseudo));
    

    // CREATE PLAYER
    var data = '{"id":' + pid + ', "mapid":' + mid + ', "pseudo": "' + clear_string(pseudo) + '" }';         
    $.ajax({type:"POST",
            url: api_url + "/player/", 
            async: false, 
            data: data,
            dataType: "json",
            contentType: "application/json",
            success: function(result){
        console.log(result);
        //pid = result;
    },
    error : function(e) {
        pid = -1;
        console.log("ERROR: ", e);
    }});

    var data = '{"id":' + ppid + ', "playerid":' + pid + ', "posx":50, "posy":50 }'; 
    console.log("before posting player pos");
    console.log("data " + data);
    $.ajax({type:"POST",
            url: api_url + "/playerpos/", 
            async: false, 
            data: data,
            dataType: "json",
            contentType: "application/json",
            success: function(result){
        console.log(result);
        //ppid = result;
    },
    error : function(e) {
        pid = -1;
        console.log("ERROR: ", e);
    }});


    var vxsize = 5;
    var vysize = 5;
    var data = '{"id":' + mid + ', "xsize":' + vxsize + ', "ysize": ' + vysize + ' }';
    $.ajax({type:"POST",
            url: api_url + "/map/", 
            async: false, 
            data: data,
            dataType: "json",
            contentType: "application/json",
            success: function(result){
        console.log(result);
        //mid = result;
    },
    error : function(e) {
        pid = -1;
        console.log("ERROR: ", e);
    }});

    //STORE PLAYER VALUE IN LOCAL STORAGE AND CLEAN FROM POTENTIAL PREVIOUS GAMES
    localStorage.setItem('playerid', pid);
    localStorage.setItem('mapid', mid);
    localStorage.setItem('playerposid', ppid);
    localStorage.setItem('pseudo', clear_string(pseudo));
    localStorage.setItem('exo1state', false);
    localStorage.setItem('exo2state', false);
    localStorage.setItem('exo3state', false);
    localStorage.setItem('exo4state', false);
    localStorage.setItem('exo5state', false);

    //REDIRECT TO GAME
    location.href = './pages/game.html';
    
  });

  function clear_string(str){
    var clean =  str.replace(/;/g, '');
    clean = clean.replace(/"/g, '');
    clean = clean.replace(/'/g, '');
   return clean;
  }