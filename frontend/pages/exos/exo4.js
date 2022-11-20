var nb_sub;
//var api_url = "http://83.194.254.189:8000";
//var api_url = "http://localhost:8000";
var api_url = "http://memoire.hirofine.fr:8000";
$(document).ready(function () {
    nb_sub = 0;
    var entete = document.getElementById("entete");
    entete.appendChild(document.createTextNode("Bienvenu sur votre premier défi, vous aves ici quelques exercices a completer pour débloquer ce levier, quand vous serez pret appuyez sur Continuer"));
    document.getElementById('submit').setAttribute('value', "Continuer");

});


$("#seq4").submit(function (event) {
    event.preventDefault();
    var leverid = localStorage.getItem('lastLeverClicked');
    const inputs = document.getElementById("seq4").elements;
    var entete = document.getElementById("entete");
    var questions = document.getElementById("questions");


    var pass = false;

    nb_sub += 1;

    if (nb_sub == 1) { //afficher premier exercice
        //clean ancien exo
        const entete = document.getElementById("entete");
        while (entete.firstChild) {
            entete.removeChild(entete.lastChild);
        }
        const questions = document.getElementById("questions");
        while (questions.firstChild) {
            questions.removeChild(questions.lastChild);
        }
        // Afficher l'enoncé de l'exercice
        var entete_txt = document.createElement("p").appendChild(document.createTextNode("En 2018, le ticket de tram coûtait 1,60 €, en 2022, il coûte 1,68€."))
        var sub_entete_txt = document.createElement("p").appendChild(document.createTextNode("Inserer image graph exo7"));
        entete.appendChild(entete_txt);
        entete.appendChild(document.createElement("br"));
        entete.appendChild(sub_entete_txt);

        var question1 = document.createElement("div");
        question1.setAttribute('id', 'question1');
        question1.appendChild(document.createElement("label").appendChild(document.createTextNode("Quel est le pourcentage d’augmentation du prix?")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info1');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Ceci est l\'aide de l\'exo 1 question 1";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question1.appendChild(info);
        question1.appendChild(document.createElement("br"));
        question1.appendChild(document.createElement("input"));
        questions.appendChild(question1);


        var question2 = document.createElement("div");
        question2.setAttribute('id', 'question2');
        question2.appendChild(document.createElement("label").appendChild(document.createTextNode("Exprimer le prix du ticket après l’augmentation (y) en fonction du prix initial du ticket (x).")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info2');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Ceci est l\'aide de l\'exo 1 question 2";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question2.appendChild(info);
        question2.appendChild(document.createElement("br"));
        question2.appendChild(document.createElement("input"));
        questions.appendChild(question2);

        //Renommer bouton Continuer
        document.getElementById('submit').setAttribute('value', "Vérifier");

    }
    if (nb_sub == 2) { //afficher correction premier exercice
        var questionrep = [];
        questionrep[0] = clear_string(inputs[0].value);
        questionrep[1] = clear_string(inputs[1].value);
        var valid_rep = [false, false];
        var n_question = 2;
        var divs = questions.getElementsByClassName("div");

        const questionsol = ["5%", "y=0.5x"];
        const corr = ["./images/corr/seq4exo1que1.png", 
                      "./images/corr/seq4exo1que2.png"];


        for (var i = 0; i < n_question; i++) {
            if (questionrep[i] == questionsol[i]) {
                valid_rep[i] = true;
                var q1 = document.getElementById(("question" + (i + 1)));
                q1.appendChild(document.createElement("br"));
                var correlmt = document.createElement("img");
                correlmt.setAttribute('src',corr[i]);
                q1.appendChild(correlmt);
            } else {
                var q1 = document.getElementById("question" + (i + 1));
                q1.appendChild(document.createElement("br"));
                var correlmt = document.createElement("img");
                correlmt.setAttribute('src',corr[i]);
                q1.appendChild(correlmt);
                document.getElementById(("question" + (i + 1))).style.color = "#DF0000";
                document.getElementById(("question" + (i + 1))).style.fontWeight = "bold";
            }
        }

        //get a new score id
        for (var i = 0; i < n_question; i++) {
            var scoreid;
            $.ajax({
                url: api_url + "/score/newscoreid", async: false, success: function (result) {
                    console.log("new score id: " + result);
                    scoreid = result;
                },
                error: function (e) {
                    scoreid = -1;
                    console.log("ERROR: ", e);
                }
            });
            //Stocker resulats (table scores)
            var data = '{"id":' + scoreid + ', "playerid":' + localStorage.getItem('playerid') + ', "seq":4, "exo":1, "question":' + i + ',"valid":' + valid_rep[i] + ', "answer": "' + questionrep[i] + '" }';
            console.log("data before posting : " + data);
            $.ajax({
                type: "POST",
                url: api_url + "/score/",
                async: false,
                data: data,
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                    console.log(result);
                    //ppid = result;
                },
                error: function (e) {
                    pid = -1;
                    console.log("ERROR: ", e);
                }
            });
        }
        document.getElementById('submit').setAttribute('value', "Continuer");
    }
    if (nb_sub == 3) { //afficher deuxieme exercice
        //clean ancien exo
        const entete = document.getElementById("entete");
        while (entete.firstChild) {
            entete.removeChild(entete.lastChild);
        }
        const questions = document.getElementById("questions");
        while (questions.firstChild) {
            questions.removeChild(questions.lastChild);
        }
        // Afficher l'enoncé de l'exercice
        var entete_txt = document.createElement("p").appendChild(document.createTextNode("Lors d’une action de prévention routière, on a mesuré la vitesse de passage des véhicules motorisés dans la rue d’un lycée (limitation à 50 km/h). On a obtenu les mesures suivantes : "))
        var sub_entete_txt = document.createElement("p").appendChild(document.createTextNode("image exo 4"));
        entete.appendChild(entete_txt);
        entete.appendChild(document.createElement("br"));
        entete.appendChild(sub_entete_txt);

        //Afficher les questions
        var question1 = document.createElement("div");
        question1.setAttribute('id', 'question1');
        question1.appendChild(document.createElement("label").appendChild(document.createTextNode("Quel est l’effectif total de véhicules ?")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info1');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Ceci est l\'aide de l\'exo 2 question 1";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question1.appendChild(info);
        question1.appendChild(document.createElement("br"));
        question1.appendChild(document.createElement("input"));
        questions.appendChild(question1);


        var question2 = document.createElement("div");
        question2.setAttribute('id', 'question2');
        question2.appendChild(document.createElement("label").appendChild(document.createTextNode("Quelle est la fréquence d’apparition d’un véhicule en excès de vitesse ? (sous la forme d’une fraction irréductible).")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info2');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Ceci est l\'aide de l\'exo 1 question 2";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question2.appendChild(info);
        question2.appendChild(document.createElement("br"));
        question2.appendChild(document.createElement("input"));
        questions.appendChild(question2);

        //Afficher les questions
        var question3 = document.createElement("div");
        question3.setAttribute('id', 'question3');
        question3.appendChild(document.createElement("label").appendChild(document.createTextNode("Quelle est l’étendue de cette série ?")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info1');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Ceci est l\'aide de l\'exo 2 question 1";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question3.appendChild(info);
        question3.appendChild(document.createElement("br"));
        question3.appendChild(document.createElement("input"));
        questions.appendChild(question3);


        
        //Renommer bouton Continuer

        document.getElementById('submit').setAttribute('value', "Vérifier");
    }
    if (nb_sub == 4) { //afficher correction deuxième exercice
        var questionrep = [];
        var n_question = 3;
        for (var i=0; i<n_question;i++){
            questionrep[i] = clear_string(inputs[i].value);
        }
        var divs = questions.getElementsByClassName("div");
        var valid_rep = [false, false, false];
        const questionsol = ["203","82/203","50"];
        const corr = ["./images/corr/seq4exo2que1.png",
                      "./images/corr/seq4exo2que2.png",
                      "./images/corr/seq4exo2que3.png"];

        for (var i = 0; i < n_question; i++) {
            if (questionrep[i] == questionsol[i]) {
                valid_rep[i] = true;
                var q1 = document.getElementById(("question" + (i + 1)));
                q1.appendChild(document.createElement("br"));
                var correlmt = document.createElement("img");
                correlmt.setAttribute('src',corr[i]);
                q1.appendChild(correlmt);
            } else {
                var q1 = document.getElementById("question" + (i + 1));
                q1.appendChild(document.createElement("br"));
                var correlmt = document.createElement("img");
                correlmt.setAttribute('src',corr[i]);
                q1.appendChild(correlmt);
                document.getElementById(("question" + (i + 1))).style.color = "#DF0000";
                document.getElementById(("question" + (i + 1))).style.fontWeight = "bold";
            }
        }
        for (var i = 0; i < n_question; i++) {
            var scoreid;
            $.ajax({
                url: api_url + "/score/newscoreid", async: false, success: function (result) {
                    console.log("new score id: " + result);
                    scoreid = result;
                },
                error: function (e) {
                    scoreid = -1;
                    console.log("ERROR: ", e);
                }
            });
            //Stocker resulats (table scores)
            var data = '{"id":' + scoreid + ', "playerid":' + localStorage.getItem('playerid') + ', "seq":4, "exo":2, "question":' + i + ',"valid":' + valid_rep[i] + ', "answer": "' + questionrep[i] + '" }';
            console.log("data before posting : " + data);
            $.ajax({
                type: "POST",
                url: api_url + "/score/",
                async: false,
                data: data,
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                    console.log(result);
                    //ppid = result;
                },
                error: function (e) {
                    console.log("ERROR: ", e);
                }
            });
        }
        document.getElementById('submit').setAttribute('value', "Continuer");
    }
    

    if (nb_sub == 5) {
        localStorage.setItem('exo4state', true);
        
        var data = '{}';
        $.ajax({
            type: "PUT",
            url: api_url + "/leverroom/" + leverid + "?state=true",
            async: false,
            data: data,
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                console.log(result);
                pid = result;
            },
            error: function (e) {
                pid = -1;
                console.log("ERROR: ", e);
            }
        });
        location.href = '../exit.html';
    }
   


});

function clear_string(str) {
    var clean = str.replace(/;/g, '');
    clean = clean.replace(/ /g, '');
    clean = clean.replace(/"/g, '');
    clean = clean.replace(/'/g, ''); 
    return clean;
}

