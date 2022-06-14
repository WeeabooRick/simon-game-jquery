var gamePattern = [];
var userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"]
const timer = ms => new Promise(res => setTimeout(res, ms));

var gameStarted = false;
var currentLevel = 0;

$(document).keypress(function()
{
    startGame();
});

$(".btn").click(function()
{
    clickHandler(this);
});

function startGame()
{
    gameStarted = true;
    if(gameStarted)
    {
        userClickedPattern = [];
        changeLevelText(currentLevel);
        nextSequence();
    }
}

function clickHandler(clickedButton)
{
    var userClickedColour = $(clickedButton).attr("id");
    playSound(userClickedColour);
    animatePress(userClickedColour);
    userClickedPattern.push(userClickedColour);
    checkAnswer(userClickedPattern.length - 1);
}

async function showCurrentSequence()
{
    for (var i = 0; i < gamePattern.length; i++)
    {
        fadeAnimation(gamePattern[i]);
        playSound(gamePattern[i]);
        await timer(500);
    }
}

function nextSequence()
{
    currentLevel++;
    userClickedPattern = [];
    changeLevelText(currentLevel);
    var randomChosenColour = buttonColours[getRandomInt(0, 4)];
    gamePattern.push(randomChosenColour);
    showCurrentSequence();
}

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function playSound(soundName)
{
    var audio = new Audio("sounds/" + soundName + ".mp3");
    audio.play();
}

function changeLevelText(level)
{
    $("h1").text("Level " + level);
}

function fadeAnimation(buttonName)
{
    $("#" + buttonName).fadeIn(100).fadeOut(100).fadeIn(100);
}

async function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");
    await timer(100);
    $("#" + currentColour).removeClass("pressed");
}

async function checkAnswer(currentLevel)
{
    if (gameStarted)
    {
        if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
        {
            if(userClickedPattern.length == gamePattern.length)
            {
                console.log("Correct");
                await timer(1000);
                nextSequence();
            }
        }
        else
        {
            console.log("Wrong");
            endGame();
        }
    }

}

async function endGame()
{
    playSound("wrong");
    gamePattern = [];
    currentLevel = 0;
    $("body").addClass("game-over");
    await timer(200);
    $("body").removeClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    gameStarted = false;

}


