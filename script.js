console.log("hi")

const charDiv = document.getElementById("char")
let totalPts = 0

let starMovingArr = []
let starTouchArr = []
document.addEventListener('keydown', (event) => {
    let keyName = event.key

    if(keyName.includes("Left") || keyName.includes("Right")){
        var keyMoveDistance = 80;

        var leftOffset = charDiv.offsetLeft
        if(keyName.includes("Left")){
            keyMoveDistance *= -1 ;
            char.style.transform = "scaleX(-1)"
        }
        else{
            char.style.transform = "scaleX(1)"
        }
        leftOffset = leftOffset + keyMoveDistance;
        charDiv.style.left = leftOffset.toString() + "px";
    }
})

//generate stars
var beginGame = null
beginStarGenerating()
function beginStarGenerating(){
    beginGame = window.setInterval(function(){
        addStar()
    }, 1900);
}
function stop(){
    clearInterval(beginGame)
    console.log(starMovingArr.length)
    starMovingArr.forEach(element => {
        clearInterval(element)
    });
    starTouchArr.forEach(element => {
        clearInterval(element)
    });
}

//make star and move it
function addStar(){
    // create a new div element
    console.log("add star was run")
    const star = document.createElement('div');
    star.setAttribute("class", "star-item");

    //randomly place star
    let leftNum = getRandomIntInclusive(1,94)
    star.style.top = "0vh"
    star.style.left = leftNum + "vw"


    document.body.insertBefore(star, char)
    moveStar(star)
}


//star starts moving down
function moveStar(star){
    var intervalId = window.setInterval(function(){
        let topOffset = star.offsetTop

        let height = window.innerHeight
        //if it is in the height to touch the character
        let topWhenCharTouches = height*0.8 - star.offsetHeight
        if(topOffset > topWhenCharTouches){
            startSeeingIfCharTouches(star)
        }

        //stop if it goes to the end
        if(topOffset > window.innerHeight){
            clearInterval(intervalId)
            star.remove()
            stop()
            death()
        }
        topOffset = topOffset + 30
        star.style.top = topOffset + "px"
    }, 70);

    starMovingArr.push(intervalId)
}



function startSeeingIfCharTouches(star){
    var starCharTouch = window.setInterval(function(){
        console.log("running")
        let didTouch = is_colliding(star)
        if (didTouch){
            console.log("touched")
            clearInterval(starCharTouch)
            star.remove()
            addPoint()
        }
        else if(star.offsetTop > window.innerHeight){
            clearInterval(starCharTouch)
            
        }
    }, 100);
    starTouchArr.push(starCharTouch)
}

var is_colliding = function(star) {
    let starLeft = star.offsetLeft
    let starWidth = star.offsetWidth

    let charLeft = char.offsetLeft
    let charWidth = char.offsetWidth
    
    if(charLeft < starLeft){
        let charRight = charLeft + charWidth

        let touched = starLeft >= charLeft && starLeft <= charRight
        return touched;
    }
    else{
        let starRight = starLeft + starWidth

        let touched = charLeft >= starLeft && charLeft <= starRight

        return touched;
    }
  };

//check if star and char touched
function starTouchedChar(star){
    var star_height = star.offsetHeight;
    var star_width = star.offsetWidth;
    var star_top = star.offsetTop + star_height;
    var star_left = star.offsetLeft + star_width;
  
    var char_height = char.offsetHeight;
    var char_width = char.offsetWidth;
    var char_top = char.offsetTop + char_height;
    var char_left = char.offsetLeft + char_width;
  
    var not_colliding =
      star_top < char.offsetTop ||
      star.offsetTop > char_top ||
      star_left < char.offsetTop ||
      star.offsetLeft > char_left;
  
    return !not_colliding;
}

let deathMsg = document.getElementById("death-msg")
function death(){
    deathMsg.style.display = "block"
}

function restart(){
    totalPts = 0
    ptsText.innerHTML = "points: " + totalPts

    let stars = document.getElementsByClassName("star-item")
    Array.from(stars).forEach(star => {
        star.remove()
    });
    deathMsg.style.display = "none"
    beginStarGenerating()
}
let ptsText = document.getElementById("point-text")

function addPoint(){
    totalPts += 1;
    ptsText.innerHTML = "points: " + totalPts
}

//getting random int
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}