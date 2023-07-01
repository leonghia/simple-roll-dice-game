'use strict';

// Define DOM elements
const currentScoreEl_0 = document.querySelector("#current--0");
const currentScoreEl_1 = document.querySelector("#current--1");
const totalScoreEl_0 = document.querySelector("#score--0");
const totalScoreEl_1 = document.querySelector("#score--1");

const rollDiceEl = document.querySelector(".btn--roll");
const newGameEl = document.querySelector(".btn--new");
const holdEl = document.querySelector(".btn--hold");

const diceEl = document.querySelector(".dice");

const playerEl_0 = document.querySelector(".player--0");
const playerEl_1 = document.querySelector(".player--1");

// Define players
const player_0 =
{
    id: 0,
    _currentScore: 0,
    _totalScore: 0,
    GetCurrentScore: function ()
    {
        return this._currentScore;
    },
    SetCurrentScore: function (currentScore)
    {
        this._currentScore = currentScore;
        currentScoreEl_0.textContent = this._currentScore;
    },
    UpdateCurrentScore: function (score)
    {
        this._currentScore += score;
        currentScoreEl_0.textContent = this._currentScore;
    },
    GetTotalScore: function ()
    {
        return this._totalScore;
    },
    SetTotalScore: function (totalScore)
    {
        this._totalScore = totalScore;
        totalScoreEl_0.textContent = this._totalScore;
    },
    UpdateTotalScore: function ()
    {
        this._totalScore += this._currentScore;
        totalScoreEl_0.textContent = this._totalScore;
        this.SetCurrentScore(0);
    },
    Reset: function ()
    {
        this.SetCurrentScore(0);
        this.SetTotalScore(0);
        playerEl_0.classList.remove("player--winner");
    },
};

const player_1 =
{
    id: 1,
    _currentScore: 0,
    _totalScore: 0,
    GetCurrentScore: function ()
    {
        return this._currentScore;
    },
    SetCurrentScore: function (currentScore)
    {
        this._currentScore = currentScore;
        currentScoreEl_1.textContent = this._currentScore;
    },
    UpdateCurrentScore: function (score)
    {
        this._currentScore += score;
        currentScoreEl_1.textContent = this._currentScore;
    },
    GetTotalScore: function ()
    {
        return this._totalScore;
    },
    SetTotalScore: function (totalScore)
    {
        this._totalScore = totalScore;
        totalScoreEl_1.textContent = this._totalScore;
    },
    UpdateTotalScore: function ()
    {
        this._totalScore += this._currentScore;
        totalScoreEl_1.textContent = this._totalScore;
        this.SetCurrentScore(0);
    },
    Reset: function ()
    {
        this.SetCurrentScore(0);
        this.SetTotalScore(0);
        playerEl_1.classList.remove("player--winner");
    },
};

// Declare game states
let activePlayer, winner, dice, isPlaying;

const HideDiceImg = function ()
{
    diceEl.style.display = "none";
}

const DisplayDiceImg = function ()
{
    diceEl.style.display = "block";
}

const Init = function ()
{
    player_0.Reset();
    player_1.Reset();
    HideDiceImg();
    activePlayer = player_0;
    playerEl_0.classList.add("player--active");
    playerEl_1.classList.remove("player--active");
    isPlaying = true;
};

// Initialize the game
Init();

const SwitchTurn = function ()
{
    activePlayer = activePlayer.id === 0 ? player_1 : player_0;
    playerEl_0.classList.toggle("player--active");
    playerEl_1.classList.toggle("player--active");
};

const RollDice = function ()
{
    if (isPlaying)
    {
        DisplayDiceImg();
        dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.src = `dice-${dice}.png`;

        if (dice !== 1)
        {
            activePlayer.UpdateCurrentScore(dice);
        }
        else
        {
            activePlayer.SetCurrentScore(0);
            SwitchTurn();
        }
    }
    
};

const Hold = function ()
{
    if (isPlaying)
    {
        activePlayer.UpdateTotalScore();
        if (activePlayer.GetTotalScore() >= 50)
        {
            isPlaying = false;
            HideDiceImg();
            winner = activePlayer;
            winner.id === 0 ? playerEl_0.classList.toggle("player--winner") : playerEl_1.classList.toggle("player--winner");
        }
        else
        {
            SwitchTurn();
        }
    }
    
    
};

rollDiceEl.addEventListener("click", RollDice);
holdEl.addEventListener("click", Hold);
newGameEl.addEventListener("click", Init);







