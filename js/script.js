const summary = {
    numbers: 0, //liczba gier
    wins: 0, //liczba zwyciestw
    losses: 0, //liczba przegranych
    draws: 0 //liczba remisow
};

const game = {
    playerHand: "",
    aiHand: "",
    playerHandHTML: ""
}

const hands = [...document.querySelectorAll(".main__box img")];
const button = document.querySelector(".button");

// function handSelection() {
//     console.log(this)
// }

// bez this

handSelection = (e) => {
    // console.log(e.target.dataset.option);

    game.playerHand = e.target.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = '');
    e.target.style.boxShadow = '0 0 0 4px yellow';
}

function aiChoice() {
    const aiHand = hands[Math.floor(Math.random() * hands.length)].dataset.option;

    return aiHand;
}

function checkResult(player, ai) {
    if (player === ai) {
        return "draw";
    } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
        return "win";
    } else {
        return "loss";
    }
}

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;

    document.querySelector("p.numberOfGames span").textContent = ++summary.numbers;

    if (result === "win") {
        document.querySelector("p.numberOfWins span").textContent = ++summary.wins;
        document.querySelector('[data-summary="who-win"]').textContent = "użytkownik";
    } else if (result === "draw") {
        document.querySelector("p.numberOfDraws span").textContent = ++summary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = "remis";
    } else {
        document.querySelector("p.numberOfDefeats span").textContent = ++summary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = "komputer";
    }
}

function endGame() {
    document.querySelector(`[data-option=${game.playerHand}]`).style.boxShadow = "";
    game.playerHand = "";
}
const startGame = () => {
    if (!game.playerHand) return alert("wybierz dłoń!!!");

    game.aiHand = aiChoice();

    const gameResult = checkResult(game.playerHand, game.aiHand);
    console.log(gameResult);

    publishResult(game.playerHand, game.aiHand, gameResult);

    endGame();
}




hands.forEach(hand => hand.addEventListener('click', handSelection));
button.addEventListener('click', startGame);