var api_url = "http://memoire.hirofine.fr:8000";
var players;
$(document).ready(function(){
    //get all players
    $.ajax({url: api_url  + "/player/", async: false, success: function(result){
        console.log(result);
        players = result;
    },
    error : function(e) {
        players = -1;
        console.log("ERROR: ", e);
    }});
    

    var maindiv = document.getElementById("maindiv");
    var table = document.createElement("table");
    var tabplay = [];
    

    var n_play = players.length;


    for (var i=0; i<n_play;i++){

        tabplay[i] = document.createElement("table");
        console.log(players[i]);
        var tr = document.createElement("tr");
        tr.setAttribute('class','entetejoueur');
        var id = document.createElement("td");
        id.appendChild(document.createTextNode(players[i].id));
        var pseudo = document.createElement("td");
        pseudo.appendChild(document.createTextNode(players[i].pseudo));
        var mapid = document.createElement("td");
        mapid.appendChild(document.createTextNode(players[i].mapid));
        
        tr.appendChild(id);
        tr.appendChild(pseudo);
        tr.appendChild(mapid);
        tabplay[i].appendChild(tr);
        var scores;
        //get score for this player
        $.ajax({url: api_url  + "/score/playerid/" + players[i].id, async: false, success: function(result){
            console.log(result);
            scores = result;
        },
        error : function(e) {
            players = -1;
            console.log("ERROR: ", e);
        }});
        var n_scores = scores.length;
        var tablescore = document.createElement("table");
        if(n_scores>0){
        var trsc = document.createElement("tr");

        var tdplayerid = document.createElement("td");
        tdplayerid.appendChild(document.createTextNode("player id"));
        
        var tdid = document.createElement("td");
        tdid.appendChild(document.createTextNode("id"));

        var tdseq = document.createElement("td");
        tdseq.appendChild(document.createTextNode("seq"));

        var tdexo = document.createElement("td");
        tdexo.appendChild(document.createTextNode("exo"));

        var tdquestion = document.createElement("td");
        tdquestion.appendChild(document.createTextNode("question"));

        var tdvalid = document.createElement("td");
        tdvalid.appendChild(document.createTextNode("valid"));

        var tdanswer = document.createElement("td");
        tdanswer.appendChild(document.createTextNode("reponse"));

        trsc.appendChild(tdplayerid);
        trsc.appendChild(tdid);
        trsc.appendChild(tdseq);
        trsc.appendChild(tdexo);
        trsc.appendChild(tdquestion);
        trsc.appendChild(tdvalid);
        trsc.appendChild(tdanswer);
        tablescore.appendChild(trsc);
        }
        for (var j=0;j<n_scores;j++){
            var trsc = document.createElement("tr");

            var tdplayerid = document.createElement("td");
            tdplayerid.appendChild(document.createTextNode(scores[j].playerid));
            
            var tdid = document.createElement("td");
            tdid.appendChild(document.createTextNode(scores[j].id));

            var tdseq = document.createElement("td");
            tdseq.appendChild(document.createTextNode(scores[j].seq));

            var tdexo = document.createElement("td");
            tdexo.appendChild(document.createTextNode(scores[j].exo));

            var tdquestion = document.createElement("td");
            tdquestion.appendChild(document.createTextNode(scores[j].question));

            var tdvalid = document.createElement("td");
            tdvalid.appendChild(document.createTextNode(scores[j].valid));

            var tdanswer = document.createElement("td");
            tdanswer.appendChild(document.createTextNode(scores[j].answer));

            trsc.appendChild(tdplayerid);
            trsc.appendChild(tdid);
            trsc.appendChild(tdseq);
            trsc.appendChild(tdexo);
            trsc.appendChild(tdquestion);
            trsc.appendChild(tdvalid);
            trsc.appendChild(tdanswer);
            tablescore.appendChild(trsc);
        }
        var trtable = document.createElement("tr");
        trtable.appendChild(tablescore);
        tabplay[i].appendChild(trtable);
        

        table.appendChild(tabplay[i]);
    }

    maindiv.appendChild(table);
});