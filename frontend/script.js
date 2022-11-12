$(document).ready(function(){

    
});
$("#pseudoform").submit(function(event){
    event.preventDefault();
    console.log("only submit");
    const inputs = document.getElementById("pseudoform").elements;
    const pseudo = inputs["pseudo"].value;
    var pid = 0;
    var mid = 0;

    // GET A PLAYER ID
    $.ajax({url: "http://127.0.0.1:8000/player/newplayerid", async: false, success: function(result){
        console.log(result);
        pid = result;
    },
    error : function(e) {
        pid = -1;
        console.log("ERROR: ", e);
    }});

    // GET A MAP ID
    $.ajax({url: "http://127.0.0.1:8000/map/newmapid", async: false, success: function(result){
        console.log(result);
        mid = result;
    },
    error : function(e) {
        mid = -1;
        console.log("ERROR: ", e);
    }});
    console.log("before posting new player, pid: " + pid + ", mid: " + mid + ", pseudo : " + pseudo);
    // CREATE PLAYER

    var data = '{"id":' + pid + ', "mapid":' + mid + ', "pseudo": "' + pseudo + '" }';
    //var data = "[{id: 5, mapid: 5, pseudo: \"Bruh\"}]"
    //var data = [{"id": 5,                "mapid": 5,                "pseudo": "BRUHHH"                }];           
                
    $.ajax({type:"POST",
            url: "http://127.0.0.1:8000/player/", 
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
    var vxsize = 5;
    var vysize = 5;
    var data = '{"id":' + mid + ', "xsize":' + vxsize + ', "ysize": ' + vysize + ' }';
    $.ajax({type:"POST",
            url: "http://127.0.0.1:8000/map/", 
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

    //STORE PLAYER VALUE IN LOCAL STORAGE
    localStorage.setItem('playerid', pid);
    localStorage.setItem('mapid', mid);
    localStorage.setItem('pseudo', pseudo);

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