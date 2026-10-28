"use strict";

// Person A — Aspa
// Character movement and appearance.

// Public functions:
// resetPlayer() — restore the initial player state.
// jump() — start a jump when running and grounded.
// updatePlayer(deltaTime) — coordinate the physics update.
// renderPlayer() — display the player's current state.

// Physics helpers:
// applyGravity(deltaTime) — update vertical velocity.
// movePlayer(deltaTime) — update vertical position.
// handleLanding() — resolve landing on the ground.

// Use gameState.player from shared.js.
// deltaTime is in seconds.
// Tahlia owns the animation loop.

const playerElement = document.querySelector("#player");

const JUMP_SPEED = 720;
const GRAVITY = 1800;

function resetPlayer() {
  const player = gameState.player;

  player.x = 64;
  player.y = 0;
  player.width = 60;
  player.height = 72;
  player.velocityY = 0;
  player.grounded = true;
}

function renderPlayer() {
  const player = gameState.player;

  playerElement.style.left = `${(player.x / WORLD_WIDTH) * 100}%`;

  playerElement.style.bottom = `${(player.y / WORLD_HEIGHT) * 100}%`;

  playerElement.style.width = `${(player.width / WORLD_WIDTH) * 100}%`;

  playerElement.style.height = `${(player.height / WORLD_HEIGHT) * 100}%`;

  playerElement.classList.toggle("is-airborne", !player.grounded);
}

function jump() {
  const player = gameState.player;

  if (gameState.status !== "running" || !player.grounded) {
    return;
  }

  player.velocityY = JUMP_SPEED;
  player.grounded = false;
}

function applyGravity(deltaTime) {
  gameState.player.velocityY -= GRAVITY * deltaTime;
}

function movePlayer(deltaTime) {
  const player = gameState.player;

  player.y += player.velocityY * deltaTime;
}

function handleLanding() {
  const player = gameState.player;

  if (player.y <= 0 && player.velocityY <= 0) {
    player.y = 0;
    player.velocityY = 0;
    player.grounded = true;
  }
}

function updatePlayer(deltaTime) {
  if (gameState.status !== "running" || gameState.player.grounded) {
    return;
  }

  applyGravity(deltaTime);
  movePlayer(deltaTime);
  handleLanding();
}
