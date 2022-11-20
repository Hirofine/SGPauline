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


$("#seq1").submit(function (event) {
    event.preventDefault();
    var leverid = localStorage.getItem('lastLeverClicked');
    const inputs = document.getElementById("seq1").elements;
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
        var entete_txt = document.createElement("p").appendChild(document.createTextNode("Solène a 10 cartes : 1 verte, 2 bleues, 3 rouges et 4 noires. Lana tire une carte au hasard."))
        var sub_entete_txt = document.createElement("p").appendChild(document.createTextNode("Exprimer vos résultats en fraction irréductibles"));
        entete.appendChild(entete_txt);
        entete.appendChild(document.createElement("br"));
        entete.appendChild(sub_entete_txt);

        //Afficher les questions
        var question1 = document.createElement("div");
        question1.setAttribute('id', 'question1');
        question1.appendChild(document.createElement("label").appendChild(document.createTextNode("1) Quelle est la probabilité que la carte de Lana soit bleue ?")));
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
        question2.appendChild(document.createElement("label").appendChild(document.createTextNode("Quelle est la probabilité que la carte de Lana ne soit pas noire ?")));
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
        var valid_rep = [false, false, false, false];
        var n_question = 2;
        var divs = questions.getElementsByClassName("div");

        const questionsol = ["1/5", "2/5"];
        const corr = ["./images/corr/seq1exo1que1.PNG",
                      "./images/corr/seq1exo1que2.PNG",
                     ];

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
            var data = '{"id":' + scoreid + ', "playerid":' + localStorage.getItem('playerid') + ', "seq":1, "exo":1, "question":' + i + ',"valid":' + valid_rep[i] + ', "answer": "' + questionrep[i] + '" }';
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

        //afficher l'entete

        var entete_txt = document.createElement("p").appendChild(document.createTextNode("Exercice 2 :"))
        var sub_entete_txt = document.createElement("img");
        sub_entete_txt.src = "./images/enonces/seq1exo2q1.png";
        sub_entete_txt.style.width = '600px';

        entete.appendChild(entete_txt);
        entete.appendChild(document.createElement("br"));
        entete.appendChild(sub_entete_txt);

        //afficher les questions
        var question1 = document.createElement("div");
        question1.setAttribute('id', 'question1');
        question1.appendChild(document.createElement("label").appendChild(document.createTextNode("Ce graphique représente il une situation de proportionnalité ?")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo2info1');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Ceci est l\'aide de l\'exo 2 question 1";');
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


        document.getElementById('submit').setAttribute('value', "Vérifier");
    }
    if (nb_sub == 4) { //afficher correction deuxième exercice
        var questionrep = [];
        questionrep[0] = clear_string(inputs[0].value);
        var valid_rep = [false];
        var divs = questions.getElementsByClassName("div");
        var n_question = 1;
        const questionsol = ["true"];
        const corr = ["./images/corr/seq1exo2que1.png"]

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
            var data = '{"id":' + scoreid + ', "playerid":' + localStorage.getItem('playerid') + ', "seq":1, "exo":2, "question":' + i + ',"valid":' + valid_rep[i] + ', "answer": "' + questionrep[i] + '" }';
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
    if (nb_sub == 5) { //afficher troisieme exercice
        //clean ancien exo
        const entete = document.getElementById("entete");
        while (entete.firstChild) {
            entete.removeChild(entete.lastChild);
        }
        const questions = document.getElementById("questions");
        while (questions.firstChild) {
            questions.removeChild(questions.lastChild);
        }

        var entete_txt = document.createElement("p").appendChild(document.createTextNode("Au cinéma, pour améliorer la fluidité du film on respecte une norme qui consiste à mettre 24 images par seconde. "))
        var sub_entete_txt = document.createElement("p").appendChild(document.createTextNode(" "));
        entete.appendChild(entete_txt);
        entete.appendChild(document.createElement("br"));
        entete.appendChild(sub_entete_txt);

        //Afficher les questions
        //qeustion 1
        var question1 = document.createElement("div");
        question1.setAttribute('id', 'question1');
        question1.appendChild(document.createElement("label").appendChild(document.createTextNode("Remplir le tableau suivant :")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo3info1');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Ceci est l\'aide de l\'exo 3 question 1";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question1.appendChild(info);
        question1.appendChild(document.createElement("br"));
        var table = document.createElement("table");
        var tr1 = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.appendChild(document.createTextNode("Durée du film en seconde"));
        var td2 = document.createElement("td");
        td2.appendChild(document.createTextNode("1"))
        var td3 = document.createElement("td");
        td3.appendChild(document.createTextNode("10"))
        var td4 = document.createElement("td");
        td4.appendChild(document.createTextNode("20"))
        var td5 = document.createElement("td");
        td5.appendChild(document.createTextNode("60"))
        var td6 = document.createElement("td");
        td6.appendChild(document.createTextNode("255"))
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr1.appendChild(td3);
        tr1.appendChild(td4);
        tr1.appendChild(td5);
        tr1.appendChild(td6);
        table.appendChild(tr1);

        var tr2 = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.appendChild(document.createTextNode("Nombre d'images"));
        var td2 = document.createElement("td");
        td2.appendChild(document.createElement("input"));
        var td3 = document.createElement("td");
        td3.appendChild(document.createElement("input"));
        var td4 = document.createElement("td");
        td4.appendChild(document.createElement("input"));
        var td5 = document.createElement("td");
        td5.appendChild(document.createElement("input"));
        var td6 = document.createElement("td");
        td6.appendChild(document.createElement("input"));
        tr2.appendChild(td1);
        tr2.appendChild(td2);
        tr2.appendChild(td3);
        tr2.appendChild(td4);
        tr2.appendChild(td5);
        tr2.appendChild(td6);
        table.appendChild(tr2);
        question1.appendChild(table);
        questions.appendChild(question1);



        //question 2
        var question2 = document.createElement("div");
        question2.setAttribute('id', 'question2');
        question2.appendChild(document.createElement("label").appendChild(document.createTextNode("La situation est-elle proportionnelle ?")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo3info2');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Ceci est l\'aide de l\'exo 3 question 2";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question2.appendChild(info);
        question2.appendChild(document.createElement("br"));
        var sel = document.createElement("select");
        var empty_option = new Option('', -1);
        empty_option.style.display = 'none';
        sel.appendChild(empty_option);
        sel.appendChild(new Option('Vrai', true));
        sel.appendChild(new Option('Faux', false));
        question2.appendChild(sel);
        questions.appendChild(question2);

        
        //question 3
        var question3 = document.createElement("div");
        question3.setAttribute('id', 'question3');
        question3.appendChild(document.createElement("label").appendChild(document.createTextNode("Donner le coefficient de proportionnalité.")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo3info3');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Ceci est l\'aide de l\'exo 3 question 3";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question3.appendChild(info);
        question3.appendChild(document.createElement("br"));
        var inp = document.createElement("input");
        question3.appendChild(inp);
        questions.appendChild(question3);

        //question 4
        var question4 = document.createElement("div");
        question4.setAttribute('id', 'question4');
        question4.appendChild(document.createElement("label").appendChild(document.createTextNode("Exprimer cette situation par une fonction.")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo4info3');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Ceci est l\'aide de l\'exo 3 question 4";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question4.appendChild(info);
        question4.appendChild(document.createElement("br"));
        var inp = document.createElement("input");
        inp.placeholder = "f(x)=ax";
        question4.appendChild(inp);
        questions.appendChild(question4);




        document.getElementById('submit').setAttribute('value', "Vérifier");
    }
    if (nb_sub == 6) { //afficher correction troisième exercice
        var questionrep = [];
        var n_question = 8;
        for (var i=0; i<n_question;i++){
            questionrep[i] = clear_string(inputs[i].value);
        }
        var divs = questions.getElementsByClassName("div");
        var valid_rep = [false, false, false, false, false, false, false, false];
        const questionsol = ["24","240","480","1440","6120","24","true","f(x)=24x"];
        const corr = ["./images/corr/seq1exo3que1.png",
                      "Correction2",
                      "Correction3",
                      "Correction4",
                      "Correction5",
                      "./images/corr/seq1exo3que2.png",
                      "./images/corr/seq1exo3que3.png",
                      "./images/corr/seq1exo3que4.png"]

        for (var i = 0; i < n_question; i++) {
            if (questionrep[i] == questionsol[i]) {
                valid_rep[i] = true;
                if(i<5){
                    if(i==0){
                        var q1 = document.getElementById("question1");
                        var correlmt = document.createElement("img");
                        correlmt.setAttribute('src',corr[0]);
                        q1.appendChild(document.createElement("br"));
                        q1.appendChild(correlmt);
                    }
                }else{
                    var q1 = document.getElementById(("question" + (i-3)));
                    var correlmt = document.createElement("img");
                    correlmt.setAttribute('src',corr[i]);
                    q1.appendChild(document.createElement("br"));
                    q1.appendChild(correlmt);
                }
                
            } else {
                if(i<5){
                    if(i==0){
                        var q1 = document.getElementById("question1");
                        var correlmt = document.createElement("img");
                        correlmt.setAttribute('src',corr[0]);
                        q1.appendChild(document.createElement("br"));
                        q1.appendChild(correlmt);
                    }
                }else{
                    var q1 = document.getElementById(("question" + (i-3)));
                    var correlmt = document.createElement("img");
                    correlmt.setAttribute('src',corr[i]);
                    q1.appendChild(document.createElement("br"));
                    q1.appendChild(correlmt);
                }
                
                q1.style.color = "#DF0000";
                q1.style.fontWeight = "bold";
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
            var data = '{"id":' + scoreid + ', "playerid":' + localStorage.getItem('playerid') + ', "seq":1, "exo":3, "question":' + i + ',"valid":' + valid_rep[i] + ', "answer": "' + questionrep[i] + '" }';
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


    if (nb_sub == 7) {
        localStorage.setItem('exo1state', true);
        
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

