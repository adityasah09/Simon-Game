var buttonColors=["green","yellow","red","blue"];
var pattern=[];
var user=[];
var started=false;
var level=0;

function nextSequence() {
    user = [];
    level++
    $("#level-title").html("Level "+level);
    let idx=Math.floor((Math.random() *3));
    let chosenColor=buttonColors[idx];
    pattern.push(chosenColor);
    animation(chosenColor);

}
$(document).keypress(function(e){
    $(".score").css("display","none");
    if(!started){
        $("#level-title").html("Level "+level);
        started=true;
        setTimeout(function(){
            nextSequence();
        },1000);
    }
});

$(".btn").click(function(){
    var user_color=$(this).attr("id");
    user.push(user_color);
    animation(user_color);
    checkAnswer(user.length-1);
});
        
function checkAnswer(index){
    if(pattern[index]!==user[index]){
        playSound("wrong1");
        $("body").addClass("game-over");
        $("#level-title").html("Game Over !! Enter any Key to restart");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        },1000);

        $(".score").css("display","block");
        $(".points").html("");
        $(".points").append("Your Score is  "+(level));
        startOver();
    }
    else if(pattern[index]===user[index]){
        if(pattern.length===user.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }

}


function playSound( color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}
function animation(color){
    $("."+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },500);
    playSound(color);
}
function startOver(){
    pattern=[];
    level=0;
    started=false;
}