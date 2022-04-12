$("body").css("height", window.innerHeight);
$("body").css("width", window.innerWidth);
var chickimg;
var chickensCont = [];
var chickensLeftPosition = [];
var chickensTopPosition = [];
var bulletPosition;
var bulletTop;
var bulletLeft;
var chickenspos;
var x;
var y;
var a;
var b;
var bullet = document.getElementById("bullet");
var output = document.getElementById("output");
var score = 0;

function addChickenImg() {
  var o = Math.round(Math.random() * 1300);
  var i = Math.round(Math.random() * 200);
  chickimg = document.createElement("img");
  $(chickimg).attr("class", "chicken");
  $(chickimg).attr("src", "images/chicken.png");
  $(chickimg).css("height", "80");
  $(chickimg).css("width", "80");
  $(chickimg).css("position", "absolute");
  $(chickimg).css("left", o);
  $(chickimg).animate({ top: "10" }, 1000);
  $(chickimg).css("transition", "all 4s");
  $("body").append(chickimg);
  $(chickimg).animate({ top: "+=700px" }, function() {
    $(this).remove();
  });
  chickensCont = document.getElementsByClassName("chicken");
}

var myvar = setInterval(function() {
  addChickenImg();
}, 1000);

setTimeout(function() {
  clearInterval(myvar);
}, 10000);

var myvar2 = setInterval(function() {
  getPositionOfChicken();
}, 0);

setTimeout(function() {
  clearInterval(myvar2);
}, 10000);

var moveHandler = null;

function move(e) {
  let moveHandler = setInterval(() => {
    if (e.keyCode == 37) {
      $(".rocket-bullet").css("left", "-=30");
    }

    if (e.keyCode == 39) {
      $(".rocket-bullet").css("left", "+=30");
    }

    if (e.keyCode == 38) {
      $(".rocket-bullet").css("top", "-=30");
    }

    if (e.keyCode == 40) {
      $(".rocket-bullet").css("top", "+=30");
    }

    if (e.keyCode == 32) {
      $("#bullet").css("display", "inline");
      $("#bullet").css("top", "-=500");

      var clearintervalforbullet = setInterval(function() {
        getPositionOfBullet();
      }, 100);

      setTimeout(function() {
        clearInterval(clearintervalforbullet);
      }, 1000);

      var clearintervalforkill = setInterval(function() {
        killChicken();
      }, 100);

      setTimeout(function() {
        clearInterval(clearintervalforkill);
      }, 1000);
    }
  }, 0);

  return moveHandler;
}

window.addEventListener("keydown", function(e) {
  clearInterval(moveHandler);
  moveHandler = move(e);
});

window.addEventListener("keyup", function() {
  clearInterval(moveHandler);
});

window.addEventListener("keydown", function(e) {
  if (e.keyCode == 32) {
    $("#bullet").css("display", "none");
    $("#bullet").css("top", "0");
  }
});

/*
function killImage(){
	
for(var i=0;i<chickensLeftPosition.length;i++){
		
if(chickensLeftPosition[i]==bulletLeft && chickensTopPosition[i]==bulletTop){
	
	
$(chickimg).attr("src","images/deadgiphy.gif");
	
console.log("ok");

}		
}	
}
*/

function getPositionOfBullet() {
  x = Math.round(bullet.getBoundingClientRect().left);
  y = Math.round(bullet.getBoundingClientRect().top);

  //console.log("bulletleft:"+x+"  "+"bullettop:"+y);
}

function getPositionOfChicken() {
  for (var i = 0; i < chickensCont.length; i++) {
    b = chickensCont[i].offsetLeft;
    a = chickensCont[i].offsetTop;

    //console.log("chickenleft:"+b+"  "+"chickentop:"+a);
  }
}

function killChicken() {
  var z = Math.abs(x - b);

  console.log(x, b);
  if ((x == b || z == 50) && a < window.innerHeight - 200) {
    score++;
    console.log(x + " " + b);
    $(chickimg).attr("src", "images/deadgiphy.gif");
    //setTimeout(function(){$(chickimg).remove()},500);
    console.log("done");
    output.innerHTML = score;
  }
}
