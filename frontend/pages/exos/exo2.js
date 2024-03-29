var nb_sub;
//var api_url = "http://83.194.254.189:8000";
//var api_url = "http://localhost:8000";
var api_url = "http://memoire.hirofine.fr:8000";
$(document).ready(function () {
    nb_sub = 0;
    var entete = document.getElementById("entete");
    entete.appendChild(document.createTextNode("Vous voici à votre deuxième épreuve, tenez bon"));
    document.getElementById('submit').setAttribute('value', "Continuer");

});


$("#seq2").submit(function (event) {
    event.preventDefault();
    var leverid = localStorage.getItem('lastLeverClicked');
    const inputs = document.getElementById("seq2").elements;
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
        var entete_txt = document.createElement("p").appendChild(document.createTextNode("Voici la répartition des âges des spectateurs lors d’un concert"))
        
        var sub_entete_txt = document.createElement("img");
        sub_entete_txt.src = "./images/enonces/seq2exo1.png";
        sub_entete_txt.style.width = '600px';
        entete.appendChild(entete_txt);
        entete.appendChild(document.createElement("br"));
        entete.appendChild(sub_entete_txt);

        //Afficher les questions
        var question1 = document.createElement("div");
        question1.setAttribute('id', 'question1');
        question1.appendChild(document.createElement("label").appendChild(document.createTextNode("Calculer l’étendue de la série. ")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info1');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = " L\'étendue d’une série de données est la différence entre la plus grande valeur et la plus petite valeur de la série.";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question1.appendChild(document.createElement("br"));
        question1.appendChild(info);
        question1.appendChild(document.createElement("br"));
        question1.appendChild(document.createElement("input"));
        questions.appendChild(question1);


        var question2 = document.createElement("div");
        question2.setAttribute('id', 'question2');
        question2.appendChild(document.createElement("label").appendChild(document.createTextNode("Calculer la fréquence en pourcentage des spectateurs de moins de 20 ans. (Arrondir à l’unité près).")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info2');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = " La fréquence d\'apparition est donnée par le quotient de son effectif par l’effectif total";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question2.appendChild(document.createElement("br"));
        question2.appendChild(info);
        question2.appendChild(document.createElement("br"));
        var inp = document.createElement("input");
        inp.setAttribute('placeholder','..%');
        question2.appendChild(inp);
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

        const questionsol = ["79", "36%"];
        const corr = ["./images/corr/seq2exo1que1.png",
                      "./images/corr/seq2exo1que2.png",
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
            
            //Stocker resulats (table scores)
            var data = '{"id":' + 0 + ', "playerid":' + localStorage.getItem('playerid') + ', "seq":2, "exo":1, "question":' + i + ',"valid":' + valid_rep[i] + ', "answer": "' + questionrep[i] + '" }';
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
        var entete_txt = document.createElement("p").appendChild(document.createTextNode(""))
        var sub_entete_txt = document.createElement("p").appendChild(document.createTextNode(""));
        entete.appendChild(entete_txt);
        entete.appendChild(document.createElement("br"));
        entete.appendChild(sub_entete_txt);

        //Afficher les questions
        var question1 = document.createElement("div");
        question1.setAttribute('id', 'question1');
        question1.appendChild(document.createElement("label").appendChild(document.createTextNode("Quel est le coefficient multiplicateur correspondant à une diminution de 5%?")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info1');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Diminuer une valeur de a% revient à multiplier cette valeur par : 1 - (a/100)";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question1.appendChild(document.createElement("br"));
        question1.appendChild(info);
        question1.appendChild(document.createElement("br"));
        question1.appendChild(document.createElement("input"));
        questions.appendChild(question1);


        var question2 = document.createElement("div");
        question2.setAttribute('id', 'question2');
        question2.appendChild(document.createElement("label").appendChild(document.createTextNode("En une année, la population d’un village de 1620 habitants diminue de 5 %. Quel est le nombre d’habitant après cette diminution ?")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info2');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "On utilise le coefficient multiplicateur sur le nombre initial d\'habitants";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question2.appendChild(document.createElement("br"));
        question2.appendChild(info);
        question2.appendChild(document.createElement("br"));
        question2.appendChild(document.createElement("input"));
        questions.appendChild(question2);

        //Afficher les questions
        var question3 = document.createElement("div");
        question3.setAttribute('id', 'question3');
        question3.appendChild(document.createElement("label").appendChild(document.createTextNode("Exprimer le nombre d’habitant après la diminution y en fonction du nombre initial d’habitant dans le village x.")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info1');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Essayer de faire correspondre y et x avec les données de l\'énoncé et de la question précédente";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question3.appendChild(document.createElement("br"));
        question3.appendChild(info);
        question3.appendChild(document.createElement("br"));
        question3.appendChild(document.createElement("input"));
        questions.appendChild(question3);


        var question4 = document.createElement("div");
        question4.setAttribute('id', 'question4');
        question4.appendChild(document.createElement("label").appendChild(document.createTextNode("Une autre année, après une augmentation de 4 % le nombre d’habitants est de 1612. Quel était le nombre d’habitants avant l’augmentation ?")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info2');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Trouver dans un premier temps le coefficient multiplicateur. Écrire sous forme d’une équation puis la résoudre.";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question4.appendChild(document.createElement("br"));
        question4.appendChild(info);
        question4.appendChild(document.createElement("br"));
        question4.appendChild(document.createElement("input"));
        questions.appendChild(question4);
        //Renommer bouton Continuer

        document.getElementById('submit').setAttribute('value', "Vérifier");
    }
    if (nb_sub == 4) { //afficher correction deuxième exercice
        var questionrep = [];
        var n_question = 4;
        for (var i=0; i<n_question;i++){
            questionrep[i] = clear_string(inputs[i].value);
        }
        var divs = questions.getElementsByClassName("div");
        var valid_rep = [false, false, false, false];
        const questionsol = ["0,95","1539","y=0.95x","1550"];
        const corr = ["./images/corr/seq2exo2que1.png",
                      "./images/corr/seq2exo2que2.png",
                      "./images/corr/seq2exo2que3.png",
                      "./images/corr/seq2exo2que4.png",]

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
           
            //Stocker resulats (table scores)
            var data = '{"id":' + 0 + ', "playerid":' + localStorage.getItem('playerid') + ', "seq":2, "exo":2, "question":' + i + ',"valid":' + valid_rep[i] + ', "answer": "' + questionrep[i] + '" }';
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

        var entete_txt = document.createElement("p").appendChild(document.createTextNode("Anissa (A), Baptiste (B) et Coralie (C) tirent les rois. Ils ont de galettes, une à la frangipane (1), une briochée (2) et chacune contenant une fève."));
        var sub_entete_txt = document.createElement("p").appendChild(document.createTextNode("Les trois amis partagent chaque galette en trois parts égales et mangent  tous une part de chaque galette. On s’intéresse à la répartition des fèves. Donner les résultats sous forme d’une fraction irréductible."));
        entete.appendChild(entete_txt);
        entete.appendChild(document.createElement("br"));
        entete.appendChild(sub_entete_txt);

        //Afficher les questions
        //qeustion 1
        var question1 = document.createElement("div");
        question1.setAttribute('id', 'question1');
        question1.appendChild(document.createElement("label").appendChild(document.createTextNode("Compléter le tableau ci-dessous.")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo3info1');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Attention à l\'ordre de remplissage des cases";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question1.appendChild(document.createElement("br"));
        question1.appendChild(info);
        question1.appendChild(document.createElement("br"));
        var table = document.createElement("table");
        var tr1 = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.appendChild(document.createTextNode("Feve 2 \\ Feve 1"));
        var td2 = document.createElement("td");
        td2.appendChild(document.createTextNode("A"))
        var td3 = document.createElement("td");
        td3.appendChild(document.createTextNode("B"))
        var td4 = document.createElement("td");
        td4.appendChild(document.createTextNode("C"))
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr1.appendChild(td3);
        tr1.appendChild(td4);
        table.appendChild(tr1);

        var tr2 = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.appendChild(document.createTextNode("A"));
        var td2 = document.createElement("td");
        td2.appendChild(document.createTextNode("(A,A)"));
        var td3 = document.createElement("td");
        td3.appendChild(document.createTextNode("(B,A)"));
        var td4 = document.createElement("td");
        td4.appendChild(document.createElement("input"));
        tr2.appendChild(td1);
        tr2.appendChild(td2);
        tr2.appendChild(td3);
        tr2.appendChild(td4);
        table.appendChild(tr2);


        var tr3 = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.appendChild(document.createTextNode("B"));
        var td2 = document.createElement("td");
        td2.appendChild(document.createElement("input"));
        var td3 = document.createElement("td");
        td3.appendChild(document.createElement("input"));
        var td4 = document.createElement("td");
        td4.appendChild(document.createElement("input"));
        tr3.appendChild(td1);
        tr3.appendChild(td2);
        tr3.appendChild(td3);
        tr3.appendChild(td4);
        table.appendChild(tr3);

        var tr4 = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.appendChild(document.createTextNode("C"));
        var td2 = document.createElement("td");
        td2.appendChild(document.createElement("input"));
        var td3 = document.createElement("td");
        td3.appendChild(document.createElement("input"));
        var td4 = document.createElement("td");
        td4.appendChild(document.createElement("input"));
        tr4.appendChild(td1);
        tr4.appendChild(td2);
        tr4.appendChild(td3);
        tr4.appendChild(td4);
        table.appendChild(tr4);

        question1.appendChild(table);
        questions.appendChild(question1);

        var entques = document.createElement("p");
        entques.appendChild(document.createTextNode("Donner la probabilité de chacun des événements :"));
        questions.appendChild(entques);
        //question 2
        var question2 = document.createElement("div");
        question2.setAttribute('id', 'question2');
        question2.appendChild(document.createElement("label").appendChild(document.createTextNode("« Anissa a les deux fèves »")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info2');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Dans une expérience aléatoire où il y a équiprobabilité, la probabilité d\'un événement est égale au quotient du nombre d\'issues favorables permettant à l\'événement de se réaliser par le nombre total d\'issues possibles";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question2.appendChild(document.createElement("br"));
        question2.appendChild(info);
        question2.appendChild(document.createElement("br"));
        question2.appendChild(document.createElement("input"));
        questions.appendChild(question2);

        //question 3
        var question3 = document.createElement("div");
        question3.setAttribute('id', 'question3');
        question3.appendChild(document.createElement("label").appendChild(document.createTextNode("« Coralie a exactement une fève »")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info1');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Dans une expérience aléatoire où il y a équiprobabilité, la probabilité d\'un événement est égale au quotient du nombre d\'issues favorables permettant à l\'événement de se réaliser par le nombre total d\'issues possibles";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question3.appendChild(document.createElement("br"));
        question3.appendChild(info);
        question3.appendChild(document.createElement("br"));
        question3.appendChild(document.createElement("input"));
        questions.appendChild(question3);

        //question 4
        var question4 = document.createElement("div");
        question4.setAttribute('id', 'question4');
        question4.appendChild(document.createElement("label").appendChild(document.createTextNode("« Baptiste n’a pas de fève »")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info2');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Dans une expérience aléatoire où il y a équiprobabilité, la probabilité d\'un événement est égale au quotient du nombre d\'issues favorables permettant à l\'événement de se réaliser par le nombre total d\'issues possibles";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question4.appendChild(document.createElement("br"));
        question4.appendChild(info);
        question4.appendChild(document.createElement("br"));
        question4.appendChild(document.createElement("input"));
        questions.appendChild(question4);

        //question 5
        var question5 = document.createElement("div");
        question5.setAttribute('id', 'question5');
        question5.appendChild(document.createElement("label").appendChild(document.createTextNode("« Anissa a au moins une fève »")));
        var info = document.createElement("p");
        info.setAttribute('id', 'exo1info2');
        info.setAttribute('class', 'info');
        info.appendChild(document.createTextNode("Aide"));
        info.setAttribute('onmouseover', 'this.firstChild.nodeValue = "Dans une expérience aléatoire où il y a équiprobabilité, la probabilité d\'un événement est égale au quotient du nombre d\'issues favorables permettant à l\'événement de se réaliser par le nombre total d\'issues possibles";');
        info.setAttribute('onmouseout', 'this.firstChild.nodeValue = "Aide";');
        question5.appendChild(document.createElement("br"));
        question5.appendChild(info);
        question5.appendChild(document.createElement("br"));
        question5.appendChild(document.createElement("input"));
        questions.appendChild(question5);


        document.getElementById('submit').setAttribute('value', "Vérifier");
    }
    if (nb_sub == 6) { //afficher correction troisième exercice
        var questionrep = [];
        var n_question = 11;
        for (var i=0; i<n_question;i++){
            questionrep[i] = clear_string(inputs[i].value);
        }
        var divs = questions.getElementsByClassName("div");
        var valid_rep = [false, false, false, false, false, false, false, false, false, false, false];
        const questionsol = ["(C,A)","(A,B)","(B,B)","(C,B)","(A,C)","(B,C)","(C,C)","1/9","4/9","4/9","5/9"];
        const corr = ["./images/corr/seq2exo3que1.png",
                      "Correction2",
                      "Correction3",
                      "Correction4",
                      "Correction5",
                      "Correction6",
                      "Correction7",
                      "./images/corr/seq2exo3que2.png",
                      "./images/corr/seq2exo3que3.png",
                      "./images/corr/seq2exo3que4.png",
                      "./images/corr/seq2exo3que5.png"]

        for (var i = 0; i < n_question; i++) {

            if (questionrep[i] == questionsol[i]) {
                valid_rep[i] = true;
                
                if(i<7){
                    if(i==0){
                    var q1 = document.getElementById("question1");
                    q1.appendChild(document.createElement("br"));
                    var correlmt = document.createElement("img");
                    correlmt.setAttribute('src',corr[0]);
                    q1.appendChild(correlmt);
                    q1.style.color = "#05DF2A";
                    q1.style.fontWeight = "bold";
                    
                    }
                }else{
                    var q1 = document.getElementById(("question" + (i-5)));
                    q1.appendChild(document.createElement("br"));
                    var correlmt = document.createElement("img");
                    correlmt.setAttribute('src',corr[i]);
                    q1.appendChild(correlmt);
                    q1.style.color = "#05DF2A";
                    q1.style.fontWeight = "bold";
                }
                
               
            } else {
                
                if(i<7){
                    if(i==0){
                    var q1 = document.getElementById("question1");
                    q1.appendChild(document.createElement("br"));
                    var correlmt = document.createElement("img");
                    correlmt.setAttribute('src',corr[0]);
                    q1.appendChild(correlmt);
                    }
                }else{
                    var q1 = document.getElementById(("question" + (i-5)));
                    q1.appendChild(document.createElement("br"));
                    var correlmt = document.createElement("img");
                    correlmt.setAttribute('src',corr[i]);
                    q1.appendChild(correlmt);
                }
                
            }
        }
        for (var i = 0; i < n_question; i++) {
            
            //Stocker resulats (table scores)
            var data = '{"id":' + 0 + ', "playerid":' + localStorage.getItem('playerid') + ', "seq":2, "exo":3, "question":' + i + ',"valid":' + valid_rep[i] + ', "answer": "' + questionrep[i] + '" }';
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
        localStorage.setItem('exo2state', true);
        
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
    //clean = clean.replace(/./g, ',');
    return clean;
}

