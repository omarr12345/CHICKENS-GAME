$("body").css("height", window.innerHeight);
$("body").css("width", window.innerWidth);
// var chickimg;
var chickensCont = [];
var chickensLeftPosition = [];
var chickensTopPosition = [];
var bulletPosition;
var bulletTop;
var bulletLeft;
var chickenspos;

var a;
var b;
var bullet = document.getElementById("bullet");
var output = document.getElementById("output");
var score = 0;

function addChickenImg() {
  var o = Math.round(Math.random() * 1300);
  var i = Math.round(Math.random() * 200);
  let chickimg = document.createElement("img");
  $(chickimg).attr("class", "chicken");
  $(chickimg).attr("src", "images/chicken.png");
  $(chickimg).css("height", "80");
  $(chickimg).css("width", "80");
  $(chickimg).css("position", "absolute");
  $(chickimg).css("left", o);
  $(chickimg).css("transition", "all 4s");
  $(chickimg).animate({ top: "10" }, 1000);
  $(chickimg).animate({ top: "+=700px" });
  $("body").append(chickimg);
  chickensCont = document.querySelectorAll(".chicken:not(.dead)");
  setTimeout(() => {
    $(chickimg).remove();
  }, 3500);
}

var myvar = setInterval(function() {
  addChickenImg();
}, 1000);

setTimeout(
  function() {
    clearInterval(myvar);
  },

  100000
);

var moveHandler = null;

function move(e) {
  if (e.keyCode == 32) {
    let previous = $("#bullet.copy");

    if (previous.length && previous.position().top <= 0) {
      previous.remove();
    }
    var $bullet = `<img id="bullet" src="images/Bi.png" class="copy img-fluid" style="left: ${
      $("#bullet").offset().left
    }px"/>`;

    $(".rocket-bullet").append($bullet);
    $("#bullet").css("display", "inline");
    killChicken();
  }

  let moveHandler = setInterval(() => {
    if (e.keyCode == 37) {
      if ($(".rocket-bullet").position().left >= 10) {
        $(".rocket-bullet").css("left", "-=30");
      }
    }

    if (e.keyCode == 39) {
      if (window.innerWidth - $(".rocket-bullet").position().left >= 210) {
        $(".rocket-bullet").css("left", "+=30");
      }
    }

    if (e.keyCode == 38) {
      if ($(".rocket-bullet").position().top >= 50) {
        $(".rocket-bullet").css("top", "-=30");
      }
    }

    if (e.keyCode == 40) {
      if (window.innerHeight - $(".rocket-bullet").position().top >= 200) {
        $(".rocket-bullet").css("top", "+=30");
      }
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

function getPositionOfBullet() {
  let l = Math.round($("#bullet.copy").position().left);
  let t = Math.round($("#bullet.copy").position().top);

  return [l, t];
}

function getPositionOfChicken() {
  //   for (var i = 0; i < chickensCont.length; i++) {
  //     b = chickensCont[i].offsetLeft;
  //     a = chickensCont[i].offsetTop;
  //     //console.log("chickenleft:"+b+"  "+"chickentop:"+a);
  //   }
}

function killChicken() {
  let [l, t] = getPositionOfBullet();
  console.log(Math.round($("#bullet.copy").position().left));

  for (var i = 0; i < chickensCont.length; i++) {
    b = $(chickensCont[i]).offset().left;
    a = chickensCont[i].offsetTop;
    var z = l - b;
    // console.log(l + " " + b);
    //&& a < window.innerHeight - 200
    if (l == b || (z <= 50 && z >= -40)) {
      if (!$(chickensCont[i]).hasClass("dead")) {
        score++;
      }
      $(chickensCont[i]).attr("src", "images/deadgiphy.gif");
      $(chickensCont[i]).addClass("dead");

      setTimeout(() => {
        $("#bullet.copy").remove();
      }, 500);
      output.innerHTML = score;
      return;
    }
  }
}
