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


$("#seq3").submit(function (event) {
    event.preventDefault();
    var leverid = localStorage.getItem('lastLeverClicked');
    const inputs = document.getElementById("seq3").elements;
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
        var entete_txt = document.createElement("p").appendChild(document.createTextNode("Ce graphique représente il une situation de proportionnalité ?"))
        var sub_entete_txt = document.createElement("img");
        sub_entete_txt.src = "./images/enonces/seq3exo1.png";
        sub_entete_txt.style.width = '600px';
        entete.appendChild(entete_txt);
        entete.appendChild(document.createElement("br"));
        entete.appendChild(sub_entete_txt);

        //Afficher les questions
        var question1 = document.createElement("div");
        question1.setAttribute('id', 'question1');
        question1.appendChild(document.createElement("label").appendChild(document.createTextNode("")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo2info1');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Une situation de proportionnalité est représentée graphiquement dans un repère par des points alignés avec l\'origine du repère.  Réciproquement, si une situation est représentée graphiquement dans un repère par des points alignés avec l\'origine du repère, c\'est une situation de proportionnalité. ";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question1.appendChild(info);
        question1.appendChild(document.createElement("br"));
        var sel = document.createElement("select");
        var empty_option = new Option('', -1);
        empty_option.style.display = 'none';
        sel.appendChild(empty_option);
        sel.appendChild(new Option('Vrai', true));
        sel.appendChild(new Option('Faux', false));
        question1.appendChild(sel);
        questions.appendChild(question1);

        //Renommer bouton Continuer
        document.getElementById('submit').setAttribute('value', "Vérifier");

    }
    if (nb_sub == 2) { //afficher correction premier exercice
        var questionrep = [];
        questionrep[0] = clear_string(inputs[0].value);
        var valid_rep = [false];
        var n_question = 1;
        var divs = questions.getElementsByClassName("div");

        const questionsol = ["false"];
        const corr = ["./images/corr/seq3exo1que1.png"];

        //console.log(questionrep[0]);
        //console.log(questionrep[1]);
        //console.log(questionrep[2]);
        //console.log(questionrep[3]);

        for (var i = 0; i < n_question; i++) {
            if (questionrep[i] == questionsol[i]) {
                valid_rep[i] = true;
                var q1 = document.getElementById(("question" + (i + 1)));
                q1.appendChild(document.createElement("br"));
                var correlmt = document.createElement("img");
                correlmt.setAttribute('src',corr[i]);
                q1.appendChild(correlmt);
                document.getElementById(("question" + (i + 1))).style.color = "#05DF2A";
                document.getElementById(("question" + (i + 1))).style.fontWeight = "bold";
            } else {
                var q1 = document.getElementById("question" + (i + 1));
                q1.appendChild(document.createElement("br"));
                var correlmt = document.createElement("img");
                correlmt.setAttribute('src',corr[i]);
                q1.appendChild(correlmt);
                
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
            var data = '{"id":' + scoreid + ', "playerid":' + localStorage.getItem('playerid') + ', "seq":3, "exo":1, "question":' + i + ',"valid":' + valid_rep[i] + ', "answer": "' + questionrep[i] + '" }';
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
        var entete_txt = document.createElement("p").appendChild(document.createTextNode("Kevin prend un bonbon dans un sachet opaque. Il ne voit donc pas les bonbons. Le nombre de bonbons de chaque couleur contenus dans le sachet est illustré par le diagramme en bâton suivant :"));
        var sub_entete_txt = document.createElement("img");
        sub_entete_txt.src = "./images/enonces/seq3exo2.png";
        sub_entete_txt.style.width = '600px';
        entete.appendChild(entete_txt);
        entete.appendChild(document.createElement("br"));
        entete.appendChild(sub_entete_txt);

        //Afficher les questions
        var question1 = document.createElement("div");
        question1.setAttribute('id', 'question1');
        question1.appendChild(document.createElement("label").appendChild(document.createTextNode("Quel est l’effectif total de bonbon ?")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info1');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "L\'effectif total est donné par la somme de tout les effectifs";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question1.appendChild(info);
        question1.appendChild(document.createElement("br"));
        question1.appendChild(document.createElement("input"));
        questions.appendChild(question1);


        var question2 = document.createElement("div");
        question2.setAttribute('id', 'question2');
        question2.appendChild(document.createElement("label").appendChild(document.createTextNode("Quelle est la probabilité que Kevin prenne un bonbon rouge ?")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info2');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Dans une expérience aléatoire où il y a équiprobabilité, la probabilité d\'un événement est égale au quotient du nombre d\'issues favorables permettant à l\'événement de se réaliser par le nombre total d\'issues possibles ";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question2.appendChild(info);
        question2.appendChild(document.createElement("br"));
        question2.appendChild(document.createElement("input"));
        questions.appendChild(question2);

        //Afficher les questions
        var question3 = document.createElement("div");
        question3.setAttribute('id', 'question3');
        question3.appendChild(document.createElement("label").appendChild(document.createTextNode("Quelle est la probabilité que Kevin prenne un bonbon qui ne soit pas rouge ?")));
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
        const questionsol = ["30","1/5","4/5"];
        const corr = ["./images/corr/seq3exo2que1.png",
                      "./images/corr/seq3exo2que2.png",
                      "./images/corr/seq3exo2que3.png"];

        for (var i = 0; i < n_question; i++) {
            if (questionrep[i] == questionsol[i]) {
                valid_rep[i] = true;
                var q1 = document.getElementById(("question" + (i + 1)));
                q1.appendChild(document.createElement("br"));
                var correlmt = document.createElement("img");
                correlmt.setAttribute('src',corr[i]);
                q1.appendChild(correlmt);
                document.getElementById(("question" + (i + 1))).style.color = "#05DF2A";
                document.getElementById(("question" + (i + 1))).style.fontWeight = "bold";
            } else {
                var q1 = document.getElementById("question" + (i + 1));
                q1.appendChild(document.createElement("br"));
                var correlmt = document.createElement("img");
                correlmt.setAttribute('src',corr[i]);
                q1.appendChild(correlmt);
                
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
            var data = '{"id":' + scoreid + ', "playerid":' + localStorage.getItem('playerid') + ', "seq":3, "exo":2, "question":' + i + ',"valid":' + valid_rep[i] + ', "answer": "' + questionrep[i] + '" }';
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
        localStorage.setItem('exo3state', true);
        
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
        location.href = '../game.html';
    }
    



});

function clear_string(str) {
    var clean = str.replace(/;/g, '');
    clean = clean.replace(/ /g, '');
    clean = clean.replace(/"/g, '');
    clean = clean.replace(/'/g, ''); 
    return clean;
}

