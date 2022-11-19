//var api_url = "http://83.194.254.189:8000";
var api_url = "http://localhost:8000";

$("#exo2").submit(function(event){
    event.preventDefault();
    var leverid = localStorage.getItem('lastLeverClicked');
    const inputs = document.getElementById("exo2").elements;
    const question1 = inputs["question1"].value;
    console.log("exo2");
     if (question1 == "dd"){
        localStorage.setItem('exo2state', true);
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
        localStorage.setItem('exo2state', false);
     }
     location.href = '../game.html';
});
