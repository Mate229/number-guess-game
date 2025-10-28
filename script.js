function GameNumber() {
    const gameNumber = Math.floor(Math.random() * 100) + 1;

    const getNumber = () => gameNumber;

    return {getNumber}
};

let guessCount = 0;

function GameController() {

    const secretNumber  = GameNumber().getNumber();

    function guessNumber(number) {
        // number = Number(prompt("Enter your number: "));

        // while (number !== secretNumber) {
        //     if (number < secretNumber) {
        //         alert("Higher");
        //         guessCount++;
        //     } else {
        //         alert("Lower");
        //         guessCount++;
        //     };
        //     // number = Number(prompt("Enter your number: "));

        //     if (guessCount === 5) {
        //         if (number === secretNumber) {
        //             alert("Congrats! You guessed it")
        //         } else {
        //             alert("GameOver, You've passed 5 guesses");
        //         };
        //         break;
        //     }
        // };
        // if (number === secretNumber) {
        //     alert("Congrats! You guessed it")
        // };

        if (number === secretNumber) {
            // alert("Congrats! You guessed it");
            statusUpdate.textContent = "Congrats! You guessed it";
            triesLeft.textContent = "Click 'Reset Game' to start a new game."
            statusUpdate.classList.add("win");
            statusUpdate.classList.remove("hint")
            guess.disabled = true;
            startGame.disabled = true;
        } else {
            if (number < secretNumber) {
                // alert("Higher");
                statusUpdate.classList.add("hint");
                triesLeft.textContent = `You have ${6 - guessCount - 1} trials left.`
                statusUpdate.textContent = "Higher"
                numberInput.focus();
                numberInput.value = "";
                guessCount++;
            } else {
                // alert("Lower");
                triesLeft.textContent = `You have ${6 - guessCount - 1} trials left.`
                statusUpdate.textContent = "Lower"
                statusUpdate.classList.add("hint");
                numberInput.focus();
                numberInput.value = "";
                guessCount++;
            };
        }
    }

    numberInput.focus();
    numberInput.value = "";
    return {guessNumber, secretNumber};

};

const startGame = document.querySelector(".start");
const resetGame = document.querySelector(".reset")

const statusUpdate = document.querySelector(".status");
statusUpdate.textContent = "Click 'Start Game' to start."

const triesLeft = document.querySelector(".tries");
triesLeft.textContent = "You have 6 trials. Good Luck!"

const numberInput = document.querySelector("#numberInput");
const guess = document.querySelector(".guess");

function GameDisplay() {
    const game = GameController();

    function getUserNumber() {
        const userNumber = Number(numberInput.value);

        return {userNumber};
    }

    function handleGuessClick() {

        game.guessNumber(getUserNumber().userNumber);

        if (guessCount === 6) {
            if(getUserNumber().userNumber === game.secretNumber) {
                // alert("Congrats! You guessed it");
                statusUpdate.textContent = "Congrats! You guessed it";
                triesLeft.textContent = "Click 'Reset Game' to start a new game.";
                statusUpdate.classList.remove("hint");
                statusUpdate.classList.add("win");
                guess.disabled = true;
                startGame.disabled = true;
            } else {
                guess.disabled = true;
                startGame.disabled = true;
                // alert("Game Over! You've passed 5 guesses");
                statusUpdate.textContent = "Game Over! You've reached 6 guesses";
                triesLeft.textContent = "Click 'Reset Game' to start a new game.";
                statusUpdate.classList.remove("hint");
                statusUpdate.classList.add("loose");
            }
        }
    }

    guess.addEventListener("click", handleGuessClick);
    numberInput.addEventListener("keypress", (e) => {
        if (e.code === "Enter" && guess.disabled === false) {
            handleGuessClick();
        }
    })

    return {handleGuessClick}
}

startGame.addEventListener("click", () => {
    statusUpdate.textContent = "Processing......"
    GameDisplay();
    guess.disabled = false;
    guessCount = 0;
    numberInput.value = "";
    startGame.disabled = true;
});

resetGame.addEventListener("click", () => {
    window.location.reload();
});

