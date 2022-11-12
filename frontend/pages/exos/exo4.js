$("#exo4").submit(function(event){
    event.preventDefault();
    var leverid = localStorage.getItem('lastLeverClicked');
    const inputs = document.getElementById("exo1").elements;
    const question1 = inputs["question1"].value;

     if (question1 == "dd"){
        localStorage.setItem('exo4state', true);
        var data = '{}';  
        $.ajax({type:"PUT",
            url: "http://127.0.0.1:8000/leverroom/" + leverid + "?state=true", 
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
        localStorage.setItem('exo4state', false);
     }
     location.href = '../game.html';
});
