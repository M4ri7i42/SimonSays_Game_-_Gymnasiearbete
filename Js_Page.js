//                  Next on agenda!
// When start is press StartOrRestart button remains



const GameBoard_Container = document.querySelector(".GameBoard_Container");

const TopLeft_Button = document.querySelector(".TopLeft_Button");
const TopRight_Button = document.querySelector(".TopRight_Button");
const BottomLeft_Button = document.querySelector(".BottomLeft_Button");
const BottomRight_Button = document.querySelector(".BottomRight_Button");

const OnOffButton = document.querySelector(".OnOffButton");
const RestartButton = document.querySelector(".RestartButton");
const StartButton = document.querySelector(".StartButton");

const RoundDisplayer = document.querySelector(".RoundDisplayer");
const HighScore_Displayer = document.querySelector(".HighScore_Displayer"); 


const NextOrRestart_Button = document.querySelector(".NextOrRestart_Button");


/*__________________________________________________________________________*/
// Variables below:

let OnOffButton_BootUp_ShutDown = false;
let OnOffButton_Disabled = false;
let StartButton_Disabled = true;
let RestartButton_Disabled = true;


let playerTurn = false;
let playerStep = 0;


let RoundCounter = 0;
let HighScore_Tracker = 0; // Latest

let gameStarted = false; // Changed


let WonRound = false; // NextOrRestart
let LostRound = false; // NextOrRestart


let RestartHasBeenPressed = false;



const names = ["TopLeft_Button", "TopRight_Button", "BottomLeft_Button", "BottomRight_Button"];





//_____________________________________________________________________________
// Button mapping below for game sequences:


const ButtonMap = {
    "TopLeft_Button" : TopLeft_Button,
    "TopRight_Button" : TopRight_Button,
    "BottomLeft_Button" : BottomLeft_Button,
    "BottomRight_Button" : BottomRight_Button
};


TopLeft_Button.addEventListener('click', () => HandlePlayerInput("TopLeft_Button"));
TopRight_Button.addEventListener('click', () => HandlePlayerInput("TopRight_Button"));
BottomLeft_Button.addEventListener('click', () => HandlePlayerInput("BottomLeft_Button"));
BottomRight_Button.addEventListener('click', () => HandlePlayerInput("BottomRight_Button"));


//______________________________________________________________________________

let roundOne = [
    RandomSequenceGenerator(),
    RandomSequenceGenerator(),
    RandomSequenceGenerator(),
    RandomSequenceGenerator()
]






//__________________________________________________________________________
// Linkings below:




OnOffButton.addEventListener('click', function() {
    if (OnOffButton_Disabled) return;

    OnOffButton_BootUp_ShutDown = !OnOffButton_BootUp_ShutDown;
    
    if (OnOffButton_BootUp_ShutDown === true)
    {
        BootUP();    

    }

    else
    {
        console.log("Console has been turned off");
        ShutDown();
    }
});



StartButton.addEventListener('click', function() {
    
    if (OnOffButton_BootUp_ShutDown == true && StartButton_Disabled == false)
    {
        RestartButton_Disabled = false;
        RestartButton.style.backgroundColor = "var(--GameBoard_Logo_OnOffButton_bg-color)"
        gameStarted = true; // Changed

        NextOrRestart_Button.style.display = "";



        console.clear();
        console.log("Game start!");
        playSequence(roundOne);
    }

});




RestartButton.addEventListener('click', function() {

    if (OnOffButton_BootUp_ShutDown == true && RestartButton_Disabled == false)
    {
        NextOrRestart_Button.style.display = "";        


        console.clear();
        console.log("Game resetting...");
        RestartGame();

        setTimeout(() => {
            console.log("Game has been reset, please press Start");
            StartButton_Disabled = false;
            StartButton.style.backgroundColor = "grey";
        }, 1500);
    }
});



NextOrRestart_Button.addEventListener('click', function() { // NextOrRestart
    if (WonRound === true)
    {
        NextRound();
    }
    
    if (LostRound === true)
    {
        GameOver(); 
    }

    if (RestartHasBeenPressed === true)
    {
        NextOrRestart_StartGame();

    }

    
});





//____________________________________________________________________________
// Adding border to the four quarter pieces when pressed below:

TopLeft_Button.addEventListener('click', function() {
    
    
    setTimeout(() => {
        TopLeft_Button.style.outline = "solid black 2px";
    });

    setTimeout(() => {
        TopLeft_Button.style.outline = "";
        
    }, 100);
    
});

TopRight_Button.addEventListener('click', function() {
    
    
    setTimeout(() => {
        TopRight_Button.style.outline = "solid black 2px";
    });

    setTimeout(() => {
        TopRight_Button.style.outline = "";
        
    }, 100);
    
});



BottomLeft_Button.addEventListener('click', function() {
    
    
    setTimeout(() => {
        BottomLeft_Button.style.outline = "solid black 2px";
    });

    setTimeout(() => {
        BottomLeft_Button.style.outline = "";
        
    }, 100);
    
});


BottomRight_Button.addEventListener('click', function() {
    
    
    setTimeout(() => {
        BottomRight_Button.style.outline = "solid black 2px";
    });

    setTimeout(() => {
        BottomRight_Button.style.outline = "";
        
    }, 100);
    
});














//__________________________________________________________________________
// BootUP/ShutDown functions below:


function BootUP()
{
    console.clear("");
    console.log("System booting up...");
    GameButtonsLocked();

    setTimeout(() => {
        TopLeft_Button.style.filter = "brightness(150%)";
    }, 500);

    setTimeout(() => {
        TopRight_Button.style.filter = "brightness(150%)";
    }, 750);

    setTimeout(() => {
        BottomRight_Button.style.filter = "brightness(150%)";
    }, 1000);

    setTimeout(() => {
        BottomLeft_Button.style.filter = "brightness(150%)";
    }, 1250);



    setTimeout(() => {
        TopLeft_Button.style.filter = "brightness(300%)";
        TopRight_Button.style.filter = "brightness(300%)";
        BottomRight_Button.style.filter = "brightness(300%)";
        BottomLeft_Button.style.filter = "brightness(300%)";
    }, 1500);

    setTimeout(() => {
        TopLeft_Button.style.filter = "";
        TopRight_Button.style.filter = "";
        BottomRight_Button.style.filter = "";
        BottomLeft_Button.style.filter = "";
        
        GameButtonsUnlocked()
        console.log("System has booted up");
    }, 1750);

}



function ShutDown()
{
    console.clear();
    console.log("System shutting down...");
    GameButtonsLocked();

    setTimeout(() => {
        TopLeft_Button.style.filter = "brightness(150%)";
        TopRight_Button.style.filter = "brightness(150%)";
    }, 500);

    setTimeout(() => {
        BottomLeft_Button.style.filter = "brightness(150%)";
        BottomRight_Button.style.filter = "brightness(150%)";
    }, 750);


    setTimeout(() => {
        TopLeft_Button.style.filter = "";
        TopRight_Button.style.filter = "";
        BottomLeft_Button.style.filter = "";
        BottomRight_Button.style.filter = "";
        
        OnOffButton_Disabled = false;
        OnOffButton.style.backgroundColor = "";

        console.log("System has been shutdown");

    }, 1000);
}

//_____________________________________________________________
// Rest of the function below:

function GameButtonsUnlocked()
{
    console.log("GameButtons unlocked!");
    OnOffButton_Disabled = false;
    StartButton_Disabled = false;
    RestartButton_Disabled = false;

    OnOffButton.style.backgroundColor = "";
    StartButton.style.backgroundColor = "var(--GameBoard_Logo_OnOffButton_bg-color)";
    RestartButton.style.backgroundColor = "var(--GameBoard_Logo_OnOffButton_bg-color)";
}


function GameButtonsLocked()
{
    console.log("GameButtons locked!");
    OnOffButton_Disabled = true;
    StartButton_Disabled = true;
    RestartButton_Disabled = true;

    OnOffButton.style.backgroundColor = "var(--GameBoard_Logo_Button_bg-color)"; 
    StartButton.style.backgroundColor = "";
    RestartButton.style.backgroundColor = "";
}










function playSequence(sequence) 
{
    playerTurn = false;
    let i = 0;

    RoundCounter++;
    RoundDisplayer.textContent = `Current round: ${RoundCounter}`;

    if (RoundCounter > HighScore_Tracker)
    {
        HighScore_Displayer.textContent = `New Record: ${RoundCounter}`;
    }
    else 
    {
        HighScore_Displayer.textContent = `Highscore: ${HighScore_Tracker}`;
    }

    GameButtonsLocked();

    const interval = setInterval(() => {
        let buttonName = sequence[i];
        FlashButton(buttonName);
        i++;

        if (i >= sequence.length) 
        {
            clearInterval(interval);

            setTimeout(() => 
            {
                playerTurn = true;
                playerStep = 0;
                GameButtonsUnlocked();

                StartButton_Disabled = true;
                StartButton.style.backgroundColor = "";

                console.log("Player's turn: Active");
            }, 600);
        }   

    }, 800);
}


function FlashButton(buttonName) {
    const btn = ButtonMap[buttonName];

    btn.style.filter = "brightness(200%)";


    setTimeout(() => {
        btn.style.filter = "";
    }, 400);

}










function HandlePlayerInput(buttonName) 
{
    if (!playerTurn) return;

    FlashButton(buttonName);

    if (buttonName === roundOne[playerStep])
    {
        playerStep++;

        if (playerStep === roundOne.length)
        {
            console.log("Player completed the sequence!");
            GameButtonsLocked();
            NewWaveSequence();
            SequenceCompleted();
        }
    }

    else 
    {
        if (HighScore_Tracker === 0)
        {
            HighScore_Tracker = RoundCounter;
            HighScore_Displayer.textContent = `Highscore: ${HighScore_Tracker}`;
        }

        if (RoundCounter > 0 && RoundCounter > HighScore_Tracker) 
        {
            HighScore_Tracker = RoundCounter;
            HighScore_Displayer.textContent = `Highscore: ${HighScore_Tracker}`;
        }

        SequenceFailed();
        console.log("Oh... That's not the one... Game Over");
        StartButton_Disabled = true;
        StartButton.style.backgroundColor = "";
        playerTurn = false;



    
    }

}









function RandomSequenceGenerator()
{
    return names[Math.floor(Math.random() * names.length)];

}



function NewWaveSequence()
{
    return roundOne.push(RandomSequenceGenerator());
}






function RestartGame()
{
    RoundCounter = 0;
    RoundDisplayer.textContent = "Current round: ";

    RestartButton_Disabled = true;
    RestartButton.style.backgroundColor = "";

    roundOne = [];
    roundOne = [
        RandomSequenceGenerator(),
        RandomSequenceGenerator(),
        RandomSequenceGenerator(),
        RandomSequenceGenerator()
    ];

}




function SequenceCompleted()
{
    setTimeout(() =>{
        TopLeft_Button.style.filter = "brightness(150%)";
        TopRight_Button.style.filter = "brightness(150%)";
        BottomLeft_Button.style.filter = "brightness(150%)";
        BottomRight_Button.style.filter = "brightness(150%)";
    }, 500);

    setTimeout(() => {
        TopLeft_Button.style.filter = "";
        TopRight_Button.style.filter = "";
        BottomLeft_Button.style.filter = "";
        BottomRight_Button.style.filter = "";
    }, 1000);

    setTimeout(() => {
        TopLeft_Button.style.filter = "brightness(150%)";
        TopRight_Button.style.filter = "brightness(150%)";
        BottomLeft_Button.style.filter = "brightness(150%)";
        BottomRight_Button.style.filter = "brightness(150%)";
    }, 1200);

    setTimeout(() => {
        TopLeft_Button.style.filter = "";
        TopRight_Button.style.filter = "";
        BottomLeft_Button.style.filter = "";
        BottomRight_Button.style.filter = "";

        GameButtonsUnlocked();
        WonRound = true;
        NextOrRestart_Button.style.display = "block";
        NextOrRestart_Button.textContent = "Next Round >>";
        NextOrRestart_Button.style.fontWeight = "bold";
        NextOrRestart_Button.style.fontSize = "28px";
    }, 1700);
}

function SequenceFailed()
{
    setTimeout(() => {
    

        TopLeft_Button.style.filter = "brightness(150%)";
        TopRight_Button.style.filter = "brightness(150%)";
        BottomLeft_Button.style.filter = "brightness(150%)";
        BottomRight_Button.style.filter = "brightness(150%)";
    });

    setTimeout(() => {
        TopLeft_Button.style.filter = "";
        TopRight_Button.style.filter = "";
        BottomLeft_Button.style.filter = "";
        BottomRight_Button.style.filter = "";
        
        
        
    }, 1000);

    setTimeout(() => {
        LostRound = true;
        NextOrRestart_Button.style.display = "block"; // NextOrRestart
        NextOrRestart_Button.style.fontSize = "28px";
        NextOrRestart_Button.style.fontWeight = "bold";
        NextOrRestart_Button.textContent = "Reset Game >>";
    }, 1500);
}





function NextRound() // NextRound
{
    WonRound = false;
    NextOrRestart_Button.style.display = "";

    console.clear();
    console.log("Game start!");
    playSequence(roundOne);
}


function GameOver() // NextOrRestart
{
    LostRound = false;
    NextOrRestart_Button.style.display = "";

    console.clear();
    console.log("Game resetting...");
    RestartGame();

    setTimeout(() => {
        console.log("Game has been reset, please press Start");
        StartButton_Disabled = false;
        StartButton.style.backgroundColor = "grey";

        NextOrRestart_Button.style.display = "block";
        NextOrRestart_Button.textContent = "Start Game >>";
        RestartHasBeenPressed = true; // NextOrRestart
    }, 1500);
}


function NextOrRestart_StartGame()
{
    console.clear();
    console.log("Game start!");
    playSequence(roundOne);

    RestartHasBeenPressed = false;
    NextOrRestart_Button.style.display = "";
}










