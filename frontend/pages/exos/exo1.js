var nb_sub;
//var api_url = "http://83.194.254.189:8000";
var api_url = "http://localhost:8000";
$(document).ready(function(){
nb_sub = 0;
//console.log("document.ready");
});


$("#seq1").submit(function(event){
event.preventDefault();
var leverid = localStorage.getItem('lastLeverClicked');
const inputs = document.getElementById("seq1").elements;
var entete = document.getElementById("entete");
var questions = document.getElementById("questions");


var pass = false;

//console.log("exo1");
/*if (question1 == "" || question2 == "" || question3 == "" ||question4 == "") {
$("#entete").append("<h2 style=\"color:#FF0000; font-weight: bold;   \" >merci de remplir entièrement le questionnaire</h2>")
}else{*/
nb_sub+=1;

if(nb_sub == 1){ //afficher premier exercice
// Afficher l'enoncé de l'exercice
var entete_txt = document.createElement("p").appendChild(document.createTextNode("Dans un jeu de société, on lance un dé à 12 faces parfaitements équilibré numérotées de 1 à 12. Quelle est la probabilité d'avoir:")) 
var sub_entete_txt = document.createElement("p").appendChild(document.createTextNode("Exprimer vos résultats en fraction irréductibles"));
entete.appendChild(entete_txt);
entete.appendChild(document.createElement("br"));
entete.appendChild(sub_entete_txt);

//Afficher les questions
var question1 = document.createElement("div");
question1.setAttribute('id','question1');
question1.appendChild(document.createElement("label").appendChild(document.createTextNode("Un deux?")));
var info = document.createElement("p");
info.setAttribute('id','exo1info1');
info.setAttribute('class','info');
info.appendChild(document.createTextNode("Aide"));
info.setAttribute('onmouseover', 'display_help(this)');
info.setAttribute('onmouseout', 'hide_help(this)');
question1.appendChild(info);
question1.appendChild(document.createElement("br"));
question1.appendChild(document.createElement("input"));
questions.appendChild(question1);


var question2 = document.createElement("div");
question2.setAttribute('id','question2');
question2.appendChild(document.createElement("label").appendChild(document.createTextNode("Un nombre pair?")));
question2.appendChild(document.createElement("br"));
question2.appendChild(document.createElement("input"));
questions.appendChild(question2);


var question3 = document.createElement("div");
question3.setAttribute('id','question3');
question3.appendChild(document.createElement("label").appendChild(document.createTextNode("Un multiple de 3?")));
question3.appendChild(document.createElement("br"));
question3.appendChild(document.createElement("input"));
questions.appendChild(question3);

var question4 = document.createElement("div");
question4.setAttribute('id','question4');
question4.appendChild(document.createElement("label").appendChild(document.createTextNode("Un multiple de 5?")));
question4.appendChild(document.createElement("br"));
question4.appendChild(document.createElement("input"));
questions.appendChild(question4);


}    
if(nb_sub == 2){ //afficher correction premier exercice
    var questionrep = [];
    questionrep[0] = clear_string(inputs[0].value);
    questionrep[1] = clear_string(inputs[1].value);
    questionrep[2] = clear_string(inputs[2].value);
    questionrep[3] = clear_string(inputs[3].value);
    var valid_rep = [false, false, false, false];
    var n_question = 4;
    var divs = questions.getElementsByClassName("div");

    const questionsol = ["1/12","1/2", "1/3", "1/6"];
    const corr = ["Correction1",
                  "Correction2",
                  "Correction3",
                  "Correction4"];

    //console.log(questionrep[0]);
    //console.log(questionrep[1]);
    //console.log(questionrep[2]);
    //console.log(questionrep[3]);

    for(var i=0; i<n_question; i++){
        if (questionrep[i] == questionsol[i]){
            valid_rep[i] = true;
            var q1 = document.getElementById(("question" + (i + 1)));
            q1.appendChild(document.createElement("br"));
            q1.appendChild(document.createElement("p").appendChild(document.createTextNode(corr[i])));
            }else{
            var q1 = document.getElementById("question"+ (i +1));
            q1.appendChild(document.createElement("br"));
            q1.appendChild(document.createElement("p").appendChild(document.createTextNode(corr[i])));
            document.getElementById(("question" + (i + 1))).style.color = "#DF0000";
            document.getElementById(("question" + (i + 1))).style.fontWeight = "bold";
            } 
    }
  
//get a new score id
for (var i=0; i<n_question;i++){
var scoreid;
$.ajax({url: api_url  + "/score/newscoreid", async: false, success: function(result){
    console.log("new score id: " + result);
    scoreid = result;
},
error : function(e) {
    scoreid = -1;
    console.log("ERROR: ", e);
}});
//Stocker resulats (table scores)
var data = '{"id":' + scoreid + ', "playerid":' + localStorage.getItem('playerid') + ', "seq":1, "exo":1, "question":' + i + ',"valid":' + valid_rep[i] + ', "answer": "' + questionrep[i] + '" }';
console.log("data before posting : " + data);
$.ajax({type:"POST",
            url: api_url + "/score/", 
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
}

}
if(nb_sub == 3){ //afficher deuxieme exercice
    //clean ancien exo
    const entete = document.getElementById("entete");
    while (entete.firstChild) {
      entete.removeChild(entete.lastChild);
    }
    const questions = document.getElementById("questions");
    while (questions.firstChild) {
        questions.removeChild(questions.lastChild);
    }

    //afficher l'entete

    var entete_txt = document.createElement("p").appendChild(document.createTextNode("Exercice 2 :")) 
    var sub_entete_txt = document.createElement("img");
    sub_entete_txt.src = "./images/seq1exo2q1.png";
    sub_entete_txt.style.width = '600px';
    
    entete.appendChild(entete_txt);
    entete.appendChild(document.createElement("br"));
    entete.appendChild(sub_entete_txt);

    //afficher les questions
    var question1 = document.createElement("div");
    question1.setAttribute('id','question1');
    question1.appendChild(document.createElement("label").appendChild(document.createTextNode("Ce graphique représente il une situation de proportionnalité ?")));
    question1.appendChild(document.createElement("br"));
    var sel = document.createElement("select");
    var empty_option = new Option('', -1);
    empty_option.style.display = 'none';
    sel.appendChild(empty_option);
    sel.appendChild(new Option('Vrai', true)); 
    sel.appendChild(new Option('Faux', false));
    question1.appendChild(sel);
    questions.appendChild(question1);
}
if(nb_sub == 4){ //afficher correction deuxième exercice
    var questionrep = [];
    questionrep[0] = clear_string(inputs[0].value);
    var valid_rep = [false];
    var divs = questions.getElementsByClassName("div");
    var n_question = 1;
    const questionsol = ["true"];
    const corr = ["Correction1"]

    for(var i=0; i<n_question; i++){
        if (questionrep[i] == questionsol[i]){
            valid_rep[i] = true;
            var q1 = document.getElementById(("question" + (i + 1)));
            q1.appendChild(document.createElement("br"));
            q1.appendChild(document.createElement("p").appendChild(document.createTextNode(corr[i])));
            }else{
            var q1 = document.getElementById("question"+ (i +1));
            q1.appendChild(document.createElement("br"));
            q1.appendChild(document.createElement("p").appendChild(document.createTextNode(corr[i])));
            document.getElementById(("question" + (i + 1))).style.color = "#DF0000";
            document.getElementById(("question" + (i + 1))).style.fontWeight = "bold";
            } 
    }
    for (var i =0; i<n_question;i++){
        var scoreid;
        $.ajax({url: api_url  + "/score/newscoreid", async: false, success: function(result){
            console.log("new score id: " + result);
            scoreid = result;
        },
        error : function(e) {
            scoreid = -1;
            console.log("ERROR: ", e);
        }});
        //Stocker resulats (table scores)
        var data = '{"id":' + scoreid + ', "playerid":' + localStorage.getItem('playerid') + ', "seq":1, "exo":1, "question":' + i + ',"valid":' + valid_rep[i] + ', "answer": "' + questionrep[i] + '" }';
        console.log("data before posting : " + data);
        $.ajax({type:"POST",
                    url: api_url + "/score/", 
                    async: false, 
                    data: data,
                    dataType: "json",
                    contentType: "application/json",
                    success: function(result){
                console.log(result);
                //ppid = result;
            },
            error : function(e) {
                console.log("ERROR: ", e);
            }});
        }
}
if(nb_sub == 5){ //afficher troisieme exercice
    //clean ancien exo
    const entete = document.getElementById("entete");
    while (entete.firstChild) {
    entete.removeChild(entete.lastChild);
    }
    const questions = document.getElementById("questions");
    while (questions.firstChild) {
        questions.removeChild(questions.lastChild);
    }

    var entete_txt = document.createElement("p").appendChild(document.createTextNode("Dans un jeu de société, on lance un dé à 12 faces parfaitements équilibré numérotées de 1 à 12. Quelle est la probabilité d'avoir:")) 
    var sub_entete_txt = document.createElement("p").appendChild(document.createTextNode("Exprimer vos résultats en fraction irréductibles"));
    entete.appendChild(entete_txt);
    entete.appendChild(document.createElement("br"));
    entete.appendChild(sub_entete_txt);

    //Afficher les questions
    var question1 = document.createElement("div");
    question1.setAttribute('id','question1');
    question1.appendChild(document.createElement("label").appendChild(document.createTextNode("Un deux?")));
    question1.appendChild(document.createElement("br"));
    question1.appendChild(document.createElement("input"));
    questions.appendChild(question1);
    }
if(nb_sub == 6){ //afficher correction troisième exercice
    var questionrep = [];
    questionrep[0] = clear_string(inputs[0].value);
    var n_question = 1;
    var divs = questions.getElementsByClassName("div");
    var valid_rep = [false];
    const questionsol = ["true"];
    const corr = ["Correction1"]

    for(var i=0; i<n_question; i++){
        if (questionrep[i] == questionsol[i]){
            valid_rep[i] = true;
            var q1 = document.getElementById(("question" + (i + 1)));
            q1.appendChild(document.createElement("br"));
            q1.appendChild(document.createElement("p").appendChild(document.createTextNode(corr[i])));
            }else{
            var q1 = document.getElementById("question"+ (i +1));
            q1.appendChild(document.createElement("br"));
            q1.appendChild(document.createElement("p").appendChild(document.createTextNode(corr[i])));
            document.getElementById(("question" + (i + 1))).style.color = "#DF0000";
            document.getElementById(("question" + (i + 1))).style.fontWeight = "bold";
            } 
    }
    for (var i=0; i<n_question;i++){
        var scoreid;
        $.ajax({url: api_url  + "/score/newscoreid", async: false, success: function(result){
            console.log("new score id: " + result);
            scoreid = result;
        },
        error : function(e) {
            scoreid = -1;
            console.log("ERROR: ", e);
        }});
        //Stocker resulats (table scores)
        var data = '{"id":' + scoreid + ', "playerid":' + localStorage.getItem('playerid') + ', "seq":1, "exo":1, "question":' + i + ',"valid":' + valid_rep[i] + ', "answer": "' + questionrep[i] + '" }';
        console.log("data before posting : " + data);
        $.ajax({type:"POST",
                    url: api_url + "/score/", 
                    async: false, 
                    data: data,
                    dataType: "json",
                    contentType: "application/json",
                    success: function(result){
                console.log(result);
                //ppid = result;
            },
            error : function(e) {
                console.log("ERROR: ", e);
            }});
        }
}


if(nb_sub == 7){
localStorage.setItem('exo1state', true);
location.href = '../game.html';
var data = '{}';  
$.ajax({type:"PUT",
    url: api_url + "/leverroom/" + leverid + "?state=true", 
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
else {
localStorage.setItem('exo1state', false);
}



// }

});

function clear_string(str){
    var clean =  str.replace(/;/g, '');
    clean = clean.replace(/"/g, '');
    clean = clean.replace(/'/g, '');
   return clean;
  }

  function display_help(element){
    if(element.id= "exo1info1"){
        element.firstChild.nodeValue = "Ceci est l'aide de l'exo question 1";
    }
  }

  function hide_help(element){
    if(element.id= "exo1info1"){
        element.firstChild.nodeValue = "Aide";
    }
  }