// Отримуємо посилання на елементи сторінки
const startBtn = document.getElementById("start");
const gameboard = document.getElementById("gameboard");
const score = document.getElementById("score");
const highScore = document.getElementById("high-score");
const colorPicker = document.getElementById("color-picker");
const timer = document.getElementById("timer");
const gameRulesButton = document.getElementById("game-rules-button");
const gameRules = document.getElementById("game-rules");

// Змінні для збереження стану гри
let gameStarted = false;
let currentScore = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
let gameTimer;

// Функція для генерації нової "квадратної" коробки на гральному полі
function createBox() {
  const box = document.createElement("div");
  box.classList.add("box");
  box.style.left = `${Math.random() * 350}px`;
  box.style.top = `${Math.random() * 350}px`;
  box.style.backgroundColor = colorPicker.value;
  box.addEventListener("click", () => {
    currentScore++;
    score.innerText = `Очки: ${currentScore}`;
    gameboard.removeChild(box);
    createBox();
  });
  gameboard.appendChild(box);
}

// Функція для оновлення відображення найкращого результату та повідомлення про закінчення гри
function updateBestScore() {
  if (currentScore > bestScore) {
    bestScore = currentScore;
    localStorage.setItem("bestScore", bestScore);
  }
  highScore.innerText = `Рекорд: ${bestScore}`;
  alert("Гра завершена!");
}

// Додаємо обробник події для кнопки "Почати гру"
startBtn.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    currentScore = 0;
    score.innerText = `Очки: ${currentScore}`;
    createBox();

    let remainingTime = 10;
    timer.innerText = `Час: ${remainingTime}`;

    gameTimer = setInterval(() => {
      remainingTime--;
      timer.innerText = `Час: ${remainingTime}`;
      if (remainingTime === 0) {
        gameStarted = false;
        updateBestScore();
        clearInterval(gameTimer);
        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box) => {
          gameboard.removeChild(box);
        });
      }
    }, 1000)
  }
});

// Додаємо обробник події для зміни кольору коробок
colorPicker.addEventListener("input", () => {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.style.backgroundColor = colorPicker.value;
  });
});

// Додаємо обробник події для закінчення гри
gameboard.addEventListener("click", (event) => {
  if (gameStarted && event.target === gameboard) {
    gameStarted = false;
    updateBestScore();
    clearInterval(gameTimer);
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      gameboard.removeChild(box);
    });
  }
});

function updateTimer() { // Функція для відліку часу та оновлення відображення
  gameTime--;
  timer.innerText = `Час: ${gameTime}`;
  if (gameTime <= 0) {
    clearInterval(gameTimer);
    gameStarted = false;
    updateBestScore();
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      gameboard.removeChild(box);
    });
  }
}

gameRulesButton.addEventListener("click", () => {
  if (gameRules.style.display === "block") {
    gameRules.style.display = "none";
  } else {
    gameRules.style.display = "block";
  }
});
