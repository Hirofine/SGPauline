//var api_url = "http://83.194.254.189:8000";
var api_url = "http://localhost:8000";
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
    //var data = "[{id: 5, mapid: 5, pseudo: \"Bruh\"}]"
    //var data = [{"id": 5,                "mapid": 5,                "pseudo": "BRUHHH"                }];           
                
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

    var data = '{"id":' + ppid + ', "playerid":' + pid + ', "posx":0, "posy":0 }'; 
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
    
    /*
    $.post( "http://127.0.0.1:8000/player/", function( data ) {
        console.log("in posting new player, pid: " + pid + ", mid: " + mid + ", pseudo : " + pseudo);    
        alert( "Data Loaded: " + data );
    });
    
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/player/",
        data: data,
        success: success,
        dataType: dataType
      },
        error : function(e) {
        console.log("ERROR: ", e);
    });
    /*
    $.ajax({url: "http://127.0.0.1:8000/", success: function(result){
      $("#map").html(result);
    },
    error : function(e) {
      $("#div1").html("<strong>Error</strong>");
      console.log("ERROR: ", e);
    }});*/
  });

  function clear_string(str){
    var clean =  str.replace(/;/g, '');
    clean = clean.replace(/"/g, '');
    clean = clean.replace(/'/g, '');
   return clean;
  }