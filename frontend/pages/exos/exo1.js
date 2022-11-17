var nb_sub;
$(document).ready(function(){
nb_sub = 0;
console.log("document.ready");
});


$("#exo1").submit(function(event){
event.preventDefault();
var leverid = localStorage.getItem('lastLeverClicked');
const inputs = document.getElementById("exo1").elements;
var entete = document.getElementById("entete");
var questions = document.getElementById("questions");

var valid_rep = [false, false, false, false];
var pass = false;

console.log("exo1");
/*if (question1 == "" || question2 == "" || question3 == "" ||question4 == "") {
$("#entete").append("<h2 style=\"color:#FF0000; font-weight: bold;   \" >merci de remplir entièrement le questionnaire</h2>")
}else{*/
nb_sub+=1;
if(nb_sub == 1){
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

/*
$("entete").html("<h3>Dans un jeu de société, on lance un dé à 12 faces parfaitements équilibré numérotées de 1 à 12. Quelle est la probabilité d'avoir:</h3><h4>Exprimer vos résultats en fraction irréductibles</h4>");

$("questions").html("<label for=\"question1\">Un deux?</label><br><input type=\"text\" id=\"question1\" name=\"question1\" value=\"\"><br><div id=\"question1_div\"></div>");
$("questions").append("<label for=\"question2\">Un nombre pair?</label><br><input type=\"text\" id=\"question2\" name=\"question2\" value=\"\"><br><div id=\"question2_div\"></div>");
$("questions").append("<label for=\"question3\">Un multiple de 3?</label><br><input type=\"text\" id=\"question3\" name=\"question3\" value=\"\"><br><div id=\"question3_div\"></div>");
$("questions").append("<label for=\"question4\">Un multiple de 5?</label><br><input type=\"text\" id=\"question4\" name=\"question4\" value=\"\"><br><div id=\"question4_div\"></div>");
*/
}    
if(nb_sub == 2){
const question1rep = inputs[0].value;
const question2rep = inputs[1].value;
const question3rep = inputs[2].value;
const question4rep = inputs[3].value;

var divs = questions.getElementsByClassName("div");

console.log(question1rep);
console.log(question2rep);
console.log(question3rep);
console.log(question4rep);

if (question1rep == "1/12"){
valid_rep[0] = true;
var q1 = document.getElementById("question1");
q1.appendChild(document.createElement("br"));
q1.appendChild(document.createElement("p").appendChild(document.createTextNode("Correction Exo 1")));
}else{
var q1 = document.getElementById("question1");
q1.appendChild(document.createElement("br"));
q1.appendChild(document.createElement("p").appendChild(document.createTextNode("Correction Exo 1")));
document.getElementById("question1").style.color = "#DF0000";
document.getElementById("question1").style.fontWeight = "bold";
}
if (question2rep == "1/2"){
valid_rep[1] = true;
var q2 = document.getElementById("question2");
q2.appendChild(document.createElement("br"));
q2.appendChild(document.createElement("p").appendChild(document.createTextNode("Correction Exo 2")));
}else{
var q2 = document.getElementById("question2");
q2.appendChild(document.createElement("br"));
q2.appendChild(document.createElement("p").appendChild(document.createTextNode("Correction Exo 2")));
document.getElementById("question2").style.color = "#DF0000";
document.getElementById("question2").style.fontWeight = "bold";
}
if (question3rep == "1/3"){
valid_rep[2] = true;
var q3 = document.getElementById("question3");
q3.appendChild(document.createElement("br"));
q3.appendChild(document.createElement("p").appendChild(document.createTextNode("Correction Exo 3")));
}else{
var q3 = document.getElementById("question3");
q3.appendChild(document.createElement("br"));
q3.appendChild(document.createElement("p").appendChild(document.createTextNode("Correction Exo 3")));
document.getElementById("question3").style.color = "#DF0000";
document.getElementById("question3").style.fontWeight = "bold";
}
if (question4rep == "1/6"){
valid_rep[3] = true;
var q4 = document.getElementById("question4");
q4.appendChild(document.createElement("br"));
q4.appendChild(document.createElement("p").appendChild(document.createTextNode("Correction Exo 4")));
}else{
var q4 = document.getElementById("question4");
q4.appendChild(document.createElement("br"));
q4.appendChild(document.createElement("p").appendChild(document.createTextNode("Correction Exo 4")));
document.getElementById("question4").style.color = "#DF0000";
document.getElementById("question4").style.fontWeight = "bold";
}










if (pass){
localStorage.setItem('exo1state', true);
var data = '{}';  
$.ajax({type:"PUT",
    url: "http://83.194.254.189:8000/leverroom/" + leverid + "?state=true", 
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
if(nb_sub == 1){
// Afficher la correction, bloquer les cellules, Modifier text submit

}
if(nb_sub == 3){
location.href = '../game.html';
}
}
// }

});
