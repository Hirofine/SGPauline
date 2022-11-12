$("#exo1").submit(function(event){
    event.preventDefault();
    const inputs = document.getElementById("exo1").elements;
    const question1 = inputs["question1"].value;
     if (question1 == "dd"){
        localStorage.setItem('exo1state', true);
     }
     else {
        localStorage.setItem('exo1state', false);
     }
     location.href = '../game.html';
});