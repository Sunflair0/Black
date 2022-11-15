// //////functions hidden instead of removed so you can turn 'visible' on for easy troubleshooting with liveserver

const deck = [];
let games = 0;
let win = 0;
let lose = 0;
let tie = 0;
let suites = ["hearts", "diamonds", "spades", "clubs"];
let faces = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
let playerHand = [];
let computerHand = [];
let hand = [];
let playerPoints = 0;
let computerPoints = 0;
let userName = "";
let img = [];


const aceCheck = Object.values(playerHand).includes("ace");
const AceCheck = Object.values(computerHand).includes("ace");

// //////local storage

let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#checkbox');

// //////Theme Toggle

const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem('darkMode', 'enabled');
});

// //////back of card select

function deckChoice() {
    if (document.getElementById('back0').checked) {
        document.getElementById('chosenOne').src = './asset/cardBack0.png';
    }
    if (document.getElementById('back1').checked) {
        document.getElementById('chosenOne').src = './asset/cardBack1.png';
    }
    if (document.getElementById('back2').checked) {
        document.getElementById('chosenOne').src = './asset/cardBack2.png';
    }
    if (document.getElementById('back3').checked) {
        document.getElementById('chosenOne').src = './asset/cardBack3.png';
    }
    if (document.getElementById('back4').checked) {
        document.getElementById('chosenOne').src = './asset/cardBack4.png';
    }
    if (document.getElementById('back5').checked) {
        document.getElementById('chosenOne').src = './asset/cardBack5.png';
    }

} deckChoice();

// //////feedback bar message

function statusMessage(msg) {
    let container = document.querySelector("#feedbackbar");
    container.innerText = msg;
}

// //////age screening

newGame();

function newGame() {
    statusMessage("");
    statusMessage("Welcome to a game similar to Blackjack.\nKeep your money in your pocket and play your cards to get 21.\nDealer will stay on 17, but you must be 18 or older to play.\n\nBefore we get started, please enter your date of birth below.");
    document.getElementById("birthday__input").style.visibility = "visible";
}

let = bday = document.querySelector("#bday");
document.getElementById("date").addEventListener("click", verAge);

const format = "MM/DD/YYYY";
const resultFormat = "years";

function verAge(e) {
    e.preventDefault();
    let eighteenYearsAgo = moment().subtract(18, "years");
    let birthday = moment(bday.value);

    if (!birthday.isValid()) {
        statusMessage(`You have entered an invalid date. Please use the format shown.`);
        newGame();
    } else {
        if (eighteenYearsAgo.isAfter(birthday)) {
            {
                userName = prompt("Please enter your name  ");
                preStart();
            }
        } else {
            function somewhereElse(e) {
                e.preventDefault();
                location.replace("https://hsreplay.net/cards/?hl=en");
            }

            statusMessage(
                "You shall not pass!!\nYou must be at least 18 years old to play.\nEnjoy this site instead: "
            );

            let denyentry = document.createElement("button");
            denyentry.innerText = "Click";
            denyentry.addEventListener("click", somewhereElse);
            document.getElementById("feedbackbar").append(denyentry);
        }
    }
}

// //////game setup

function preStart() {
    playerPoints = 0;
    computerPoints = 0;
    playerHand = [];
    computerHand = [];
    document.getElementById("birthday__input").style.display = "none";


    if (userName) {
        document.getElementById("btnPlay").style.visibility = "visible";
        document.getElementById("deck__line").style.visibility = "visible";

        statusMessage(`Hello,  ${userName}! Ready to play? Select your deck and push PLAY `);
        document.getElementById("btnPlay").addEventListener("click", start);
        document.getElementById("deckcount").style.visibility = "visible";
        document.getElementById("chosenOne").style.visibility = "visible";

    } else {
        userName = prompt(
            "You cannot proceed without telling me something to call you. Anything will do.",
            "");
        preStart();
    }
}

// //////start of game                                  

function start() {
    playerPoints = 0;
    computerPoints = 0;
    playerHand = [];
    computerHand = [];

    statusMessage("");
    document.querySelector('.feedbackbar').classList.add('bar_adjust');
    document.getElementById("deck__line").style.visibility = "hidden";
    document.getElementById("btnPlay").style.visibility = "hidden";
    document.getElementsByClassName("bouncer")[0].style.visibility = "hidden";
    document.getElementsByClassName("toggle")[0].style.visibility = "visible";
    document.getElementById("scoreBox").style.visibility = "visible";
    document.getElementById("hit-stay").style.visibility = "visible";
    document.getElementById("ccd").innerHTML = "";
    document.getElementById("ucd").innerHTML = "";

    newDeck();
    shuffle(deck);
    deal();
    updateDeck();
    valCount2();
    valCount();
}

// //////form deck

function newDeck() {
    if (deck.length == 0) {
        suites.forEach((v) => {
            faces.forEach((j) => { });
        });
        suites.forEach((v) => {
            faces.forEach((j) => {
                let card = { face: j, suite: v };
                if (j == "ace") {
                    card.value = 11;
                } else if (j === "jack" || j === "queen" || j === "king") {
                    card.value = 10;
                } else {
                    card.value = j;
                }
                deck.push(card);
            });
        });
    } else {
        updateDeck();
    }
}

// //////shuffle deck

function shuffle(deck) {
    let m = deck.length,
        t,
        i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = deck[m];
        deck[m] = deck[i];
        deck[i] = t;
    }
    return deck;
}

// //////dealing cards

function deal() {
    if (deck.length == 0) {

        newDeck();
        shuffle(deck);
    }
    playerHand.push(deck.pop());
    if (deck.length == 0) {

        newDeck();
        shuffle(deck);
    }
    computerHand.push(deck.pop());
    if (deck.length == 0) {

        newDeck();
        shuffle(deck);
    }
    playerHand.push(deck.pop());
    if (deck.length == 0) {

        newDeck();
        shuffle(deck);
    }
    computerHand.push(deck.pop());
    if (deck.length == 0) {

        newDeck();
        shuffle(deck);
    }

    displayPlayerCards();
    preHoleCard();
}

////card show

function displayPlayerCards() {
    document.getElementById("ucd").innerHTML = "";
    for (let i = 0; i < playerHand.length; i++) {
        let playercard = document.createElement("img");
        playercard.src = `./asset/cards/${playerHand[i].suite}${playerHand[i].face}.png`;
        let ucd = document.getElementById("ucd");
        ucd.append(playercard);
    }
}

function preHoleCard() {
    let compcard0 = document.createElement("img");
    compcard0.src = `./asset/cards/${computerHand[0].suite}${computerHand[0].face}.png`;
    let ccd0 = document.getElementById("ccd");
    ccd0.append(compcard0);

    let compcard1 = document.createElement("img");
    compcard1.src = document.getElementById('chosenOne').src;
    let ccd1 = document.getElementById("ccd");
    ccd1.append(compcard1);
}

function displayCompCards() {
    document.getElementById("ccd").innerHTML = "";
    for (let i = 0; i < computerHand.length; i++) {
        let compcard = document.createElement("img");
        compcard.src = `./asset/cards/${computerHand[i].suite}${computerHand[i].face}.png`;
        let ccd = document.getElementById("ccd");
        ccd.append(compcard);
    }
}

// //////ace check for player hand

function valCount() {
    playerPoints = 0;

    playerHand.forEach((card) => {
        playerPoints += card.value;
    });

    if (playerPoints > 21) {
        playerHand.forEach(card => {
            if (card.value === 11 && playerPoints > 21) {
                playerPoints -= 10
            }
        })
        updateDeck();
    }
    checkScore();
}

// //////ace check for computer hand

function valCount2() {
    computerPoints = 0;
    computerHand.forEach((card) => {
        computerPoints += card.value;
    });
    if (computerPoints > 21) {
        computerHand.forEach(card => {
            if (card.value === 11 && computerPoints > 21) {
                computerPoints -= 10
            }
        })
    }
    updateDeck();
}

function hitMe() {
    if (deck.length == 0) {
        newDeck();
        shuffle(deck);
        return deck;
    }
    playerHand.push(deck.pop());
    valCount();
    displayPlayerCards();
}

function wannaStay() {
    document.getElementById("hit-stay").style.visibility = "hidden";

    statusMessage(
        `You have chosen to stay with a hand of ${playerPoints} points.\nLet's see what the dealer has.\n`);
    let feedbackbtn = document.createElement("button");
    feedbackbtn.innerText = "OK";
    feedbackbtn.addEventListener("click", next);
    console.log("going to next");
    document.getElementById("feedbackbar").append(feedbackbtn);
}

function next() {
    displayCompCards();
    statusMessage(`Dealer reveals the card ${computerHand[1].face} of ${computerHand[1].suite} resulting in ${computerPoints}.\n`);
    console.log("going to compTurn");
    let feedbackbtn = document.createElement("button");
    feedbackbtn.innerText = "OK";
    feedbackbtn.addEventListener("click", compTurn);
    document.getElementById("feedbackbar").append(feedbackbtn);
}

// //////evaluating player score

function checkScore() {
    updateDeck();

    if (playerPoints === 21) {

        statusMessage(`Let me do some quick math, ${userName}. You have 21.\nWhat would you like to do?\n`);
        document.getElementById("btnHit").addEventListener("click", hitMe);
        document.getElementById("btnStay").addEventListener("click", wannaStay);

    } else if (playerPoints > 21) {
        lose += 1;
        games += 1;

        updateDeck();
        displayCompCards();
        statusMessage(`Oh no! ${playerPoints} is too many!\nDealer wins with ${computerPoints}.\n`);

        document.getElementById("hit-stay").style.visibility = "hidden";
        let feedbackbtn = document.createElement("button");
        feedbackbtn.innerText = "OK";
        feedbackbtn.addEventListener("click", reStart);
        document.getElementById("feedbackbar").append(feedbackbtn);
    } else {

        document.getElementById("hit-stay").style.visibility = "visible";
        statusMessage(`It is your turn to play and you currently have ${playerPoints} points.\nThe dealer has only one card is showing, a ${computerHand[0].face} of ${computerHand[0].suite}.\nDo you want to hit or stay?`);
        document.getElementById("btnHit").addEventListener("click", hitMe);
        document.getElementById("btnStay").addEventListener("click", wannaStay);
    }
}

// //////add a card if computer has less than 17

function compPlusOne() {
    if (deck.length == 0) {
        newDeck();
        shuffle(deck);
        return deck;
    }
    while (computerPoints < 17 && computerPoints <= playerPoints) {
        computerHand.push(deck.pop());
        displayCompCards();
        valCount2();

        statusMessage(`Dealer has ${computerPoints}.\n`);

        let feedbackbtn = document.createElement("button");
        feedbackbtn.innerText = "OK";
        feedbackbtn.addEventListener("click", compTurn);
        document.getElementById("feedbackbar").append(feedbackbtn);
        return (computerPoints);
    }

    if (computerPoints < playerPoints && computerPoints <= 21) {
        win += 1;
        games += 1;

        statusMessage(`You outsmarted a computer. Congrats!\nDealer has ${computerPoints}.\nYou have ${playerPoints}.\n`);

        let feedbackbtn = document.createElement("button");
        feedbackbtn.innerText = "OK";
        feedbackbtn.addEventListener("click", reStart);
        document.getElementById("feedbackbar").append(feedbackbtn);
        youWin();

    } else if (computerPoints > playerPoints && computerPoints <= 21) {
        lose += 1;
        games += 1;

        statusMessage(`Dealer has ${computerPoints}.\nYou have ${playerPoints}.\nThat's a win for the dealer.\n`);
        let feedbackbtn = document.createElement("button");
        feedbackbtn.innerText = "OK";
        feedbackbtn.addEventListener("click", reStart);
        document.getElementById("feedbackbar").append(feedbackbtn);

    } else if (computerPoints == playerPoints && computerPoints >= 17 && computerPoints <= 21) {
        tie += 1;
        games += 1;

        statusMessage(`It is a tie. ${computerPoints} for all.\nWhat were the odds of that?\n`);
        let feedbackbtn = document.createElement("button");
        feedbackbtn.innerText = "OK";
        feedbackbtn.addEventListener("click", reStart);
        document.getElementById("feedbackbar").append(feedbackbtn);

    } else {
        win += 1;
        games += 1;

        statusMessage(`You win. Do your 'Dance of Triumph'.\n Dealer:  ${computerPoints}\nYou: ${playerPoints}\n`);

        let feedbackbtn = document.createElement("button");
        feedbackbtn.innerText = "OK";
        feedbackbtn.addEventListener("click", reStart);
        document.getElementById("feedbackbar").append(feedbackbtn);
        youWin();
    }
}

// //////make sure deck has cards

function updateDeck() {
    document.getElementById("deckcount").innerHTML = deck.length;
}

function compTurn() {
    valCount2();

    if (computerPoints <= 16 && computerPoints <= playerPoints) {
        compPlusOne();

    }
    else if (computerPoints > playerPoints && computerPoints <= 19) {
        lose += 1;
        games += 1;

        statusMessage(`Your strategy didn't work out this time, ${userName}.\nDealer's hand of ${computerPoints} beats ${playerPoints}.\n`);
        let feedbackbtn = document.createElement("button");
        feedbackbtn.innerText = "OK";
        feedbackbtn.addEventListener("click", reStart);
        document.getElementById("feedbackbar").append(feedbackbtn);

    }
    else if (computerPoints >= 17 && computerPoints < playerPoints && playerPoints <= 19) {
        win += 1;
        games += 1;

        statusMessage(`Nice work! I am adding a tick to your win pile, ${userName}!\nDealer: ${computerPoints}\nYou: ${playerPoints}\n`);
        let feedbackbtn = document.createElement("button");
        feedbackbtn.innerText = "OK";
        feedbackbtn.addEventListener("click", reStart);
        document.getElementById("feedbackbar").append(feedbackbtn);
        youWin();
    }
    else if (computerPoints == playerPoints && computerPoints < 19) {
        tie += 1;
        games += 1;

        statusMessage(`It is a tie, and not the bow kind.\nEverybody wins! (kinda).\n`);
        let feedbackbtn = document.createElement("button");
        feedbackbtn.innerText = "OK";
        feedbackbtn.addEventListener("click", reStart);
        document.getElementById("feedbackbar").append(feedbackbtn);

    }
    else if (computerPoints < playerPoints && computerPoints <= 21) {
        win += 1;
        games += 1;

        statusMessage(`The plan came together, ${userName}!\nDealer busts with: ${computerPoints}\nYou win with: ${playerPoints}\n`);

        let feedbackbtn = document.createElement("button");
        feedbackbtn.innerText = "OK";
        feedbackbtn.addEventListener("click", reStart);
        document.getElementById("feedbackbar").append(feedbackbtn);
        youWin();
    }
    else if (computerPoints > playerPoints && computerPoints <= 21) {
        lose += 1;
        games += 1;

        statusMessage(`${userName}, you were not victorious this time.\nDealer wins with: ${computerPoints}\nYou: ${playerPoints}\n`);
        let feedbackbtn = document.createElement("button");
        feedbackbtn.innerText = "OK";
        feedbackbtn.addEventListener("click", reStart);
        document.getElementById("feedbackbar").append(feedbackbtn);

    }
    else {
        compPlusOne();
    }
}

function youWin() {
    document.getElementById("confetti").style.visibility = "visible";
    update();
    draw();
    setTimeout(() => { document.getElementById("confetti").style.visibility = "hidden" }, 3000);
}

function reStart() {
    playerPoints = 0;
    computerPoints = 0;
    playerHand = [];
    computerHand = [];

    document.getElementById("win").innerHTML = win;
    document.getElementById("tie").innerHTML = tie;
    document.getElementById("lose").innerHTML = lose;
    document.getElementById("games").innerHTML = games;
    document.getElementById("hit-stay").style.visibility = "hidden";
    document.getElementById("btnPlay").style.visibility = "visible";
    document.getElementById("btnPlay").addEventListener("click", start);

    statusMessage(
        `Games won: ${win}, tied: ${tie}, and lost: ${lose}.\n${userName}, do you want to play again?\nOr do you want to  `);

    let feedbackbtn = document.createElement("button");
    feedbackbtn.innerText = "END";
    feedbackbtn.addEventListener("click", done);
    document.getElementById("feedbackbar").append(feedbackbtn);
}

function done() {
    document.getElementById("btnPlay").style.visibility = "hidden";
    statusMessage(
        `Goodbye, ${userName}. I hope the weather is nice and you can enjoy it!\nGames Played: ${games}, Games Won: ${win}, Games Tied: ${tie}, Games Lost: ${lose}\n`);

    let feedbackbtn = document.createElement("button");
    feedbackbtn.style.cssText = "width: fit-content; padding: 1px 10px;";
    feedbackbtn.innerText = "Continue Play";
    feedbackbtn.addEventListener("click", start);
    document.getElementById("feedbackbar").append(feedbackbtn);
}