"use strict";

const scoreElement = document.querySelector("#score");
const messageElement = document.querySelector("#game-message");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");

let animationFrameId = null;
let previousTimestamp = null;

// Displays the current score.
function renderScore() {
  scoreElement.textContent = gameState.score;
}

// Counts each obstacle once after it passes the player.
function updateScore() {
  gameState.obstacles.forEach(function (obstacle) {
    if (!obstacle.counted && obstacle.x + obstacle.width < gameState.player.x) {
      gameState.score++;
      obstacle.counted = true;
    }
  });
}

// Starts or restarts the game.
function startGame() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  gameState.status = "running";
  gameState.score = 0;

  resetPlayer();
  resetObstacles();

  renderPlayer();
  renderObstacles();
  renderScore();

  messageElement.textContent = "Game on! Press Space to jump over obstacles.";

  startButton.disabled = true;
  restartButton.hidden = true;

  previousTimestamp = null;
  animationFrameId = requestAnimationFrame(gameLoop);
}

// Runs the main game animation loop.
function gameLoop(timestamp) {
  if (gameState.status !== "running") {
    animationFrameId = null;
    previousTimestamp = null;
    return;
  }

  let deltaTime = 0;

  if (previousTimestamp !== null) {
    deltaTime = Math.min((timestamp - previousTimestamp) / 1000, 0.05);
  }

  previousTimestamp = timestamp;

  // Update the game state.
  updatePlayer(deltaTime);
  updateObstacles(deltaTime);

  // Show the current positions, including the collision frame.
  renderPlayer();
  renderObstacles();

  if (hasCollision()) {
    endGame();
    return;
  }

  updateScore();
  renderScore();

  // Keep one animation loop running.
  if (gameState.status === "running") {
    animationFrameId = requestAnimationFrame(gameLoop);
  } else {
    animationFrameId = null;
    previousTimestamp = null;
  }
}

// Handles Space-bar jumping.
function handleKeyDown(event) {
  if (event.code !== "Space") {
    return;
  }

  // Only prevent the default action during gameplay.
  if (gameState.status !== "running") {
    return;
  }

  event.preventDefault();

  // Ignore repeated keydown events from holding Space.
  if (event.repeat) {
    return;
  }

  jump();
}

// Connects the buttons and keyboard controls.
function setupGameControls() {
  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", startGame);

  document.addEventListener("keydown", handleKeyDown);

  startButton.disabled = false;
}

// Ends the game and displays the final score.
function endGame() {
  gameState.status = "over";

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  previousTimestamp = null;

  messageElement.textContent = `Game over! Your final score is ${gameState.score}.`;

  startButton.disabled = true;
  restartButton.hidden = false;
}

setupGameControls();

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
