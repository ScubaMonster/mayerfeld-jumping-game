"use strict";

const scoreElement = document.querySelector("#score");
const messageElement = document.querySelector("#game-message");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");

function updateScore() {
    scoreElement.textContent = gameState.score;
}

function startGame() {
    gameState.status = "running";
    gameState.score = 0;

    resetPlayer();
    renderPlayer();
    updateScore();

    messageElement.textContent =
        "Game on! Press Space to jump over obstacles.";

    startButton.disabled = true;
    restartButton.hidden = true;

    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
    }

    previousTimestamp = null;
    animationFrameId = requestAnimationFrame(gameLoop);
}


let animationFrameId = null;
let previousTimestamp = null;

function gameLoop(timestamp) {
    if (gameState.status !== "running") {
        animationFrameId = null;
        previousTimestamp = null;
        return;
    }

    let deltaTime = 0;

    if (previousTimestamp !== null) {
        deltaTime = Math.min(
            (timestamp - previousTimestamp) / 1000,
            0.05
        );
    }

    previousTimestamp = timestamp;

    updatePlayer(deltaTime);
    renderPlayer();

    // Betim's obstacle updates, collision check,
    // and scoring will be added here.

    if (gameState.status === "running") {
        animationFrameId = requestAnimationFrame(gameLoop);
    } else {
        animationFrameId = null;
        previousTimestamp = null;
    }
}


function handleKeyDown(event) {
    if (event.code === "Space") {
        event.preventDefault();

        if (gameState.status === "running") {
            jump();
        }
    }
}

function setupGameControls() {
    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", startGame);

    document.addEventListener("keydown", handleKeyDown);

    // Enable the Start button when controls are ready.
    startButton.disabled = false;
}

setupGameControls();


function endGame() {
    gameState.status = "gameOver";

    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    previousTimestamp = null;

    messageElement.textContent =
        `Game over! Your final score is ${gameState.score}.`;

    startButton.disabled = true;
    restartButton.hidden = false;
}




// Person C — Tahlia
// Game lifecycle, controls, scoring, and interface.

// Public functions:
// startGame() — coordinate starting or restarting a session.
// gameLoop(timestamp) — coordinate each animation frame.
// updateScore() — count newly passed obstacles.
// endGame() — transition the session to game over.
// setupGameControls() — register event listeners once.

// Keep state changes and interface rendering in separate helpers.
// Call updatePlayer(deltaTime), then renderPlayer().
// Call updateObstacles(deltaTime), then renderObstacles().
// Call hasCollision() to determine whether play should end.

// Convert animation timestamps to deltaTime in seconds.
// Maintain only one animation loop.